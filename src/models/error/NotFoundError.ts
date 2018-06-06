export class NotFoundError extends Error {
    constructor(description: string) {
        super("object not found: " + description);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
