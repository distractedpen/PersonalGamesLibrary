import React, {useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import MetadataForm from "../components/MetadataForm.tsx";
import GameDetails from "../components/GameDetails.tsx";
import GameCard from "../components/GameCard.tsx";
import {LibraryGet} from "../Models/Library.ts";
import {getGameById} from "../Services/IgdbService.tsx";
import {toast} from "react-toastify";

const ViewGame = () => {
    const location = useLocation();
    const {gameId} = useParams();

    console.log(location.pathname);

    const [game, setGame] = useState<LibraryGet | null>(null);

    function getGameInfo() {
        getGameById(Number(gameId)).then((res) => {
            if (res) {
                setGame(res);
            } else {
                toast.error("Game Does not exist.");
            }
        }).catch((err) => {
            toast.error(err);
        });
    }

    React.useEffect(() => {
        getGameInfo();
    }, []);

    return (
        <>
            <div className={"text-white flex flex-col justify-center items-center h-screen w-screen"}>
                <div className={"flex self-end text-xl"}>
                    {location.pathname.indexOf("library") !== -1 ?
                        <Link className={"p-2 bg-green-700 text-white text-center hover:cursor-pointer hover:bg-green-800"}
                              to={"/library"}>Back to Library</Link>
                        :
                        <Link className={"p-2 bg-green-700 text-white text-center hover:cursor-pointer hover:bg-green-800"}
                              to={"/search"}>Back to Search</Link>
                    }
                </div>
                <div className={"flex flex-row"}>
                    <GameCard coverUrl={game?.coverUrl} name={game?.name}/>
                    <div>
                        <GameDetails game={game}/>
                        {location.pathname.indexOf("library") !== -1 &&
                            <MetadataForm gameId={gameId}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewGame