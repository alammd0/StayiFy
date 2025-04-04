import { useSelector } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/app";
import { useEffect } from "react";
import { getBooking } from "../../../services/operations/booking";
import { Link, useParams } from "react-router-dom";
import PropertyCard from "./PropertyCard";


const MyBooking = () => {

    const token = useSelector((state: any) => state.auth.token);
    console.log("Token from MyBooking:", token);

    const [bookingProperty, setBookingProperty] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const user = useParams();
    const userId = Number(user.id);
    // console.log("userId from MyBooking:", userId);

    const dispatch: AppDispatch = useDispatch();


    const booking = useSelector((state: any) => state.booking.bookings);
    console.log("Booking from MyBooking:", JSON.stringify(booking) || booking);


    useEffect(() => {
        const fetchBooking = async () => {
            setLoading(true);
            try {
                if (token) {
                    const response = await dispatch(getBooking(token, userId));
                    console.log("Booking Response:", response.data);
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

    console.log("Booking Property:", bookingProperty)

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                        {location.pathname}
                    </div>
                    <h1 className="pl-8 text-slate-500 capitalize font-semibold text-xl">My Bookings</h1>
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
                                        />
                                    </div>

                                ))}
                            </div>
                        ) : (
                            <div>
                                <p>No Booking Found</p>
                            </div>
                        )
                    }
                </div>

                <div>
                    <Link to="/" className="flex justify-end pr-4">
                        <button className="bg-slate-500 text-slate-100 px-2 py-1 rounded-sm">Book Now</button>
                    </Link>
                </div>
            </div >
        )
    }


}

export default MyBooking