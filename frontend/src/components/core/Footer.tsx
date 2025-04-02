import { Link } from "react-router-dom"

const footLink = [
    {
        id: 1,
        title: "Home",
        link: "/"
    },
    {
        id: 2,
        title: "login",
        link: "/login"
    },
    {
        id: 3,
        title: "signup",
        link: "/signup"
    }
]


const Footer = () => {
    return (
        <div className="bg-slate-500 p-4 mt-3">

            <div className="max-w-[1180px] mx-auto py-4 px-5 flex flex-col gap-10">
                <div className="text-xl uppercase font-bold text-slate-200 cursor-pointer">
                    <Link to="/">StayIfy</Link>
                </div>
                <div className="flex flex-row gap-3">
                    {
                        footLink.map((link) => {
                            return (
                                <div className="text-xl text-slate-900 font-semibold capitalize" key={link.id}>
                                    <Link to={`${link.link}`}>{link.title}</Link>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="text-center text-sm text-slate-300 font-semibold">
                    © 2025 StayIfy.
                </div>

            </div>
        </div>
    )
}

export default Footer
