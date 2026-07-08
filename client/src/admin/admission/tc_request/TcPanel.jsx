import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../assets/constant";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";

const TcPanel = () => {
  const [tcRequests, setTcRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [page, setPage] = useState(1);
  const limit = 50;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTcRequests();
  }, [search, admissionNumber, page]);

  const fetchTcRequests = async () => {
    try {
      const res = await axios.get(`${API}/api/tc-request`, {
        params: { search, admissionNumber, page, limit },
        withCredentials: true,
      });
      if (res.status !== 200) throw new Error("failed to load");
      setTcRequests(res.data.data);
    } catch (error) {
      toast.error("failed to load requests");
      console.error("Error fetching tcRequests", error);
    }
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-sky-500 mb-4">
        Tc Request Panel
      </h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by Student Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Search by Admission Number"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">Admission Number</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Payment Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {tcRequests.length > 0 &&
            tcRequests.map((request) => (
              <tr key={request._id} className="hover:bg-sky-100">
                <td className="p-2 border">{request.studentName}</td>
                <td className="p-2 border">{request.admissionNumber}</td>
                <td className="p-2 border">{request.contact}</td>
                <td className="p-2 border">{request.email}</td>
                <td className="p-2 border">{request.paymentStatus}</td>
                <td className="p-2 border flex gap-2 items-center justify-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/tc-requests/details/${request._id}`)
                    }
                    className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 flex gap-2 items-center"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Previous
        </button>
        <span className="text-gray-700"> Page {page} </span>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TcPanel;
