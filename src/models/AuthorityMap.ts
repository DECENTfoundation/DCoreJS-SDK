import { Address } from "../crypto/Address";

export class AuthorityMap {
    constructor(
        // @Expose({ name: "value" })
        public value: Address,

        // @Expose({ name: "weight" })
        public weight: number,
    ) {}
}
