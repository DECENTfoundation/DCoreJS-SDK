export function decapitalize(value: string) {
    const first = value.charAt(0).toLowerCase();
    return first.concat(value.substring(1));
}
