import {FormEvent, SyntheticEvent} from 'react'
import ResultsTile from "./ResultsTile.tsx";
import {LibraryGet} from "../Models/Library.ts";

interface Props {
    gameList: LibraryGet[];
    currentLibrary: LibraryGet[];
    offset: number;
    getNextPage: (e: SyntheticEvent) => void;
    getPreviousPage: (e: SyntheticEvent) => void;
    addToLibrary: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchResults = ({ gameList, currentLibrary, offset, getNextPage, getPreviousPage, addToLibrary }: Props) => {
    console.log("SearchResult")
    console.log(currentLibrary);
    return (
        <div className={"space-y-4"}>
            <div className={"space-x-4"}>
                <div className={"flex justify-evenly"}>
                    <button className={"bg-green-700 text-white text-2xl p-2 disabled:text-gray-400 hover:bg-green-800"}
                            onClick={(e) => getPreviousPage(e)} disabled={offset == 0}>
                        Previous Page
                    </button>
                    <button className={"bg-green-700 text-white text-2xl p-2 disabled:text-gray-400 hover:bg-green-800"}
                            onClick={(e) => getNextPage(e)} disabled={gameList.length < 10}>
                        Next Page
                    </button>
                </div>
            </div>
            <div className={"flex flex-wrap p-6 justify-center"}>
                {gameList.length != 0 ?
                    gameList.map((game) => {
                        if (game.id === 0) return;
                        return (
                            <ResultsTile
                                key={game.id}
                                game={game}
                                addToLibrary={addToLibrary}
                                inLibrary={currentLibrary.some((libGame) => libGame.id === game.id)}/>
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
