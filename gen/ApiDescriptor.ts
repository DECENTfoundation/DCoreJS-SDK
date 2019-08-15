export class ApiDescriptor {
    constructor(
        public packageSuffix: string,
        public createMethodName: string,
        public returnMethod: string,
        public returnTypeBuilder: (type: string) => string,
    ) {
    }
}
