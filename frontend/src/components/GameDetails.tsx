import {LibraryGet} from "../Models/Library.ts";
import React, {useState} from "react";
import {getGameById} from "../Services/IgdbService.tsx";
import {toast} from "react-toastify";
import GameCard from "./GameCard.tsx";

interface Props {
    gameId: string | undefined;
}

export default function GameDetails({gameId}: Props) {

    const [game, setGame] = useState<LibraryGet | null>(null);

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
    }

    React.useEffect(() => {
        getGameInfo();
    }, []);

    const renderDeveloperList = (gameDevList: string[] | undefined): string => {
        if (!gameDevList) return "";
        return gameDevList.join(", ")
    };

    const renderGenreList = (gameGenreList: string[] | undefined): string => {
        if (!gameGenreList) return "";
        return gameGenreList.join(", ")
    }

    return (
        <div>
            <GameCard game={game}/>
            <h1>{game?.name}</h1>
            <p>{renderDeveloperList(game?.developer)}</p>
            <p>{renderGenreList(game?.genres)}</p>
        </div>
    )
}