// This is technically just a Game Object
export type LibraryGet = {
    id: number;
    name: string;
    developer: string[];
    genres: string[];
    coverUrl: string;
    inLibrary: boolean;
}

export type LibraryPost = {
    name: string;
}