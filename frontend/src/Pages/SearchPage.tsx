import {ChangeEvent, FormEvent, SyntheticEvent, useState} from 'react'
import {IgdbGame} from "../Models/Igdb.ts";
import {searchIgdb} from "../Services/IgdbService.tsx";
import Search from "../components/Search.tsx";
import SearchResults from "../components/SearchResults.tsx";
import {libraryPostApi} from "../Services/LibraryService.tsx";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

const SearchPage = () => {
    const [gameList, setGameList] = useState<IgdbGame[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [offset, setOffset] = useState(0);

    function handleOnSearchTextChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    async function getPreviousPage(e: SyntheticEvent) {
        setOffset((currOffset) => (currOffset - 10));
        const result = await searchIgdb(searchText, offset);
        if (result)
            setGameList(result);
        else
            toast.error("Error from Igdb Search");

    }

    async function getNextPage(e: SyntheticEvent) {
        setOffset((currOffset) => (currOffset + 10));
        const result = await searchIgdb(searchText, offset);
        if (result)
            setGameList(result);
        else
            toast.error("Error from Igdb Search");
    }


    async function handleClick(e: SyntheticEvent) {
         const result = await searchIgdb(searchText, offset);
         if (result)
             setGameList(result);
         else
             toast.error("Error from Igdb Search");
    }

    async function addToLibrary(e: FormEvent) {
        e.preventDefault();
        libraryPostApi(e.target[0].value).then((res) => {
            if (res?.status == 200) {
                toast.success("Successfully added");
            } else {
                toast.error("Error in Adding game");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={"bg-gray-800 w-screen h-screen"}>
            <div className={"flex flex-col space-y-4"}>
                <Search handleOnClick={handleClick} handleOnChange={handleOnSearchTextChange} searchText={searchText} />
                <Link className={"bg-green-700 text-2xl text-white w-fit p-2 self-center"} to={"/library"}>Return to Library</Link>
                <SearchResults
                    gameList={gameList}
                    offset={offset}
                    getNextPage={getNextPage}
                    getPreviousPage={getPreviousPage}
                    addToLibrary={addToLibrary}
                />
            </div>
        </div>
    )
}
export default SearchPage
