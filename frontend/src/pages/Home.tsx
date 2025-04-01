
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store/app";
import { useDispatch } from "react-redux";
import { getAllProperty } from "../services/operations/propertyApi";
import PropertiesCards from "../components/sidebar/PropertiesCards";
import { Link } from "react-router-dom";

const Home = () => {

    const [allProperty, setAllProperty] = useState([]);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fettAllProperty = async () => {
            try {

                const response: any = await dispatch(getAllProperty());

                console.log("Response inside home : " + response.data);

                setAllProperty(response.data);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        };

        fettAllProperty();
    }, [])

    // console.log("allProperty : " + JSON.stringify(allProperty));

    return (
        <div className="bg-slate-400 mt-16">
            <div className="pt-8 pb-5 max-w-[1180px] mx-auto">

                <div>
                    {
                        allProperty.length > 0 ? (
                            <div className="flex flex-wrap gap-10 justify-center">
                                {
                                    allProperty.map((property: any) => (
                                        <Link to={`/propertie/${property.id}`}>
                                            <div key={property.id} className="w-full h-full">
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

        </div>
    )
}

export default Home
