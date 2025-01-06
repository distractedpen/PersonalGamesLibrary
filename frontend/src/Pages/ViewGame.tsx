import {useParams} from "react-router-dom";
import MetadataForm from "../components/MetadataForm.tsx";
import GameDetails from "../components/GameDetails.tsx";

const ViewGame = () => {
    const {gameId} = useParams();

    return (
        <div className={"text-white"}>
            <GameDetails gameId={gameId}/>
            <MetadataForm gameId={gameId}/>
        </div>
    )
}
export default ViewGame