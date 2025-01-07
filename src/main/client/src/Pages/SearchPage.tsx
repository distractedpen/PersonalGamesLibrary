import React, {ChangeEvent, FormEvent, useState} from 'react'
import {searchIgdb} from "../Services/IgdbService.tsx";
import Search from "../components/Search.tsx";
import SearchResults from "../components/SearchResults.tsx";
import {libraryGetApi, libraryPostApi} from "../Services/LibraryService.tsx";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {LibraryGet} from "../Models/Library.ts";

const SearchPage = () => {
    const [gameList, setGameList] = useState<LibraryGet[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [offset, setOffset] = useState(0);
    const [currentLibrary, setCurrentLibrary] = useState<LibraryGet[]>([]);

    function getLibrary() {
        libraryGetApi().then((res) => {
            if (res?.data)
                setCurrentLibrary(res.data);
            else {
                setCurrentLibrary([]);
            }
        }).catch((error) => {
            toast.error(error.message);
        });
    }

    React.useEffect(() => {
        getLibrary();
    }, []);

    function handleOnSearchTextChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    async function getPreviousPage() {
        setOffset((currOffset) => (currOffset - 10));
        const result = await searchIgdb(searchText, offset);
        if (result)
            setGameList(result);
        else
            toast.error("Error from Igdb Search");

    }

    async function getNextPage() {
        setOffset((currOffset) => (currOffset + 10));
        const result = await searchIgdb(searchText, offset);
        if (result)
            setGameList(result);
        else
            toast.error("Error from Igdb Search");
    }


    async function handleClick() {
        let result = await searchIgdb(searchText, offset);
        if (result) {
            // remove all gameId == 0
            result = result.filter((game) => game.id !== 0);
            console.log(currentLibrary);
            result = result.map((game) => {
                let inLib = false;
                currentLibrary.forEach(libGame => {
                    if (game.id == libGame.id)
                        inLib = true;
                });
                game.inLibrary = inLib;
                return game;
            });
            setGameList(result);
        } else
            toast.error("Error from Igdb Search");
    }

    async function addToLibrary(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const gameInputElement = form.elements[0] as typeof form.elements & HTMLInputElement;

        libraryPostApi(Number(gameInputElement.value)).then((res) => {
            if (res?.status == 200) {
                toast.success("Successfully added");
                getLibrary();
            } else {
                toast.error("Error in Adding game");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={"w-screen h-screen min-h-fit min-w-fit"}>
            <div className={"flex flex-col space-y-4"}>
                <Search handleOnClick={handleClick} handleOnChange={handleOnSearchTextChange} searchText={searchText}/>
                <Link className={"bg-green-700 text-2xl text-white w-fit p-2 self-center hover:bg-green-800"}
                      to={"/library"}>Return to Library</Link>
                <SearchResults
                    gameList={gameList}
                    currentLibrary={currentLibrary}
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
