import { Address } from "../crypto/Address";
export declare class Memo {
    static create(message: string): Memo;
    from?: Address;
    to?: Address;
    message: string;
    nonce: number;
    private constructor();
}
