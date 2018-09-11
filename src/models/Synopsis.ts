import { Expose, Transform } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class Synopsis {
    @Expose({ name: "title" })
    public title: string;

    @Expose({ name: "description" })
    public description: string;

    @Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })
    @Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })
    @Expose({ name: "content_type_id" })
    public type: ChainObject;

    constructor(title: string, description: string, type: ChainObject = ChainObject.parse("1.5.5")) {
        this.title = title;
        this.description = description;
        this.type = type;
    }
}
