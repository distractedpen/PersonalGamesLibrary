import {FormEvent} from 'react'
import {IgdbGame} from "../Models/Igdb.ts";

interface Props {
    game: IgdbGame
    addToLibrary: (e: FormEvent) => void;
}

const ResultsTile = ({ game, addToLibrary }: Props) => {
    return (
        <div className={"flex flex-col justify-evenly border-2 border-dashed border-black"} key={game.id}>
            <form onSubmit={addToLibrary}>
                <h1>{game.name}</h1>
                <input hidden={true} value={game.id} readOnly={true}/>
                <button className={"bg-gray-500 text-lg"} type={"submit"}>+</button>
            </form>
        </div>
    )
}
export default ResultsTile
