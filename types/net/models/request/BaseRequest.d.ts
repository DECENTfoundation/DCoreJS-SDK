import { ApiGroup } from "../ApiGroup";
export declare abstract class BaseRequest<T> {
    apiGroup: ApiGroup;
    transformer: (value: any) => T;
    method: string;
    params: any[];
    jsonrpc: string;
    id: number;
    protected constructor(apiGroup: ApiGroup, method: string, params: any[], transformer?: (value: any) => T);
    description(): string;
}
