import { Outlet } from "react-router";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {UserProvider} from "./Context/useAuth.tsx";

function App() {
    return (
        <UserProvider>
            <ToastContainer position={"top-left"} theme={"dark"}/>
            <Outlet/>
        </UserProvider>
    );
}

export default App;

