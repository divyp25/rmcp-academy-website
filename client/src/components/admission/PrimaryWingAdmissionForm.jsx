import React, { useState } from "react";
import axios from "axios";
import {
  FileText,
  Camera,
  UploadCloud,
  AlertCircle,
  PersonStanding,
  ContactRound,
  GraduationCap,
} from "lucide-react";
import { API } from "../../assets/constant";
import { toast } from "react-toastify";

const PrimaryWingAdmission = () => {
  const [formData, setFormData] = useState({
    // Student Details
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    studentAadharNo: "",
    studentAadharFile: null,
    studentPhoto: null,
    studentBirthCertificate: null,
    admissionClass: "",

    // Father Details
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherAadharFile: null,
    fatherPhoto: null,

    // Mother Details
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    motherAadharFile: null,
    motherPhoto: null,

    // Additional details
    domicileCertificate: null,
    contactNo: "",
    abcCard: null,
    abcId: "",
  });

  const [errors, setErrors] = useState({});

  const validateFileSize = (file) => {
    // Maximum file size: 2MB
    return file && file.size <= 2 * 1024 * 1024;
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];

    if (!validateFileSize(file)) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "File size must be less than 2MB",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));

    // Clear previous error for this field
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      name: value, // wait, is it name: value? Ah, let's look at the original code: [name]: value. Let's make sure it is [name]: value!
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      // Student Details
      studentFirstName: "",
      studentMiddleName: "",
      studentLastName: "",
      studentAadharNo: "",
      studentAadharFile: null,
      studentPhoto: null,
      studentBirthCertificate: null,
      admissionClass: "",

      // Father Details
      fatherFirstName: "",
      fatherMiddleName: "",
      fatherLastName: "",
      fatherAadharFile: null,
      fatherPhoto: null,

      // Mother Details
      motherFirstName: "",
      motherMiddleName: "",
      motherLastName: "",
      motherAadharFile: null,
      motherPhoto: null,

      // Additional details
      domicileCertificate: null,
      contactNo: "",
      abcCard: null,
      abcId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate details for submission
    if (
      !formData.studentFirstName ||
      !formData.studentMiddleName ||
      !formData.studentLastName ||
      !formData.studentAadharNo ||
      !formData.fatherFirstName ||
      !formData.fatherMiddleName ||
      !formData.fatherLastName ||
      !formData.motherFirstName ||
      !formData.motherMiddleName ||
      !formData.motherLastName ||
      !formData.abcId ||
      !formData.admissionClass
    ) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    if (isNaN(formData.contactNo) || formData.contactNo.length !== 10) {
      toast.warn("Please enter a valid contact number.");
      return;
    }

    if (
      !formData.studentAadharFile ||
      !formData.fatherAadharFile ||
      !formData.motherAadharFile
    ) {
      toast.warn("Please upload Aadhar files.");
      return;
    }

    if (
      !formData.studentPhoto ||
      !formData.fatherPhoto ||
      !formData.motherPhoto
    ) {
      toast.warn("Please upload photos.");
      return;
    }

    if (
      !formData.domicileCertificate ||
      !formData.studentBirthCertificate ||
      !formData.abcCard
    ) {
      toast.warn("Please upload additional documents.");
      return;
    }

    const toastId = toast.loading("Submitting Admission Form...");
    // Create FormData for file upload
    const formSubmitData = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formSubmitData.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${API}/api/admission`,
        formSubmitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.update(toastId, {
          render: "Admission form submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        });
        handleReset();
      } else {
        throw new Error("Failed to submit admission form");
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to submit admission form",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
      console.error("Submission failed", error);
    }
  };

  const renderNameInputs = (prefix, label) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
          {label} First Name *
        </label>
        <input
          type="text"
          name={`${prefix}FirstName`}
          value={formData[`${prefix}FirstName`]}
          onChange={handleInputChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
          required
        />
      </div>
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
          {label} Middle Name
        </label>
        <input
          type="text"
          name={`${prefix}MiddleName`}
          value={formData[`${prefix}MiddleName`]}
          onChange={handleInputChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
        />
      </div>
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
          {label} Last Name *
        </label>
        <input
          type="text"
          name={`${prefix}LastName`}
          value={formData[`${prefix}LastName`]}
          onChange={handleInputChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
          required
        />
      </div>
    </div>
  );

  const renderFileUpload = (fieldName, label, icon = <FileText size={18} />) => (
    <div className="space-y-1.5">
      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="relative group">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, fieldName)}
          className="w-full text-slate-500 text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-brand-blue/10 file:text-brand-blue file:hover:bg-brand-blue/20 transition-all cursor-pointer border border-slate-200 rounded-xl p-1 bg-slate-50/50"
        />
        {formData[fieldName] && (
          <p className="text-xs text-brand-blue font-bold mt-1">✓ Selected: {formData[fieldName].name}</p>
        )}
      </div>
      {errors[fieldName] && (
        <p className="text-brand-orange text-xs flex items-center gap-1 mt-1 font-semibold">
          <AlertCircle size={14} /> {errors[fieldName]}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Admissions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            Primary Wing <span className="text-brand-blue">Admission Form</span>
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Please fill in the application form details below for P.N.C, N.C, and K.G registration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10">
          
          {/* Student Details Section */}
          <div className="bg-brand-surface p-6 sm:p-8 rounded-2xl border border-brand-blue/10 space-y-6">
            <h2 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <PersonStanding className="text-brand-blue" /> Student Details
            </h2>
            
            {renderNameInputs("student", "Student")}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Admission Class *
                </label>
                <select
                  name="admissionClass"
                  value={formData.admissionClass}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="1">P.N.C</option>
                  <option value="2">N.C</option>
                  <option value="3">K.G</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Student Aadhar Number *
                </label>
                <input
                  type="text"
                  name="studentAadharNo"
                  value={formData.studentAadharNo}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                />
              </div>

              {renderFileUpload("studentAadharFile", "Student Aadhar Document *")}
              {renderFileUpload("studentBirthCertificate", "Student Birth Certificate *")}
              {renderFileUpload("studentPhoto", "Student Passport Photo *", <Camera size={18} />)}
            </div>
          </div>

          {/* Father Details Section */}
          <div className="bg-brand-surface p-6 sm:p-8 rounded-2xl border border-brand-blue/10 space-y-6">
            <h2 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <ContactRound className="text-brand-orange" /> Father Details
            </h2>
            
            {renderNameInputs("father", "Father")}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFileUpload("fatherAadharFile", "Father Aadhar Document *")}
              {renderFileUpload("fatherPhoto", "Father Passport Photo *", <Camera size={18} />)}
            </div>
          </div>

          {/* Mother Details Section */}
          <div className="bg-brand-surface p-6 sm:p-8 rounded-2xl border border-brand-blue/10 space-y-6">
            <h2 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <ContactRound className="text-brand-blue" /> Mother Details
            </h2>
            
            {renderNameInputs("mother", "Mother")}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFileUpload("motherAadharFile", "Mother Aadhar Document *")}
              {renderFileUpload("motherPhoto", "Mother Passport Photo *", <Camera size={18} />)}
            </div>
          </div>

          {/* Additional Documents Section */}
          <div className="bg-brand-surface p-6 sm:p-8 rounded-2xl border border-brand-blue/10 space-y-6">
            <h2 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <FileText className="text-brand-orange" /> Additional Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFileUpload("domicileCertificate", "Domicile Certificate *")}
              {renderFileUpload("abcCard", "ABC Card *")}
              
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  ABC ID *
                </label>
                <input
                  type="text"
                  name="abcId"
                  value={formData.abcId}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-500 font-extrabold text-sm uppercase tracking-wider hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-brand-orange text-white font-extrabold text-sm uppercase tracking-wider hover:bg-brand-orange-dark shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <UploadCloud size={18} /> Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrimaryWingAdmission;
