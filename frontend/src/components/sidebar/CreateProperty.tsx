import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store/app";
import { createProperty } from "../../services/operations/propertyApi";

interface PropertyInput {
    title: string;
    description: string;
    image: File | null;
    price: number;
    location: string;
}

const CreateProperty = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    // const locations = useLocation();
    const navigate = useNavigate();

    const token = useSelector((state: any) => state.auth.token);
    console.log("token Creation From:", token);

    const isEditMode = !!id;

    const [propertyData, setPropertyData] = useState<PropertyInput>({
        title: "",
        description: "",
        image: null,
        price: 0,
        location: "",
    });

    // Handle input changes including file uploads
    const handleChange = (e: any) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            const fileInput = e.target as HTMLInputElement;
            console.log(fileInput.files);
            if (fileInput.files && fileInput.files.length > 0) {
                setPropertyData({ ...propertyData, image: fileInput.files[0] });
            }
        } else {
            setPropertyData({ ...propertyData, [name]: value });
        }
    };

    // ✅ Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert("You are not logged in");
            return navigate("/login");
        }

        console.log("Submitting property:", propertyData);

        dispatch(createProperty({
            ...propertyData,
            navigate,
            token
        }));
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                {isEditMode ? "Edit Property" : "Create Property"}
            </div>

            <div className="pl-8">
                <form onSubmit={handleSubmit} className="pl-8 flex flex-col gap-4">
                    <label>
                        <p>Property Name:</p>
                        <input
                            type="text"
                            name="title"
                            value={propertyData.title}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                    </label>

                    <label>
                        <p>Description:</p>
                        <textarea
                            name="description"
                            value={propertyData.description}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                    </label>

                    <label>
                        <p>Image:</p>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                            className="border p-2 rounded"
                        />
                    </label>

                    <label>
                        <p>Price:</p>
                        <input
                            type="number"
                            name="price"
                            value={propertyData.price}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                    </label>

                    <label>
                        <p>Location:</p>
                        <input
                            type="text"
                            name="location"
                            value={propertyData.location}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded"
                        />
                    </label>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        {isEditMode ? "Update Property" : "Create Property"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProperty;
