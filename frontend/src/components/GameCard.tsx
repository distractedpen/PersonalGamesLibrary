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
        <div>
            <DeleteGame game={game} onGameDelete={onGameDelete}/>
            <Link to={`/game/${game.id}`} className={"relative h-fit w-fit flex flex-col items-center"}>
                <div className={"absolute flex items-center justify-center w-full h-full z-20 opacity-0 hover:opacity-70 bg-gray-500"}>
                    <h1 className={"text-white text-3xl opacity-100"}>
                        More Info
                    </h1>
                </div>
                <img className={"bg-gray-500 inset-0 z-10"} src={game.coverUrl} alt={game.name} height={374} width={264}/>
            </Link>
        </div>
    );
};