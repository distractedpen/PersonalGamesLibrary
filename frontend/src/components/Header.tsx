import {UserProfile} from "../Models/User.ts";

interface Props {
    user: UserProfile | null;
    handleLogout: () => void;
}

const Header = ({user, handleLogout}: Props) => {
    return (
        <div className="flex justify-evenly items-center w-5/6">
            <h1 className="text-4xl flex-init w-2/3">{user?.userName}'s Library</h1>
            <button onClick={handleLogout}
                className="flex justify-center items-center text-2xl rounded-2xl  bg-lavender_(web) shadow-black drop-shadow w-40 h-20">
                Logout
            </button>
        </div>
    )
}
export default Header
