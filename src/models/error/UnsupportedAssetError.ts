/**
 * Unsupported asset error
 */
export class UnsupportedAssetError extends Error {
    constructor(description: string) {
        super("unsupported asset: " + description);
        Object.setPrototypeOf(this, UnsupportedAssetError.prototype);
    }
}
