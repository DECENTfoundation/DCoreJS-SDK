import { Expose } from "class-transformer";
import { ChainObjectToClass, ChainObjectToPlain } from "../utils/TypeAdapters";
import { ChainObject } from "./ChainObject";

export class Synopsis {
    @Expose({ name: "title" })
    public title: string;

    @Expose({ name: "description" })
    public description: string;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "content_type_id" })
    public type: ChainObject;

    constructor(title: string, description: string, type: ChainObject = ChainObject.parse("1.5.5")) {
        this.title = title;
        this.description = description;
        this.type = type;
    }
}
