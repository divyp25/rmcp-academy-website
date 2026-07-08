import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";
import { User, GraduationCap, Award, Trash2, Edit2, PlusCircle, ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function TopStudentsPanel() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Form states
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [percentile, setPercentile] = useState("");
  const [photoSourceType, setPhotoSourceType] = useState("file"); // 'file' | 'url'
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/top-students`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch students list.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 6 * 1024 * 1024) {
        alert("File size must be under 6MB");
        return;
      }
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setClassName(student.class);
    setPercentile(student.percentile);
    if (student.photo && student.photo.startsWith("http")) {
      setPhotoSourceType("url");
      setPhotoUrl(student.photo);
      setPhoto(null);
      setPreview(student.photo);
    } else {
      setPhotoSourceType("file");
      setPhotoUrl("");
      setPhoto(null);
      setPreview(student.photo ? `${API}${student.photo}` : null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setClassName("");
    setPercentile("");
    setPhoto(null);
    setPhotoUrl("");
    setPhotoSourceType("file");
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !className || !percentile) {
      alert("Please fill all required fields");
      return;
    }

    if (!editingId && photoSourceType === "file" && !photo) {
      alert("Please upload an image file");
      return;
    }
    if (!editingId && photoSourceType === "url" && !photoUrl) {
      alert("Please enter an image URL");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("className", className);
    formData.append("percentile", percentile);
    
    if (photoSourceType === "file" && photo) {
      formData.append("photo", photo);
    } else if (photoSourceType === "url" && photoUrl) {
      formData.append("photoUrl", photoUrl);
    }

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`${API}/api/top-students/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        alert("✅ Student updated successfully!");
      } else {
        // CREATE
        await axios.post(`${API}/api/top-students`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        alert("✅ Top student added successfully!");
      }
      handleCancel();
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Operation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from top students?`)) {
      return;
    }

    try {
      await axios.delete(`${API}/api/top-students/${id}`, {
        withCredentials: true,
      });
      alert("🗑️ Removed successfully");
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete student.");
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="w-full py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  const resolveImage = (student) => {
    if (!student.photo) return null;
    if (student.photo.startsWith("http")) return student.photo;
    return `${API}${student.photo}`;
  };

  return (
    <div className="bg-white p-6 max-w-7xl mx-auto rounded-2xl shadow-sm border border-gray-100 mt-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight font-heading">
            Academic Toppers Panel
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage the top 10 rank students showing on the website home page.
          </p>
        </div>
        <Link
          to="/admin"
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-gray-200/60 h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 font-heading">
            {editingId ? <Edit2 className="w-5 h-5 text-sky-600" /> : <PlusCircle className="w-5 h-5 text-sky-600" />}
            {editingId ? "Edit Topper Details" : "Add New Topper"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                placeholder="e.g. Rahul Sharma"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class / Stream</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                placeholder="e.g. Class 12 (Science)"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Arabic numbers (e.g. 10, 11, 12) will be auto-converted to Roman numerals (X, XI, XII).
              </span>
            </div>

            {/* Percentile / Score */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Percentile / Percentage / Score</label>
              <input
                type="text"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                required
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                placeholder="e.g. 98.4% or 99.1 Percentile"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Rank is auto-calculated based on this score.
              </span>
            </div>

            {/* Photo Selection Option */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                Student Photo {!editingId && <span className="text-red-500">*</span>}
              </label>
              
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setPhotoSourceType("file");
                    setPreview(photo ? URL.createObjectURL(photo) : (editingId && students.find(s => s._id === editingId)?.photo && !students.find(s => s._id === editingId)?.photo.startsWith("http") ? `${API}${students.find(s => s._id === editingId).photo}` : null));
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                    photoSourceType === "file"
                      ? "bg-sky-50 border-sky-500/30 text-sky-700"
                      : "bg-white border-gray-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoSourceType("url");
                    setPreview(photoUrl || null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                    photoSourceType === "url"
                      ? "bg-sky-50 border-sky-500/30 text-sky-700"
                      : "bg-white border-gray-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Paste URL
                </button>
              </div>

              {photoSourceType === "file" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={!editingId && !photoUrl}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                />
              ) : (
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    setPreview(e.target.value);
                  }}
                  placeholder="https://example.com/student-photo.jpg"
                  required={!editingId && !photo}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                />
              )}
              
              {preview && (
                <div className="mt-3 relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Error"; }} />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 px-4 rounded-xl transition disabled:bg-gray-400"
              >
                {submitting ? "Saving..." : editingId ? "Save Changes" : "Add Student"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-slate-800 text-sm font-semibold py-2 px-4 rounded-xl transition"
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        {/* List Column */}
        <div className="lg:col-span-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 font-heading">
            <GraduationCap className="w-5 h-5 text-sky-600" />
            Current Toppers List ({students.length} / 10)
          </h3>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {students.length > 0 ? (
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4 w-20">Rank</th>
                    <th className="p-4">Student</th>
                    <th className="p-4">Class</th>
                    <th className="p-4">Score</th>
                    <th className="p-4 text-center w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-slate-700">
                  {students.map((student) => (
                    <tr key={student._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-black text-base text-slate-800">
                        #{student.rank}
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                          {student.photo ? (
                            <img src={resolveImage(student)} alt={student.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <span className="font-semibold text-slate-800">{student.name}</span>
                      </td>
                      <td className="p-4 font-medium text-slate-600">{student.class}</td>
                      <td className="p-4">
                        <span className="bg-sky-50 text-sky-700 text-xs font-extrabold px-2.5 py-1 rounded-lg">
                          {student.percentile}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                            title="Edit student"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student._id, student.name)}
                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No topper details added yet.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
