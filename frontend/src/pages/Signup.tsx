import AuthForm from "../components/auth/AuthForm"
import AuthImage from "../components/auth/AuthImage"

const Signup = () => {
    return (
        <div>
            <div>
                <AuthForm type="signup" />
            </div>

            <div>
                <AuthImage type="signup" />
            </div>
        </div>
    )
}

export default Signup
