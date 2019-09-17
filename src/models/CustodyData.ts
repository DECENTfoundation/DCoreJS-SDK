import { Expose } from "class-transformer";

export class CustodyData {
    // UInt32
    @Expose({ name: "n" })
    public n: number;

    @Expose({ name: "u_seed" })
    public seed: string; // 16 int8, 32 hex

    @Expose({ name: "pubKey" })
    public pubKey: string; // 33 uint8, 66 hex
}
