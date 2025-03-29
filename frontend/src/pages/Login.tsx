import AuthForm from "../components/auth/AuthForm"
import AuthImage from "../components/auth/AuthImage"

const Login = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-200">
            <div className="flex items-center gap-10 bg-slate-100 py-24 px-25 rounded-2xl shadow-xl">
                <div className="max-w-1/2 w-full">
                    <AuthForm type="login" />
                </div>

                <div className="max-w-1/2 w-full">
                    <AuthImage type="login" />
                </div>
            </div>

        </div>
    )
}

export default Login