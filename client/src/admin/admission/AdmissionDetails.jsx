import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
const AdmissionDetails = () => {
  const { admissionId } = useParams();
  const navigate = useNavigate();
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmissionDetails = async () => {
      try {
        const response = await axios.get(
          `${API}/api/admission/${admissionId}`,
          {
            withCredentials: true,
          }
        );
        if (response.status !== 200) throw new Error("failed to load");
        setAdmission(response.data);
      } catch (err) {
        toast.error("failed to load admissions");
        setError("Failed to fetch admission details");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionDetails();
  }, [admissionId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    const toastId = toast.loading("Deleting record...");

    try {
      await axios
        .delete(`${API}/api/admission/${admissionId}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status !== 200) throw new Error("Failed to delete record");
          navigate("/admin/admissions/panel");
          toast.update(toastId, {
            render: "Record deleted successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        });
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to delete record",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Error deleting record", error);
    }
  };

  if (loading)
    return (
      <p className="h-[90vh] flex items-center justify-center">Loading...</p>
    );
  if (error)
    return (
      <p className="h-[90vh] flex items-center justify-center text-red-500">
        {error}
      </p>
    );

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-sky-500 mb-4">
        Admission Details
      </h2>
      <div className="md:w-6/12 mx-auto p-4 flex flex-col gap-2">
        {/* Student Details */}
        <h3 className="text-lg font-bold">Student Details</h3>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Student Name</strong>
          <span>:</span> {admission.studentFirstName}{" "}
          {admission.studentMiddleName} {admission.studentLastName}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Aadhar No</strong>
          <span>:</span> {admission.studentAadharNo}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Aadhar File</strong>
          <span>:</span>{" "}
          <a
            href={admission.studentAadharFile}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Student Photo</strong>
          <span>:</span>{" "}
          <a
            href={admission.studentPhoto}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        {/* Father Details */}
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Father Name</strong>
          <span>:</span> {admission.fatherFirstName}{" "}
          {admission.fatherMiddleName} {admission.fatherLastName}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Father's Aadhar</strong>
          <span>:</span>{" "}
          <a
            href={admission.fatherAadharFile}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Father's Photo</strong>
          <span>:</span>{" "}
          <a
            href={admission.fatherPhoto}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        {/* Mother Details */}
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Mother Name</strong>
          <span>:</span> {admission.motherFirstName}{" "}
          {admission.motherMiddleName} {admission.motherLastName}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Mother's Aadhar</strong>
          <span>:</span>{" "}
          <a
            href={admission.motherAadharFile}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Mother's Photo</strong>
          <span>:</span>{" "}
          <a
            href={admission.motherPhoto}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Contact No</strong>
          <span>:</span> {admission.contactNo}
        </p>
        <hr className="my-4 border-t-2 border-black" />
        <h3 className="text-lg font-bold">Admission Details </h3>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Admission Class</strong>
          <span>:</span> {admission.admissionClass}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">ABC ID</strong>
          <span>:</span> {admission.abcId}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">ABC Card </strong>
          <span>:</span>{" "}
          <a
            href={admission.abcCard}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Migration Document</strong>
          <span>:</span>{" "}
          <a
            href={admission.studentMigrationDocument}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>{" "}
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Birth Certificate</strong>
          <span>:</span>{" "}
          <a
            href={admission.studentBirthCertificate}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>{" "}
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Domicile Document</strong>
          <span>:</span>{" "}
          <a
            href={admission.domicileCertificate}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>{" "}
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Previous School TC</strong>
          <span>:</span>{" "}
          <a
            href={admission.previousSchoolTC}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>{" "}
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Previous Marksheets</strong>
          <span>:</span>{" "}
          <a
            href={admission.previousMarksheet}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        <hr className="my-4 border-t-2 border-black" />
        <h3 className="text-lg font-bold">Scholarship Details</h3>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Scholarship</strong>
          <span>:</span> {admission.governmentScholarship}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Scholarship Document</strong>
          <span>:</span>{" "}
          <a
            href={admission.scholarshipDocument}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        {/* Document Section */}
        <hr className="my-4 border-t-2 border-black" />
        <h3 className="text-lg font-bold">Documents</h3>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Aadhar File</strong>
          <span>:</span>{" "}
          <a
            href={admission.studentAadharFile}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            View
          </a>
        </p>
        <hr className="my-4 border-t-2 border-black" />
        <h3 className="text-lg font-bold">Payment Details</h3>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Payment Status</strong>
          <span>:</span> {admission.paymentStatus}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Transaction ID</strong>
          <span>:</span> {admission.transactionId || "N/A"}
        </p>
      </div>

      <div className="mt-6 flex space-x-4 justify-center items-center">
        <button
          onClick={() => navigate("/admin/admission/panel")}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 flex gap-2 items-center"
        >
          <ArrowLeft className="text-white" />
          Back
        </button>
        <button
          onClick={() => handleDelete()}
          className="px-2 py-1 rounded bg-white flex gap-2 items-center border-red-400 border"
        >
          <Trash2 className="text-red-400" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdmissionDetails;
