import { Moment } from "moment";
import { DynamicGlobalProperties } from "./DynamicGlobalProperties";
export declare class BlockData {
    refBlockNum: number;
    refBlockPrefix: number;
    expiration: Moment;
    constructor(props: DynamicGlobalProperties);
}
