import React, { useEffect, useState } from "react";
import {
  Briefcase,
  FileText,
  Target,
  GraduationCap,
  Clock,
  PlusCircle,
  Trash2,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../assets/constant";
import axios from "axios";

const VacancyDetails = () => {
  const { vacancy } = useParams();

  // State for form fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  // State for dynamic arrays
  const [keyResponsibilities, setKeyResponsibilities] = useState([]);
  const [currentResponsibility, setCurrentResponsibility] = useState("");

  const [qualificationsAndRequirements, setQualificationsAndRequirements] =
    useState([]);
  const [currentQualification, setCurrentQualification] = useState("");

  const navigate = useNavigate();
  // Handler to add responsibility
  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      setKeyResponsibilities([
        ...keyResponsibilities,
        currentResponsibility.trim(),
      ]);
      setCurrentResponsibility("");
    }
  };

  // Handler to remove responsibility
  const removeResponsibility = (index) => {
    const updatedResponsibilities = keyResponsibilities.filter(
      (_, i) => i !== index
    );
    setKeyResponsibilities(updatedResponsibilities);
  };

  // Handler to add qualification
  const addQualification = () => {
    if (currentQualification.trim()) {
      setQualificationsAndRequirements([
        ...qualificationsAndRequirements,
        currentQualification.trim(),
      ]);
      setCurrentQualification("");
    }
  };

  // Handler to remove qualification
  const removeQualification = (index) => {
    const updatedQualifications = qualificationsAndRequirements.filter(
      (_, i) => i !== index
    );
    setQualificationsAndRequirements(updatedQualifications);
  };

  // Submit handler (placeholder for endpoint submission)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const vacancyData = {
      jobTitle,
      jobDescription,
      keyResponsibilities,
      qualificationsAndRequirements,
      employmentType,
    };
    try {
      // Replace with your actual endpoint
      const response = await axios.put(
        `${API}/api/jobs/${vacancy}`,
        vacancyData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("✅Job vacancy Updated successfully!");
        fetchDetails();
      } else {
        alert(" ❌ Failed to update job vacancy");
        console.log("failed to update", response);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the job vacancy");
    }
  };

  const fetchDetails = async () => {
    try {
      if (!vacancy) {
        navigate("/admin/vacancies/panel");
        return;
      }
      const res = await axios.get(`${API}/api/jobs/${vacancy}`,{
        withCredentials: true,
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch details");
      }
      setJobTitle(res.data.jobTitle);
      setJobDescription(res.data.jobDescription);
      setEmploymentType(res.data.employmentType);
      setKeyResponsibilities(res.data.keyResponsibilities);
      setQualificationsAndRequirements(res.data.qualificationsAndRequirements);
    } catch (error) {
      console.error("Error fetching details:", error);
      navigate("/admin/vacancies/panel");
    }
  };

  const deleteVacancy = async () => {
    try {
      const res = await axios.delete(`${API}/api/jobs/${vacancy}`,{
        withCredentials: true,
      });
      if (res.status === 200) {
        alert("✅Job vacancy deleted successfully!");
        return;
      } else {
        throw new Error("Failed to delete job vacancy");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while deleting the job vacancy");
    } finally {
      navigate("/admin/vacancies/panel");
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="bg-white p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <Briefcase className="mr-2 text-orange-500" />
            Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="Enter job title"
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <FileText className="mr-2 text-orange-500" />
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="Describe the job"
            rows="4"
            required
          />
        </div>

        {/* Employment Type */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <Clock className="mr-2 text-orange-500" />
            Employment Type
          </label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
            required
          >
            <option value="">Select Employment Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <Target className="mr-2 text-orange-500" />
            Key Responsibilities
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={currentResponsibility}
              onChange={(e) => setCurrentResponsibility(e.target.value)}
              className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Add a responsibility"
            />
            <button
              type="button"
              onClick={addResponsibility}
              className="bg-sky-500 text-white p-2 rounded-r hover:bg-sky-600"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          {keyResponsibilities.map((resp, index) => (
            <div
              key={index}
              className="flex items-center bg-sky-50 p-2 rounded mb-1"
            >
              <span className="flex-grow">{resp}</span>
              <button
                type="button"
                onClick={() => removeResponsibility(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Qualifications and Requirements */}
        <div className="mb-4">
          <label className="flex items-center text-sky-700 font-semibold mb-2">
            <GraduationCap className="mr-2 text-orange-500" />
            Qualifications and Requirements
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={currentQualification}
              onChange={(e) => setCurrentQualification(e.target.value)}
              className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Add a qualification"
            />
            <button
              type="button"
              onClick={addQualification}
              className="bg-sky-500 text-white p-2 rounded-r hover:bg-sky-600"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          {qualificationsAndRequirements.map((qual, index) => (
            <div
              key={index}
              className="flex items-center bg-sky-50 p-2 rounded mb-1"
            >
              <span className="flex-grow">{qual}</span>
              <button
                type="button"
                onClick={() => removeQualification(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition duration-300 flex items-center gap-2 "
          >
            <Save className="w-4 h-auto text-white" />
            Save
          </button>
          <Link
            to={"/admin/vacancies/panel"}
            className="bg-gray-500 text-white px-6 py-2 rounded transition duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-auto text-white" />
            Back
          </Link>
          <button
            type="button"
            onClick={deleteVacancy}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-auto text-white" />
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default VacancyDetails;
