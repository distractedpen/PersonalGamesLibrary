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
            <div className={"space-x-4"}>
                <div className={"flex justify-evenly"}>
                    <button className={"bg-green-700 text-white text-2xl p-2"} onClick={(e) => getPreviousPage(e)} disabled={offset == 0}>
                        Previous Page
                    </button>
                    <button className={"bg-green-700 text-white text-2xl p-2"} onClick={(e) => getNextPage(e)} disabled={gameList.length < 10}>
                        Next Page
                    </button>
                </div>
            </div>
            <div className={"flex flex-wrap p-6 justify-center"}>
                {gameList.length != 0 ?
                    gameList.map((game) => {
                        if (game.id === 0) return;
                        return (
                            <ResultsTile key={game.id} game={game} addToLibrary={addToLibrary}/>
                        )
                    })
                    :
                    <p className={"text-2xl text-white text-center"}>No Results</p>
                }
            </div>
        </div>
    )
}
export default SearchResults
