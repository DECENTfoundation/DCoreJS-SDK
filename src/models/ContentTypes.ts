export enum ApplicationType {
    DecentCore = 0,
    DecentGo,
    Alax,
}

export enum CategoryType {
    None = 0,
    Music,
    Movie,
    Book,
    AudioBook,
    Software,
    Game,
    Picture,
    Document,
}

/**
 * create content type string
 */
export function contentType(app: ApplicationType, category: CategoryType): string {
    return `${app}.${category}.0`;
}
