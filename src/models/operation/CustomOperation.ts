import { Expose } from "class-transformer";
import { ChainObjectArrayToClass, ChainObjectArrayToPlain, ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { BaseOperation } from "./BaseOperation";
import { CustomOperationType } from "./CustomOperationType";
import { OperationType } from "./OperationType";

export class CustomOperation extends BaseOperation {

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "payer" })
    public payer: ChainObject;

    @ChainObjectArrayToClass
    @ChainObjectArrayToPlain
    @Expose({ name: "required_auths" })
    public requiredAuths: ChainObject[];

    @Expose({ name: "data" })
    public data: string;

    @Expose({ name: "id" })
    public id: number;

    /**
     * Custom operation
     *
     * @param type custom operation subtype
     * @param payer account which pays for the fee
     * @param requiredAuths accounts required to authorize this operation with signatures
     * @param data data payload encoded in hex string
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(type: CustomOperationType, payer: ChainObject, requiredAuths: ChainObject[], data: string, fee?: AssetAmount | ChainObject) {
        super(OperationType.Custom);
        this.payer = payer;
        this.requiredAuths = requiredAuths;
        this.data = data;
        this.id = type;
        if (fee instanceof AssetAmount) {
            this.fee = fee;
        } else {
            this.feeAssetId = fee;
        }
    }
}
