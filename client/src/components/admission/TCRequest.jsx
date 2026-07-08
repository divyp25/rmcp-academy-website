import React, { useState } from "react";
import { CreditCard, FileText } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../assets/constant";

export default function TCRequest() {
  const [formData, setFormData] = useState({
    studentName: "",
    admissionNumber: "",
    aadharUid: "",
    parentName: "",
    reason: "",
    contact: "",
    email: "",
  });

  const handleReset = () => {
    setFormData({
      studentName: "",
      admissionNumber: "",
      aadharUid: "",
      parentName: "",
      reason: "",
      contact: "",
      email: "",
    });
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkTcRequests = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.studentName ||
      !formData.admissionNumber ||
      !formData.aadharUid ||
      !formData.parentName ||
      !formData.reason ||
      !formData.contact ||
      !formData.email
    ) {
      toast.warn("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (isNaN(formData.contact) || formData.contact.length !== 10) {
      toast.warn("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${API}/api/tc-request/admission-number/${formData.admissionNumber}`
      );

      if (res.status === 200 && res.data < 2) {
        await handleSubmit({
          ...formData,
          paymentStatus: "pending",
          transactionId: "NA",
        });
        setLoading(false);
      } else {
        toast.warn("You have reached your academic requests!");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Failed to check TC requests or initiate payment.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    const toastId = toast.loading("Submitting TC Request...");
    try {
      const res = await axios.post(`${API}/api/tc-request`, data);
      if (res.status === 201) {
        handleReset();
        toast.update(toastId, {
          render: "TC Requested successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        throw new Error("Failed to request TC");
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to Request TC!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error("Failed to Request TC", err);
    }
  };

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Admissions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            Transfer <span className="text-brand-blue">Certificate Request</span>
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Fill in the details below to request a Transfer Certificate (TC).
          </p>
        </div>

        <form
          onSubmit={checkTcRequests}
          className="space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Student Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                placeholder="Enter Student Name"
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Admission Number *
              </label>
              <input
                type="text"
                name="admissionNumber"
                value={formData.admissionNumber}
                placeholder="Enter Admission Number"
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Aadhar / UID No. of Student *
              </label>
              <input
                type="text"
                name="aadharUid"
                value={formData.aadharUid}
                placeholder="Enter Student Aadhar"
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                placeholder="Enter Parent Name"
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter Email Address"
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                placeholder="Enter 10-digit number"
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Reason for TC Request *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                placeholder="Specify reason for request"
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer
              ${
                loading
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-brand-orange hover:bg-brand-orange-dark text-white shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-0.5"
              }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
            ) : (
              <>
                <CreditCard size={18} /> Request for TC
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
