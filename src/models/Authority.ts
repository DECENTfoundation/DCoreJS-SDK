
import { Expose } from "class-transformer";

import { AuthorityMap } from "./AuthorityMap";

export class Authority {

    @Expose({ name: "weight_threshold" })
    public weightThreshold: number;

    @Expose({ name: "account_auths" })
    public accountAuths: AuthorityMap[];

    @Expose({ name: "key_auths" })
    public keyAuths: AuthorityMap[];
}
