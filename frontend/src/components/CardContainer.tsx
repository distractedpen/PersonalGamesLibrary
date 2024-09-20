import {LibraryGet} from "../Models/Library.ts";
import GameCard from "./GameCard.tsx";
import {SyntheticEvent} from "react";

interface Props {
    gameList: LibraryGet[];
    onGameDelete: (e: SyntheticEvent) => void;
}

export default function CardContainer({ gameList, onGameDelete } : Props) {
    return(
       <div className="container bg-magnolia justify-center w-5/6 h-5/6 flex flex-row flex-wrap overflow-auto m-2">
           { gameList.map((game) => {
               return (
                   <GameCard key={game.id} game={game} onGameDelete={onGameDelete}/>
               );
           })}
       </div>
    )
}