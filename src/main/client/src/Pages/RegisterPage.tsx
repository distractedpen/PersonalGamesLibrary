import * as Yup from 'yup';
import {useAuth} from "../Context/useAuth.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";

type RegisterFormInputs = {
    userName: string;
    email: string;
    password: string;
};

const validation = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function RegisterPage() {
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors }} = useForm<RegisterFormInputs>({ resolver: yupResolver(validation)});

    const handleLogin = (form: RegisterFormInputs) => {
        registerUser(form.email, form.userName, form.password);
    }

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center space-y-5">
            <h1 className={"text-4xl text-white font-bold"}>Personal Game Library</h1>
            <div className={"bg-gray-800 p-6 space-y-6"}>
                <h1 className={"text-xl text-white font-bold text-center"}>
                    Sign Up
                </h1>
                <form className={"space-y-6 flex flex-col items-center"} onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <input type={"text"} className={"p-1"}
                               placeholder={"Username"} {...register("userName")} />
                        {errors.userName ? <p className={"text-red-500"}>{errors.userName.message}</p> : ""}
                    </div>
                    <div>
                        <input type={"text"} className={"p-1"}
                               placeholder={"Email"} {...register("email")} />
                        {errors.email ? <p className={"text-red-500"}>{errors.email.message}</p> : ""}
                    </div>
                    <div>
                        <input type={"password"} className={"p-1"}
                               placeholder={"Password"} {...register("password")} />
                        {errors.password ? <p className={"text-red-500"}>{errors.password.message}</p> : ""}
                    </div>
                    <div className={"space-x-5"}>
                        <button type="submit" className="p-4 bg-green-700 hover:bg-green-800 text-white text-2xl">
                            Register
                        </button>
                        <Link to={"/login"} className={"p-4 bg-green-700 hover:bg-green-800 text-white text-2xl"}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
