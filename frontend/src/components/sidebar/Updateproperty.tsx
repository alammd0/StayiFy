import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store/app";
import { getPropertyById, updateProperty } from "../../services/operations/propertyApi";

interface PropertyInput {
    title: string;
    description: string;
    image: File | null;
    price: number;
    location: string;
}

const UpdateProperty = () => {
    const { id } = useParams();
    console.log("id:", id);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.token);
    console.log(token);

    const [propertyData, setPropertyData] = useState<PropertyInput>({
        title: "",
        description: "",
        image: null,
        price: 0,
        location: "",
    });

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            if (id && token) {
                const res: any = await dispatch(getPropertyById(Number(id), token));
                if (res) {
                    setPropertyData({
                        title: res.title || "",
                        description: res.description || "",
                        price: res.price || 0,
                        location: res.location || "",
                        image: null,
                    });
                    setPreview(res.imageUrl || null);
                }
            }
        };
        fetchProperty();
    }, [id, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                setPropertyData(prev => ({ ...prev, image: file }));
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
            }
        } else {
            setPropertyData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !id) return;

        await dispatch(updateProperty(token, Number(id), propertyData, navigate));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold text-slate-700">Edit Property</h2>

            <input
                type="text"
                name="title"
                value={propertyData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
            />

            <textarea
                name="description"
                value={propertyData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Description"
                className="w-full p-2 border rounded"
            />

            {preview && (
                <img src={preview} alt="Preview" className="w-full h-auto rounded border" />
            )}
            <input type="file" name="image" accept="image/*" onChange={handleChange} />

            <input
                type="number"
                name="price"
                value={propertyData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 border rounded"
            />

            <input
                type="text"
                name="location"
                value={propertyData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-2 border rounded"
            />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Update Property
            </button>
        </form>
    );
};

export default UpdateProperty;
