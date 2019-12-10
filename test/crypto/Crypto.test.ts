import * as chai from "chai";
import * as chaiThings from "chai-things";
import { deserialize } from "class-transformer";
import * as Long from "long";
import "mocha";
import * as moment from "moment";
import "reflect-metadata";
import { Address } from "../../src/crypto/Address";
import { ECKeyPair } from "../../src/crypto/ECKeyPair";
import { ElGamal } from "../../src/crypto/ElGamal";
import { Passphrase } from "../../src/crypto/Passphrase";
import { DCoreConstants } from "../../src/DCoreConstants";
import { DynamicGlobalProperties } from "../../src/models/DynamicGlobalProperties";
import { Memo } from "../../src/models/Memo";
import { TransferOperation } from "../../src/models/operation/TransferOperation";
import { Transaction } from "../../src/models/Transaction";
import { Helpers } from "../Helpers";

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

    it("should make canonical signature", () => {
        // tslint:disable-next-line:max-line-length
        const rawProps = '{"id":"2.1.0","head_block_number":1454654,"head_block_id":"0016323e2ef4e417c019adaef6ef45f910a3dd81","time":"2018-07-31T10:16:15","current_miner":"1.4.9","next_maintenance_time":"2018-08-01T00:00","last_budget_time":"2018-07-31T00:00","unspent_fee_budget":25299491,"mined_rewards":224368000000,"miner_budget_from_fees":38973811,"miner_budget_from_rewards":639249000000,"accounts_registered_this_interval":0,"recently_missed_count":6,"current_aslot":6842787,"recent_slots_filled":"255180578269179676182402108458748313515","dynamic_flags":0,"last_irreversible_block_num":1454654}';
        // tslint:disable-next-line:max-line-length
        const rawOp = '{"from":"1.2.34","to":"1.2.35","amount":{"amount":1500000,"asset_id":"1.3.0"},"memo":{"from":"DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz","to":"DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP","message":"4bc2a1ee670302ceddb897c2d351fa0496ff089c934e35e030f8ae4f3f9397a7","nonce":735604672334802432},"fee":{"amount":500000,"asset_id":"1.3.0"}}';
        const props = deserialize(DynamicGlobalProperties, rawProps);
        const op = deserialize(TransferOperation, rawOp);
        op.extensions = [];
        const trx = Transaction.create([op], Helpers.DCT_CHAIN_ID_STAGE, props, DCoreConstants.EXPIRATION_DEFAULT);
        trx.expiration = moment.utc("2018-08-01T10:14:36");

        trx.withSignature(Helpers.KEY).signatures!.should.all.be.equal(
            "1f6ae2fb1377a7b5f3260ecb6133cf08c7c714e8df53e8912a5cb63da182e2e3a24f728eada828a1d369aa1d2ba474e11f0c99a20a6c2a548b8f7310cb6d6990bd");
        trx.withSignature([Helpers.KEY, key]).signatures!.should.all.be.oneOf([
            "1f0299575183ce2c5cdf6b4ab06fe2a8d2863ed6870335a346b44dcca24a8685e336ce9f16a1a18283ea5bdcdec0704179bf6e366074f1c21df31ddb3dca437c69",
            "2043a819a4b8f1efd0720fe345ef31a1df1d1fa33a8bae52d5c3f3e54c4e3efcf91ed898d5fc9ecf83b41afba986477c62da2fc7d7dfbb7c7fd4c2624e0a4b5421",
        ]);
    });
});
