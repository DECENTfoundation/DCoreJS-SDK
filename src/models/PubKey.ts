import { Exclude, Expose } from "class-transformer";

export class PubKey {
    @Expose({ name: "s" })
    @Exclude()
    public key: string;

    constructor(key: string) {
        this.key = key.endsWith(".") ? key : key.concat(".");
    }
}
