import { Expose } from "class-transformer";

export class CustodyData {
    @Expose({ name: "n" })
    public n: number;

    @Expose({ name: "u_seed" })
    public seed: string; // 16 int8

    @Expose({ name: "pubKey" })
    public pubKey: string; // 33 uint8
}
