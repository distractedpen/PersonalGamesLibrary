import {SyntheticEvent} from 'react'
import {LibraryGet} from "../Models/Library.ts";

interface Props {
    game: LibraryGet;
    onGameDelete: (e: SyntheticEvent) => void;
}

const DeleteGame = ({game, onGameDelete}: Props) => {
    return (
        <form onSubmit={onGameDelete} className={"float-right mt-2 mr-2 rounded-2xl h-fit"}>
            <input hidden value={game.id} readOnly={true}/>
            <button type={"submit"}>X</button>
        </form>
    )
}
export default DeleteGame
