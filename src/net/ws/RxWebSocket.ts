import * as _ from "lodash";
import { AsyncSubject, defer, merge, NEVER, Observable, of, Subject, Subscriber, Subscription, throwError, zip } from "rxjs";
import { tag } from "rxjs-spy/operators";
import { filter, first, flatMap, map, tap, timeout } from "rxjs/operators";
import { DCoreError } from "../../models/error/DCoreError";
import { ObjectNotFoundError } from "../../models/error/ObjectNotFoundError";
import { ObjectCheckOf } from "../../utils/ObjectCheckOf";
import { BaseRequest } from "../models/request/BaseRequest";
import { WithCallback } from "../models/request/WithCallback";
import { CallbackResponse } from "../models/response/CallbackResponse";
import { DataResponse } from "../models/response/DataResponse";
import { WebSocketClosedError } from "../models/WebSocketClosedError";

export interface CloseEvent {
    wasClean: boolean;
    code: number;
    reason: string;
    target: any;
}

export interface MessageEvent {
    data: any;
    type: any;
    target: any;
}

export interface ErrorEvent {
    error: any;
    message: string;
    target: any;
}

export interface WebSocketContract {
    onopen?: any;
    onclose?: any;
    onmessage?: any;
    onerror?: any;

    close(code?: number, data?: string): void;

    send(data: any): void;
}

export type WebSocketFactory = () => WebSocketContract;

export class RxWebSocket {

    private static checkError(value: object, callId: number): void {
        if (ObjectCheckOf<DataResponse>(value, "id") && value.id === callId && !_.isNil(value.error)) {
            throw new DCoreError(value.error);
        }
    }

    private static getIdAndResult(value: object): [number, object] {
        if (ObjectCheckOf<DataResponse>(value, "id")) {
            return [value.id, value.result!];
        }
        if (ObjectCheckOf<CallbackResponse>(value, "method")) {
            return [value.params[0], value.params[1][0]];
        }
        throw Error(`not supported response: ${value}`);
    }

    private static checkEmpty(value: object, request: BaseRequest<any>): void {
        if (!request.allowNull && (_.isNil(value) || (_.isArray(value) && value.length === 1 && value[0] === null))) {
            throw new ObjectNotFoundError(request.description());
        }
    }

    private static send(ws: WebSocketContract, request: string): void {
        ws.send(request);
    }

    public timeout = 60 * 1000;

    private callId = 0;
    private subscriptions: Subscription;
    private webSocketAsync?: AsyncSubject<WebSocketContract>;
    private messages: Subject<object | Error> = new Subject();

    private events: Observable<any> = new Observable((emitter: Subscriber<string>) => {
        const socket = this.webSocketFactory();
        socket.onopen = () => {
            this.webSocketAsync!.next(socket);
            this.webSocketAsync!.complete();
        };
        socket.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                emitter.complete();
            } else {
                emitter.error(Error(event.reason));
            }
        };
        socket.onmessage = (message: MessageEvent) => emitter.next(message.data);
        socket.onerror = (error: ErrorEvent) => emitter.error(Error(error.message));
    }).pipe(tag("RxWebSocket_events"));

    constructor(private webSocketFactory: WebSocketFactory) {
    }

    public isConnected(): boolean {
        return !_.isUndefined(this.subscriptions) && !this.subscriptions.closed;
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        return this.make(request, this.getCallId());
    }

    public requestStream<T>(request: BaseRequest<T> & WithCallback): Observable<T> {
        return this.makeStream(request, this.getCallId(), this.getCallId());
    }

    public getCallId(): number {
        return this.callId++;
    }

    public disconnect() {
        this.webSocket().subscribe((socket: WebSocketContract) => {
            socket.close(1000, "closing");
            socket.onclose!({ wasClean: true, code: 1000, reason: "self disconnect", target: socket });
            socket.onclose = undefined;
        });
    }

    public webSocket(): Observable<WebSocketContract> {
        if (_.isNil(this.webSocketAsync)) {
            this.webSocketAsync = new AsyncSubject<WebSocketContract>();
            this.connect();
        }
        return this.webSocketAsync;
    }

    private connect() {
        this.subscriptions =
            this.events.pipe(
                tap({
                    complete: () => this.messages.next(new WebSocketClosedError()),
                    error: (err) => this.messages.next(err),
                }),
                filter((value) => typeof value === "string"),
                map((value: string) => JSON.parse(value)),
                tap((value: object) => this.messages.next(value)),
            ).subscribe({
                complete: () => this.clearConnection(),
                error: () => this.clearConnection(),
            });
    }

    private clearConnection() {
        this.subscriptions.unsubscribe();
        this.webSocketAsync = undefined;
        this.callId = 0;
    }

    private makeStream<T>(request: BaseRequest<T>, callId: number, callbackId?: number): Observable<T> {
        return merge(
            this.messages,
            zip(
                defer(() => this.webSocket()),
                of(request.json(callId, callbackId)).pipe(tag((`API_send_${request.method}`))),
            ).pipe(
                tap(([socket, serialized]) => RxWebSocket.send(socket, serialized)),
                flatMap(() => NEVER),
            ),
        )
            .pipe(
                tag(`RxWebSocket_make_${request.method}_plain`),
                flatMap((value) => value instanceof Error ? throwError(value) : of(value)),
                tap((value: object) => RxWebSocket.checkError(value, callId)),
                map((value) => RxWebSocket.getIdAndResult(value)),
            ).pipe(
                filter(([id, obj]: [number, object]) => id === (callbackId ? callbackId : callId)),
                map(([id, obj]: [number, object]) => obj),
                tap((obj: object) => RxWebSocket.checkEmpty(obj, request)),
                map(request.transformer),
                tag(`RxWebSocket_make_${request.method}`),
            );
    }

    private make<T>(request: BaseRequest<T>, callId: number): Observable<T> {
        return this.makeStream(request, callId).pipe(
            first(),
            timeout(this.timeout),
        );
    }
}
