import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";

const EditDisclosure = () => {
  const [form, setForm] = useState({
    generalInfo: {},
    documents: {},
    academics: {},
    staff: {},
    infrastructure: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/cbse-disclosure`)
      .then((res) => {
        const d = res.data || {};
        setForm({
          generalInfo: d.generalInfo || {},
          documents: d.documents || {},
          academics: d.academics || {},
          staff: d.staff || {},
          infrastructure: d.infrastructure || {},
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch disclosure data");
        setLoading(false);
      });
  }, []);

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileUpload = async (section, field, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append(field, file);
    try {
      const res = await axios.post(`${API}/api/cbse-disclosure/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.url) {
        handleChange(section, field, res.data.url);
        alert("File uploaded successfully!");
      } else {
        throw new Error("Invalid upload response");
      }
    } catch (err) {
      console.error(err);
      alert("File upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`${API}/api/cbse-disclosure`, form, { withCredentials: true });
      alert("Disclosure updated successfully");
      navigate("/admin/cbse-disclosure/panel");
    } catch (err) {
      console.error(err);
      alert("Failed to update disclosure");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 font-medium">{error}</div>;

  const safeForm = {
    generalInfo: form.generalInfo || {},
    documents: form.documents || {},
    academics: form.academics || {},
    staff: form.staff || {},
    infrastructure: form.infrastructure || {},
  };

  const FileInput = ({ section, field, label }) => (
    <div>
      <input
        type="text"
        placeholder={`${label} URL`}
        value={safeForm[section][field] || ""}
        onChange={(e) => handleChange(section, field, e.target.value)}
        className="border p-2 rounded mb-1 w-full"
      />
      {safeForm[section][field] && (
        <a
          href={safeForm[section][field]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline block mb-1"
        >
          View Uploaded File
        </a>
      )}
      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => handleFileUpload(section, field, e.target.files[0])}
        className="mb-2"
      />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-sky-700 mb-6">Edit CBSE Public Disclosure</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 space-y-6">
        {/* General Info */}
        <div>
          <h4 className="text-xl font-semibold text-blue-900 mb-2">General Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["schoolName", "affiliationNo", "schoolCode", "address", "principalName", "email", "contact"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={safeForm.generalInfo[field] || ""}
                onChange={(e) => handleChange("generalInfo", field, e.target.value)}
                className="border p-2 rounded"
              />
            ))}
          </div>
        </div>

        {/* Documents */}
        <div>
          <h4 className="text-xl font-semibold text-blue-900 mb-2">Documents & Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "societyCertificate",
              "nocCertificate",
              "waterCertificate",
              "fireCertificate",
              "buildingCertificate",
              "recognitionCertificate",
              "landCertificate",
              "deoCertificate",
            ].map((field) => (
              <FileInput key={field} section="documents" field={field} label={field.replace(/([A-Z])/g, " $1")} />
            ))}
          </div>
        </div>

        {/* Academics */}
        <div>
          <h4 className="text-xl font-semibold text-blue-900 mb-2">Academics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "feeStructure",
              "smcList",
              "academicCalendar",
              "ptaList",
              "teachersDetails",
            ].map((field) => (
              <FileInput key={field} section="academics" field={field} label={field.replace(/([A-Z])/g, " $1")} />
            ))}
          </div>
        </div>

        {/* Staff */}
        <div>
          <h4 className="text-xl font-semibold text-blue-900 mb-2">Staff (Teaching)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "principal", type: "text" },
              { name: "totalTeachers", type: "number" },
              { name: "pgt", type: "number" },
              { name: "tgt", type: "number" },
              { name: "prt", type: "number" },
              { name: "sectionRatio", type: "text" },
              { name: "specialEducator", type: "text" },
              { name: "counsellor", type: "text" },
            ].map(({ name, type }) => (
              <input
                key={name}
                type={type}
                placeholder={name.replace(/([A-Z])/g, " $1")}
                value={safeForm.staff[name] || ""}
                onChange={(e) => handleChange("staff", name, e.target.value)}
                className="border p-2 rounded"
              />
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div>
          <h4 className="text-xl font-semibold text-blue-900 mb-2">School Infrastructure</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "campusArea", type: "text" },
              { name: "classRooms", type: "text" },
              { name: "laboratories", type: "text" },
              { name: "internetFacility", type: "text" },
              { name: "girlsToilets", type: "number" },
              { name: "boysToilets", type: "number" },
            ].map(({ name, type }) => (
              <input
                key={name}
                type={type}
                placeholder={name.replace(/([A-Z])/g, " $1")}
                value={safeForm.infrastructure[name] || ""}
                onChange={(e) => handleChange("infrastructure", name, e.target.value)}
                className="border p-2 rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditDisclosure;
