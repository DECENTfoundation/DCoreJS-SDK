import { ModifiableBy, NftDefinition, NftModel, Unique } from "../../src/models/NftModel";
import { NftModifiableBy } from "../../src/models/NftModifiableBy";

@NftModel
export class NftApple extends NftDefinition {
    public readonly size: number;
    @Unique public readonly color: string;
    @ModifiableBy(NftModifiableBy.Both) public eaten: boolean;

    constructor(size: number, color: string, eaten: boolean) {
        super();
        this.size = size;
        this.color = color;
        this.eaten = eaten;
    }
}
