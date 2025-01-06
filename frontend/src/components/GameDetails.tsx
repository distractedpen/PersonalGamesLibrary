import {LibraryGet} from "../Models/Library.ts";

interface Props {
    game: LibraryGet | null;
}

export default function GameDetails({game}: Props) {

    if (game === null) {
        return;
    }

    const renderDeveloperList = (gameDevList: string[] | undefined): string => {
        if (!gameDevList) return "";
        return gameDevList.join(", ")
    };

    const renderGenreList = (gameGenreList: string[] | undefined): string => {
        if (!gameGenreList) return "";
        return gameGenreList.join(", ")
    }

    return (
        <div className={"flex flex-col justify-center m-5"}>
            <h1 className={"text-3xl"}>{game?.name}</h1>
            <p className={"text-xl"}><strong>Developers:</strong> {renderDeveloperList(game?.developer)}</p>
            <p className={"text-xl"}><strong>Genres:</strong> {renderGenreList(game?.genres)}</p>
        </div>
    )
}