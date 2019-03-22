import * as chai from "chai";
import * as chaiThings from "chai-things";
import { classToPlain, plainToClass } from "class-transformer";
import * as _ from "lodash";
import * as Long from "long";
import { suite, test } from "mocha-typescript";
import { Moment } from "moment";
import "reflect-metadata";
import { ChainObject } from "../../../src/models/ChainObject";
import { ChainObjectToClass, ChainObjectToPlain, LongToClass, LongToPlain, MomentToClass, MomentToPlain } from "../../../src/utils/TypeAdapters";

chai.should();
chai.use(chaiThings);

/* tslint:disable */
@suite("JSON type adapters test suite")
// @ts-ignore
class TypeAdaptersTest {

    @test
    public "chain object type adapter test"() {
        class TestClass {
            @ChainObjectToClass
            @ChainObjectToPlain
            public value: ChainObject;
        }

        const ok = [
            { value: "1.2.3" },
            { value: "1.2." + Number.MAX_SAFE_INTEGER.toString() },
            { value: "1.2." + Long.MAX_UNSIGNED_VALUE.toString() },
        ];
        let underTest = ok.map((plain) => classToPlain(plainToClass(TestClass, plain)));
        JSON.stringify(underTest).should.equal(JSON.stringify(ok));

        const fail = [
            { value: "1.2" },
            { value: "100.2.1" },
            { value: "1.200.1" },
            { value: "1.2." + Long.MAX_UNSIGNED_VALUE.toString() + "1" },
            { value: "1.2.3.4" },
        ];
        let undef = fail.map((plain) => {
                try {
                    classToPlain(plainToClass(TestClass, plain));
                } catch (e) {
                    return undefined;
                }
            }
        );
        undef.every((v) => v === undefined).should.be.true;
    }

    @test
    public "long type adapter test"() {
        class TestClass {
            @LongToPlain
            @LongToClass
            public value: Long;
        }

        const strings = [
            { value: Long.MAX_UNSIGNED_VALUE.toString() },
            { value: Number.MAX_SAFE_INTEGER.toString() },
            { value: "0" },
        ];

        let underTest = strings.map((plain) => classToPlain(plainToClass(TestClass, plain)));
        JSON.stringify(underTest).should.equal(JSON.stringify(strings));

        const numbers = [
            { value: Number.MAX_SAFE_INTEGER },
            { value: 0 },
        ];

        underTest = numbers.map((plain) => classToPlain(plainToClass(TestClass, plain)));
        // to plain always writes number as string
        JSON.stringify(underTest).should.equal(JSON.stringify(numbers.map((p) => {
            return { value: p.value.toString() };
        })));

        const outOfRange = [
            { value: Number.MAX_VALUE },
            { value: Number.MAX_VALUE.toString() },
            { value: Long.MAX_UNSIGNED_VALUE.toNumber() },
            { value: Long.MAX_UNSIGNED_VALUE.toString() + Long.MAX_UNSIGNED_VALUE.toString() },
            { value: -10 },
        ];

        underTest = outOfRange.map((plain) => classToPlain(plainToClass(TestClass, plain)));
        _.intersection(underTest.map((v) => JSON.stringify(v)), outOfRange.map((v) => {
            return JSON.stringify({ value: v.value.toString });
        })).length.should.equal(0);
    }

    @test
    public "moment type adapter test"() {
        class TestClass {
            @MomentToPlain
            @MomentToClass
            public value: Moment;
        }

        const expected = { value: "2018-10-13T12:37:19" };

        const underTest = classToPlain(plainToClass(TestClass, expected));

        _.get(underTest, "value").should.equal(expected.value);
    }
}
