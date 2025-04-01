import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store/app";
import { useDispatch, useSelector } from "react-redux";
import { getMypropertyDetails } from "../../services/operations/propertyApi";
import PropertiesCards from "./PropertiesCards";
import { Link, useLocation } from "react-router-dom";

const MyProperties = () => {
    const dispatch: AppDispatch = useDispatch();

    const token = useSelector((state: RootState) => state.auth.token);
    console.log("Token here : " + token);

    const [myProperties, setMyProperties] = useState([]);

    const location = useLocation();


    useEffect(() => {
        const fetchProperties = async () => {
            try {
                if (token) {
                    const response = await dispatch(getMypropertyDetails(token));
                    console.log(response.data.data);
                    setMyProperties(response.data.data);
                } else {
                    console.error("No token found");
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, [dispatch]);

    console.log(myProperties.length);

    return (

        <div className="flex flex-col gap-8">

            <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                    {location.pathname}
                </div>
                <h1 className="pl-8 text-slate-500 capitalize font-semibold text-xl">My Properties</h1>
            </div>

            <div className="pl-16 flex flex-col gap-3">
                {
                    myProperties.length > 0 ? (
                        <div className="flex flex-wrap gap-10">
                            {
                                myProperties.map((property: any) => (
                                    <Link to={`/dashboard/my-properties/${property.id}`}>
                                        <div key={property.id}>
                                            <PropertiesCards
                                                title={property.title}
                                                description={property.description}
                                                price={property.price}
                                                location={property.location}
                                                image={property.image}
                                                rating={property.rating}
                                                status={property.status}
                                                createAt={property.createdAt}
                                            />
                                        </div>
                                    </Link>

                                ))
                            }
                        </div>
                    ) : (
                        <p>No properties found</p>
                    )
                }
            </div>

        </div>

    );
};

export default MyProperties;
