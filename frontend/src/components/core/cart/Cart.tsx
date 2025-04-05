import { useDispatch, useSelector } from "react-redux";
import { MdCurrencyRupee } from "react-icons/md";
import { useState, useMemo } from "react";
import DatePickerModal from "../../common/DatePickerModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../redux/store/app";
import { createBooking } from "../../../services/operations/booking";


const Cart = () => {
    const cartItem = useSelector((state: any) => state.cart.cart);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const token = useSelector((state: any) => state.auth.token);
    console.log("token Cart Page:", token);

    const { id } = useSelector((state: any) => state.auth.user);
    console.log("user Cart Page:", id);

    const dispatch: AppDispatch = useDispatch();

    const totalDays = useMemo(() => {
        if (startDate && endDate) {
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1); // Ensure minimum 1 day
        }
        return 1;
    }, [startDate, endDate]);



    function handlePayment(propertyId: number, amount: number) {
        if (!startDate || !endDate) {
            toast.error("Please select check-in and check-out dates");
            return;
        }

        // Dispatch the createBooking action with the required object
        dispatch(
            createBooking({
                userId: id,
                propertyId,
                totalPrice: amount,
                startDate,
                endDate,
                token,
                navigate,
            }) as any
        );
    }

    const nights = Math.floor(
        (startDate && endDate) ?
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24) :
            0
    );

    // const totalDays = Math.floor(
    //     (startDate && endDate) ?
    //         (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24) :
    //         0
    // ) + 1;



    return (
        <div>

            <div className="max-w-[1180px] mx-auto mt-[90px]">

                {cartItem.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px]">
                        <p className="text-2xl font-semibold text-gray-600">No items in your cart</p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Go Home
                        </button>
                    </div>
                ) : (
                    cartItem.map((item: any) => (
                        <div key={item.id} className="flex gap-28 mb-6 border p-4 rounded-lg shadow-lg">
                            <div className="flex flex-col gap-4">
                                <div className="text-2xl font-semibold text-slate-600">{item.title}</div>
                                <div className="h-[400px] w-[700px] bg-slate-600 p-4 rounded-xl">
                                    <img src={item.image} alt="No Image" className="h-full w-full rounded-sm" />
                                </div>
                                <div className="text-lg text-slate-500 max-w-[700px]">{item.description}</div>
                            </div>

                            <div className="flex flex-col gap-4 justify-center">
                                <p className="flex items-center text-xl">
                                    Price: <MdCurrencyRupee className="mx-1" /> {item?.price}
                                </p>

                                <div>
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
                                    >
                                        Select Dates
                                    </button>

                                    {startDate && (
                                        <p className="mt-4 text-lg font-semibold">Check-in: {startDate.toLocaleDateString()}</p>
                                    )}
                                    {endDate && (
                                        <p className="mt-2 text-lg font-semibold">Check-out: {endDate.toLocaleDateString()}</p>
                                    )}

                                    <p className="mt-2 text-lg font-semibold">Total Night Stay : {nights}</p>
                                    <p className="mt-2 text-lg font-semibold">Total Day Stay : {totalDays}</p>
                                </div>

                                <p className="flex items-center text-xl">
                                    Total Price: <MdCurrencyRupee className="mx-1" /> {item?.price * totalDays}
                                </p>

                                <button

                                    onClick={() => handlePayment(item.id, item.price * totalDays)}

                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {isOpen && (
                    <DatePickerModal
                        onClose={() => setIsOpen(false)}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )}


            </div>
        </div>

    );
};

export default Cart;
