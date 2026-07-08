import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../assets/constant";

const defaultData = {
  generalInfo: {
    schoolName: "RAJENDRA MOHAN CHANDRIKA PRASAD ACADEMY",
    affiliationNo: "",
    schoolCode: "",
    address: "Near, Gola Road, Vill Ghanshyampur, Bilsanda, Uttar Pradesh 262202",
    principalName: "Mrs. Shikha Saxena",
    principalqual: "M.A B.Ed",
    email: "rmcpacademy@gmail.com",
    contact: "+91 9897985784"
  },
  documents: {
    societyCertificate: "/cbse/Socity Certificate.pdf",
    nocCertificate: "/cbse/NOC.pdf",
    waterCertificate: "/cbse/Water and sanitaion.pdf",
    fireCertificate: "/cbse/Fire NOC.pdf",
    buildingCertificate: "/cbse/NBC.pdf",
    recognitionCertificate: "/cbse/NOC.pdf",
    deoCertificate: "/cbse/Self recog.pdf",
    landCertificate: "/cbse/Land Certificate Annux X.pdf"
  },
  academics: {
    feeStructure: "/cbse/Fees.pdf",
    smcList: "/cbse/SMC.pdf",
    academicCalendar: "/cbse/Annual Academic Calendar.pdf",
    ptaList: "/cbse/PTA.pdf",
    teachersDetails: "/cbse/PTA.pdf"
  },
  staff: {
    principal: "Mrs. Shikha Saxena",
    totalTeachers: 25,
    tgt: 7,
    prt: 13,
    ntt: 5,
    sectionRatio: "1.5 : 50",
    specialEducator: "01",
    counsellor: "01"
  },
  infrastructure: {
    campusArea: "6280",
    classRooms: " 12 (520 Sq ft each)",
    laboratories: "03 (600 Sq ft)",
    internetFacility: "Yes",
    girlsToilets: "07",
    boysToilets: "07"
  }
};

