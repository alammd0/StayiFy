import AuthForm from "../components/auth/AuthForm"
import AuthImage from "../components/auth/AuthImage"

const Signup = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-200">
            <div className="flex items-center gap-10 bg-slate-100 py-12 px-20 rounded-2xl shadow-xl">
                <div className="max-w-1/2 w-full">
                    <AuthForm type="signup" />
                </div>

                <div className="max-w-1/2 w-full">
                    <AuthImage type="signup" />
                </div>
            </div>
        </div>
    )
}

export default Signup
