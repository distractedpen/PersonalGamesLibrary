import {LibraryGet} from "../Models/Library.ts";
import LibraryCardDisplay from "./LibraryCardDisplay.tsx";
import {SyntheticEvent} from "react";
import {Link} from "react-router-dom";

interface Props {
    gameList: LibraryGet[];
    onGameDelete: (e: SyntheticEvent) => void;
}

export default function CardContainer({ gameList, onGameDelete } : Props) {

    const testDelete = (e: SyntheticEvent) => {
        console.log("In Card Container");
        onGameDelete(e);
    }

    return(
        <>
            <div className="container space-x-4 sm:space-y-4 bg-magnolia justify-center w-5/6 h-5/6 flex flex-row flex-wrap overflow-auto m-2 p-6">
                {gameList.map((game) => {
                    return (
                        <LibraryCardDisplay key={game.id} game={game} onGameDelete={(e) => testDelete(e)}/>
                    );
                })}
            </div>
            <Link className={"bg-green-700 text-xl text-white p-2 hover:bg-green-800"} to={"/search"}>Add Game</Link>
        </>
    )
}