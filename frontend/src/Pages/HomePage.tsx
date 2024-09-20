import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center w-screen h-screen justify-evenly bg-[#DFDFDF]">
            <h1 className={"text-4xl"}>Game Library Thing</h1>
            <div className={"flex flex-row space-x-4"}>
                <Link className={"flex justify-center items-center text-2xl rounded-2xl  bg-lavender_(web) shadow-black drop-shadow w-40 h-20"} to={"/register"}>Sign Up</Link>
                <Link className={"flex justify-center items-center text-2xl rounded-2xl  bg-lavender_(web) shadow-black drop-shadow w-40 h-20"} to={"/login"}>Login</Link>
            </div>
        </div>
    );
}
