import { Exclude, Expose } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { ApiGroup } from "../ApiGroup";

export abstract class BaseRequest<T> {
    @Exclude()
    public apiGroup: ApiGroup;

    @Exclude()
    public returnClass?: ClassType<T>;

    @Expose({ name: "method" })
    public method: string;

    @Expose({ name: "params" })
    public params: any[] = [];

    @Expose({ name: "jsonrpc" })
    public jsonrpc: string = "2.0";

    @Expose({ name: "id" })
    public id: number = 1;

    protected constructor(apiGroup: ApiGroup, method: string, params: any[], returnClass?: ClassType<T>) {
        this.apiGroup = apiGroup;
        this.returnClass = returnClass;
        this.method = method;
        this.params = params;
    }

    public description(): string {
        return `method: ${this.method} params: ${this.params}`;
    }
}
