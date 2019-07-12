import * as chai from "chai";
import * as chaiThings from "chai-things";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { ChainObject } from "../../src/models/ChainObject";
import { Seeder } from "../../src/models/Seeder";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

Helpers.APIS.forEach(([name, sdk]) => {
    const api = sdk.seedersApi;

    // todo
    describe.skip(`seeders API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            // spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        it("should return seeder by id", (done: (arg?: any) => void) => {
            api.get(ChainObject.parse("1.2.17"))
                .subscribe((value) => value.should.be.instanceOf(Seeder), (error) => done(error), () => done());
        });

        it("should list seeders by price", (done: (arg?: any) => void) => {
            api.listByPrice()
                .subscribe((value) => value.should.all.be.instanceOf(Seeder), (error) => done(error), () => done());
        });

        it("should list seeders by upload", (done: (arg?: any) => void) => {
            api.listByUpload()
                .subscribe((value) => value.should.all.be.instanceOf(Seeder), (error) => done(error), () => done());
        });

        it("should list seeders by region", (done: (arg?: any) => void) => {
            api.listByRegion()
                .subscribe((value) => value.should.all.be.instanceOf(Seeder), (error) => done(error), () => done());
        });

        it("should list seeders by rating", (done: (arg?: any) => void) => {
            api.listByRating()
                .subscribe((value) => value.should.all.be.instanceOf(Seeder), (error) => done(error), () => done());
        });
    });
});
