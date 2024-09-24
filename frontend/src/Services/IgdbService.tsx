import axios from "axios";
import {IgdbGame} from "../Models/Igdb.ts";

const api = "http://localhost:8080/api/";

export const searchIgdb = async (gameName: string, offset: number) => {
    const encodedGameName = encodeURIComponent(gameName);
    try {
        const response = await axios.get<IgdbGame[]>(api + `igdb/search?gameName=${encodedGameName}&offset=${offset}&limit=10`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};