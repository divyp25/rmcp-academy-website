import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../../assets/constant";
import { toast } from "react-toastify";
import { ArrowLeft, Trash2 } from "lucide-react";
const TcRequestDetails = () => {
  const { reqId } = useParams();
  const navigate = useNavigate();
  const [tcRequest, setTcRequest] = useState(null);

  useEffect(() => {
    fetchTcRequest();
  }, []);

  const fetchTcRequest = async () => {
    try {
      const res = await axios.get(`${API}/api/tc-request/${reqId}`, {
        withCredentials: true,
      });
      if (res.status !== 200) throw new Error("failed to load");
      setTcRequest(res.data);
    } catch (error) {
      toast.error("Failed to fetch Tc Request");
      console.error("Error fetching tcRequest", error);
    }
  };

  const deleteTcRequest = async () => {
    try {
      const res = await axios.delete(`${API}/api/tc-request/${reqId}`, {
        withCredentials: true,
      });
      if (res.status !== 200) throw new Error("failed to delete");
      toast.success("Tc Request Deleted Successfully");
      navigate("/admin/tc-requests/panel");
    } catch (error) {
      toast.error("Failed to delete Tc Request");
      console.error("Error tcRequest", error);
    }
  };
  if (!tcRequest) return <p className="text-gray-700 ">Loading...</p>;

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-sky-500 mb-4">
        TC Request Details
      </h2>
      <div className="md:w-6/12 mx-auto p-4 flex flex-col gap-2">
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Student Name</strong>
          <span>:</span> {tcRequest.studentName}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Admission Number</strong>
          <span>:</span> {tcRequest.admissionNumber}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Parent Name</strong>
          <span>:</span> {tcRequest.parentName}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Reason</strong>
          <span>:</span> {tcRequest.reason}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Contact</strong>
          <span>:</span> {tcRequest.contact}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Email</strong>
          <span>:</span> {tcRequest.email}
        </p>
        <hr className="my-4" />
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Payment Status</strong>
          <span>:</span> {tcRequest.paymentStatus}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Transaction Id</strong>
          <span>:</span> {tcRequest.transactionId}
        </p>
        <p className="flex gap-4 border border-black p-2">
          <strong className="w-36">Request Date</strong>
          <span>:</span> {new Date(tcRequest.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-6 flex space-x-4 justify-center items-center">
        <button
          onClick={() => navigate("/admin/tc-requests/panel")}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 flex gap-2 items-center"
        >
          <ArrowLeft className="text-white" />
          Back
        </button>
        <button
          type="button"
          onClick={deleteTcRequest}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300 flex items-center gap-2"
        >
          <Trash2 className="w-4 h-auto text-white" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TcRequestDetails;
