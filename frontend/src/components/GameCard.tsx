import {Link} from "react-router-dom";
import {LibraryGet} from "../Models/Library.ts";
import DeleteGame from "./DeleteGame.tsx";
import {SyntheticEvent} from "react";

interface Props {
    game: LibraryGet,
    onGameDelete: (e: SyntheticEvent) => void
}

export default function GameCard({game, onGameDelete} : Props) {

    return (
        <div className={"h-60 w-40 bg-gray-500 m-6"}>
            <DeleteGame game={game} onGameDelete={onGameDelete}/>
            <Link to={`/game/${game.id}`} className={"flex flex-col pl-4 h-full w-full"}>
                <p className={"text-m"}>{game.name}</p>
            </Link>
        </div>
    );
};