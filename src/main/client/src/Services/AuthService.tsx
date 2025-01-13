import axios from "axios";
import { handleError } from "../Utils/ErrorHandler.tsx";
import {UserProfileToken} from "../Models/User.ts";

const api = "http://localhost:80/api/auth";

export const loginApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}/login`, {
            username: username,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}/register`, {
            username: username,
            password: password
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}
