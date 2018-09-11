import { Expose } from "class-transformer";

export class CustodyData {
    @Expose({ name: "n" })
    public n: number;

    @Expose({ name: "u_seed" })
    public seed: number[]; // 16 int8

    @Expose({ name: "pubKey" })
    public pubKey: number[]; // 33 uint8
}
