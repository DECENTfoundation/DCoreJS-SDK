import * as _ from "lodash";

export class BlockData {

    public refBlockNum: number;
    public refBlockPrefix: number;
    public expiration: number;

    constructor(headBlockNumber: number, headBlockId: string, expiration: number) {
        // tslint:disable-next-line:no-bitwise
        this.refBlockNum = (headBlockNumber & 0xFFFF);
        this.refBlockPrefix = _.parseInt(headBlockId.substring(8, 16).match(/.{1,2}/g).reverse().join(""));
        this.expiration = expiration;
    }
}
