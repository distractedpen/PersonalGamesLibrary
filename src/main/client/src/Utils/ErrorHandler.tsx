import axios from "axios";
export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const err = error.response;
        if (Array.isArray(err?.data.errors)) {
            for (const val of err.data.errors) {
                console.log(val.description);
            }
        } else if (typeof err?.data.errors === "object") {
            for (const e in err?.data.errors) {
                console.log(err.data.errors[e][0]);
            }
        }
    } else if (error?.data) {
        console.log(error.data);
    } else if (error?.statusl == 401) {
        console.log("Please login");
        window.history.pushState({}, "LoginPage", "/login");
    } else if (error) {
        console.log(error?.data);
    }
}
