import React, { useState } from "react";
import {
  Briefcase,
  FileText,
  Target,
  GraduationCap,
  Clock,
  PlusCircle,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { API } from "../../assets/constant";
import axios from "axios";
import { Link } from "react-router-dom";

const NewVacancy = () => {
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

    // validate details for submission
    if (!jobTitle || !jobDescription || !employmentType) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      keyResponsibilities.length === 0 ||
      qualificationsAndRequirements.length === 0
    ) {
      alert("Please add responsibilities and qualifications.");
      return;
    }

    const vacancyData = {
      jobTitle,
      jobDescription,
      keyResponsibilities,
      qualificationsAndRequirements,
      employmentType,
    };

    try {
      // Replace with your actual endpoint
      const res = await axios.post(`${API}/api/jobs`, vacancyData,{
        withCredentials: true,
      });

      if (res.status === 201) {
        alert("✅ Job vacancy submitted successfully!");
        // Reset form
        setJobTitle("");
        setJobDescription("");
        setEmploymentType("");
        setKeyResponsibilities([]);
        setQualificationsAndRequirements([]);
      } else {
        alert("❌ Failed to submit job vacancy");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the job vacancy");
    }
  };

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
        <div className="text-center flex gap-4">
          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition duration-300"
          >
            Submit Job Vacancy
          </button>
          <Link
            to={"/admin/vacancies/panel"}
            className="bg-gray-500 text-white px-6 py-2 rounded transition duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-auto text-white" />
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewVacancy;
