import {FormEvent} from 'react'
import {IgdbGame} from "../Models/Igdb.ts";

interface Props {
    game: IgdbGame
    addToLibrary: (e: FormEvent) => void;
}

const ResultsTile = ({ game, addToLibrary }: Props) => {
    console.log(game);
    return (
        <div className={"m-6 bg-gray-500 h-60 w-40"} key={game.id}>
            <form onSubmit={addToLibrary}>
                <h1>{game.name}</h1>
                <input hidden={true} value={game.id} readOnly={true}/>
                <button className={"bg-green-700 text-lg text-white"} type={"submit"}>+</button>
            </form>
        </div>
    )
}
export default ResultsTile
