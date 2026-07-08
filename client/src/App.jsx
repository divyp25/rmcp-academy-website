import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "./styles/App.css";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import AdmissionEnquiryForm from "./components/home/AdmissionEnquiryForm";
import FloatingMenu from "./components/layout/FloatingMenu";
import { useCMS } from "./hooks/useCMS";

// Academy Pages
import About from "./components/the_academy/About";
import Mission from "./components/the_academy/Mission";
import Accreditation from "./components/the_academy/Accreditation";
import ChairpersonMessage from "./components/the_academy/ChairpersonMessage";
import PrincipleMessage from "./components/the_academy/PrincipleMessage";
import FounderMessage from "./components/the_academy/FoundersMessage";

// Academics Pages
import PrimaryWing from "./components/academics/methodology/PrimaryWing";
import MiddleWing from "./components/academics/methodology/MiddleWing";
import SeniorWing from "./components/academics/methodology/SeniorWing";
import HolisticDevelopment from "./components/academics/HolisticDevelopment";
import TechnologyIntegration from "./components/academics/TechnologyIntegration";
import GuidanceAndCounseling from "./components/academics/GuidanceAndCounseling";
import SchoolCalendar from "./components/academics/SchoolCalendar";

// Admission Pages
import PrimaryWingAdmissionForm from "./components/admission/PrimaryWingAdmissionForm";
import MiddleWingAdmissionForm from "./components/admission/MiddleWingAdmissionForm";
import SeniorWingAdmissionForm from "./components/admission/SeniorWingAdmissionForm";
import TCRequest from "./components/admission/TCRequest";

// infrastructure
import Infrastructure from "./components/infrastructure/Infrastructure";
import Auditorium from "./components/infrastructure/Auditorium";
import LibraryComponent from "./components/infrastructure/LibraryComponent";
import SportsFacility from "./components/infrastructure/SportsFacility";
// import Canteen from "./components/infrastructure/Canteen";
import HealthClinic from "./components/infrastructure/HealthClinic";
import Security from "./components/infrastructure/Security";
import LearningCenter from "./components/infrastructure/LearningCenter";
import Transportation from "./components/infrastructure/Transportation";

// press
import CutOuts from "./components/press/CutOuts";
import Magazines from "./components/press/Magazines";

// vacancy
import AcademyVacancy from "./components/vacancy/AcademyVacancy";

// gallery
import ImageGallery from "./components/gallery/ImageGallery";

// ***admin control****
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./admin/PrivateRoute";

// Lightbox Context
import { LightboxProvider } from "./context/LightboxContext";

// Festival Context
import { FestivalProvider } from "./context/FestivalContext";
import FestivalPopup from "./components/ui/FestivalPopup";
import FestivalDecorations from "./components/ui/FestivalDecorations";
import ChatbotMascot from "./components/layout/ChatbotMascot";

// CMS Dashboard & Admin Layout
import CMSDashboard from "./admin/cms/CMSDashboard";
import AdminLayout from "./admin/AdminLayout";

// VacancyDetails
import VacancyList from "./admin/vacancies/VacancyList";
import NewVacancy from "./admin/vacancies/NewVacancy";
import VacancyDetails from "./admin/vacancies/Details";

// tc panel
import TcPanel from "./admin/admission/tc_request/TcPanel";
import TcRequestDetails from "./admin/admission/tc_request/TcRequestDetails";

// gallery
import GalleryControl from "./admin/gallery/GalleryControl";
import GalleryForm from "./admin/gallery/GalleryForm";
import GalleryDetails from "./admin/gallery/Details";

// admission panel
import AdmissionPanel from "./admin/admission/AdmissionPanel";
import AdmissionDetails from "./admin/admission/AdmissionDetails";

// enquiry panel
import EnquiryPanel from "./admin/enquiry/EnquiryPanel";
import EnquiryDetails from "./admin/enquiry/EnquiryDetails";

import CBSEPublicDisclosure from "./components/CBSEPublicDisclosure";
import DisclosurePanel from "./admin/cbseDisclosure/DisclosurePanel";
import EditDisclosure from "./admin/cbseDisclosure/EditDisclosure";
import TopStudentsPanel from "./admin/topStudents/TopStudentsPanel";
import ChatbotFeedbackPanel from "./admin/chatbot/ChatbotFeedbackPanel";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

const Page = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const pageVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 15,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -15,
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
};

