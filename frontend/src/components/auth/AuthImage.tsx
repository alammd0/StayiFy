import { Link } from "react-router-dom";
import loginImage from "../../assets/auth/login.jpg";
import signupImage from "../../assets/auth/signup.jpg";

interface AuthFormProps {
    type: "signup" | "login"
}

const AuthImage = ({ type }: AuthFormProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div>
                {
                    type === "signup" ?
                        (
                            <div className="h-[350px]">
                                <img className="h-full rounded-xl" src={signupImage} alt="signup" />
                            </div>
                        )
                        :
                        (
                            <div className="h-[350px]">
                                <img className="h-full rounded-xl" src={loginImage} alt="login" />
                            </div>
                        )
                }
            </div>

            <div>
                {
                    type === "signup" ? (
                        <div className="text-md font-semibold text-slate-400">
                            Already Have An Account? <Link to="/login"><span className="text-sky-600 underline">Login</span></Link>
                        </div>
                    ) : (
                        <div className="text-md font-semibold text-slate-400">
                            Don't Have An Account? <Link to="/signup"><span className="text-sky-600 underline">Signup</span></Link>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default AuthImage
