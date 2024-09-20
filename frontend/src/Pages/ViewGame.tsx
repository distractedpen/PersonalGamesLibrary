import {useParams} from "react-router-dom";
import {useState} from "react";
import {LibraryGet} from "../Models/Library.ts";


const ViewGame = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState<LibraryGet | null>(null);

    React.useEffect(() => {

    }, []);

    return (
        <div>ViewGame</div>
    )
}
export default ViewGame
