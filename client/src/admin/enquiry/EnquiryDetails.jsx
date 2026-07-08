import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";
import { toast } from "react-toastify";
import { ArrowLeft, Trash2 } from "lucide-react";
const EnquiryDetails = () => {
  const { enqId } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiry();
  }, []);

  const fetchEnquiry = async () => {
    try {
      const { data } = await axios.get(`${API}/api/enquiry/${enqId}`,{
        withCredentials:true,
      });
      setEnquiry(data);
    } catch (error) {
      console.error("Error fetching enquiry", error);
    }
  };

  const deleteEnquiry = async () => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      const toastId = toast.loading("Deleting enquiry...");
      try {
        await axios.delete(`${API}/api/enquiry/${enqId}`,{
          withCredentials:true,
        }).then((res) => {
          if (res.status !== 200) throw new Error("Failed to delete enquiry");
          navigate("/admin/enquiry/panel");
          toast.update(toastId, {
            render: "Enquiry deleted successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        });
      } catch (error) {
        toast.update(toastId, {
          render: "Failed to delete enquiry",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.error("Error deleting enquiry", error);
      }
    }
  };

  if (!enquiry) return <p className="text-gray-700">Loading...</p>;

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-sky-500 mb-4">
        Enquiry Details
      </h2>
      <div className="md:w-6/12 mx-auto p-4 flex flex-col gap-2">
        <p className="flex gap-4 border border-black p-2 bg-slate-50">
          <strong className="w-36 text-brand-blue">Token Number</strong>
          <span>:</span> <strong className="text-slate-800">{enquiry.tokenNumber || "N/A"}</strong>
        </p>
        <p className="flex gap-4 border border-black p-2 bg-slate-50">
          <strong className="w-36 text-brand-blue">Payment Status</strong>
          <span>:</span> <span className={`px-2.5 py-0.5 rounded font-bold text-xs uppercase ${
            enquiry.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>{enquiry.paymentStatus || 'pending'}</span>
        </p>
        <p className="flex gap-4 border border-black p-2 bg-slate-50">
          <strong className="w-36 text-brand-blue">Transaction ID</strong>
          <span>:</span> <span className="font-mono text-xs">{enquiry.transactionId || "N/A"}</span>
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Student Name</strong>
          <span>:</span> {enquiry.studentName}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Admission Class</strong>
          <span>:</span> {enquiry.admissionClass}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Father / Parent Name</strong>
          <span>:</span> {enquiry.fatherName}
        </p>
        {enquiry.motherName && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Mother Name</strong>
            <span>:</span> {enquiry.motherName}
          </p>
        )}
        {enquiry.gender && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Gender</strong>
            <span>:</span> {enquiry.gender}
          </p>
        )}
        {enquiry.dateOfBirth && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">DOB</strong>
            <span>:</span>
            {new Date(enquiry.dateOfBirth).toLocaleDateString()}
          </p>
        )}
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Parent Mobile</strong>
          <span>:</span> {enquiry.fatherMobile}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Email</strong>
          <span>:</span> {enquiry.email}
        </p>

        {enquiry.category && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Category</strong>
            <span>:</span> {enquiry.category}
          </p>
        )}
        {enquiry.lastSchoolAttended && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Last School</strong>
            <span>:</span> {enquiry.lastSchoolAttended}
          </p>
        )}
        {enquiry.fatherOccupation && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Father Occupation</strong>
            <span>:</span> {enquiry.fatherOccupation}
          </p>
        )}
        {enquiry.motherOccupation && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Mother Occupation</strong>
            <span>:</span> {enquiry.motherOccupation}
          </p>
        )}
        {enquiry.address && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Address</strong>
            <span>:</span> {enquiry.address}
          </p>
        )}
        {enquiry.referredBy && (
          <p className="flex gap-4 border border-black p-2">
            <strong className="w-36">Referred By</strong>
            <span>:</span> {enquiry.referredBy}
          </p>
        )}
      </div>

      <div className="mt-6 flex space-x-4 justify-center items-center">
        <button
          onClick={() => navigate("/admin/enquiry/panel")}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 flex gap-2 items-center"
        >
          <ArrowLeft className="text-white" />
          Back
        </button>
        <button
          onClick={deleteEnquiry}
          className="px-2 py-1 rounded bg-white flex gap-2 items-center border-red-400 border"
        >
          <Trash2 className="text-red-400" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default EnquiryDetails;
