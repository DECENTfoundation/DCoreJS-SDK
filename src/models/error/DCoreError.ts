import { ErrorResponse } from "../../net/models/response/ErrorResponse";

/**
 * Object not found error
 */
export class DCoreError extends Error {
    constructor(error: ErrorResponse) {
        super(error.message);
        Object.setPrototypeOf(this, DCoreError.prototype);
    }
}
