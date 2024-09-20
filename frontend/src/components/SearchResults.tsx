import {SyntheticEvent} from 'react'
import {IgdbGame} from "../Models/Igdb.ts";
import ResultsTile from "./ResultsTile.tsx";

interface Props {
    gameList: IgdbGame[];
    offset: number;
    getNextPage: (e: SyntheticEvent) => void;
    getPreviousPage: (e: SyntheticEvent) => void;
    addToLibrary: (e: SyntheticEvent) => void;
}

const SearchResults = ({ gameList, offset, getNextPage, getPreviousPage, addToLibrary }: Props) => {
    return (
        <div className={"space-y-4"}>
            {gameList.map((game) => {
                return (
                    <ResultsTile key={game.id} game={game} addToLibrary={addToLibrary}/>
                );
            })}
            <div className={"space-x-4"}>
                <button className={"bg-gray-500"} onClick={(e) => getPreviousPage(e)} disabled={offset == 0}>Previous Page</button>
                <button className={"bg-gray-500"} onClick={(e) => getNextPage(e)} disabled={gameList.length < 10}>Next Page</button>
            </div>
        </div>
    )
}
export default SearchResults
