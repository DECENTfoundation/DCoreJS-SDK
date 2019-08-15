import {
    ConstructorDeclarationStructure,
    ImportDeclarationStructure,
    MethodDeclarationStructure,
    ParameterDeclarationStructure,
    Project,
    PropertyDeclarationStructure,
    Scope,
    SourceFile,
    StructureKind,
} from "ts-morph";
import { ApiDescriptor } from "./ApiDescriptor";
import { decapitalize, makeMethod, paramNames } from "./Utils";

class Generator {
    public project = new Project({
        addFilesFromTsConfig: false,
        skipFileDependencyResolution: true,
        tsConfigFilePath: "tsconfig.json",
    });

    private source = "src/";
    private sourceApi = `${this.source}api/`;
    private sourceApiRx = `${this.sourceApi}rx/`;
    private out = "src/";
    private outApi = `${this.out}api/`;

    private apis = [
        new ApiDescriptor("promise", "createApiPromise", ".toPromise()",
            (type) => type.replace("Observable", "Promise")),
    ];

    private apiFiles: SourceFile[];

    constructor() {
        this.project.createDirectory(this.outApi);
        this.project.addExistingSourceFiles("src/**/*");
        this.project.resolveSourceFileDependencies();
        this.apiFiles = this.project.getSourceFiles(
            [`${this.sourceApiRx}*Api.ts`, "!**/CallbackApi.ts", "!**/BaseApi.ts", "!**/DCoreApi.ts"])!;
    }

    public createFactory() {
        const out = this.project.getDirectory(this.out)!;
        const apiRx = this.project.getSourceFile(`${this.sourceApiRx}DCoreApi.ts`)!;
        const importRx: ImportDeclarationStructure = {
            kind: StructureKind.ImportDeclaration,
            moduleSpecifier: out.getRelativePathAsModuleSpecifierTo(apiRx),
            namespaceImport: "rx",
        };
        const apiImports: ImportDeclarationStructure[] = this.apis.map((it) => {
            return {
                kind: StructureKind.ImportDeclaration,
                moduleSpecifier: `${out.getRelativePathAsModuleSpecifierTo(this.outPath(it))}/DCoreApi`,
                namespaceImport: it.packageSuffix,
            };
        });
        const parameters: ParameterDeclarationStructure[] = [{
            kind: StructureKind.Parameter,
            name: "httpOptions",
            type: "CoreOptions",
        }, {
            kind: StructureKind.Parameter,
            name: "webSocketFactory",
            type: "WebSocketFactory",
        }, {
            hasQuestionToken: true,
            kind: StructureKind.Parameter,
            name: "logger",
            type: "Logger",
        }];
        const methods: MethodDeclarationStructure[] = this.apis.map((it) => {
            return {
                isStatic: true,
                kind: StructureKind.Method,
                name: it.createMethodName,
                parameters,
                returnType: `${it.packageSuffix}.DCoreApi`,
                scope: Scope.Public,
                statements: [`return new ${it.packageSuffix}.DCoreApi(DCoreClient.create(${paramNames(parameters)}));`],
            };
        });
        this.project.createSourceFile(`${this.out}DCoreSdk.ts`, {
            statements: [importRx, ...apiImports, {
                isExported: true,
                kind: StructureKind.Class,
                methods: [...methods, {
                    isStatic: true,
                    kind: StructureKind.Method,
                    name: "createApiRx",
                    parameters,
                    returnType: "rx.DCoreApi",
                    scope: Scope.Public,
                    statements: [`return DCoreClient.create(${paramNames(parameters)});`],
                }],
                name: "DCoreSdk",
            }],
        }, { overwrite: true })
            .fixMissingImports()
            .organizeImports();
    }

    public createCoreApi(api: ApiDescriptor, apiFiles: SourceFile[]) {
        const sourceBase = this.project.getSourceFile(`${this.sourceApi}BaseCoreApi.ts`)!;
        const sourceApi = this.project.getSourceFile(`${this.sourceApiRx}DCoreApi.ts`)!;
        const sourceApiName = `${sourceApi.getBaseNameWithoutExtension()}Rx`;
        const out = this.outPath(api);
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
                initializer: `new ${file.getBaseNameWithoutExtension()}(this, this.api.${name})`,
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
        const out = this.outPath(api);
        const apiRx = `${source.getBaseNameWithoutExtension()}Rx`;
        const importRx: ImportDeclarationStructure = {
            kind: StructureKind.ImportDeclaration,
            moduleSpecifier: out.getRelativePathAsModuleSpecifierTo(source),
            namedImports: [apiRx],
        };

        const imports: ImportDeclarationStructure[] = source.getImportDeclarations().map((it) => {
            return {
                kind: StructureKind.ImportDeclaration,
                ...it.getStructure(),
            };
        });

        const ctor: ConstructorDeclarationStructure = {
            kind: StructureKind.Constructor,
            parameters: [{
                kind: StructureKind.Parameter,
                name: "api",
                scope: Scope.Private,
                type: "DCoreApi",
            }, {
                kind: StructureKind.Parameter,
                name: "rx",
                scope: Scope.Private,
                type: apiRx,
            }],
        };

        const methods: MethodDeclarationStructure[] = source.getClass(source.getBaseNameWithoutExtension())!.getInstanceMethods()!
            .filter((it) => it.getStructure().scope === Scope.Public)
            .map((it) => it.getStructure() as MethodDeclarationStructure)
            .map((it) => makeMethod(it, api));

        return this.project.createSourceFile(`${out.getPath()}/${source.getBaseName()}`, {
            statements: [importRx, ...imports, {
                ctors: [ctor],
                isExported: true,
                kind: StructureKind.Class,
                methods,
                name: source.getBaseNameWithoutExtension(),
            }],
        }, { overwrite: true })
            .organizeImports();
    }

    public createIndex(api: ApiDescriptor, apis: SourceFile[]) {
        const out = this.outPath(api);
        const sources = out.getSourceFiles();
        return this.project.createSourceFile(`${out.getPath()}/index.ts`, {
            statements: sources.map((it) => {
                return {
                    kind: StructureKind.ExportDeclaration,
                    moduleSpecifier: out.getRelativePathAsModuleSpecifierTo(it),
                };
            }),
        }, { overwrite: true });
    }

    public save() {
        this.project.saveSync();
    }

    public generate() {
        this.apis.forEach((api) => {
            const apis = this.apiFiles.map((source) => this.createApi(api, source));
            this.createCoreApi(api, apis);
            this.createIndex(api, apis);
        });
        this.createFactory();
        this.save();
    }

    private outPath(api: ApiDescriptor) {
        return this.project.createDirectory(`${this.outApi}${api.packageSuffix}`)!;
    }
}

new Generator().generate();