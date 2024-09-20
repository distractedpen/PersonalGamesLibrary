import axios from "axios";
import { handleError } from "../Utils/ErrorHandler.tsx";
import {UserProfileToken} from "../Models/User.ts";

const api = "http://localhost:8004/api";

export const loginApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}/account/login`, {
            username: username,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerApi = async (username: string, email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}/account/register`, {
            username: username,
            email: email,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}
