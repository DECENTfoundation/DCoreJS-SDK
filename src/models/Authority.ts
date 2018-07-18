import { Expose, Transform, Type } from "class-transformer";
import { AuthorityMap } from "./AuthorityMap";

export class Authority {

    @Expose({ name: "weight_threshold" })
    public weightThreshold: number;

    @Expose({ name: "account_auths" })
    public accountAuths: any[];

    @Type(() => AuthorityMap)
    @Transform((values: Array<[string, number]>) => values.map(([value, weight]) => new AuthorityMap(value, weight)), { toClassOnly: true })
    @Transform((values: AuthorityMap[]) => values.map((value) => [value.value, value.weight]), { toPlainOnly: true })
    @Expose({ name: "key_auths" })
    public keyAuths: AuthorityMap[];
}
