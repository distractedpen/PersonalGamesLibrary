import axios from "axios";
import {LibraryGet} from "../Models/Library.ts";

const api = "https://gamelib.cloud/api/";

export const searchIgdb = async (gameName: string, offset: number) => {
    const encodedGameName = encodeURIComponent(gameName);
    try {
        const response = await axios.get<LibraryGet[]>(api + `igdb/search?gameName=${encodedGameName}&offset=${offset}&limit=10`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getGameById = async (gameId: number) => {
    try {
        const response = await axios.get<LibraryGet>(api + `igdb/${gameId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}