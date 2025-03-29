import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/app"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../services/operations/authApi";

interface AuthFormProps {
    type: "signup" | "login"
}

interface signupInput {
    username: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    accountType: string
}

const AuthForm = ({ type }: AuthFormProps) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<signupInput>({
        username: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        accountType: "USER"
    });

    const isSignup = type === "signup";

    function inputChangeHandler(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    console.log("formData : ", formData);


    const { username, name, email, password, phoneNumber, accountType } = formData

    function submitHandler(e: any) {
        e.preventDefault();
        setLoading(true);

        try {
            if (isSignup) {
                dispatch(signup({
                    username,
                    name,
                    email,
                    password,
                    phoneNumber,
                    accountType,
                    navigate
                }))
            } else {
                dispatch(login({
                    email,
                    password,
                    navigate
                }));
            }



        } catch (err) {
            console.error("Authentication error:", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <div>
                {isSignup ? "Create Account" : "Welcome Back"}
            </div>

            <div>
                <form onSubmit={submitHandler}>
                    {/* username */}
                    {isSignup && (
                        <div>
                            <label htmlFor="username">
                                <p>Username : <sup>*</sup></p>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    required
                                    onChange={inputChangeHandler}
                                />
                            </label>
                        </div>
                    )}

                    {/* email */}
                    <div>
                        <label htmlFor="email">
                            <p>Email : <sup>*</sup></p>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter valid email address"
                                value={formData.email}
                                required
                                onChange={inputChangeHandler}
                            />
                        </label>
                    </div>

                    {/* name */}
                    {isSignup && (
                        <div>
                            <label htmlFor="name">
                                <p>Name : <sup>*</sup></p>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    required
                                    onChange={inputChangeHandler}
                                />
                            </label>
                        </div>
                    )}

                    {/* add option USER and HOST */}
                    {
                        isSignup && (
                            <label htmlFor="accountType">
                                <p>Role : <sup>*</sup></p>
                                <select name="accountType" id="accountType" value={formData.accountType} onChange={inputChangeHandler}>
                                    <option value="USER">USER</option>
                                    <option value="HOST">HOST</option>
                                </select>
                            </label>

                        )
                    }

                    {/* phone */}
                    {isSignup && (
                        <div>
                            <label htmlFor="phoneNumber">
                                <p>Phone Number : <sup>*</sup></p>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    value={formData.phoneNumber}
                                    required
                                    onChange={inputChangeHandler}
                                    pattern="[0-9]*"
                                    autoComplete="tel"
                                />
                            </label>
                        </div>
                    )}

                    {/* password */}
                    <div>
                        <label htmlFor="password">
                            <p>Password : <sup>*</sup></p>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                required
                                onChange={inputChangeHandler}
                            />
                        </label>
                    </div>

                    <button disabled={loading} type="submit">
                        {loading ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;