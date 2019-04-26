import { Utils } from "../utils/Utils";

export class Wif {

    private static encode(privateKey: Buffer, version: number): string {
        const key = Buffer.concat([Buffer.from([version]), privateKey]);
        const cks = Utils.hashTwice256(key).slice(0, 4);

        return Utils.Base58.encode(Buffer.concat([key, cks]));
    }

    public readonly encoded: string;

    public constructor(public readonly privateKey: Buffer, version: number) {
        this.encoded = Wif.encode(privateKey, version);
    }
}
