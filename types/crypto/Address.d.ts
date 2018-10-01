/// <reference types="node" />
export declare class Address {
    static parse(value: string): Address;
    private static PREFIX;
    private static decode;
    private static encode;
    readonly publicKey: Buffer;
    readonly encoded: string;
    constructor(publicKey: Buffer, encoded?: string);
}
