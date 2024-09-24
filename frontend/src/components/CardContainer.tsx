import {LibraryGet} from "../Models/Library.ts";
import GameCard from "./GameCard.tsx";
import {SyntheticEvent} from "react";
import {Link} from "react-router-dom";

interface Props {
    gameList: LibraryGet[];
    onGameDelete: (e: SyntheticEvent) => void;
}

export default function CardContainer({ gameList, onGameDelete } : Props) {
    return(
        <>
            <div className="container bg-magnolia justify-center w-5/6 h-5/6 flex flex-row flex-wrap overflow-auto m-2 p-6">
                {gameList.map((game) => {
                    return (
                        <GameCard key={game.id} game={game} onGameDelete={onGameDelete}/>
                    );
                })}
            </div>
            <Link className={"bg-green-700 text-xl text-white p-2"} to={"/search"}>Add Game</Link>
        </>
    )
}