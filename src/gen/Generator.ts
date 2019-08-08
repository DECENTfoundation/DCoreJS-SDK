import { ConstructorDeclarationStructure, ImportDeclarationStructure, Project, PropertyDeclarationStructure, Scope, SourceFile, StructureKind } from "ts-morph";
import { ApiDescriptor } from "./ApiDescriptor";
import { decapitalize } from "./Utils";

class Generator {
    public project = new Project({
        tsConfigFilePath: "tsconfig.json",
    });

    private source = "src/";
    private sourceApi = `${this.source}api/`;
    private sourceApiRx = `${this.sourceApi}rx/`;
    private out = "gen/";
    private outApi = `${this.out}api/`;

    private apis = [
        new ApiDescriptor("promise"),
    ];

    private apiFiles = this.project.getSourceFiles(
        [`${this.sourceApiRx}*Api.ts`, "!**/CallbackApi.ts", "!**/BaseApi.ts", "!**/DCoreApi.ts"])!;

    constructor() {
        this.project.createDirectory(this.outApi);
    }

    public createFactory() {
        this.project.createSourceFile(`${this.out}DCoreSdk.ts`, {
            statements: [{
                isExported: true,
                kind: StructureKind.Class,
                name: "DCoreSdk",
            }],
        }, { overwrite: true });
    }

    public createCoreApi(api: ApiDescriptor, apiFiles: SourceFile[]) {
        const sourceBase = this.project.getSourceFile(`${this.sourceApi}BaseCoreApi.ts`)!;
        const sourceApi = this.project.getSourceFile(`${this.sourceApiRx}DCoreApi.ts`)!;
        const sourceApiName = `${sourceApi.getBaseNameWithoutExtension()}Rx`;
        const out = this.project.createDirectory(`${this.outApi}${api.packageSuffix}`);
        const imports: ImportDeclarationStructure[] = apiFiles.map((it) => {
            return {
                kind: StructureKind.ImportDeclaration,
                moduleSpecifier: out.getRelativePathAsModuleSpecifierTo(it),
                namedImports: [it.getBaseNameWithoutExtension()],
            };
        });
        const importBase: ImportDeclarationStructure = {
            kind: StructureKind.ImportDeclaration,
            moduleSpecifier: out.getRelativePathAsModuleSpecifierTo(sourceBase),
            namedImports: [sourceBase.getBaseNameWithoutExtension()],
        };
        const importApi: ImportDeclarationStructure = {
            kind: StructureKind.ImportDeclaration,
            moduleSpecifier: out.getRelativePathAsModuleSpecifierTo(sourceApi),
            namedImports: [sourceApiName],
        };
        const props: PropertyDeclarationStructure[] = apiFiles.map((file) => {
            const name = decapitalize(file.getBaseNameWithoutExtension());
            return {
                initializer: `new ${file.getBaseNameWithoutExtension()}(this.api.${name})`,
                isReadonly: true,
                kind: StructureKind.Property,
                name,
                scope: Scope.Public,
                type: file.getBaseNameWithoutExtension(),
            };
        });

        this.project.createSourceFile(`${out.getPath()}/DCoreApi.ts`, {
            statements: [
                importBase,
                importApi,
                ...imports,
                {
                    ctors: [{
                        kind: StructureKind.Constructor,
                        parameters: [{
                            kind: StructureKind.Parameter,
                            name: "api",
                            scope: Scope.Private,
                            type: sourceApiName,
                        }],
                        statements: ["super(api.core);"],
                    }],
                    extends: sourceBase.getBaseNameWithoutExtension(),
                    isExported: true,
                    kind: StructureKind.Class,
                    name: "DCoreApi",
                    properties: props,
                }],
        }, { overwrite: true });
    }

    public createApi(api: ApiDescriptor, source: SourceFile) {
        const out = this.project.createDirectory(`${this.outApi}${api.packageSuffix}`);
        const apiRx = `${source.getBaseNameWithoutExtension()}Rx`;
        const importRx: ImportDeclarationStructure = {
            kind: StructureKind.ImportDeclaration,
            moduleSpecifier: out.getRelativePathAsModuleSpecifierTo(source),
            namedImports: [apiRx],
        };
        const ctor: ConstructorDeclarationStructure = {
            kind: StructureKind.Constructor,
            parameters: [{
                kind: StructureKind.Parameter,
                name: "api",
                scope: Scope.Private,
                type: apiRx,
            }],
        };
        return this.project.createSourceFile(`${out.getPath()}/${source.getBaseName()}`, {
            statements: [importRx, {
                ctors: [ctor],
                isExported: true,
                kind: StructureKind.Class,
                name: source.getBaseNameWithoutExtension(),
            }],
        }, { overwrite: true });
    }

    public save() {
        this.project.saveSync();
    }

    public generate() {
        this.createFactory();
        this.apis.forEach((api) => {
            const apis = this.apiFiles.map((source) => this.createApi(api, source));
            this.createCoreApi(api, apis);
        });
        this.save();
    }
}

const generator = new Generator();

// const f = generator.project.getSourceFiles("src/api/*.ts")!;
// console.log(generator.apiFiles);
// generator.createFactory();
generator.generate();
