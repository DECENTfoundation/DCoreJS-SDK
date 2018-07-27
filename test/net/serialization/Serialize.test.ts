import * as chai from "chai";
import "mocha";
import "reflect-metadata";
import { AssetAmount } from "../../../src/models/AssetAmount";
import { ChainObject } from "../../../src/models/ChainObject";
import { Memo } from "../../../src/models/Memo";
import { TransferOperation } from "../../../src/models/operation/TransferOperation";
import { Serializer } from "../../../src/net/serialization/Serializer";

chai.should();

describe("serialization test suite", () => {
    const serializer: Serializer = new Serializer();

    it("should serialize transfer operation", () => {
        const expected = "278813000000000000001e1f00000000000201809698000000000000010000000000000000000000000000000000000000000000000000000" +
            "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000068656c6c6f206d656d6f00";

        const op = new TransferOperation(
            ChainObject.parse("1.2.30"),
            ChainObject.parse("1.2.31"),
            new AssetAmount(10000000),
            new Memo("hello memo"),
            new AssetAmount(5000),
        );
        serializer.serialize(op).toHex().should.be.equal(expected);

    });
});
