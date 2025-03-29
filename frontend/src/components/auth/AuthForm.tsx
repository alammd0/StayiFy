import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/app"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../services/operations/authApi";
import { RiUser4Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TbLockPassword } from "react-icons/tb";
import { FaUser } from "react-icons/fa";


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
        <div className="w-full flex flex-col gap-3">
            <div className="text-2xl font-bold">
                {isSignup ? "Create Account" : "Welcome Back"}
            </div>

            <div>
                <form className="flex flex-col gap-2" onSubmit={submitHandler}>
                    {/* username */}
                    {isSignup && (
                        <div>
                            <label htmlFor="username">
                                <p className="text-md font-semibold text-slate-400">Username : <sup className="text-red-500">*</sup></p>
                                <div className="flex gap-2 items-center px-3 py-1 rounded-md border-b border-slate-400 focus:outline-none mb-1">
                                    <RiUser4Fill size={17} />
                                    <input
                                        type="text"
                                        className="w-full border-none focus:outline-none"
                                        name="username"
                                        id="username"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        required
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                            </label>
                        </div>
                    )}

                    {/* email */}
                    <div>
                        <label htmlFor="email">
                            <p className="text-md font-semibold text-slate-400">Email : <sup>*</sup></p>

                            <div className="flex gap-2 items-center px-3 py-1 rounded-md border-b border-slate-400 focus:outline-none mb-1">
                                <MdEmail size={17} />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full border-none focus:outline-none"
                                    placeholder="Enter valid email address"
                                    value={formData.email}
                                    required
                                    onChange={inputChangeHandler}
                                />
                            </div>

                        </label>
                    </div>

                    {/* name */}
                    {isSignup && (
                        <div>
                            <label htmlFor="name">
                                <p className="text-md font-semibold text-slate-400">Name : <sup>*</sup></p>
                                <div className="flex gap-2 items-center px-3 py-1 rounded-md border-b border-slate-400 focus:outline-none mb-1">
                                    <FaUser size={17} />
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="w-full border-none focus:outline-none"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        required
                                        onChange={inputChangeHandler}
                                    />
                                </div>

                            </label>
                        </div>
                    )}

                    {/* add option USER and HOST */}
                    {
                        isSignup && (
                            <label htmlFor="accountType">
                                <p className="text-md font-semibold text-slate-400">Role : <sup>*</sup></p>
                                <select name="accountType" id="accountType" className="flex gap-2 items-center px-3 py-1 rounded-md border-b border-slate-400 focus:outline-none mb-1" value={formData.accountType} onChange={inputChangeHandler}>
                                    <option value="USER" className="w-full border-none focus:outline-none">USER</option>
                                    <option value="HOST" className="w-full border-none focus:outline-none">HOST</option>
                                </select>
                            </label>

                        )
                    }

                    {/* phone */}
                    {isSignup && (
                        <div>
                            <label htmlFor="phoneNumber">
                                <p className="text-md font-semibold text-slate-400">Phone Number : <sup>*</sup></p>
                                <div className="flex gap-2 items-center px-3 py-1 rounded-md border-b border-slate-400 focus:outline-none mb-1">
                                    <BsFillTelephoneFill size={17} />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        className="w-full border-none focus:outline-none"
                                        placeholder="Enter your phone number"
                                        value={formData.phoneNumber}
                                        required
                                        onChange={inputChangeHandler}
                                        pattern="[0-9]*"
                                        autoComplete="tel"
                                    />
                                </div>

                            </label>
                        </div>
                    )}

                    {/* password */}
                    <div>
                        <label htmlFor="password">
                            <p className="text-md font-semibold text-slate-400">Password : <sup>*</sup></p>
                            <div className="flex gap-2 items-center px-3 py-1 rounded-md border-b border-slate-400 focus:outline-none mb-1">
                                < TbLockPassword size={17} />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    className="w-full border-none focus:outline-none"
                                    required
                                    onChange={inputChangeHandler}
                                />
                            </div>

                        </label>
                    </div>

                    <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-md">
                        {loading ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;