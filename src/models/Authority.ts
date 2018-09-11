import { Expose, Transform, Type } from "class-transformer";
import { Address } from "../crypto/Address";
import { AuthorityMap } from "./AuthorityMap";

export class Authority {

    @Expose({ name: "weight_threshold" })
    public weightThreshold: number;

    @Expose({ name: "account_auths" })
    public accountAuths: any[];

    @Type(() => AuthorityMap)
    @Transform((values: Array<[string, number]>) => values.map(([value, weight]) => new AuthorityMap(Address.parse(value), weight)), { toClassOnly: true })
    @Transform((values: object[], obj: Authority) => obj.keyAuths.map((value) => [value.value.encoded, value.weight]), { toPlainOnly: true })
    @Expose({ name: "key_auths" })
    public keyAuths: AuthorityMap[];

    constructor(publicKey: Address) {
        this.weightThreshold = 1;
        this.accountAuths = [];
        this.keyAuths = [new AuthorityMap(publicKey, 1)];
    }
}
