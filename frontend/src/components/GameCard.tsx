import {LibraryGet} from "../Models/Library.ts";

interface Props {
    game: LibraryGet | null;
}

function GameCard( { game }: Props) {
    if (game === null) {
        return;
    }

    return (
        <>
            <img className={"bg-gray-500 inset-0 z-10"} src={game.coverUrl} alt={game.name} height={374} width={264}/>
        </>
    )
}

export default GameCard
