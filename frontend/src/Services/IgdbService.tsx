import axios from "axios";
import {IgdbGame} from "../Models/Igdb.ts";

const api = "http://localhost:8004/api/";

export const searchIgdb = async (gameName: string, offset: number) => {
    const encodedGameName = encodeURIComponent(gameName);
    try {
        const response = await axios.get<IgdbGame[]>(api + `igdb/search?gameName=${encodedGameName}&offset=${offset}&limit=10`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};