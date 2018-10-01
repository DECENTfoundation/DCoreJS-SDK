import * as _ from "lodash";
import { Duration, Moment } from "moment";
import { DynamicGlobalProperties } from "./DynamicGlobalProperties";

export class BlockData {

    public refBlockNum: number;
    public refBlockPrefix: number;
    public expiration: Moment;

    constructor(props: DynamicGlobalProperties, transactionExpiration: Duration) {
        // tslint:disable-next-line:no-bitwise
        this.refBlockNum = (props.headBlockNumber & 0xFFFF);
        this.refBlockPrefix = _.parseInt(props.headBlockId.substring(8, 16).match(/.{1,2}/g).reverse().join(""), 16);
        this.expiration = props.time.add(transactionExpiration);
    }
}
