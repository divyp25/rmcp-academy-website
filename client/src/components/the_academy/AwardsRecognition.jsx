import React from "react";
import { Award, Trophy, Medal, Star } from "lucide-react";

const AwardsRecognition = () => {
  // Sample awards data - replace with actual awards
  const awards = [
    {
      name: "National Excellence in Education Award",
      logo: "/api/placeholder/150/150",
      year: "2024",
      presentedBy: "Ministry of Education, Government of India",
      category: "Institutional Excellence",
      description:
        "Awarded for outstanding contribution to quality education, innovative teaching methodologies, and holistic student development.",
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
    },
    {
      name: "Best School for Scientific Innovation",
      logo: "/api/placeholder/150/150",
      year: "2023",
      presentedBy: "Science & Technology Council of India",
      category: "Academic Excellence",
      description:
        "Recognized for exceptional integration of scientific inquiry, research orientation, and cutting-edge laboratory facilities.",
      icon: <Award className="w-8 h-8 text-orange-500" />,
    },
    {
      name: "Cultural Heritage Preservation Award",
      logo: "/api/placeholder/150/150",
      year: "2023",
      presentedBy: "National Cultural Heritage Foundation",
      category: "Cultural Education",
      description:
        "Honored for excellence in promoting traditional values, cultural activities, and heritage preservation among students.",
      icon: <Medal className="w-8 h-8 text-orange-500" />,
    },
    {
      name: "Green Campus Initiative Recognition",
      logo: "/api/placeholder/150/150",
      year: "2022",
      presentedBy: "Environmental Education Foundation",
      category: "Sustainability",
      description:
        "Awarded for outstanding environmental stewardship, sustainable campus practices, and ecological awareness programs.",
      icon: <Star className="w-8 h-8 text-orange-500" />,
    },
  ];

  const studentAchievements = [
    {
      title: "National Science Olympiad",
      students: "Aarav Sharma, Priya Patel, Rohan Singh",
      achievement: "Gold Medal in Senior Category",
      year: "2024",
    },
    {
      title: "International Mathematics Competition",
      students: "Meera Gupta, Arjun Kumar",
      achievement: "Silver Medal and Special Recognition",
      year: "2023",
    },
    {
      title: "All India Arts & Cultural Festival",
      students: "RMCP Academy Cultural Team",
      achievement: "First Prize in Folk Dance Category",
      year: "2023",
    },
    {
      title: "State Level Sports Championship",
      students: "RMCP Academy Cricket Team",
      achievement: "State Champions",
      year: "2022",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            <span className="bg-sky-100 px-3 py-1 rounded">Awards</span>
            <span className="text-sky-600"> & Recognition</span>
          </h2>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6 rounded"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            RMCP Academy has been recognized for its commitment to educational
            excellence, innovation, and holistic development through numerous
            prestigious awards and accolades
          </p>
        </div>
        {/* Award Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="bg-sky-50 p-6 flex items-center justify-center md:w-1/3">
                  <div className="bg-white p-3 rounded-full border-4 border-white shadow-md">
                    <img
                      src={award.logo}
                      alt={`${award.name} logo`}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-gray-800">
                      {award.name}
                    </h4>
                    <span className="bg-orange-100 text-orange-600 text-xs font-semibold py-1 px-2 rounded-full">
                      {award.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {award.description}
                  </p>

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Presented By:</p>
                        <p className="font-medium text-gray-700">
                          {award.presentedBy}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Year Awarded:</p>
                        <p className="font-medium text-sky-700">{award.year}</p>
                      </div>
                      <div className="col-span-2">
                        <button className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
                          View Award Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Achievements */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-sky-500 mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Student Achievements
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-sky-50 text-gray-700">
                  <th className="py-3 px-4 text-left">Competition/Event</th>
                  <th className="py-3 px-4 text-left">Students</th>
                  <th className="py-3 px-4 text-left">Achievement</th>
                  <th className="py-3 px-4 text-left">Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {studentAchievements.map((achievement, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {achievement.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {achievement.students}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {achievement.achievement}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-orange-600 font-medium">
                      {achievement.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognition;
