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
    const locations = useLocation();
    const navigate = useNavigate();

    const token = useSelector((state: any) => state.auth.token);
    console.log("token Creation From:", token);

    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);


    const isEditMode = !!id;

    const [propertyData, setPropertyData] = useState<PropertyInput>({
        title: "",
        description: "",
        image: null,
        price: 0,
        location: "",
    });

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            const fileInput = e.target as HTMLInputElement;
            console.log(fileInput.files);
            if (fileInput.files && fileInput.files.length > 0) {
                setPropertyData({ ...propertyData, image: fileInput.files[0] });

                // Show preview	
                const reader = new FileReader();
                reader.onload = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(fileInput.files[0]);

            }
        } else {
            setPropertyData({ ...propertyData, [name]: value });
        }
    };


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


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            setPropertyData({ ...propertyData, image: file });

            // Show preview
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    return (
        <div className="flex flex-col gap-5">

            <div className="text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                {locations.pathname}
            </div>

            <div className="pl-12 text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                {isEditMode ? "Edit Property" : "Create Property"}
            </div>

            <div className="pl-8 max-w-[980px] mx-auto w-full">
                <form onSubmit={handleSubmit} className="pl-14 flex flex-col gap-4" >
                    <label className="flex flex-col gap-2">
                        <p className=" text-lg text-slate-900 font-semibold">Property Title : <sup className="text-red-600">*</sup></p>
                        <input
                            type="text"
                            name="title"
                            value={propertyData.title}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded "
                        />
                    </label>

                    <label className="flex flex-col gap-2">
                        <p className=" text-lg text-slate-900 font-semibold" >Description : <sup>*</sup></p>
                        <textarea
                            name="description"
                            rows={8}
                            value={propertyData.description}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded no-scrollbar"
                        />
                    </label>

                    {/* Image */}
                    <label className="flex flex-col gap-2">
                        <p className="text-lg text-slate-900 font-semibold">
                            Image: <sup className="text-red-500">*</sup>
                        </p>

                        <div
                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-fit object-cover rounded-md border border-gray-300"
                                />
                            ) : (
                                <p className="text-gray-600 text-sm">
                                    Drag & drop an image here or <span className="text-blue-500 font-semibold">browse</span>
                                </p>
                            )}
                        </div>

                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                            className="border p-2 rounded hidden"
                        />
                    </label>

                    {/* <FileUpload handleFileChange={handleChange} /> */}

                    <label className="flex flex-col gap-2">
                        <p className=" text-lg text-slate-900 font-semibold">Price : <sup>*</sup></p>
                        <input
                            type="number"
                            name="price"
                            value={propertyData.price}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded no-spinner"
                        />
                    </label>

                    <label className="flex flex-col gap-2">
                        <p className=" text-lg text-slate-900 font-semibold">Location : <sup>*</sup></p>
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
