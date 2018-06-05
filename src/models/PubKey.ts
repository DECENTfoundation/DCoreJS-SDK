import { Exclude, Expose } from "class-transformer";
import _ = require("lodash");

export class PubKey {
    @Exclude()
    public key: number;

    // @Expose({name : "s", toPlainOnly : true})
    @Expose({ name: "s" })
    get adapter(): string {
        return this.key + ".";
    }

    set adapter(value: string) {
        this.key = _.parseInt(value.replace(".", ""));
    }
}
