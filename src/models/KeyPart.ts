import { Expose, Type } from "class-transformer";
import { PubKey } from "./PubKey";

export class KeyPart {

    @Type(() => PubKey)
    @Expose({ name: "C1" })
    public keyC1: PubKey;

    @Type(() => PubKey)
    @Expose({ name: "D1" })
    public keyD1: PubKey;
}
