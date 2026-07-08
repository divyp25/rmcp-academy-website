import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { API } from "../../assets/constant";
export default function GalleryForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 6 * 1024 * 1024) {
      setError("File size must be under 6MB");
      setImage(null);
      setPreview(null);
    } else {
      setError("");
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload an image");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      const res = await axios.post(`${API}/api/gallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.status !== 201) throw new Error("Failed to upload image");
      alert("✅ Gallery item created successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      setError("Failed to upload image. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-center">
        Create Gallery Item
      </h2>
      {error && (
        <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
      )}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mb-4 w-full h-48 object-cover rounded-lg"
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded-lg w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 rounded-lg w-full"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded-lg w-full"
          required
        />
        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Save Item"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("/admin/gallery/panel")}
            className="bg-gray-500 text-white px-2 py-1 rounded-lg hover:bg-gray-600 disabled:bg-gray-400 flex gap-2 "
          >
            <ArrowLeft className="w-4" /> Back
          </button>
        </div>
      </form>
    </div>
  );
}
