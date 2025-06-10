
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store/app";
import { useDispatch } from "react-redux";
import { getAllProperty } from "../services/operations/propertyApi";
import PropertiesCards from "../components/sidebar/PropertiesCards";
import { Link } from "react-router-dom";
import Footer from "../components/core/Footer";
import { SkeletonLoader } from "../components/common/Skeletion";
import { useRef } from "react";

const Home = () => {

    const [allProperty, setAllProperty] = useState([]);
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return; 
        fetchedRef.current = true;

        const fettAllProperty = async () => {
            try {
                setLoading(true)
                const response: any = await dispatch(getAllProperty());
                setAllProperty(response.data);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        };

        fettAllProperty();
    }, [])

    if (loading) {
        return (
            <div>
                <SkeletonLoader />
            </div >
        )
    } else {
        return (
            <div className="bg-slate-400 mt-16">
                <div className="pt-8 pb-5 max-w-[1180px] mx-auto">

                    <div>
                        {
                            allProperty.length > 0 ? (
                                <div className="flex flex-wrap gap-10 justify-center">
                                    {
                                        allProperty.map((property: any) => (
                                            <Link to={`/property/${property.id}`}>
                                                <div key={property.id} className="w-full h-full">
                                                    <PropertiesCards
                                                        title={property.title}
                                                        description={property.description}
                                                        price={property.price}
                                                        location={property.location}
                                                        image={property.image}
                                                        reviews={property.reviews}
                                                        status={property.status}
                                                        createAt={property.createdAt}
                                                    />
                                                </div>
                                            </Link>

                                        ))
                                    }
                                </div>
                            ) : (
                                <p className="flex justify-center items-center h-[346px]">No properties found</p>
                            )
                        }
                    </div>

                </div>

                <div>
                    <Footer />
                </div>

            </div>
        )
    }

}

export default Home
