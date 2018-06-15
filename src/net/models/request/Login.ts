import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class Login extends BaseRequest<boolean> {
    constructor() {
        super(ApiGroup.Login, "login", ["", ""]);
    }
}
