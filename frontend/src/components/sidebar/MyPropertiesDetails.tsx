import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/app";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getPropertyById } from "../../services/operations/propertyApi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { formatDate } from "../../utils/formData";
import { addToCart } from "../../redux/slices/cartSlice";
import Footer from "../core/Footer";
import ImageSkeletonLoader from "../common/ImageSkeletion";

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
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams<any>();
    const userId = Number(id);
    const [myProperties, setMyProperties] = useState<Property | null>(null);
    const location = useLocation();
    const user = useSelector((state: any) => state.auth.user);
    const fetchedRef = useRef(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (fetchedRef.current) return;
        fetchedRef.current = true;


        const fetchPropertiesDetails = async () => {
            try {
                setLoading(true);
                if (token) {
                    const response: any = await dispatch(getPropertyById(userId, token));
                    setMyProperties(response.data);
                    setLoading(false);
                }
            }
            catch (err) {
                console.log("Error Fetching in get property by id uer Details: " + err);
                throw err
            }

        };

        fetchPropertiesDetails();

    }, [userId]);

    function cartHandler() {
        dispatch(addToCart(myProperties));
    }

    if (loading) {
        return (
            <div>
                <ImageSkeletonLoader />
            </div>
        )
    } else {
        return (
            <div>
                <div className={`${user && user.accountType === "USER" ? "max-w-[1180px] mx-auto pt-[90px] flex flex-col gap-5" : "flex flex-col gap-5"} `}>
                    <div className="text-lg font-semibold text-slate-600 tracking-[0.09em] font-stretch-extra-condensed">
                        {location.pathname}
                    </div>


                    <div className="pl-16 pr-16flex flex-col gap-5">

                        <div>
                            <h2 className="capitalize text-2xl font-semibold text-slate-600 pb-6">{myProperties?.title}</h2>
                        </div>

                        <div className="flex flex-row justify-between items-center">
                            <div className="h-[420px] w-[600px] bg-slate-600 flex items-center justify-center p-3 rounded-2xl">
                                <img src={myProperties?.image} alt="Property" className=" w-full h-full rounded-xl" />
                            </div>

                            <div className="text-xl pt-4 font-semibold text-slate-500 flex gap-3 flex-col">
                                <p className="flex items-center text-center">Price : <span className="text-md"> <FaIndianRupeeSign /> </span> {myProperties?.price}</p>

                                {user?.accountType === "HOST" &&
                                    <p>Total bookings : {myProperties?.bookings.length === 0 ? "0" : myProperties?.bookings.length}</p>
                                }


                                <p>Status : <span className=" text-sm text-green-500">{myProperties?.status}</span></p>

                                <div className="bg-slate-950 p-3 w-full text-slate-50 rounded-xl text-lg">
                                    Author Name : {myProperties?.user?.name}
                                </div>


                                {
                                    user?.accountType === "USER" && (
                                        <div className="flex flex-col gap-3">
                                            {/* Book Now Button */}
                                            <Link
                                                to={`/property/${myProperties?.id}/cart`}
                                                onClick={cartHandler}
                                                className="bg-slate-700 p-3 w-full text-slate-50 rounded-xl text-lg text-center"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    )
                                }
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

                    <div className="flex flex-col gap-4 bg-slate-800 px-4 py-6 rounded-xl">
                        {
                            myProperties?.reviews.length === 0 ? (
                                <h1 className="text-2xl font-semibold text-slate-600 text-center">No Reviews</h1>
                            ) : (
                                myProperties?.reviews.map((review: any) => (
                                    <div className="flex flex-col gap-1 bg-slate-500 px-2 py-4 rounded-2xl">
                                        <p className="text-lg font-semibold">Rating : {review.rating}</p>

                                        <p className="text-lg font-normal">Comment : {review.comment}</p>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default MyPropertiesDetails
