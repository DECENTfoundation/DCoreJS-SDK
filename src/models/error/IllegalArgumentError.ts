/**
 * Illegal argument error
 */
export class IllegalArgumentError extends Error {
    constructor(description: string) {
        super("Illegal argument error: " + description);
        Object.setPrototypeOf(this, IllegalArgumentError.prototype);
    }
}
