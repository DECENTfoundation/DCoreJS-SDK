import * as bigInt from "big-integer";
import { BigInteger } from "big-integer";
import { Utils } from "../utils/Utils";
import { ECKeyPair } from "./ECKeyPair";

export class ElGamal {
    public static createPrivate(keyPair: ECKeyPair): BigInteger {
        const hash = Utils.hash512(keyPair.privateKey).toString("hex");
        return bigInt(hash, bigInt["16"]);
    }

    public static createPublic(keyPair: ECKeyPair): BigInteger {
        return this.generator.modPow(this.createPrivate(keyPair), this.modulus);
    }

    private static generator: BigInteger = bigInt["3"];
    private static modulus: BigInteger = bigInt(
        "11760620558671662461946567396662025495126946227619472274601251081547302009186313201119191293557856181195016058359990840577430081932807832465057884143546419",
    );
}
