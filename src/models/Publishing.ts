import { Expose } from "class-transformer";

export class Publishing {
    @Expose({ name: "is_publishing_manager" })
    public isPublishingManager: boolean;

    @Expose({ name: "publishing_rights_received" })
    public publishRightsReceived: any[];

    @Expose({ name: "publishing_rights_forwarded" })
    public publishRightsForwarded: any[];
}
