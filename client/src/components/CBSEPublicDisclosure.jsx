import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../assets/constant";
import { FileText, Eye, Info, Shield, Users, Award, Landmark, MapPin } from "lucide-react";

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
    campusArea: "6300",
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-bg py-20 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-brand-blue animate-spin"></div>
        <p className="text-slate-500 font-semibold text-sm">Loading disclosure details...</p>
      </div>
    );
  }

  if (!data) return <div className="text-center py-20 font-bold text-slate-500">No disclosure data found.</div>;

  const { generalInfo, documents, academics, staff, infrastructure } = data;

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Regulatory Compliance
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            Mandatory Public <span className="text-brand-blue">Disclosure</span>
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            In compliance with CBSE guidelines, the school presents the mandatory public disclosure details below.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 space-y-12">
          
          {/* A. General Information */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <Landmark className="text-brand-blue" /> A. General Information
            </h3>
            <div className="overflow-hidden border border-brand-blue/10 rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-brand-surface">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider w-20">S. No.</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Information</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { no: 1, label: "Name of School", val: generalInfo?.schoolName },
                      { no: 2, label: "Affiliation No.", val: generalInfo?.affiliationNo || "Not Specified" },
                      { no: 3, label: "School Code", val: generalInfo?.schoolCode || "Not Specified" },
                      { no: 4, label: "Complete Address", val: generalInfo?.address },
                      { no: 5, label: "Principal Name & Qualification", val: `${generalInfo?.principalName} (${generalInfo?.principalqual})` },
                      { no: 6, label: "Email ID", val: generalInfo?.email },
                      { no: 7, label: "Contact Details", val: generalInfo?.contact },
                    ].map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-blue">{row.no}</td>
                        <td className="px-6 py-4 text-sm font-bold text-brand-text font-heading uppercase tracking-wide">{row.label}</td>
                        <td className="px-6 py-4 text-sm text-slate-655 font-medium">{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* B. Documents & Information */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <Shield className="text-brand-orange" /> B. Documents & Information
            </h3>
            <div className="overflow-hidden border border-brand-blue/10 rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-brand-surface">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider w-20">S. No.</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Documents & Information</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider w-40">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { no: 1, label: "Copy of Societies/Trust/Company Registration/Renewal Certificate, as applicable", link: documents?.societyCertificate },
                      { no: 2, label: "Copy of No Objection Certificate (Noc) Issued, if applicable. by the State Govt./UT", link: documents?.nocCertificate },
                      { no: 3, label: "Copy of Valid Water Health and Sanitation Certificate Issued by the Competent Authority", link: documents?.waterCertificate },
                      { no: 4, label: "Copy of Valid Fire Safety Certificate Issued by the Competent Authority", link: documents?.fireCertificate },
                      { no: 5, label: "Copy of Valid Building Safety Certificate as per the National Building Code", link: documents?.buildingCertificate },
                      { no: 6, label: "Copies of Recognisation Certificate under RTE ACT, 2009, and it's Renewal if applicable", link: documents?.recognitionCertificate },
                      { no: 7, label: "Copy of the DEO Certificate submitted by the school for AFFILIATION/UPGRADATION/EXTENSION OF affiliation or self certification by school", link: documents?.deoCertificate },
                      { no: 8, label: "Copy of the Land Certificate", link: documents?.landCertificate },
                    ].map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-blue">{row.no}</td>
                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">{row.label}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                          {row.link ? (
                            <a
                              href={row.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300"
                            >
                              <Eye size={14} /> View File
                            </a>
                          ) : (
                            <span className="text-slate-400">Not Uploaded</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* C: Academics */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <Award className="text-brand-blue" /> C. Academics
            </h3>
            <div className="overflow-hidden border border-brand-blue/10 rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-brand-surface">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider w-20">S. No.</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Documents & Information</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider w-40">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { no: 1, label: "Fee Structure of School", link: academics?.feeStructure },
                      { no: 2, label: "List of School Management Committee (SMC)", link: academics?.smcList },
                      { no: 3, label: "Annual Academic Calendar", link: academics?.academicCalendar },
                      { no: 4, label: "List of Parents Teachers Association (PTA) Members", link: academics?.ptaList },
                    ].map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-blue">{row.no}</td>
                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">{row.label}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                          {row.link ? (
                            <a
                              href={row.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300"
                            >
                              <Eye size={14} /> View File
                            </a>
                          ) : (
                            <span className="text-slate-400">Not Uploaded</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* D: Staff (Teaching) */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <Users className="text-brand-orange" /> D. Staff (Teaching)
            </h3>
            <div className="overflow-hidden border border-brand-blue/10 rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-brand-surface">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider w-20">S. No.</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Information</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { no: 1, label: "Principal", val: staff?.principal },
                      { no: 2, label: "Total No. of Teachers", val: `${staff?.totalTeachers} (PRT: ${staff?.prt}, TGT: ${staff?.tgt}, NTT: ${staff?.ntt})` },
                      { no: 3, label: "Teachers Section Ratio", val: staff?.sectionRatio },
                      { no: 4, label: "Details of Special Educator", val: staff?.specialEducator || "01" },
                      { no: 5, label: "Details of Counsellor and Wellness Teacher", val: staff?.counsellor || "01" },
                    ].map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-blue">{row.no}</td>
                        <td className="px-6 py-4 text-sm font-bold text-brand-text font-heading uppercase tracking-wide">{row.label}</td>
                        <td className="px-6 py-4 text-sm text-slate-655 font-medium">{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* E: School Infrastructure */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-brand-blue/10">
              <Landmark className="text-brand-blue" /> E. School Infrastructure
            </h3>
            <div className="overflow-hidden border border-brand-blue/10 rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-brand-surface">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider w-20">S. No.</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Information</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-text uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { no: 1, label: "Total Campus Area of The School (In Sq. Meters)", val: `${infrastructure?.campusArea} Sq. Meters` },
                      { no: 2, label: "No. and Size of The Class Rooms (In Sq. Feet)", val: infrastructure?.classRooms },
                      { no: 3, label: "No. and Size of Laboratories Including Computer Labs (In Sq. Feet)", val: infrastructure?.laboratories },
                      { no: 4, label: "Internet Facility", val: infrastructure?.internetFacility },
                      { no: 5, label: "No. of Girls Toilets", val: infrastructure?.girlsToilets },
                      { no: 6, label: "No. of Boys Toilets", val: infrastructure?.boysToilets },
                    ].map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-blue">{row.no}</td>
                        <td className="px-6 py-4 text-sm font-bold text-brand-text font-heading uppercase tracking-wide">{row.label}</td>
                        <td className="px-6 py-4 text-sm text-slate-655 font-medium">{row.val}</td>
                      </tr>
                    ))}
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-blue">7</td>
                      <td className="px-6 py-4 text-sm font-bold text-brand-text font-heading uppercase tracking-wide">Youtube Video of School Inspection</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                        <a
                          href="https://youtu.be/7WY7FRhc9FM?si=YrY6WioTQtu7lxOH"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300"
                        >
                          <Eye size={14} /> Watch Video
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
