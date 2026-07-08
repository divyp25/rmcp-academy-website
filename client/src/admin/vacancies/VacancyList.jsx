import React, { useState, useEffect } from "react";
import { Calendar, Eye, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../assets/constant";

const VacancyList = () => {
  // State management
  const [vacancies, setVacancies] = useState([]);

  const fetchVacancies = async () => {
    const res = await axios.get(`${API}/api/jobs`,{
      withCredentials: true,
    });
    if (res.status !== 200) return alert("❌ Failed to fetch vacancies");
    setVacancies(res.data);
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Add Job Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-sky-700">
            {" "}
            Current Job Openings
          </h2>
        </div>
        <Link
          to="/admin/vacancies/new-vacancy"
          className="flex items-center bg-sky-500 text-white px-2 py-1 text-md rounded hover:bg-sky-600 transition"
        >
          <CirclePlus className="mr-2" />
          New Vacancy
        </Link>
      </div>

      {/* Vacancies List and Details Container */}
      <div className="flex">
        {/* Vacancies List */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          {vacancies &&
            vacancies.map((vacancy) => (
              <div
                key={vacancy._id}
                className="border rounded-lg p-6 bg-white shadow-md relative hover:shadow-xl transition-all duration-300"
              >
                {/* Date Posted - Top Right */}
                <div className="absolute top-4 right-4 flex items-center text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">
                    {new Date(vacancy.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Job Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {vacancy.jobTitle}
                  </h2>
                  <p className="text-gray-600 mb-4">{vacancy.jobDescription}</p>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Link
                      to={`/admin/vacancies/details/${vacancy._id}`}
                      className="text-sky-600 hover:text-sky-800 font-medium flex items-center"
                    >
                      <Eye size={18} className="mr-1" /> Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VacancyList;
