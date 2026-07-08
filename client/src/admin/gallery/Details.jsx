import React, { useEffect, useState } from "react";
import { FileText, Image, Save, Trash2, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../assets/constant";
import axios from "axios";

const GalleryDetails = () => {
  const { galleryId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGalleryDetails();
  }, []);

  const fetchGalleryDetails = async () => {
    try {
      if (!galleryId) {
        navigate("/admin/gallery/panel");
        return;
      }
      const res = await axios.get(`${API}/api/gallery/${galleryId}`, {
        withCredentials: true,
      });
      if (res.status !== 200)
        throw new Error("Failed to fetch gallery details");

      setTitle(res.data.title);
      setDescription(res.data.description);
      setPreview(`${API}${res.data.image}`); // ✅ Ensure full image URL
    } catch (error) {
      console.error("Error fetching gallery details:", error);
      navigate("/admin/gallery/panel");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        `${API}/api/gallery/${galleryId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("✅ Gallery item updated successfully!");
        fetchGalleryDetails();
      } else {
        alert("❌ Failed to update gallery item");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while updating the gallery item");
    }
  };

  const deleteGalleryItem = async () => {
    try {
      const res = await axios.delete(`${API}/api/gallery/${galleryId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert("✅ Gallery item deleted successfully!");
        navigate("/admin/gallery/panel");
      } else {
        throw new Error("Failed to delete gallery item");
      }
    } catch (error) {
      console.error("Deletion error:", error);
      alert("An error occurred while deleting the gallery item");
    }
  };

  return (
    <div className="bg-white p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <FileText className="mr-2 text-orange-500" />
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-300"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <FileText className="mr-2 text-orange-500" />
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-300"
            placeholder="Enter description"
            rows="4"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <Image className="mr-2 text-orange-500" />
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-300"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 max-h-48 mx-auto border border-gray-300 rounded-md"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 flex items-center gap-2"
          >
            <Save className="w-4 h-auto text-white" />
            Save
          </button>
          <Link
            to="/admin/gallery/panel"
            className="bg-gray-500 text-white px-6 py-2 rounded flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-auto text-white" />
            Back
          </Link>
          <button
            type="button"
            onClick={deleteGalleryItem}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-auto text-white" />
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryDetails;
