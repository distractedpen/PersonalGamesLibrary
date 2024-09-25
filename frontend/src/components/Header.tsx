import {UserProfile} from "../Models/User.ts";

interface Props {
    user: UserProfile | null;
    handleLogout: () => void;
}

const Header = ({user, handleLogout}: Props) => {
    return (
        <div className="flex justify-around items-center w-5/6">
            <h1 className="text-4xl text-white">{user?.userName}'s Library</h1>
            <button onClick={handleLogout}
                className="text-white bg-green-700 p-2 hover:bg-green-800">
                Logout
            </button>
        </div>
    )
}
export default Header
