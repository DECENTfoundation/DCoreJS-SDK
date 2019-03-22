import { plainToClass } from "class-transformer";
import { Account } from "../../../models/Account";
import { ChainObject } from "../../../models/ChainObject";
import { FullAccount } from "../../../models/FullAccount";
import { ObjectType } from "../../../models/ObjectType";
import { assertThrow } from "../../../utils/Utils";
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

        assertThrow(nameOrId.every((id) =>
            (ChainObject.isValid(id) && ChainObject.parse(id).objectType === ObjectType.Account) || Account.isValidName(id)),
            () => "not a valid account object id or name");
    }
}
