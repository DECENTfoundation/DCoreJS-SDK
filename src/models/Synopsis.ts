import { Expose, Type } from "class-transformer";
import { ChainObject } from "./ChainObject";

export class Synopsis {
    @Expose({ name: "title" })
    public title: string;

    @Expose({ name: "description" })
    public description: string;

    @Type(() => ChainObject)
    @Expose({ name: "content_type_id" })
    public type: ChainObject;

    @Expose({ name: "file_name" })
    public fileName?: string;

    @Expose({ name: "sampleURL" })
    public sampleUrl?: string;

    @Expose({ name: "fileFormat" })
    public fileFormat?: string;

}
