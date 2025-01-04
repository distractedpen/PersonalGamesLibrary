import {LibraryGet} from "../Models/Library.ts";

interface Props {
    game: LibraryGet
}

function GameCard( { game }: Props) {
    return (
        <>
            <img className={"bg-gray-500 inset-0 z-10"} src={game.coverUrl} alt={game.name} height={374} width={264}/>
        </>
    )
}

export default GameCard
