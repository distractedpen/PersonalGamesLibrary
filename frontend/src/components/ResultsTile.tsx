import {FormEvent} from 'react'
import {LibraryGet} from "../Models/Library.ts";

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
                <button className={"absolute inset-0 z-20 bg-green-700 opacity-0 hover:opacity-60 disabled:hover:opacity-100 text-white disabled:text-gray-400 disabled:bg-gray-500"}
                        type={"submit"}
                        disabled={inLibrary}> {inLibrary ?  "Already in Library" : "Add to Library" }
                </button>
                <img className={"bg-gray-500 z-10"} src={game.coverUrl} alt={game.name} height={374} width={264}/>
            </form>
        </div>
    )
}
export default ResultsTile
