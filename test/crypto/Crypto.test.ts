import * as chai from "chai";
import * as Long from "long";
import "mocha";
import { suite, test } from "mocha-typescript";
import "reflect-metadata";
import { Address } from "../../src/crypto/Address";
import { ECKeyPair } from "../../src/crypto/ECKeyPair";
import { Passphrase } from "../../src/crypto/Passphrase";
import { Memo } from "../../src/models/Memo";
import { Constants } from "../Constants";

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

        const ss = Constants.KEY.secret(address, nonce).toString("hex");

        ss.should.be.equal(expected);
    }

    @test
    public "should encrypt and decrypt memo"() {
        const expected = "b23f6afb8eb463704d3d752b1fd8fb804c0ce32ba8d18eeffc20a2312e7c60fa";
        const plain = "hello memo here i am";
        const address = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");
        const nonce = Long.fromString("10872523688190906880", true);
        const memo = Memo.createEncrypted(plain, Constants.KEY, address, nonce);

        memo.message.should.be.equal(expected);
        memo.decrypt(Constants.KEY).should.be.equal(plain);
    }
    @test
    public "should decrypt public memo"() {
        const plain = "hello memo here i am";
        const memo = Memo.createPublic(plain);

        memo.decrypt(Constants.KEY).should.be.equal(plain);
    }
}
