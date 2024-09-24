import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center w-screen h-screen justify-center space-y-10 bg-gray-500">
            <h1 className={"text-4xl text-white font-bold"}>Personal Game Library</h1>
            <div className={"flex flex-row space-x-4"}>
                <Link className={"flex justify-center items-center text-2xl bg-green-700 shadow-green-950 drop-shadow text-white  w-40 h-20"} to={"/register"}>Sign Up</Link>
                <Link className={"flex justify-center items-center text-2xl bg-green-700 shadow-green-950 drop-shadow text-white w-40 h-20"} to={"/login"}>Login</Link>
            </div>
        </div>
    );
}
