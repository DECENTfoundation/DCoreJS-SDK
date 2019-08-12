export class ApiDescriptor {
    constructor(
        public packageSuffix: string,
        public returnMethod: string,
        public returnTypeBuilder: (type: string) => string,
    ) {
    }
}
