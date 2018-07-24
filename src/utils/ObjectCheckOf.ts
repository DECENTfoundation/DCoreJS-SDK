export const ObjectCheckOf = <T>(object: any, property: string): object is T => {
    return property in object;
};
