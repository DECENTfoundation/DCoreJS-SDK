import { Expose, Transform } from "class-transformer";
import * as _ from "lodash";
import * as Long from "long";
import { LongToClass } from "../utils/TypeAdapters";
import { AssetAmount } from "./AssetAmount";
import { FeeParameter } from "./FeeParameter";
import { OperationType } from "./operation/OperationType";

interface FeeParam {
    fee?: number | string;
    basic_fee?: number | string;
    price_per_kb?: number | string;
}

export class FeeSchedule {

    @Transform((values: Array<[number, FeeParam]>) => new Map(values.map(([type, fee]) =>
        [type, new FeeParameter(
            new AssetAmount(fee.fee || fee.basic_fee),
            _.isNil(fee.price_per_kb) ? fee.price_per_kb : new AssetAmount(fee.price_per_kb),
        )] as [OperationType, FeeParameter])), { toClassOnly: true })
    @Expose({ name: "parameters" })
    public parameters: Map<OperationType, FeeParameter>;

    @LongToClass
    @Expose({ name: "scale" })
    public scale: Long;
}
