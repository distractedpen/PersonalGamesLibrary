import {SyntheticEvent} from 'react'
import {LibraryGet} from "../Models/Library.ts";

interface Props {
    game: LibraryGet;
    onGameDelete: (e: SyntheticEvent) => void;
}

const DeleteGame = ({game, onGameDelete}: Props) => {

    const testDelete = (e: SyntheticEvent) => {
        console.log("in Delete Game");
        onGameDelete(e);
    }

    return (
        <form onSubmit={(e) => testDelete(e)}
              className={"bg-green-700 text-white text-center hover:cursor-pointer hover:bg-green-800"}>
            <input hidden value={game.id} readOnly={true}/>
            <button className={"w-full"} type={"submit"}>X</button>
        </form>
    )
}
export default DeleteGame
