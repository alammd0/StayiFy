import { formatDate } from "../../../utils/formData";

interface PropertyCardProps {
    startDate: any;
    endDate: any;
    property: { image: string, title: string, description: string };
    user: { name: string, phoneNumber: number };
    price: number
}

const PropertyCard = ({ startDate, endDate, property, user, price }: PropertyCardProps) => {

    console.log("Property : ", property);
    console.log("User : ", user);
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    return (
        <div>
            <div className="flex gap-10 items-center mx-auto ml-16 mt-5">
                <div className="flex justify-center gap-10 lg:w-[820px] bg-slate-700 border-b-blue-500 border-2 rounded-xl shadow-slate-950 shadow-sm">
                    <div className="h-[290px] w-[440px]">
                        <img src={property?.image} className="h-full w-full px-2 py-4 rounded-xl" alt="" />
                    </div>
                    <div className="text-slate-200 flex justify-center flex-col gap-5 px-4 py-5">
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

                <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Give Review and Raiting</button>
            </div>
        </div>
    )
}

export default PropertyCard
