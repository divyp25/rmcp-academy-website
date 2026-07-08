import React from 'react';

const Affiliation = () => {
  // Sample affiliation data - replace with actual data
  const affiliations = [
    {
      name: "Central Board of Secondary Education (CBSE)",
      logo: "/api/placeholder/150/150",
      description: "Officially affiliated with CBSE, following the national curriculum framework with affiliation no. 2131156.",
      year: "Since 2008"
    },
    {
      name: "National Assessment and Accreditation Council (NAAC)",
      logo: "/api/placeholder/150/150",
      description: "Accredited with 'A' grade, recognizing high standards in educational processes and outcomes.",
      year: "Since 2015"
    },
    {
      name: "Ministry of Education, Government of India",
      logo: "/api/placeholder/150/150",
      description: "Recognized by the Ministry of Education as a quality institution meeting all regulatory requirements.",
      year: "Since 2007"
    }
  ];
  
  // Sample partnership data - replace with actual data
  const partnerships = [
    {
      name: "British Council",
      logo: "/api/placeholder/120/120",
      type: "International Partnership"
    },
    {
      name: "National Science Foundation",
      logo: "/api/placeholder/120/120",
      type: "STEM Education Partner"
    },
    {
      name: "Sports Authority of India",
      logo: "/api/placeholder/120/120",
      type: "Sports Development"
    },
    {
      name: "Indian Institute of Technology",
      logo: "/api/placeholder/120/120",
      type: "Technical Education"
    },
    {
      name: "TERI (The Energy and Resources Institute)",
      logo: "/api/placeholder/120/120",
      type: "Environmental Education"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            <span className="bg-sky-100 px-3 py-1 rounded">Affiliations</span>
            <span className="text-sky-600"> & Partnerships</span>
          </h2>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6 rounded"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            RMCP Academy maintains prestigious affiliations and strategic partnerships to ensure quality education and diverse opportunities for our students
          </p>
        </div>
        
        {/* Primary Affiliations */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            <span className="border-b-2 border-sky-500 pb-1">Official Affiliations & Accreditations</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {affiliations.map((affiliation, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="p-6 flex flex-col items-center">
                  <div className="bg-sky-50 p-3 rounded-full mb-4 border-4 border-white shadow-md">
                    <img 
                      src={affiliation.logo} 
                      alt={`${affiliation.name} logo`} 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 text-center mb-2">{affiliation.name}</h4>
                  
                  <div className="flex items-center justify-center mb-4">
                    <span className="bg-orange-100 text-orange-600 text-xs font-semibold py-1 px-3 rounded-full">
                      {affiliation.year}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-center mb-4">
                    {affiliation.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button className="py-2 px-4 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors text-sm font-medium">
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Strategic Partnerships */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            <span className="border-b-2 border-sky-500 pb-1">Strategic Educational Partnerships</span>
          </h3>
          
          <div className="bg-sky-50 rounded-xl p-8 shadow-md">
            <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              We collaborate with leading organizations to enhance learning experiences and provide our students with unique opportunities for growth and exposure.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {partnerships.map((partner, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center border-b-2 border-orange-400">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <h5 className="font-semibold text-gray-800 text-center mb-1">{partner.name}</h5>
                  <p className="text-sky-600 text-xs text-center">{partner.type}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-white p-6 rounded-lg border-l-4 border-orange-400 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-3">Collaboration Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <div className="bg-sky-100 p-1 rounded-full mr-2 mt-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 text-sm">International exchange programs for global exposure</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-sky-100 p-1 rounded-full mr-2 mt-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 text-sm">Advanced STEM laboratories and resources</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-sky-100 p-1 rounded-full mr-2 mt-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 text-sm">Expert workshops and specialized training</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-sky-100 p-1 rounded-full mr-2 mt-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 text-sm">Industry-aligned curriculum enhancements</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-sky-100 p-1 rounded-full mr-2 mt-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 text-sm">Inter-school competitions and collaborative events</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-sky-100 p-1 rounded-full mr-2 mt-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 text-sm">Professional development for teaching staff</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recognition Banner */}
        <div className="mt-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Recognized for Excellence in Education</h3>
          <p className="mb-6 max-w-3xl mx-auto">
            RMCP Academy has been recognized with various awards and accolades for its contribution to quality education and innovative teaching methodologies.
          </p>
          <button className="bg-white text-sky-600 py-2 px-6 rounded-md font-medium hover:bg-orange-50 transition-colors">
            View All Recognitions
          </button>
        </div>
      </div>
    </section>
  );
};

export default Affiliation;