import * as Long from "long";
import { Duration, Moment } from "moment";
import { DynamicGlobalProperties } from "./DynamicGlobalProperties";

export class BlockData {

    public refBlockNum: number;
    public refBlockPrefix: Long;
    public expiration: Moment;

    constructor(props: DynamicGlobalProperties, transactionExpiration: Duration) {
        // tslint:disable-next-line:no-bitwise
        this.refBlockNum = props.headBlockNumber.getLowBitsUnsigned() & 0xFFFF;
        this.refBlockPrefix = Long.fromString(props.headBlockId.substring(8, 16).match(/.{1,2}/g)!.reverse().join(""), true, 16);
        this.expiration = props.time.add(transactionExpiration);
    }
}
