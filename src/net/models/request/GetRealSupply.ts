import { RealSupply } from "../../../models/RealSupply";
import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class GetRealSupply extends BaseRequest<RealSupply> {
    constructor() {
        super(
            ApiGroup.Database,
            "get_real_supply",
            [],
        );
    }
}
