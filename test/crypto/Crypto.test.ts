import * as chai from "chai";
import * as Long from "long";
import "mocha";
import { suite, test } from "mocha-typescript";
import "reflect-metadata";
import { Address } from "../../src/crypto/Address";
import { ECKeyPair } from "../../src/crypto/ECKeyPair";
import { ElGamal } from "../../src/crypto/ElGamal";
import { Passphrase } from "../../src/crypto/Passphrase";
import { Memo } from "../../src/models/Memo";
import { Helpers } from "../Helpers";

chai.should();

@suite("crypto tests")
// @ts-ignore
class CryptoTest {

    @test
    public "should generate credentials"() {
        const phrase = Passphrase.generate();
        chai.expect(phrase.words).to.have.lengthOf(16);
    }

    @test
    public "should parse private key in wif format and generate valid public address"() {
        const priv = "5JVHeRffGsKGyDf7T9i9dBbzVHQrYprYeaBQo2VCSytj7BxpMCq";
        const pub = "DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP";

        const keyPair = ECKeyPair.parseWif(priv);
        const address = new Address(keyPair.publicKey);

        address.encoded.should.be.equal(pub);
    }

    @test
    public "should parse address"() {
        const address = Address.parse("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz");

        address.encoded.should.be.equal("DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz");
    }

    @test
    public "should create shared secret"() {
        const expected = "b96c3a08a0daceedf59da2368258790e79f8434b64dce3fc970284144b42634fa6755db65e206aac53bb7a6fad3854abb0f04a04bdf37d1af70f4408ec44ae8a";
        const nonce = Long.fromString("10872523688190906880", true);
        const address = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");

        const ss = Helpers.KEY.secret(address, nonce).toString("hex");

        ss.should.be.equal(expected);
    }

    @test
    public "should encrypt and decrypt memo"() {
        const expected = "b23f6afb8eb463704d3d752b1fd8fb804c0ce32ba8d18eeffc20a2312e7c60fa";
        const plain = "hello memo here i am";
        const address = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");
        const nonce = Long.fromString("10872523688190906880", true);
        const memo = Memo.createEncrypted(plain, Helpers.KEY, address, nonce);

        memo.message.should.be.equal(expected);
        memo.decrypt(Helpers.KEY).should.be.equal(plain);
    }

    @test
    public "should decrypt public memo"() {
        const plain = "hello memo here i am";
        const memo = Memo.createPublic(plain);

        memo.decrypt(Helpers.KEY).should.be.equal(plain);
    }

    @test
    public "should generate public el gamal"() {
        const priv = "8149734503494312909116126763927194608124629667940168421251424974828815164868905638030541425377704620941193711130535974967507480114755414928915429397074890";
        const pub = "5182545488318095000498180568539728214545472470974958338942426759510121851708530625921436777555517288139787965253547588340803542762268721656138876002028437";

        ElGamal.createPrivate(Helpers.KEY).toString().should.be.equal(priv);
        ElGamal.createPublic(Helpers.KEY).toString().should.be.equal(pub);
    }
}
