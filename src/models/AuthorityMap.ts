import { Expose } from "class-transformer";

export class AuthorityMap {
    constructor(
        // @Expose({ name: "value" })
        public value: string,

        // @Expose({ name: "weight" })
        public weight: number,
    ) {}
}
