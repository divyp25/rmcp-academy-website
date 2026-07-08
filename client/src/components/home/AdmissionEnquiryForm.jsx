import axios from "axios";
import { X, GraduationCap, User, Users, Calendar, Phone, Mail, MapPin, Award, CheckCircle2, CreditCard, QrCode, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../assets/constant";
import rmcp_campus from "../../assets/img/rmcp_campus.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdmissionEnquiryForm = ({ setShowEnq }) => {
  const [step, setStep] = useState(1); // 1: Fill Details, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    admissionClass: "",
    studentName: "",
    fatherName: "",
    email: "",
    fatherMobile: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' | 'card'
  const [transactionId, setTransactionId] = useState("");
  const [tokenNumber, setTokenNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.admissionClass || !formData.fatherName || !formData.email || !formData.fatherMobile) {
      toast.warn("Please fill in all required fields.");
      return;
    }
    setStep(2);
  };

  const handleSendWhatsApp = (token = tokenNumber, txnId = transactionId) => {
    if (!token) return;
    const cleanPhone = formData.fatherMobile.replace(/\D/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const message = `Hello! Your RMCP Academy Admission Enquiry has been successfully submitted.\n\n` +
      `Student Name: ${formData.studentName}\n` +
      `Class: ${formData.admissionClass}\n` +
      `Admission Token Number: ${token}\n` +
      `Transaction ID: ${txnId || "N/A"}\n\n` +
      `Thank you for choosing RMCP Academy!`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePaymentAndSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading("Processing Payment & Submitting Enquiry...");

    // Simulate payment transaction ID
    const generatedTxnId = "TXN-" + Math.floor(10000000 + Math.random() * 90000000);
    setTransactionId(generatedTxnId);

    const payload = {
      ...formData,
      paymentStatus: "paid",
      transactionId: generatedTxnId,
    };

    try {
      const res = await axios.post(`${API}/api/enquiry`, payload);
      if (res.status === 201) {
        const receivedToken = res.data.enquiry.tokenNumber;
        setTokenNumber(receivedToken);
        toast.update(toastId, {
          render: "Payment Successful & Enquiry Submitted!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        setStep(3);
        // Automatically send to WhatsApp
        setTimeout(() => {
          handleSendWhatsApp(receivedToken, generatedTxnId);
        }, 1000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to Submit Enquiry. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        closeButton: true,
      });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6 overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url(${rmcp_campus})`,
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="w-full max-w-xl bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 relative my-8 max-h-[90vh] flex flex-col overflow-hidden"
      >
        
        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 font-heading leading-tight">Admission Enquiry</h2>
              <p className="text-xs text-slate-500 font-medium">Registration Portal {new Date().getFullYear()}-{new Date().getFullYear() + 1}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowEnq ? setShowEnq(false) : navigate("/")}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FILL DETAILS */}
        {step === 1 && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 no-scrollbar">
            <form onSubmit={handleNextToPayment} className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block border-b border-slate-100 pb-1.5">
                1. Student Details
              </span>
              
              {/* Student Name */}
              <div>
                <label htmlFor="studentName" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                />
              </div>

              {/* Student Class */}
              <div>
                <label htmlFor="admissionClass" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Class Sought For *
                </label>
                <select
                  id="admissionClass"
                  name="admissionClass"
                  value={formData.admissionClass}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                >
                  <option value="">-- Select Class --</option>
                  <option value="Play Group">Play Group</option>
                  <option value="Nursery">Nursery</option>
                  <option value="K.G">K.G</option>
                  {[...Array(12).keys()].map(i => (
                    <option key={i+1} value={String(i+1)}>{i+1}</option>
                  ))}
                </select>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block border-b border-slate-100 pb-1.5 pt-2">
                2. Parent Details
              </span>

              {/* Parent Name */}
              <div>
                <label htmlFor="fatherName" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  placeholder="Enter parent/guardian full name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                />
              </div>

              {/* Parent Email */}
              <div>
                <label htmlFor="email" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Parent Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                />
              </div>

              {/* Parent Phone */}
              <div>
                <label htmlFor="fatherMobile" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Parent Mobile Number *
                </label>
                <input
                  type="tel"
                  id="fatherMobile"
                  name="fatherMobile"
                  placeholder="e.g. 9876543210"
                  value={formData.fatherMobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  required
                />
              </div>

              {/* Proceed to Pay Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-orange text-white font-bold text-base hover:bg-brand-orange-dark shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: PAYMENT SECTION */}
        {step === 2 && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 no-scrollbar">
            <div className="space-y-6">
              
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-blue uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to details
              </button>

              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block border-b border-slate-100 pb-1.5">
                Admission Registration Payment
              </span>

              {/* Amount Display */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex justify-between items-center">
                <div>
                  <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Registration Fee</span>
                  <h3 className="text-lg font-black text-slate-800">Admission Form Fee</h3>
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-black text-brand-blue">₹1,000</h1>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Non-refundable</span>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border transition-all ${
                    paymentMethod === "upi"
                      ? "bg-brand-blue-light/50 border-brand-blue text-brand-blue shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <QrCode className="w-4 h-4" /> UPI QR Code
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border transition-all ${
                    paymentMethod === "card"
                      ? "bg-brand-blue-light/50 border-brand-blue text-brand-blue shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard className="w-4 h-4" /> Card Payment
                </button>
              </div>

              {/* Payment Details Container */}
              <div className="border border-slate-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col items-center">
                {paymentMethod === "upi" ? (
                  <div className="text-center space-y-4">
                    {/* Simulated QR Code */}
                    <div className="w-44 h-44 bg-slate-50 border-2 border-slate-100 rounded-xl p-2 mx-auto flex items-center justify-center shadow-inner relative">
                      {/* Inside details simulate QR */}
                      <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center p-3 text-white gap-2">
                        <QrCode className="w-16 h-16 text-white" />
                        <span className="text-[8px] font-mono tracking-widest text-slate-400">RMCPACADEMY@UPI</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Scan QR using any UPI App</p>
                      <p className="text-[10px] text-slate-400 mt-1">GPay, PhonePe, Paytm, or BHIM</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full space-y-3">
                    {/* Mock Card Form */}
                    <div>
                      <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1">Cardholder Name</label>
                      <input type="text" placeholder="John Doe" defaultValue={formData.fatherName} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1">Card Number</label>
                      <input type="text" maxLength="19" placeholder="4111 2222 3333 4444" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue" />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1">CVV</label>
                        <input type="password" maxLength="3" placeholder="***" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Complete Payment Button */}
              <div>
                <button
                  type="button"
                  onClick={handlePaymentAndSubmit}
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Processing Mock Payment..." : `Pay & Submit Enquiry (₹1,000)`}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS SCREEN */}
        {step === 3 && (
          <div className="flex-1 p-6 sm:p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 font-heading">Registration Successful!</h2>
              <p className="text-sm text-slate-500">We have received your admission enquiry details and payment.</p>
            </div>

            {/* Token Number Display */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 max-w-sm mx-auto shadow-inner border-dashed border-2 border-brand-blue/30">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Admission Token Number</span>
              <h1 className="text-3xl font-black text-brand-blue tracking-wider">{tokenNumber}</h1>
              <span className="text-[10px] text-slate-400 font-bold block mt-3 uppercase">Transaction ID: {transactionId}</span>
            </div>

            <div className="bg-brand-blue-light/30 border border-brand-blue-light rounded-xl p-4 text-xs text-brand-blue-dark leading-relaxed font-semibold">
              📧 An confirmation email has been dispatched to <strong>{formData.email}</strong> with your unique token details. Please keep this token for future tracking.
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 leading-relaxed font-semibold flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.264.792 4.36 2.134 6.037L2 22l3.963-1.114A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.24-1.208l-.305-.19-2.353.66.664-2.285-.199-.309A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm3.565-6.523c-.196-.099-1.16-.573-1.34-.639-.18-.067-.312-.099-.443.1-.13.198-.508.638-.623.77-.114.131-.23.15-.426.05a6.545 6.545 0 0 1-1.91-1.18 7.251 7.251 0 0 1-1.34-1.626c-.14-.245.14-.32.387-.917.043-.1.02-.184-.022-.257-.044-.072-.443-1.07-.606-1.465-.16-.387-.32-.334-.443-.34-.115-.005-.246-.006-.378-.006a.73.73 0 0 0-.53.245c-.182.197-.694.678-.694 1.656s.712 1.923.812 2.057c.099.132 1.404 2.15 3.405 3.018 1.99.86 1.99.573 2.34.537.358-.036 1.16-.473 1.32-.929.165-.46.165-.853.115-.928-.05-.075-.182-.132-.377-.232z"/>
                </svg>
                <span>A WhatsApp window should automatically open to send the token details to <strong>{formData.fatherMobile}</strong>. If it didn't open, click below:</span>
              </div>
              <button
                type="button"
                onClick={() => handleSendWhatsApp()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-2 transition cursor-pointer"
              >
                Send via WhatsApp
              </button>
            </div>

            {/* Close / Return Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowEnq ? setShowEnq(false) : navigate("/")}
                className="w-full py-3.5 rounded-xl bg-brand-text text-white font-bold text-sm tracking-wider uppercase hover:bg-slate-800 transition"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default AdmissionEnquiryForm;
