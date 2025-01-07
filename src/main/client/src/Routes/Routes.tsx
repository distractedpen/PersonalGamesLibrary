import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import ErrorPage from "../Pages/ErrorPage.tsx";
import LoginPage from "../Pages/LoginPage.tsx";
import Library from "../Pages/Library.tsx";
import HomePage from "../Pages/HomePage.tsx";
import RegisterPage from "../Pages/RegisterPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ViewGame from "../Pages/ViewGame.tsx";
import SearchPage from "../Pages/SearchPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <HomePage/>},
            // Auth Routes
            {path: "/login", element: <LoginPage/>},
            {path: "/register", element: <RegisterPage/>},
            // Open Routes?
            {path: "/search", element: <SearchPage/>},
            {path: "/game/:gameId", element: <ViewGame/>},
            // Protected Routes
            {path: "/library", element: <ProtectedRoute><Library/></ProtectedRoute>},
            {path: "/library/game/:gameId", element: <ProtectedRoute><ViewGame/></ProtectedRoute>},
        ],
        errorElement: <ErrorPage/>,
    }
]);