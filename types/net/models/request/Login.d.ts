import { BaseRequest } from "./BaseRequest";
export declare class Login extends BaseRequest<boolean> {
    constructor(username?: string, password?: string);
}
