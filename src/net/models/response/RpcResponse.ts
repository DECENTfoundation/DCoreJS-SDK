import { Error } from "./ErrorResponse";

export class RpcResponse {
    public id: number;
    public result?: object;
    public error?: Error;
}
