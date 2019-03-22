/**
 * Object not found error
 */
export class ObjectNotFoundError extends Error {
    constructor(description: string) {
        super("object not found: " + description);
        Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
    }
}
