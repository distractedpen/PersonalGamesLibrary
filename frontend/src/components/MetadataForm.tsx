import {GameMetaUpdate} from "../Models/GameMeta.ts";
import {FormEvent, useEffect, useState} from "react";
import {getGameMetadataById, updateGameMetadataById} from "../Services/GameService.tsx";
import {toast} from "react-toastify";

interface Props {
    gameId: string | undefined;
}

function MetadataForm({gameId}: Props) {

    const [completed, setCompleted] = useState<boolean>(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [notes, setNotes] = useState<string>("'");

    useEffect(() => {
        getGameMetadataById(Number(gameId)).then((res) => {
            console.log(res);
            if (res) {
                setCompleted(res.data.completed);
                setCurrentlyPlaying(res.data.currentlyPlaying);
                setRating(res.data.rating);
                setNotes(res.data.notes);
            } else {
                toast.error("No metadata for this game.")
            }
        }).catch(() => {
            toast.error("Error getting game metadata");
        })
    }, []);

    function handleGameMetaUpdate(e: FormEvent) {
        e.preventDefault();
        const gameMetadataUpdate: GameMetaUpdate = {
            completed,
            currentlyPlaying,
            rating,
            notes
        };
        updateGameMetadataById(Number(gameId), gameMetadataUpdate).then((res) => {
            if (res?.data) {
                setCompleted(res.data.completed);
                setCurrentlyPlaying(res.data.currentlyPlaying);
                setRating(res.data.rating);
                setNotes(res.data.notes);
                toast.success("Game metadata updated successfully.");
            } else {
                toast.error("Error updating game metadata");
            }
        }).catch((err) => {
            toast.error(err)
        });
    }

    const renderRatingOptions = (): JSX.Element[] => {
        const validRatings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return validRatings.map((rating: number) => {
            return (
                <option key={rating} value={rating}>{rating}</option>
            )
        });
    }

    return (
        <form>
            <div className={"flex"}>
                <label>Completed:</label>
                <input type={"checkbox"} name={"completed"} checked={completed}
                       onChange={(e) => setCompleted(e.target.checked)}/>
            </div>
            <div className={"flex"}>
                <label>Currently Playing:</label>
                <input type={"checkbox"} name={"currentlyPlaying"} checked={currentlyPlaying}
                       onChange={(e) => setCurrentlyPlaying(e.target.checked)}/>
            </div>
            <div>
                <label>Rating</label>
                <select className={"text-black"}
                        name={"rating"}
                        value={rating}
                        onChange={(e: any) => setRating(e.target.value)}>
                    {renderRatingOptions()}
                </select>
            </div>
            <div>
                <label>Notes</label>
                <textarea
                    className={"text-black"}
                    name={"notes"}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <input type={"submit"} onClick={handleGameMetaUpdate} value={"Update"}/>
        </form>
    )
}

export default MetadataForm
