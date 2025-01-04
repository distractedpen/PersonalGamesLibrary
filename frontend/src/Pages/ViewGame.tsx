import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {LibraryGet} from "../Models/Library.ts";
import GameCard from "../components/GameCard";
import {GameMetaGet} from "../Models/GameMeta.ts";
import {getGameById} from "../Services/IgdbService.tsx";
import {toast} from "react-toastify";

const testGameMetadata: GameMetaGet = {
    currentlyPlaying: true,
    completed: false,
    rating: undefined,
    notes: undefined,
};
const ViewGame = () => {
    const {gameId} = useParams();
    const [game, setGame] = useState<LibraryGet | null>(null);
    const [gameMeta, setGameMeta] = useState<GameMetaGet>(testGameMetadata);

    function getGameInfo() {
        getGameById(Number(gameId)).then((res) => {
            if (res) {
                setGame(res);
            } else {
                toast.error("Game Does not exist.");
            }
        }).catch((err) => {
            toast.error(err);
        });

        // get game from IGDB and local database
        setGame(game);
        setGameMeta(testGameMetadata);
    }

    React.useEffect(() => {
        getGameInfo();
        console.log(gameMeta);
    }, []);

    const renderDeveloperList = (gameDevList) => {
        return gameDevList.join(", ")
    };

    const renderGenreList = (gameGenreList) => {
        return gameGenreList.join(", ")
    }


    if (game === null) {
        return;
    }

    return (
        <div className={"text-white"}>
            <GameCard game={game}/>
            <div>
                <h2>Name: {game.name}</h2>
                <h2>Developer: {renderDeveloperList(game?.developer)}</h2>
                <h2>Genres: {renderGenreList(game?.genres)}</h2>
                <form>
                    <div className={"flex"}>
                        <legend>Completed:</legend>
                        <label>Yes</label>
                        <input type={"radio"} name={"Completed"}/>
                        <label>No</label>
                        <input type={"radio"} name={"Completed"}/>
                    </div>
                    <div className={"flex"}>
                        <legend>Currently Playing:</legend>
                        <label>Yes</label>
                        <input type={"radio"} name={"Completed"}/>
                        <label>No</label>
                        <input type={"radio"} name={"Completed"}/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ViewGame