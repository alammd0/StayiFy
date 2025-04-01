import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate } from "../../utils/formData";
import { IoIosStar } from "react-icons/io";

interface PropertiesCardsProps {
    title: string,
    description: string,
    image: string,
    price: number,
    location: string,
    rating: number[],
    createAt: any,
    status: any
}

const PropertiesCards = ({ title, description, image, price, location, rating, createAt, status }: PropertiesCardsProps) => {

    return (
        <div className="max-w-[320px] w-full h-full mx-auto bg-slate-600 p-4 border-2 border-slate-400 rounded-lg shadow-xl flex flex-col gap-2
         transform hover:scale-105 transition duration-300 hover:shadow-slate-900 hover:shadow-2xs">
            <div className="rounded-xl h-[300px] w-full">
                <img className="rounded-lg h-full w-full" src={image} alt="" />
            </div>

            <div className="text-slate-200 pl-1 pr-1">
                <div className="flex justify-between items-center ">
                    <h1 className="text-lg font-semibold text-slate-200 hover:underline">{title}</h1>
                    <p className="flex items-center text-sm justify-center gap-1"> <IoIosStar /> {rating && rating.length !== 0 ? rating : 12}</p>
                </div>

                <div>
                    <p>{description && description.length > 40 ? description.slice(0, 50) + "..." : description}</p>
                    <div className="flex justify-between text-[12px]">
                        <p className="flex items-center underline" > <FaIndianRupeeSign /> <span className="text-slate-200 text-lg">{price}</span> </p>
                        <p className="flex text-sm text-center items-center"> <FaLocationDot /> <span className="text-slate-200 text-sm">{location}</span> </p>
                    </div>
                </div>

                <p className="text-green-400 text-sm font-semibold" >{status}</p>

                <div className="text-[12px] text-slate-200 font-semibold">
                    Published on : {formatDate(createAt)}
                </div>
            </div>

        </div>
    )
}

export default PropertiesCards
