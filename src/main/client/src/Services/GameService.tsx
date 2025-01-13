import axios from "axios";
import {GameMetaGet, GameMetaUpdate} from "../Models/GameMeta.ts";

const apiUrl = "http://localhost:8080/api/";

export async function getGameMetadataById(game_id: number) {
    return await axios.get<GameMetaGet>(apiUrl + `games/meta?gameId=${game_id}`, {});
}

export async function updateGameMetadataById(game_id: number, gameMetaUpdate: GameMetaUpdate) {
    return await axios.patch<GameMetaGet>(apiUrl + `games/meta?gameId=${game_id}`, gameMetaUpdate);
}
