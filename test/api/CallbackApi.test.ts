import * as chai from "chai";
import * as chaiThings from "chai-things";
import "mocha";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { Spy } from "rxjs-spy/spy-interface";
import { Helpers } from "../Helpers";

chai.should();
chai.use(chaiThings);

Helpers.APIS.forEach(([name, sdk]) => {
    // const api = sdk.callbackApi;

    describe(`callback API test suite for ${name}`, () => {
        after(() => {
            // wtf.dump();
        });

        let spy: Spy;

        before(() => {
            spy = create();
            // this.spy.log(/^API\w+/);
        });

        after(() => {
            sdk.disconnect();
            spy.teardown();
        });

        /*
                it("should return accounts by lookup term", (done: (arg?: any) => void) => {
                    api.accountApi.getAllByNames(["decent"])
                        .subscribe((value) => value.should.all.be.instanceOf(Account), (error) => done(error), () => done());
                });
        */
    });
});
