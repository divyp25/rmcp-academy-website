import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";
import { toast } from "react-toastify";
const AdmissionPanel = () => {
  const [admissions, setAdmissions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmissions();
  }, [page, searchName, searchClass]);

  const fetchAdmissions = async () => {
    try {
      const response = await axios.get(`${API}/api/admission`, {
        params: { page, searchName, searchClass, limit: 50 },
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error("failed to load data");
      }
      console.log("Admissions data:", response.data);
      setAdmissions(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error("Failed to load admissions");
      console.error("Error fetching admissions", error);
    }
  };

  return (
    <div className="p-6 bg-white mx-auto">
      <h2 className="text-xl font-semibold text-sky-500 mb-4">
        Admission Panel
      </h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded w-1/2"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by class"
          className="border p-2 rounded w-1/2"
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
        />
      </div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-sky-500 text-white">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Admission Class</th>
            <th className="p-2 border">ABC ID</th>
            <th className="p-2 border">Contact No</th>
            <th className="p-2 border">Payment Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {admissions &&
            admissions.map((record) => (
              <tr key={record._id} className="text-left ">
                <td className="p-2 border">
                  {record.studentFirstName} {record.studentLastName}
                </td>
                <td className="p-2 border">{record.admissionClass}</td>
                <td className="p-2 border">{record.abcId}</td>
                <td className="p-2 border">{record.contactNo}</td>
                <td className="p-2 border text-orange-600">
                  {record.paymentStatus}
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() =>
                      navigate(`/admin/admissions/details/${record._id}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-sky-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-sky-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdmissionPanel;
