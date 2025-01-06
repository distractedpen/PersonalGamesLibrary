import {FormEvent} from 'react'
import {LibraryGet} from "../Models/Library.ts";
import {Link} from "react-router-dom";

interface Props {
    game: LibraryGet
    addToLibrary: (e: FormEvent) => void;
    inLibrary: boolean;
}

const ResultsTile = ({ game, addToLibrary, inLibrary }: Props) => {
    console.log("ResultTile")
    console.log(game);
    console.log(`inLibrary: ${inLibrary}`);
    return (
        <div className={"m-6"} key={game.id}>
            <form className={"relative flex flex-col justify-center"} onSubmit={addToLibrary}>
                <input hidden={true} value={game.id} readOnly={true}/>
                <div className={"absolute insert-0 z-20 opacity-0 hover:opacity-80 w-full h-full"}>
                    <Link className={"absolute top-1/2 z-30 h-1/2 w-full bg-green-700 hover:bg-green-800 disabled:hover:opacity-100 text-white disabled:text-gray-400 disabled:bg-gray-500 text-center font-bold"}
                          to={`/game/${game.id}`}>More Info</Link>
                    <button className={"absolute top-0 z-30 h-1/2 w-full bg-green-700 hover:bg-green-800 disabled:hover:opacity-100 text-white disabled:text-gray-400 disabled:bg-gray-500 font-bold"}
                            type={"submit"}
                            disabled={inLibrary}> {inLibrary ?  "Already in Library" : "Add to Library" }
                    </button>
                </div>
                <img className={"bg-gray-500 z-10"} src={game.coverUrl} alt={game.name} height={374} width={264}/>
            </form>
        </div>
    )
}
export default ResultsTile
