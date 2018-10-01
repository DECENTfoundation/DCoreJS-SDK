import { Error } from "./ErrorResponse";

export interface WsResult {
    id: number;
    result?: object;
    error?: Error;
}
