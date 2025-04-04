import { formatDate } from "../../../utils/formData";
import { useState } from "react";
import { Rating } from 'react-simple-star-rating'
import { AppDispatch } from "../../../redux/store/app";
import { useDispatch, useSelector } from "react-redux";
import { createRating } from "../../../services/operations/rating";
import { useNavigate } from "react-router-dom";


interface PropertyCardProps {
    startDate: any;
    endDate: any;
    property: { image: string, title: string, description: string };
    user: { name: string, phoneNumber: number };
    price: number,
    userId: number,
    propertyId: number
}

const PropertyCard = ({ startDate, endDate, property, user, price, userId, propertyId }: PropertyCardProps) => {

    console.log("Property : ", property);
    console.log("User : ", user);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    console.log("price", userId);
    console.log("propertyId", propertyId);

    const [ratingModal, setRatingModal] = useState(false);
    const [rating, setRating] = useState<number | null>(null); // State for rating
    const [comment, setComment] = useState(""); // State for comment

    const dispatch: AppDispatch = useDispatch();
    const token = useSelector((state: any) => state.auth.token);
    const navigate = useNavigate();


    function ratingSubmit() {
        if (rating === null) {
            console.error("Please select a rating before submitting.");
            return;
        }

        dispatch(createRating({token, propertyId, userId, rating, comment, navigate}));

        console.log("Rating Type:", typeof rating);
        console.log("Comment:", comment);
        console.log("Property Id:", propertyId);
        console.log("User Id:", userId);
    }

    return (
        <div>
            <div className="flex gap-10 items-center mx-auto ml-16 mt-5">
                <div className="flex justify-center gap-10 lg:w-[820px] bg-slate-700 border-b-blue-500 border-2 rounded-xl shadow-slate-950 shadow-sm">
                    <div className="h-[290px] w-[50%]">
                        <img src={property?.image} className="h-full w-full px-2 py-4 rounded-xl" alt="" />
                    </div>
                    <div className="text-slate-200 flex justify-center flex-col gap-5 px-4 py-5 w-[50%]">
                        <div className="flex gap-1 flex-col">
                            <h4 className="text-xl font-semibold">Property Details : </h4>
                            <p className="text-xl font-medium">{property.title}</p>
                            <p>{property.description}</p>
                            <p className="text-sm">Stay Here : {formatDate(startDate)} to {formatDate(endDate)}</p>
                        </div>

                        <div>
                            <h4>User Info : </h4>
                            <p>User Name : {user.name}</p>
                            <p>Phone No : {user.phoneNumber}</p>
                        </div>

                        <div className="text-red-200 font-bold">Total Prices Paid : {price}</div>
                    </div>
                </div>

                <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={() => setRatingModal(true)}>Give Review and Raiting</button>
            </div>

            {
                ratingModal && (
                    <div className="fixed inset-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(20, 50, 150, 0.5)" }}
                    >
                        <div className="h-[400px] w-[800px] bg-slate-700 bg-opacity-50 pt-10 flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-semibold text-slate-200 text-shadow-lg">Gives Raiting and Review of the Property</h2>
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex gap-2 flex-col text-center">
                                    <Rating
                                        onClick={(newRating: number) => setRating(newRating)}
                                        size={30}
                                        SVGstyle={{ display: 'inline' }}
                                        transition
                                        initialValue={rating || 0}
                                    />
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <p className="text-slate-200 text-lg">Comment :</p>
                                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-slate-600 border-2 border-slate-950 outline-none hover:border-slate-700 p-2 rounded-sm" name="" id="" cols={40} rows={5}></textarea>
                                </div>

                                <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={ratingSubmit}>Submit</button>
                            </div>
                        </div>


                    </div>

                )
            }
        </div>
    )
}

export default PropertyCard
