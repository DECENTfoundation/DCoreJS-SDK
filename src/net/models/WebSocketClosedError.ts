/**
 * Object not found error
 */
export class WebSocketClosedError extends Error {
    constructor() {
        super("web socket has closed");
        Object.setPrototypeOf(this, WebSocketClosedError.prototype);
    }
}
