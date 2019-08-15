import { MethodDeclarationStructure, OptionalKind, ParameterDeclarationStructure, StructureKind } from "ts-morph";
import { ApiDescriptor } from "./ApiDescriptor";

export function decapitalize(value: string) {
    const first = value.charAt(0).toLowerCase();
    return first.concat(value.substring(1));
}

export function paramNames(params: Array<OptionalKind<ParameterDeclarationStructure>>): string {
    return params.map((it) => it.name).join(", ");
}

export function makeReturnCall(group: string, method: MethodDeclarationStructure, api: ApiDescriptor) {
    return `return this.api.${group}.${method.name}(${method.parameters ? paramNames(method.parameters) : ""})${api.returnMethod};`;
}

export function makeMethod(group: string, struct: MethodDeclarationStructure, api: ApiDescriptor)
    : MethodDeclarationStructure {
    if (struct.overloads) {
        struct.overloads.forEach((it) => it.returnType = api.returnTypeBuilder(it.returnType as string));
    }
    return {
        docs: struct.docs,
        kind: StructureKind.Method,
        name: struct.name,
        overloads: struct.overloads,
        parameters: struct.parameters,
        returnType: api.returnTypeBuilder(struct.returnType as string),
        scope: struct.scope,
        statements: [makeReturnCall(group, struct, api)],
        typeParameters: struct.typeParameters,
    };
}
