/// <reference types="node" />
export declare class ECKeyPair {
    static parseWif(base58: string): ECKeyPair;
    private static VERSION;
    private static COMPRESSED;
    private static COMPACT;
    readonly privateKey: Buffer;
    readonly publicKey: Buffer;
    /**
     * the public key is always in a compressed format in DCore
     */
    private constructor();
    sign(data: Buffer): string | undefined;
}
