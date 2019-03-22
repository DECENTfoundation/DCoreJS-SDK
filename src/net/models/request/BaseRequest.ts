import { Exclude, Expose, serialize } from "class-transformer";
import { ApiGroup } from "../ApiGroup";
import { RequestJson } from "../RequestJson";

export abstract class BaseRequest<T> {
    @Exclude()
    public apiGroup: ApiGroup;

    @Exclude()
    public transformer: (value: any) => T;

    @Expose({ name: "method" })
    public method: string;

    @Expose({ name: "params" })
    public params: any[] = [];

    @Expose({ name: "jsonrpc" })
    public jsonrpc: string = "2.0";

    @Expose({ name: "id" })
    public id: number = 1;

    protected constructor(apiGroup: ApiGroup, method: string, params: any[], transformer: (value: any) => T = (value) => value as T) {
        this.apiGroup = apiGroup;
        this.transformer = transformer;
        this.method = method;
        this.params = params;
    }

    public description(): string {
        return `method: ${this.method} params: ${this.params}`;
    }

    public json(callId: number = 1, callbackId?: number): string {
        return serialize(new RequestJson(this, callId, callbackId));
    }
}
