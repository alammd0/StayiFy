import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/app";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPropertyById } from "../../services/operations/propertyApi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { formatDate } from "../../utils/formData";

interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    image: string;
    bookings: any[];
    reviews: any[];
    name: string,
    status: string,
    user: any,
    createdAt: any
}


const MyPropertiesDetails = () => {


    const { token } = useSelector((state: RootState) => state.auth);
    console.log("Inside the my properties details : " + token);

    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams<any>();
    const userId = Number(id);
    console.log(userId);

    const [myProperties, setMyProperties] = useState<Property | null>(null);

    const location = useLocation();


    useEffect(() => {
        const fetchPropertiesDetails = async () => {

            try {

                const response: any = await dispatch(getPropertyById(token, userId));

                console.log("Response inside get property by id uer Details: " + response);

                setMyProperties(response.data);

            }
            catch (err) {

                console.log("Error Fetching in get property by id uer Details: " + err);
                throw err
            }

        };

        fetchPropertiesDetails();

    }, [userId, token]);


    console.log(myProperties)

    return (
        <div className="flex flex-col gap-5">
            <div className="text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                {location.pathname}
            </div>


            <div className="pl-16 flex flex-col gap-5">

                <h2 className=" capitalize text-2xl font-semibold text-slate-600">{myProperties?.title}</h2>

                <div className="flex gap-5">
                    <div className="h-[420px] w-[600px] bg-slate-600 flex items-center justify-center p-3 rounded-2xl">
                        <img src={myProperties?.image} alt="Property" className=" w-full h-full rounded-xl" />
                    </div>

                    <div className="text-xl pt-4 font-semibold text-slate-500 flex gap-3 flex-col">
                        <p className="flex items-center text-center">Price : <span className="text-md"> <FaIndianRupeeSign /> </span> {myProperties?.price}</p>
                        <p>Total bookings : {myProperties?.bookings.length === 0 ? "0" : myProperties?.bookings.length}</p>


                        <div className="bg-slate-950 p-3 w-full text-slate-50 rounded-xl text-lg">
                            Author Name : {myProperties?.user?.name}
                        </div>


                        <p>Status : <span className=" text-sm text-green-500">{myProperties?.status}</span></p>

                        <p>Published on : {formatDate(myProperties?.createdAt)}</p>
                    </div>

                </div>

                <div className="flex flex-col gap-4 text-slate-600">
                    <p className="text-xl pt-4 font-semibold text-slate-500">location : {myProperties?.location}</p>
                    <p className=" text-sm font-semibold">{myProperties?.description}</p>
                    <p className="text-xl pt-4 font-semibold text-slate-500">Total reviews : {myProperties?.reviews.length === 0 ? "0" : myProperties?.reviews.length}</p>
                    <p></p>
                </div>



            </div>


        </div>
    )
}

export default MyPropertiesDetails
