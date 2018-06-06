import { ApiGroup } from "../ApiGroup";

export abstract class BaseRequest<T> {
    public apiGroup: ApiGroup;
    public method: string;
    public params: any[] = [];
    public jsonrpc: string = "2.0";
    public id: number = 1;

    constructor(
        public returnClass?: T,
    ) {
    }
}
