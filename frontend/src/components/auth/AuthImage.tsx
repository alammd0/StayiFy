import loginImage from "../../assets/auth/login.jpg";
import signupImage from "../../assets/auth/signup.jpg";

interface AuthFormProps {
    type: "signup" | "login"
}

const AuthImage = ({ type }: AuthFormProps) => {
    return (
        <div>
            {
                type === "signup" ?
                    (
                        <div>
                            <img src={signupImage} alt="signup" />
                        </div>
                    )
                    :
                    (
                        <div>
                            <img src={loginImage} alt="login" />
                        </div>
                    )
            }
        </div>
    )
}

export default AuthImage
