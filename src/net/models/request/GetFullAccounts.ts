import { plainToClass } from "class-transformer";
import { FullAccount } from "../../../models/FullAccount";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetFullAccounts extends BaseRequest<Map<string, FullAccount>> {
    constructor(
        nameOrId: string[],
        subscribe: boolean,
    ) {
        super(
            ApiGroup.Database,
            "get_full_accounts",
            [nameOrId, subscribe],
            (value: Array<[string, object]>) =>
                new Map(value.map(([name, obj]) => [name, plainToClass(FullAccount, obj)] as [string, FullAccount])),
        );
    }
}