function AnimatedAppRoutes({ showEnq, setShowEnq }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <Page>
              <div className="relative">
                <Hero setShowEnq={setShowEnq} />
                {showEnq && <AdmissionEnquiryForm setShowEnq={setShowEnq} />}
              </div>
            </Page>
          }
        />

        {/* Admission Enquiry Form Standalone Route */}
        <Route path="/admission-enquiry" element={<Page><AdmissionEnquiryForm /></Page>} />

        {/* Login Route */}
        <Route path="/login" element={<Page><Login /></Page>} />



        {/* Grouped Academy Routes */}
        <Route path="/academy">
          <Route path="about" element={<Page><About /></Page>} />
          <Route path="mission" element={<Page><Mission /></Page>} />
          <Route path="founder-message" element={<Page><FounderMessage /></Page>} />
          <Route path="principal-message" element={<Page><PrincipleMessage /></Page>} />
          <Route
            path="chairperson-message"
            element={<Page><ChairpersonMessage /></Page>}
          />
          <Route path="accreditation" element={<Page><Accreditation /></Page>} />
        </Route>

        {/* Grouped Academics Routes */}
        <Route path="/academics">
          <Route path="methodology">
            <Route path="primary" element={<Page><PrimaryWing /></Page>} />
            <Route path="middle" element={<Page><MiddleWing /></Page>} />
            <Route path="senior" element={<Page><SeniorWing /></Page>} />
          </Route>
          <Route
            path="holistic-development"
            element={<Page><HolisticDevelopment /></Page>}
          />
          <Route path="technology" element={<Page><TechnologyIntegration /></Page>} />
          <Route
            path="guidance-counseling"
            element={<Page><GuidanceAndCounseling /></Page>}
          />
          <Route path="calendar" element={<Page><SchoolCalendar /></Page>} />
        </Route>

        {/* Grouped Infrastructure Routes */}
        <Route path="/infrastructure">
          <Route path="auditorium" element={<Page><Auditorium /></Page>} />
          <Route path="sports" element={<Page><SportsFacility /></Page>} />
          <Route path="facilities">
            <Route path="transportation" element={<Page><Transportation /></Page>} />
            {/* <Route path="canteen" element={<Page><Canteen /></Page>} /> */}
            <Route path="health" element={<Page><HealthClinic /></Page>} />
            <Route path="security" element={<Page><Security /></Page>} />
          </Route>
          <Route path="library" element={<Page><LibraryComponent /></Page>} />
          <Route path="overview" element={<Page><Infrastructure /></Page>} />
          <Route path="learning-centre" element={<Page><LearningCenter /></Page>} />
        </Route>

        {/* Grouped Admission Routes */}
        <Route path="/admissions">
          <Route path="apply">
            <Route path="primary" element={<Page><PrimaryWingAdmissionForm /></Page>} />
            <Route path="middle" element={<Page><MiddleWingAdmissionForm /></Page>} />
            <Route path="senior" element={<Page><SeniorWingAdmissionForm /></Page>} />
          </Route>
          <Route path="tc-request" element={<Page><TCRequest /></Page>} />
        </Route>

        <Route path="/press">
          <Route path="coverage" element={<Page><CutOuts /></Page>} />
          <Route path="magazine" element={<Page><Magazines /></Page>} />
        </Route>

        {/* vacancies */}
        <Route path="/vacancies" element={<Page><AcademyVacancy /></Page>} />

        {/* gallery */}
        <Route path="/gallery" element={<Page><ImageGallery /></Page>} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            {/* CMS Dashboard */}
            <Route index element={<CMSDashboard />} />
            <Route path="cms/:pageId" element={<CMSDashboard />} />

            <Route path="vacancies">
              <Route path="panel" element={<VacancyList />} />
              <Route path="new-vacancy" element={<NewVacancy />} />
              <Route path="details/:vacancy" element={<VacancyDetails />} />
            </Route>

            <Route path="tc-requests">
              <Route path="panel" element={<TcPanel />} />
              <Route path="details/:reqId" element={<TcRequestDetails />} />
            </Route>
            <Route path="gallery">
              <Route path="panel" element={<GalleryControl />} />
              <Route path="new-item" element={<GalleryForm />} />
              <Route path="details/:galleryId" element={<GalleryDetails />} />
            </Route>
            <Route path="top-students">
              <Route path="panel" element={<TopStudentsPanel />} />
            </Route>
            <Route path="admissions">
              <Route path="panel" element={<AdmissionPanel />} />
              <Route
                path="details/:admissionId"
                element={<AdmissionDetails />}
              />
            </Route>
            <Route path="enquiry">
              <Route path="panel" element={<EnquiryPanel />} />
              <Route path="details/:enqId" element={<EnquiryDetails />} />
            </Route>
            <Route path="chatbot">
              <Route path="feedback" element={<ChatbotFeedbackPanel />} />
            </Route>
            <Route path="cbse-disclosure">
              <Route path="panel" element={<DisclosurePanel />} />
              <Route path="edit" element={<EditDisclosure />} />
            </Route>
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Page><NotFound /></Page>} />
        <Route path="/cbse/ex" element={<Page><CBSEPublicDisclosure /></Page>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppLayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminOrLogin = location.pathname.startsWith("/admin") || location.pathname.startsWith("/cms-admin") || location.pathname === "/login";

  return (
    <div className="min-h-screen mx-auto flex flex-col justify-between">
      <ScrollToTop />
      {!isAdminOrLogin && <Navbar />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {!isAdminOrLogin && <FloatingMenu />}
      {!isAdminOrLogin && <FestivalPopup />}
      {!isAdminOrLogin && <FestivalDecorations />}
      {!isAdminOrLogin && <ChatbotMascot />}

      {children}

      {!isAdminOrLogin && <Footer />}
    </div>
  );
}

function App() {
  const [showEnq, setShowEnq] = useState(false);
  const { data: cmsData } = useCMS('home');

  useEffect(() => {
    // If setting is explicitly false, do not show the popup automatically
    if (cmsData && (cmsData.show_admissions_popup === false || cmsData.show_admissions_popup === "false")) {
      return;
    }
    const timer = setTimeout(() => {
      setShowEnq(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [cmsData]);

  return (
    <Router>
      <FestivalProvider>
        <LightboxProvider>
          <AuthProvider>
            <AppLayoutWrapper>
              <AnimatedAppRoutes showEnq={showEnq} setShowEnq={setShowEnq} />
            </AppLayoutWrapper>
          </AuthProvider>
        </LightboxProvider>
      </FestivalProvider>
    </Router>
  );
}

export default App;
