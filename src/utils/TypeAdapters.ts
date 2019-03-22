import { Transform } from "class-transformer";
import * as _ from "lodash";
import * as Long from "long";
import * as moment from "moment";
import { Moment } from "moment";
import { Address } from "../crypto/Address";
import { ChainObject } from "../models/ChainObject";

export function ChainObjectToClass(target: any, key: string): void {
    return Transform((value: string) => ChainObject.parse(value), { toClassOnly: true })(target, key);
}

export function ChainObjectToPlain(target: any, key: string): void {
    return Transform((value: ChainObject) => value.objectId, { toPlainOnly: true })(target, key);
}

export function ChainObjectArrayToClass(target: any, key: string): void {
    return Transform((value: string[]) => value.map((id) => ChainObject.parse(id)), { toClassOnly: true })(target, key);
}

export function ChainObjectArrayToPlain(target: any, key: string): void {
    return Transform((value: ChainObject[]) => value.map((id) => id.objectId), { toPlainOnly: true })(target, key);
}

export function LongToClass(target: any, key: string): void {
    return Transform((value: number | string) => Long.fromValue(value).toUnsigned(), { toClassOnly: true })(target, key);
}

export function LongToPlain(target: any, key: string): void {
    return Transform((value: Long) => Long.fromBits(value.low, value.high, value.unsigned).toString(), { toPlainOnly: true })(target, key);
}

export function MomentToClass(target: any, key: string): void {
    return Transform((value: string) => moment.utc(value), { toClassOnly: true })(target, key);
}

export function MomentToPlain(target: any, key: string): void {
    return Transform((value: object, obj) =>
        (_.get(obj, key) as Moment).utc().format(TypeAdapters.TIMESTAMP_FORMAT), { toPlainOnly: true })(target, key);
}

export function AddressToClass(target: any, key: string): void {
    return Transform((value: string) => Address.parse(value), { toClassOnly: true })(target, key);
}

export function AddressToPlain(target: any, key: string): void {
    return Transform((value?: Address) => _.isNil(value) ? value : value.encoded, { toPlainOnly: true })(target, key);
}

export function CoAuthorsToClass(target: any, key: string): void {
    return Transform((value: Array<[string, number]>) => value.map(([id, weight]) => [ChainObject.parse(id), weight]), { toClassOnly: true })(target, key);
}

export function CoAuthorsToPlain(target: any, key: string): void {
    return Transform((value: object, obj) =>
        (_.get(obj, key) as Array<[ChainObject, number]>).map(([id, weight]) => [id.objectId, weight]), { toPlainOnly: true })(target, key);
}

export class TypeAdapters {
    public static TIMESTAMP_FORMAT = "YYYY-MM-DDTHH:mm:ss";
}
