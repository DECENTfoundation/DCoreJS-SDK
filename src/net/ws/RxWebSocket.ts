import { serialize } from "class-transformer";
import * as _ from "lodash";
import { Observable, Subscription } from "rxjs";
import { tag } from "rxjs-spy/operators";
import { Subscriber } from "rxjs/internal-compatibility";
import { AsyncSubject } from "rxjs/internal/AsyncSubject";
import { defer } from "rxjs/internal/observable/defer";
import { merge } from "rxjs/internal/observable/merge";
import { scalar } from "rxjs/internal/observable/scalar";
import { OperatorFunction } from "rxjs/internal/types";
import { filter, first, flatMap, map, publish, tap } from "rxjs/operators";
import { NotFoundError } from "../../models/error/NotFoundError";
import { ObjectCheckOf } from "../../utils/ObjectCheckOf";
import { ApiGroup } from "../models/ApiGroup";
import { BaseRequest } from "../models/request/BaseRequest";
import { Login } from "../models/request/Login";
import { RequestApiAccess } from "../models/request/RequestApiAccess";
import { WithCallback } from "../models/request/WithCallback";
import { WsResult } from "../models/response/WsResult";
import { WsResultNotice } from "../models/response/WsResultNotice";
import { RequestJson } from "./RequestJson";

export interface CloseEvent {
    wasClean: boolean;
    code: number;
    reason: string;
}

export interface MessageEvent {
    data: any;
    type: string;
}

export interface ErrorEvent {
    error: any;
    message: string;
    type: string;
}

export interface WebSocketContract {
    onopen?: (event: any) => void;
    onclose?: (closeEvent: CloseEvent) => void;
    onmessage?: (messageEvent: MessageEvent) => void;
    onerror?: (errorEvent: ErrorEvent) => void;

    close(code?: number, data?: string): void;

    send(data: any): void;
}

export type WebSocketFactory = () => WebSocketContract;

export class RxWebSocket {
    private callId = 0;
    private apiId = new Map<ApiGroup, number>();
    private subscriptions = new Subscription();
    private webSocketAsync?: AsyncSubject<WebSocketContract> = null;
    private events = Observable.create((emitter: Subscriber<string>) => {
        const socket = this.webSocketFactory();
        socket.onopen = () => {
            this.webSocketAsync.next(socket);
            this.webSocketAsync.complete();
        };
        socket.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                emitter.complete();
            } else {
                emitter.error(new Error(event.reason));
            }
        };
        socket.onmessage = (message: MessageEvent) => emitter.next(message.data);
        socket.onerror = (error: ErrorEvent) => emitter.error(Error(error.message));
    }).pipe(tag("RxWebSocket_events"), publish());

    constructor(private webSocketFactory: WebSocketFactory) {
    }

    public isConnected(): boolean {
        return !this.subscriptions.closed;
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        return this.make(request, this.getCallId());
    }

    public getCallId(): number {
        return this.callId++;
    }

    public close() {
        this.webSocket().subscribe((socket: WebSocketContract) => {
            socket.close(1000, "closing");
            socket.onclose({ wasClean: true, code: 1000, reason: "self close" });
            socket.onclose = undefined;
        });
    }

    private connect() {
        this.subscriptions.add(
            this.events.subscribe({
                complete: () => {
                    this.subscriptions.unsubscribe();
                    this.webSocketAsync = null;
                },
            }));
        this.events.connect();
    }

    private webSocket(): Observable<WebSocketContract> {
        if (_.isNull(this.webSocketAsync)) {
            this.webSocketAsync = new AsyncSubject<WebSocketContract>();
            this.connect();
        }
        return this.webSocketAsync;
    }

    private checkApiAccess<T extends WebSocketContract>(request: BaseRequest<any>): OperatorFunction<T, [T, number]> {
        return flatMap((ws) => {
            if (request instanceof Login) {
                return scalar<[T, number]>([ws, 1]);
            } else if (!this.apiId.has(request.apiGroup) && request.apiGroup === ApiGroup.Login) {
                return this.make(new Login(), this.getCallId()).pipe(
                    tap({ complete: () => this.apiId.set(ApiGroup.Login, 1) }),
                    map<boolean, [T, number]>(() => [ws, 1]),
                );
            } else if (!this.apiId.has(request.apiGroup)) {
                return this.make(new RequestApiAccess(request.apiGroup), this.getCallId()).pipe(
                    tap({ next: (value: number) => this.apiId.set(request.apiGroup, value) }),
                    map<number, [T, number]>((value) => [ws, value]));
            } else {
                return scalar<[T, number]>([ws, this.apiId.get(request.apiGroup)]);
            }
        });
    }

    private send(ws: WebSocketContract, request: string): void {
        // tslint:disable-next-line
        console.log(request);
        ws.send(request);
    }

    private checkError(value: object, callId: number): void {
        if (ObjectCheckOf<WsResult>(value, "id") && value.id === callId && !_.isNil(value.error)) {
            throw Error(value.error.message);
        }
    }

    private getIdAndResult(value: object): [number, object] {
        if (ObjectCheckOf<WsResult>(value, "id")) {
            return [value.id, value.result];
        }
        if (ObjectCheckOf<WsResultNotice>(value, "method")) {
            return [value.params[0], value.params[1][0]];
        }
        throw Error(`not supported response: ${value}`);
    }

    private checkEmpty(value: object, request: BaseRequest<any>): void {
        if (_.isNil(value) || (_.isArray(value) && value.filter(Boolean).length === 0)) {
            throw new NotFoundError(request.description());
        }
    }

    private make<T>(request: BaseRequest<T>, callId: number): Observable<T> {
        // public prepare(request: BaseRequest<any>, callId: number): Observable<any> {
        return merge(
            this.events,
            defer(() => this.webSocket()).pipe(
                this.checkApiAccess(request),
                tap((value) => this.send(value[0], serialize(new RequestJson(callId, value[1], request)))),
            ))
            .pipe(
                filter((value) => typeof value === "string"),
                // tag(`RxWebSocket_make_${request.method}_plain`),
                map((value: string) => JSON.parse(value)),
                tag(`RxWebSocket_make_${request.method}_value`),
                tap((value: object) => this.checkError(value, callId)),
                map(this.getIdAndResult),
            ).pipe(
                first((value: [number, object]) => ObjectCheckOf<WithCallback>(request, "callbackId") ? request.callbackId === value[0] : callId === value[0]),
                map((value: [number, object]) => value[1]),
                tap((value) => this.checkEmpty(value, request)),
                map(request.transformer),
                tag(`RxWebSocket_make_${request.method}`),
            );
    }
}
