import axios from "axios";
import {LibraryGet} from "../Models/Library.ts";

const apiUrl = "http://localhost:8080/api/";

export async function getGameById(game_id: number): Promise<LibraryGet> {
    return await axios.get(apiUrl + `games/${game_id}`);
}


