import * as _ from "lodash";
import "reflect-metadata";
import { NftDataType } from "./NftDataType";
import { NFT_FIELD_NAME } from "./NftFieldType";
import { NftModifiableBy } from "./NftModifiableBy";

export abstract class NftDefinition {
    public static DEFINITION: NftDataType[];

    public static createUpdate(definitions: NftDataType[], values: any[]): Map<string, any> {
        return new Map(definitions
            .map((it, idx) => [it, idx] as [NftDataType, number])
            .filter(([it, idx]) => it.modifiable !== NftModifiableBy.Nobody)
            .map(([it, idx]) => [it.name, values[idx]] as [string, any]));
    }

    public definition: NftDataType[];

    public get values(): any[] {
        return _.values(this);
    }

    public get updates(): Map<string, any> {
        return NftDefinition.createUpdate(this.definition, this.values);
    }
}

export function NftModel(target: any): void {
    target.DEFINITION = Reflect.ownKeys(Reflect.construct(target, []))
        .filter((key) => (typeof key === "string" || typeof key === "symbol") && key !== "definition")
        .map((key, idx) => {
            const unique = Reflect.getMetadata("unique", target, key.toString());
            const modifiable = Reflect.getMetadata("modifiable", target, key.toString()) as NftModifiableBy;
            const type = Reflect.getMetadata("design:paramtypes", target)[idx].name;
            return new NftDataType(NFT_FIELD_NAME.get(type), !!unique, modifiable ? modifiable : NftModifiableBy.Nobody, key.toString());
        });
    target.prototype.definition = target.DEFINITION;
}

export function Unique(target: any, propertyKey: string): void {
    Reflect.defineMetadata("unique", true, target.constructor, propertyKey);
}

export function ModifiableBy(by: NftModifiableBy): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        Reflect.defineMetadata("modifiable", by, target.constructor, propertyKey);
    };
}
