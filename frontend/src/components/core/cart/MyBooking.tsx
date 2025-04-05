import { useSelector } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/app";
import { useEffect } from "react";
import { getBooking } from "../../../services/operations/booking";
import { Link, useParams } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { useRef } from "react";
import ImageSkeletonLoader from "../../common/ImageSkeletion";
import { deleteAllBooking } from "../../../services/operations/booking";
import { useNavigate } from "react-router-dom";



const MyBooking = () => {

    const token = useSelector((state: any) => state.auth.token);
    // console.log("Token from MyBooking:", token);

    const [bookingProperty, setBookingProperty] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const user = useParams();
    const userId = Number(user.id);
    // console.log("userId from MyBooking:", userId);

    const dispatch: AppDispatch = useDispatch();
    const fetchedRef = useRef(false);
    const navigate = useNavigate();


    useEffect(() => {

        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchBooking = async () => {
            setLoading(true);
            try {
                if (token) {
                    const response = await dispatch(getBooking(token, userId));
                    // console.log("Booking Response:", response.data);
                    setBookingProperty(response.data);
                } else {
                    console.error("No token found");
                }
            }
            catch (err) {
                console.error("Error fetching booking:", err);
                setLoading(false);
            }
            setLoading(false);
        }

        fetchBooking();
    }, [token]);

    // console.log("Booking Property:", bookingProperty)

    function handleClearAllBooking() {
        if (token) {
            dispatch(deleteAllBooking(token, userId, navigate));
        } else {
            return;
        }
    }

    if (loading) {
        return (
            <div>
                <ImageSkeletonLoader />
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                        {location.pathname}
                    </div>
                    <div className="flex justify-between">
                        <h1 className="pl-8 text-slate-500 capitalize font-semibold text-xl">My Bookings</h1>
                        {
                            bookingProperty.length !== 0 && (
                                <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleClearAllBooking}>Clear Your All Booking</button>
                            )
                        }
                    </div>

                </div>

                <div>
                    {
                        bookingProperty.length > 0 ? (
                            <div>
                                {bookingProperty.map((property: any) => (
                                    <div key={property.id}>
                                        <PropertyCard
                                            startDate={property.startDate}
                                            endDate={property.endDate}
                                            property={property.property}
                                            user={property.user}
                                            price={property.price}
                                            propertyId={property.propertyId}
                                            userId={property.userId}
                                            bookingId={property.id}
                                        />
                                    </div>

                                ))}
                            </div>
                        ) : (
                            <div className=" px-2 pt-[190px] rounded-sm flex flex-col justify-center items-center gap-3">
                                <p className="text-slate-500 font-bold text-xl">No Booking Found</p>
                                {
                                    bookingProperty.length === 0 && (
                                        <Link to="/" className="flex justify-end pr-4">
                                            <button className="bg-slate-500 text-slate-100 px-2 py-1 rounded-sm">Book Now</button>
                                        </Link>
                                    )
                                }

                            </div>
                        )
                    }
                </div>

                <div>
                    {
                        bookingProperty.length !== 0 && (
                            <Link to="/" className="flex justify-end pr-4">
                                <button className="bg-slate-500 text-slate-100 px-2 py-1 rounded-sm">Book Now</button>
                            </Link>
                        )
                    }
                </div>
            </div >
        )
    }


}

export default MyBooking