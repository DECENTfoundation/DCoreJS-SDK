import { Observable } from "rxjs";
import { BaseRequest } from "../models/request/BaseRequest";
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
export declare type WebSocketFactory = () => WebSocketContract;
export declare class RxWebSocket {
    private webSocketFactory;
    private callId;
    private apiId;
    private subscriptions;
    private webSocketAsync?;
    private events;
    constructor(webSocketFactory: WebSocketFactory);
    isConnected(): boolean;
    request<T>(request: BaseRequest<T>): Observable<T>;
    getCallId(): number;
    close(): void;
    private connect;
    private webSocket;
    private checkApiAccess;
    private send;
    private checkError;
    private getIdAndResult;
    private checkEmpty;
    private make;
}
