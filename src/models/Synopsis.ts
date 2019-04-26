import { Expose } from "class-transformer";
import { ApplicationType, CategoryType, contentType } from "./ContentTypes";

export class Synopsis {
    @Expose({ name: "title" })
    public title: string;

    @Expose({ name: "description" })
    public description: string;

    @Expose({ name: "content_type_id" })
    public type: string;

    /**
     * Searchable content metadata
     *
     * @param title
     * @param description
     * @param type the application and content type to be filtered, use {@link contentType} method
     */
    constructor(title: string, description: string, type: string = contentType(ApplicationType.DecentCore, CategoryType.None)) {
        this.title = title;
        this.description = description;
        this.type = type;
    }
}
