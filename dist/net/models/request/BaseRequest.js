"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRequest {
    constructor(returnClass) {
        this.returnClass = returnClass;
        this.params = [];
        this.jsonrpc = "2.0";
        this.id = 1;
    }
}
exports.BaseRequest = BaseRequest;
//# sourceMappingURL=BaseRequest.js.map