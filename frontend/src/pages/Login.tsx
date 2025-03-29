import AuthForm from "../components/auth/AuthForm"
import AuthImage from "../components/auth/AuthImage"

const Login = () => {
    return (
        <div>
            <div>
                <AuthForm type="login" />
            </div>

            <div>
                <AuthImage type="login" />
            </div>
        </div>
    )
}

export default Login