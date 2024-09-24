import * as Yup from 'yup';
import {useAuth} from "../Context/useAuth.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";

type LoginFormInputs = {
    userName: string;
    password: string;
};

const validation = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default function LoginPage() {
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors }} = useForm<LoginFormInputs>({ resolver: yupResolver(validation)});

    const handleLogin = (form: LoginFormInputs) => {
        loginUser(form.userName, form.password);
    }

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center space-y-5 bg-gray-700">
            <h1 className={"text-4xl text-white font-bold"}>Personal Game Library</h1>
            <div className={"bg-gray-800 p-6 space-y-6"}>
                <h1 className={"text-2xl text-white font-bold text-center"}>
                    Login
                </h1>
                <form className={"space-y-6 flex flex-col items-center"} onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <input type={"text"} className={"p-1"}
                               placeholder={"Username"} {...register("userName")} />
                        {errors.userName ? <p className={"text-red-500"}>{errors.userName.message}</p> : ""}
                    </div>
                    <div>
                        <input type={"password"} className={"p-1"}
                               placeholder={"Password"} {...register("password")} />
                        {errors.password ? <p className={"text-red-500"}>{errors.password.message}</p> : ""}
                    </div>
                    <button type="submit" className="w-full bg-green-700 text-white">
                        Login
                    </button>
                    <p className={"text-white"}>Don't have an account? <Link to="/register" className={"text-white underline"}>Sign
                        Up</Link></p>
                </form>
            </div>
    </div>
)
}
