import { Expose } from "class-transformer";
import { ChainObjectArrayToClass, ChainObjectArrayToPlain, ChainObjectToClass, ChainObjectToPlain } from "../../utils/TypeAdapters";
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
     * @param fee {@link AssetAmount} fee for the operation, if left undefined the fee will be computed in DCT asset
     */
    constructor(type: CustomOperationType, payer: ChainObject, requiredAuths: ChainObject[], data: string, fee?: AssetAmount) {
        super(OperationType.Custom);
        this.payer = payer;
        this.requiredAuths = requiredAuths;
        this.data = data;
        this.id = type;
        this.fee = fee;
    }
}