export default function CBSEPublicDisclosure() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/cbse-disclosure`).then(res => {
      if (res.data && res.data.generalInfo) {
        setData(res.data);
      } else {
        setData(defaultData);
      }
      setLoading(false);
    }).catch(() => {
      setData(defaultData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No disclosure data found.</div>;

  const { generalInfo, documents, academics, staff, infrastructure } = data;

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <section className="bg-blue-900 text-white py-8 mb-6" style={{backgroundImage: "url('/cbse/abbanner.jpg')", backgroundSize: 'cover'}}>
        <div className="container mx-auto text-center bg-blue-900 bg-opacity-70 py-6 rounded">
          <h1 className="text-3xl font-bold">Mandatory Public Disclosure</h1>
          <hr className="border-t-2 border-blue-300 w-32 mx-auto mt-2" />
        </div>
      </section>
      <div className="container mx-auto bg-white rounded shadow p-4 md:p-8">
        {/* A. General Information */}
        <h4 className="text-xl font-semibold text-blue-900 mb-2">A. General Information</h4>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border px-2 py-1">S. No.</th>
                <th className="border px-2 py-1">Information</th>
                <th className="border px-2 py-1">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Name of School</td><td className="border px-2 py-1">{generalInfo?.schoolName}</td></tr>
              <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">Affiliation No.</td><td className="border px-2 py-1">{generalInfo?.affiliationNo}</td></tr>
              <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">School Code</td><td className="border px-2 py-1">{generalInfo?.schoolCode}</td></tr>
              <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">Complete Address</td><td className="border px-2 py-1">{generalInfo?.address}</td></tr>
              <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">Principal Name</td><td className="border px-2 py-1">{generalInfo?.principalName}</td></tr>
              <tr><td className="border px-2 py-1">6</td><td className="border px-2 py-1">Principal Qualification</td><td className="border px-2 py-1">{generalInfo?.principalqual}</td></tr>
              <tr><td className="border px-2 py-1">7</td><td className="border px-2 py-1">Email ID</td><td className="border px-2 py-1">{generalInfo?.email}</td></tr>
              <tr><td className="border px-2 py-1">8</td><td className="border px-2 py-1">Contact Details</td><td className="border px-2 py-1">{generalInfo?.contact}</td></tr>
              {/* <tr><td className="border px-2 py-1">8</td><td className="border px-2 py-1">Affidavit</td><td className="border px-2 py-1"><a href="/cbse/affidavit_1.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr> */}
            </tbody>
          </table>
        </div>
        {/* B. Documents & Information */}
        <h4 className="text-xl font-semibold text-blue-900 mb-2">B. Documents & Information</h4>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border px-2 py-1">S. No.</th>
                <th className="border px-2 py-1">Documents & Information</th>
                <th className="border px-2 py-1">Documents</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Copy of Affiliation/Upgradation Letter and Recent Extension of Affiliation, if any</td><td className="border px-2 py-1"></td></tr> */}
              <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Copy of Societies/Trust/Company Registration/Renewal Certificate, as applicable</td><td className="border px-2 py-1"><a href={documents?.societyCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">Copy of No Objection Certificate (Noc) Issued, if applicable. by the State Govt./UT</td><td className="border px-2 py-1"><a href={documents?.nocCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">Copy of Valid Water Health and Sanitation Certificate Issued by the Competent Authority</td><td className="border px-2 py-1"><a href={documents?.waterCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">Copy of Valid Fire Safety Certificate Issued by the Competent Authority</td><td className="border px-2 py-1"><a href={documents?.fireCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">Copy of Valid Building Safety Certificate as per the National Building Code</td><td className="border px-2 py-1"><a href={documents?.buildingCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">6</td><td className="border px-2 py-1">Copies of Recognisation Certificate under RTE ACT, 2009, and it's Renewal if applicable</td><td className="border px-2 py-1"><a href={documents?.recognitionCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">7</td><td className="border px-2 py-1">Copy of the DEO Certificate submitted by the school for AFFILIATION/UPGRADATION/EXTENSION OF affiliation or self certification by school</td><td className="border px-2 py-1"><a href={documents?.deoCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">8</td><td className="border px-2 py-1">Copy of the Land Certificate</td><td className="border px-2 py-1"><a href={documents?.landCertificate} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              {/* <tr><td className="border px-2 py-1">10</td><td className="border px-2 py-1">MANDATORY PUBLIC DISCLOSURE DETAILS</td><td className="border px-2 py-1"><a href="/cbse/Mandatory.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr> */}
            </tbody>
          </table>
        </div>
        {/* C: Academics */}
        <h4 className="text-xl font-semibold text-blue-900 mb-2">C: Academics</h4>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border px-2 py-1">S. No.</th>
                <th className="border px-2 py-1">Documents & Information</th>
                <th className="border px-2 py-1">Documents</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Fee Structure of School</td><td className="border px-2 py-1"><a href={academics?.feeStructure} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">List of School Management Committee (SMC)</td><td className="border px-2 py-1"><a href={academics?.smcList} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">ANNUAL ACADEMIC CALENDER</td><td className="border px-2 py-1"><a href={academics?.academicCalendar} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS</td><td className="border px-2 py-1"><a href={academics?.ptaList} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr>
              {/* <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">LIST OF TEACHERS DETAILS</td><td className="border px-2 py-1"><a href={academics?.teachersDetails} target="_blank" rel="noopener noreferrer" className="btn btn-success text-green-700 underline">Click here to view</a></td></tr> */}
            </tbody>
          </table>
        </div>
        {/* D: Staff (Teaching) */}
        <h4 className="text-xl font-semibold text-blue-900 mb-2">D: Staff (Teaching)</h4>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border px-2 py-1">S. No.</th>
                <th className="border px-2 py-1">Information</th>
                <th className="border px-2 py-1">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Principal</td><td className="border px-2 py-1">{staff?.principal}</td></tr>
              <tr><td className="border px-2 py-1" rowSpan={4}>2</td><td className="border px-2 py-1">Total No. of Teachers</td><td className="border px-2 py-1">{staff?.totalTeachers}</td></tr>
              <tr><td className="border px-2 py-1">NTT</td><td className="border px-2 py-1">{staff?.ntt}</td></tr>
              <tr><td className="border px-2 py-1">TGT</td><td className="border px-2 py-1">{staff?.tgt}</td></tr>
              <tr><td className="border px-2 py-1">PRT</td><td className="border px-2 py-1">{staff?.prt}</td></tr>
              <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">Teachers Section Ratio</td><td className="border px-2 py-1">{staff?.sectionRatio}</td></tr>
              <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">Details of Special Educator</td><td className="border px-2 py-1">{staff?.specialEducator}</td></tr>
              <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">Details of Counsellor and Welness Teacher</td><td className="border px-2 py-1">{staff?.counsellor}</td></tr>
            </tbody>
          </table>
        </div>
        {/* E: School Infrastructure */}
        <h4 className="text-xl font-semibold text-blue-900 mb-2">E: School Infrastructure</h4>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border px-2 py-1">S. No.</th>
                <th className="border px-2 py-1">Information</th>
                <th className="border px-2 py-1">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Total Campus Area of The School (In Square Mtr)</td><td className="border px-2 py-1">{infrastructure?.campusArea}</td></tr>
              <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">No. and Size of The Class Rooms (In Sq Ft mtr</td><td className="border px-2 py-1">{infrastructure?.classRooms}</td></tr>
              <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">No. and Size of Laboratories Including Computer Labs (In Sq Mtr)</td><td className="border px-2 py-1">{infrastructure?.laboratories}</td></tr>
              <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">Internet Facility</td><td className="border px-2 py-1">{infrastructure?.internetFacility}</td></tr>
              <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">No. of Girls Toilets</td><td className="border px-2 py-1">{infrastructure?.girlsToilets}</td></tr>
              <tr><td className="border px-2 py-1">6</td><td className="border px-2 py-1">No. of Boys Toilets</td><td className="border px-2 py-1">{infrastructure?.boysToilets}</td></tr>
              {/* <tr><td className="border px-2 py-1">7</td><td className="border px-2 py-1">Link of Youtube Video of the Inspection of School covering the Infrastructure of The School</td><td className="border px-2 py-1"><a href="https://www.youtube.com/watch?v=tGzlA5efveI" className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">click here</a></td></tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
