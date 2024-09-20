import {Link} from "react-router-dom";
import {LibraryGet} from "../Models/Library.ts";

interface Props {
    game: LibraryGet;
}

export default function GameDetails({game}: Props) {

    return (
        <div className={"flex flex-col h-screen w-screen bg-[#DFDFDF] justify-center items-center"}>
            <div className={"m-2 max-w-2xl"}>
                <Link className="flex justify-center items-center text-2xl rounded-2xl  bg-lavender_(web) shadow-black drop-shadow w-40 h-20" to={"/library"}>Library</Link>
            </div>
            <div className={"flex w-5/6 h-5/6 justify-center items-center bg-magnolia"}>
                <div className={"flex items-center justify-evenly"}>
                    <h1>{game?.name}</h1>
                    <p>{game?.developer}</p>
                </div>
            </div>
        </div>
    )
}