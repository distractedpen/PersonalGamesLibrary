import {SyntheticEvent} from 'react'
import {LibraryGet} from "../Models/Library.ts";

interface Props {
    game: LibraryGet;
    onGameDelete: (e: SyntheticEvent) => void;
}

const DeleteGame = ({game, onGameDelete}: Props) => {
    return (
        <form onSubmit={onGameDelete}
              className={"bg-green-700 text-white text-center hover:cursor-pointer hover:bg-green-800"}>
            <input hidden value={game.id} readOnly={true}/>
            <button type={"submit"}>X</button>
        </form>
    )
}
export default DeleteGame
