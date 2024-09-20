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
        <div className="flex flex-col h-screen w-screen items-center justify-center  bg-[#DFDFDF]">
            <p className={"flex items-center mb-6 text-2xl font-semibold"}>Game Library Thing</p>
            <div className={"bg-gray-500 rounded-2xl"}>
                <div className={"p-6 space-y-6"}>
                    <h1 className={"text-xl font-bold text-center"}>
                        Login
                    </h1>
                    <form className={"space-y-6 flex flex-col items-center"} onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <input type={"text"} className={"rounded-md border-solid border-black border"}
                                   placeholder={"Username"} {...register("userName")} />
                            {errors.userName ? <p className={"text-red-500"}>{errors.userName.message}</p> : ""}
                        </div>
                        <div>
                            <input type={"password"} className={"rounded-md border-solid border-black border"}
                                   placeholder={"Password"} {...register("password")} />
                            {errors.password ? <p className={"text-red-500"}>{errors.password.message}</p> : ""}
                        </div>
                        <button type="submit"
                                className="w-full h-1/12 rounded-md bg-lavender_(web)">Sign
                            In
                        </button>
                        <p>Don't have an account? <Link to="/register" className={"text-blue-900 underline"}>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
