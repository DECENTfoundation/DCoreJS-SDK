import * as chai from "chai";
import "mocha";
import "reflect-metadata";
import { Address } from "../../src/crypto/Address";
import { ECKeyPair } from "../../src/crypto/ECKeyPair";

chai.should();

describe("crypto tests", () => {

    it("should parse private key in wif format and generate valid public address", () => {
        const priv = "5JVHeRffGsKGyDf7T9i9dBbzVHQrYprYeaBQo2VCSytj7BxpMCq";
        const pub = "DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP";

        const keyPair = ECKeyPair.parseWif(priv);
        const address = new Address(keyPair.publicKey);

        address.encoded.should.be.equal(pub);
    });

    it("should parse address", () => {
        const address = Address.parse("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz");

        address.encoded.should.be.equal("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz");
    });

});