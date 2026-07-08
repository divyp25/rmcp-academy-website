import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";

const DisclosurePanel = () => {
  const [disclosure, setDisclosure] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDisclosure = async () => {
    try {
      const res = await axios.get(`${API}/api/cbse-disclosure`);
      setDisclosure(res.data);
    } catch (err) {
      alert("Failed to fetch disclosure data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisclosure();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!disclosure) return <div>No disclosure data found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-sky-700">CBSE Public Disclosure (Admin)</h2>
        <Link
          to="/admin/cbse-disclosure/edit"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Edit Disclosure
        </Link>
      </div>
      {/* Display summary of disclosure data here, e.g. general info, last updated, etc. */}
      <div className="bg-white rounded shadow p-4">
        <h4 className="text-xl font-semibold text-blue-900 mb-2">General Information</h4>
        <ul className="mb-4">
          <li><b>School Name:</b> {disclosure.generalInfo?.schoolName}</li>
          <li><b>Affiliation No.:</b> {disclosure.generalInfo?.affiliationNo}</li>
          <li><b>School Code:</b> {disclosure.generalInfo?.schoolCode}</li>
          <li><b>Address:</b> {disclosure.generalInfo?.address}</li>
          <li><b>Principal Name:</b> {disclosure.generalInfo?.principalName}</li>
          <li><b>Principal Qualification:</b> {disclosure.generalInfo?.principalQual}</li>
          <li><b>Email:</b> {disclosure.generalInfo?.email}</li>
          <li><b>Contact:</b> {disclosure.generalInfo?.contact}</li>
        </ul>
        <div className="text-gray-500 text-sm">Last updated: {new Date(disclosure.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default DisclosurePanel; 