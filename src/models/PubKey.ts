import { Exclude, Expose } from "class-transformer";

export class PubKey {
    @Expose({ name: "s" })
    @Exclude()
    public key: string;

/*
    get adapter(): string {
        return this.key + ".";
    }

    set adapter(value: string) {
        this.key = _.parseInt(value.replace(".", ""));
    }
*/
}
