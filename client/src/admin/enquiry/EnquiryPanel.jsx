import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
const EnquiryPanel = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [admissionClass, setAdmissionClass] = useState("");
  const [page, setPage] = useState(1);
  const limit = 50;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnquiries();
  }, [search, admissionClass, page]);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${API}/api/enquiry`, {
        params: { search, admissionClass, page, limit },
        withCredentials: true,
      });
      if (res.status !== 200) throw new Error("failed to load");
      setEnquiries(res.data);
    } catch (error) {
      toast.error("failed to load enquiries");
      console.error("Error fetching enquiries", error);
    }
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-sky-500 mb-4">Enquiry Panel</h2>
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
          placeholder="Search by Admission Class"
          value={admissionClass}
          onChange={(e) => setAdmissionClass(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="p-2 border">Token Number</th>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">Admission Class</th>
            <th className="p-2 border">Parent Mobile</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry._id} className="hover:bg-sky-100">
              <td className="p-2 border font-bold text-slate-800">{enquiry.tokenNumber || "N/A"}</td>
              <td className="p-2 border">{enquiry.studentName}</td>
              <td className="p-2 border">{enquiry.admissionClass}</td>
              <td className="p-2 border">{enquiry.fatherMobile}</td>
              <td className="p-2 border text-center">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                  enquiry.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {enquiry.paymentStatus || 'pending'}
                </span>
              </td>
              <td className="p-2 border flex gap-2 items-center justify-center">
                <button
                  onClick={() =>
                    navigate(`/admin/enquiry/details/${enquiry._id}`)
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

export default EnquiryPanel;
