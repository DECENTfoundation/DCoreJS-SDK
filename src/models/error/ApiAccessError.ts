import { ApiGroup } from "../../net/models/ApiGroup";

/**
 * Object not found error
 */
export class ApiAccessError extends Error {
    constructor(api: ApiGroup) {
        super(api + " API not supported for HTTP request");
        Object.setPrototypeOf(this, ApiAccessError.prototype);
    }
}
