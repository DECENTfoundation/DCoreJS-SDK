import { ModifiableBy, NftDefinition, NftModel, Unique } from "../../src/models/NftModel";
import { NftModifiableBy } from "../../src/models/NftModifiableBy";

@NftModel
export class NftNotApple extends NftDefinition {
    @ModifiableBy(NftModifiableBy.Both) public eaten: boolean;
    public readonly size: number;
    @Unique public readonly color: string;

    constructor(eaten: boolean, size: number, color: string) {
        super();
        this.eaten = eaten;
        this.size = size;
        this.color = color;
    }
}
