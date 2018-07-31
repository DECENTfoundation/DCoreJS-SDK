import { getCurveByName, Point } from "ecurve";

export class ECKeyPair {
    public static decodePublicKey(bytes: Buffer) {
        return Point.decodeFrom(this.secp256k1, bytes);
    }

    private static secp256k1 = getCurveByName("secp256k1");

}
