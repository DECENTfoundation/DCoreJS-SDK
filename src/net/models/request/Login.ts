import { ApiGroup } from "../ApiGroup";
import { BaseRequest } from "./BaseRequest";

export class Login extends BaseRequest<boolean> {
    constructor(
        username: string = "",
        password: string = "",
    ) {
        super(
            ApiGroup.Login,
            "login",
            [username, password],
        );
    }
}
