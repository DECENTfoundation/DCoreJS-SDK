import { ChainObject } from "../models/ChainObject";
import { ECKeyPair } from "./ECKeyPair";

export class Credentials {
    public readonly account: ChainObject;
    public readonly keyPair: ECKeyPair;

    constructor(account: ChainObject, privateKey: string | ECKeyPair) {
        this.account = account;
        if (typeof privateKey === "string") {
            this.keyPair = ECKeyPair.parseWif(privateKey);
        } else {
            this.keyPair = privateKey;
        }
    }
}
