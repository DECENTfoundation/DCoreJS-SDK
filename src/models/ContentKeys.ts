import { Expose, Type } from "class-transformer";
import { KeyPart } from "./KeyPart";

export class ContentKeys {
    @Expose({ name: "key" })
    public key: string;

    @Type(() => KeyPart)
    @Expose({ name: "parts" })
    public keyParts: KeyPart[];
}
