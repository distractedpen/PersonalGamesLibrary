import axios from "axios";
import {LibraryGet, LibraryPost} from "../Models/Library.ts";

const api = "http://localhost:8004/api/library";

export async function libraryGetApi()  {
    try {
        return await axios.get<LibraryGet[]>(api);
    } catch (error) {
        console.log(error);
    }
}

export async function libraryPostApi(gameId: number) {
    try {
        return await axios.post<LibraryPost>(api + `?gameId=${gameId}`);
    } catch (error) {
        console.log(error);
    }
}

export async function libraryDelete(gameId: number) {
    try {
        return await axios.delete<LibraryPost>(api + `?gameId=${gameId}`);
    } catch (error) {
        console.log(error);
    }
}