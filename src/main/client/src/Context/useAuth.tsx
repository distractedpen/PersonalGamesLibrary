﻿import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {UserProfile} from "../Models/User.ts";
import { useNavigate } from "react-router-dom";
import { registerApi , loginApi } from "../Services/AuthService.tsx"

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {

    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (username: string, password: string) => {
        await registerApi(username, password).then((res) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.username,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj!);
                navigate("/library");
            }
        }).catch((err) => console.log(err));
    }

    const loginUser = async (username: string, password: string) => {
        await loginApi(username, password).then((res) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.username,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj!);
                navigate("/library");
            }
        }).catch((err) => console.log(err));
    }

    const isLoggedIn = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    }

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}
export const useAuth = () => React.useContext(UserContext);