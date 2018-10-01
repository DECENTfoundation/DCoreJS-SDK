import { Address } from "../crypto/Address";
import { AuthorityMap } from "./AuthorityMap";
export declare class Authority {
    weightThreshold: number;
    accountAuths: any[];
    keyAuths: AuthorityMap[];
    constructor(publicKey: Address);
}
