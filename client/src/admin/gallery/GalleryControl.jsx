import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";
import g_fallback from "../../assets/img/g_fallback.png";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
const GalleryControl = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${API}/api/gallery`, {
          withCredentials: true,
        });
        if (response.status !== 200)
          throw new Error("Failed to fetch gallery items");
        setGalleryItems(response.data);
      } catch (err) {
        setError("Error loading gallery. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading)
    return (
      <div className="text-center my-10">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading gallery...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center my-10">
        <p className="text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="bg-white p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-sky-700"> Gallery Controls</h2>
        </div>
        <Link
          to="/admin/gallery/new-item"
          className="flex items-center bg-sky-500 text-white px-2 py-1 text-md rounded hover:bg-sky-600 transition"
        >
          <CirclePlus className="mr-2" />
          New Item
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryItems.length > 0 ? (
          galleryItems.map((item) => (
            <div
              key={item._id}
              className="relative group overflow-hidden cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition"
              onClick={() => navigate(`/admin/gallery/details/${item._id}`)}
            >
              <img
                src={item.image ? `${API}${item.image}` : g_fallback}
                alt={item.title}
                className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition">
                <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 px-4">
                  {item.title}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-3">
            No images found
          </p>
        )}
      </div>
    </div>
  );
};

export default GalleryControl;
