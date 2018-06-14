import * as _ from "lodash";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Subscriber } from "rxjs/internal-compatibility";
import { AsyncSubject } from "rxjs/internal/AsyncSubject";
import { merge } from "rxjs/internal/observable/merge";
import { publish, tap } from "rxjs/operators";
import { BaseRequest } from "../models/request/BaseRequest";

export interface Connection {
    connectionStatus: Observable<number>;
    messages: Observable<string>;
}

export interface WebSocketContract {
    onopen?: (OpenEvent: any) => any;
    onclose?: (CloseEvent: any) => any;
    onmessage?: (MessageEvent: any) => any;
    onerror?: (ErrorEvent: any) => any;

    close(): void;

    send(data: string | ArrayBuffer | Blob): void;
}

export type WebSocketFactory = (url: string, protocols?: string | string[]) => WebSocketContract;

const defaultFactory = (url: string, protocol?: string): WebSocketContract => new WebSocket(url, protocol);

export class RxWebSocket {
    private subscriptions = new Subscription();
    private webSocketAsync?: AsyncSubject<WebSocketContract> = null;
    private events = Observable.create((emitter: Subscriber<string>) => {
        const socket = this.webSocketFactory(this.url);
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
        socket.onerror = (error: ErrorEvent) => emitter.error(error);
    }).pipe(publish());

    constructor(private url: string, private webSocketFactory: WebSocketFactory = defaultFactory) {
    }

    public makeRequest<T>(request: BaseRequest<T>): Observable<any> {
        return merge(this.events, this.webSocket().pipe(tap((ws) => ws.send('{"method":"call","params":[1,"login",["",""]],"id":3}'))))
            .pipe();
    }

    private connect() {
        this.subscriptions.add(this.events.subscribe(
            (value) => console.log("next: ", value),
            (err) => console.log("error: ", err),
            () => {
                console.log("complete");
                this.subscriptions.unsubscribe();
                this.webSocketAsync = null;
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
}
