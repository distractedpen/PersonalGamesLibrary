import CardContainer from "../components/CardContainer.tsx";
import React, {useState} from "react";
import {useAuth} from "../Context/useAuth.tsx";
import {libraryDelete, libraryGetApi} from "../Services/LibraryService.tsx";
import {LibraryGet} from "../Models/Library.ts";
import Header from "../components/Header.tsx";
import {toast} from "react-toastify";

export default function Library() {

    const [gameList, setGameList] = useState<LibraryGet[]>([]);
    const { user, logout } = useAuth();

    function getLibrary() {
        libraryGetApi().then((res) => {
            if (res?.data)
                setGameList(res.data);
            else
            {
                setGameList([]);
            }
        }).catch((error) => {
            toast.error(error.message);
        });
    }

    React.useEffect(() => {
        getLibrary();
    }, []);


    const onGameDelete = (e: any) => {
        e.preventDefault();
        libraryDelete(e.target[0].value).then((res) => {
            if (res?.status == 200) {
                toast.success("Successfully deleted");
                getLibrary();
            } else {
                toast.error("Error in Delete game");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
            <Header user={user} handleLogout={logout}/>
            <CardContainer
                gameList={gameList!}
                onGameDelete={onGameDelete}
            />
        </div>
    )
}
