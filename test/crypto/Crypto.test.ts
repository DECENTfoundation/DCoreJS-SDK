import * as chai from "chai";
import * as chaiThings from "chai-things";
import * as Long from "long";
import "mocha";
import "reflect-metadata";
import { Address } from "../../src/crypto/Address";
import { ECKeyPair } from "../../src/crypto/ECKeyPair";
import { ElGamal } from "../../src/crypto/ElGamal";
import { Passphrase } from "../../src/crypto/Passphrase";
import { Memo } from "../../src/models/Memo";

chai.should();
chai.use(chaiThings);

describe("crypto tests", () => {
    const key = ECKeyPair.parseWif("5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn");

    it("should generate credentials", () => {
        const phrase = Passphrase.generate();
        chai.expect(phrase.words).to.have.lengthOf(16);
    });

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

    it("should create shared secret", () => {
        const expected = "b96c3a08a0daceedf59da2368258790e79f8434b64dce3fc970284144b42634fa6755db65e206aac53bb7a6fad3854abb0f04a04bdf37d1af70f4408ec44ae8a";
        const nonce = Long.fromString("10872523688190906880", true);
        const address = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");

        const ss = key.secret(address, nonce).toString("hex");

        ss.should.be.equal(expected);
    });

    it("should encrypt and decrypt memo", () => {
        const expected = "b23f6afb8eb463704d3d752b1fd8fb804c0ce32ba8d18eeffc20a2312e7c60fa";
        const plain = "hello memo here i am";
        const address = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");
        const nonce = Long.fromString("10872523688190906880", true);
        const memo = Memo.createEncrypted(plain, key, address, nonce);

        memo.message.should.be.equal(expected);
        memo.decrypt(key).should.be.equal(plain);
    });

    it("should decrypt public memo", () => {
        const plain = "hello memo here i am";
        const memo = Memo.createPublic(plain);

        memo.decrypt(key).should.be.equal(plain);
    });

    it("should generate public el gamal", () => {
        const priv = "8149734503494312909116126763927194608124629667940168421251424974828815164868905638030541425377704620941193711130535974967507480114755414928915429397074890";
        const pub = "5182545488318095000498180568539728214545472470974958338942426759510121851708530625921436777555517288139787965253547588340803542762268721656138876002028437";

        ElGamal.createPrivate(key).toString().should.be.equal(priv);
        ElGamal.createPublic(key).toString().should.be.equal(pub);
    });

    it("should check canonical on signature invalid", () => {
        const sig = [
            "20136f5f01fb54076587670737cc350ef8c1d26d80006a62f28ce80b0df58d052b004fce54c9cc40f6191a94c617410434aab4f19ff35d296a47c1ad2ca6099a13",
            "20c8d1f6ef03ec645b9c406431a325741a2247b25862a731993aa5dd3dbac723a66b73d75c5ba313dde012b499a6e1b1b48551e410a4e8758968b7bcdf64bd9a58",
            "1fdbfd66ddf7c6cdd100568c15934e3bfef96022f2d335e161cff7ddeade802b5240c117706d004743296696b58138ef342a2cc2008fd5ff2ee3d76a60d2f09f05",
        ];
        sig.map((s) => ECKeyPair.checkCanonicalSignature(Buffer.from(s, "hex"))).should.all.be.equal(false);
    });

    it("should check canonical on signature valid", () => {
        const sig = [
            "1f595122744cc19263b8e73bc8e1d57a045a01c3b4b04bc08216cd8b9104c81f2b154875b1941cef6e76d1d3d89bcbf906d56d4c581807098663c600ab1b0050ef",
            "1f62ef0c229f0208642735bf85f20f25550e62dcaacba861e55a477587bed6e8f0490884251bf04cfe116aef02dc82771bd65fa48a6bb599bb1c57e86bcfb8756b",
            "202c177696d954a03798d287cc9d4e48a95745d180db012394f39a42a32bf8e2947a434b7c53a619817d3b5c7c3285c6438c26e203ac16c2fd0c3c7de2300cd86c",
        ];
        sig.map((s) => ECKeyPair.checkCanonicalSignature(Buffer.from(s, "hex"))).should.all.be.equal(true);
    });
});
