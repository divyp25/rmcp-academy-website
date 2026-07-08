import { useState, Fragment, useContext, useEffect } from "react";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import rmcp_logo from "../../assets/img/rmcp_logo.png";
import { LogOut, Search, X as XIcon, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SEARCHABLE_PAGES = [
  { title: "Home", path: "/" },
  { title: "About RMCP", path: "/academy/about" },
  { title: "Mission Statement", path: "/academy/mission" },
  { title: "Founder Message", path: "/academy/founder-message" },
  { title: "Chairperson Message", path: "/academy/chairperson-message" },
  { title: "Principal's Message", path: "/academy/principal-message" },
  { title: "Accreditation", path: "/academy/accreditation" },
  { title: "Primary Wing Methodology", path: "/academics/methodology/primary" },
  { title: "Middle Wing Methodology", path: "/academics/methodology/middle" },
  { title: "Senior Wing Methodology", path: "/academics/methodology/senior" },
  { title: "Holistic Development", path: "/academics/holistic-development" },
  { title: "Technology Integration", path: "/academics/technology" },
  { title: "Guidance & Counselling", path: "/academics/guidance-counseling" },
  { title: "Academic Calendar", path: "/academics/calendar" },
  { title: "Auditorium", path: "/infrastructure/auditorium" },
  { title: "Sports Facilities", path: "/infrastructure/sports" },
  { title: "Transportation Facility", path: "/infrastructure/facilities/transportation" },
  { title: "Health Clinic", path: "/infrastructure/facilities/health" },
  { title: "Security Facility", path: "/infrastructure/facilities/security" },
  { title: "Learning Centre", path: "/infrastructure/learning-centre" },
  { title: "Infrastructure Overview", path: "/infrastructure/overview" },
  { title: "Library", path: "/infrastructure/library" },
  { title: "Primary Wing Admission Form", path: "/admissions/apply/primary" },
  { title: "Middle Wing Admission Form", path: "/admissions/apply/middle" },
  { title: "Senior Wing Admission Form", path: "/admissions/apply/senior" },
  { title: "TC Request Form", path: "/admissions/tc-request" },
  { title: "Press Coverage", path: "/press/coverage" },
  { title: "E-Magazine Publications", path: "/press/magazine" },
  { title: "Academy Vacancy / Careers", path: "/vacancies" },
  { title: "Image Gallery", path: "/gallery" },
];

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredPages = query.trim() === ""
    ? []
    : SEARCHABLE_PAGES.filter(page =>
      page.title.toLowerCase().includes(query.toLowerCase())
    );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-brand-text/98 backdrop-blur-2xl z-[60] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            aria-label="Close search"
          >
            <XIcon className="w-8 h-8" />
          </button>

          <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 max-w-4xl mx-auto w-full">
            <span className="text-[10px] font-bold text-brand-blue tracking-[0.3em] uppercase mb-6 block text-left">SEARCH WEBSITE</span>

            <form onSubmit={(e) => { e.preventDefault(); }} className="w-full flex items-end gap-6 border-b border-white/20 pb-4">
              <input
                type="text"
                placeholder="SEARCH"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow bg-transparent border-none text-white text-3xl sm:text-5xl font-light focus:outline-none placeholder-white/25 uppercase font-heading tracking-wide"
                autoFocus
              />
              <button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold tracking-widest uppercase px-10 py-5 text-sm transition-all duration-300 cursor-pointer shadow-lg rounded-xl shrink-0"
              >
                SEARCH
              </button>
            </form>

            <div className="w-full mt-10 max-h-[40vh] overflow-y-auto space-y-3 pr-2 no-scrollbar">
              {filteredPages.length > 0 ? (
                filteredPages.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(page.path);
                      onClose();
                    }}
                    className="w-full text-left px-5 py-4 bg-white/5 hover:bg-brand-blue text-white transition-all text-base font-semibold flex items-center justify-between group border border-white/5 hover:border-brand-blue/30 cursor-pointer rounded-lg"
                  >
                    <span>{page.title}</span>
                    <span className="text-xs uppercase font-bold tracking-widest text-slate-400 group-hover:text-white transition-colors">GO →</span>
                  </button>
                ))
              ) : query.trim() !== "" ? (
                <p className="text-slate-400 text-sm py-4 text-left">No pages match your search query.</p>
              ) : (
                <p className="text-slate-400 text-sm py-4 text-left">Start typing to search the academic directory...</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Desktop Dropdown
const DropdownMenu = ({ item, activePath, logout, isLightMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!item.children) {
    return (
      <Link
        to={item.path}
        className={`px-3 py-2 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap
          ${activePath === item.path ? 'text-brand-blue' : isLightMode ? 'text-slate-600 hover:text-brand-blue' : 'text-slate-200 hover:text-white'}`}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={`flex items-center gap-1 px-3 py-2 text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer
        ${isLightMode ? 'text-slate-600 group-hover:text-brand-blue' : 'text-slate-200 group-hover:text-white'}`}>
        {item.title}
        <ChevronDownIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 mt-0 w-64 rounded-xl shadow-2xl py-3 z-50 border
              ${isLightMode ? 'bg-white/95 backdrop-blur-xl border-brand-blue/10' : 'bg-brand-text/95 backdrop-blur-xl border-white/10'}`}
          >
            {item.children.map((subItem, idx) => (
              <div key={idx} className="relative group/sub">
                {subItem.path === "/logout" ? (
                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-2.5 text-sm font-semibold text-brand-red/90 hover:text-brand-red hover:bg-brand-red/5 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                ) : subItem.children ? (
                  // Nested Dropdown
                  <div className={`px-5 py-2.5 transition-colors cursor-pointer flex items-center justify-between
                    ${isLightMode ? 'hover:bg-brand-blue/5' : 'hover:bg-white/5'}`}>
                    <span className={`text-sm font-semibold ${isLightMode ? 'text-slate-600' : 'text-slate-200'}`}>{subItem.title}</span>
                    <ChevronDownIcon className={`w-3.5 h-3.5 -rotate-90 ${isLightMode ? 'text-slate-400' : 'text-slate-400'}`} />
                    {/* The nested menu (only shown on hover of this item) */}
                    <div className={`absolute top-0 left-full ml-0 hidden group-hover/sub:block w-56 rounded-xl shadow-2xl py-2 border
                      ${isLightMode ? 'bg-white/95 backdrop-blur-xl border-brand-blue/10' : 'bg-brand-text/95 backdrop-blur-xl border-white/10'}`}>
                      {subItem.children.map((nested, nIdx) => (
                        <button
                          key={nIdx}
                          onClick={() => {
                            navigate(nested.path);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-5 py-2 text-sm font-semibold transition-colors cursor-pointer
                            ${isLightMode ? 'text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                        >
                          {nested.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  subItem.path.startsWith("http") ? (
                    <a
                      href={subItem.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className={`w-full block px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer text-slate-300 hover:text-white hover:bg-white/5`}
                    >
                      {subItem.title}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        navigate(subItem.path);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer
                        ${activePath === subItem.path 
                          ? (isLightMode ? 'text-brand-blue bg-brand-blue/5' : 'text-brand-blue bg-brand-blue/10') 
                          : (isLightMode ? 'text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5' : 'text-slate-300 hover:text-white hover:bg-white/5')}`}
                    >
                      {subItem.title}
                    </button>
                  )
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Accordion
const MobileAccordion = ({ item, activePath, onNavigate, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!item.children;

  return (
    <div className="border-b border-white/5 py-2">
      {hasChildren ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full text-left py-2 text-lg font-black text-white hover:text-brand-blue transition-colors font-heading uppercase group cursor-pointer"
          >
            <span>{item.title}</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform duration-300 text-slate-400 group-hover:text-brand-blue ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pl-4 mt-2 space-y-1.5 border-l-2 border-brand-blue/30"
              >
                {item.children.map((subItem, index) => (
                  <div key={index}>
                    {subItem.path === "/logout" ? (
                      <button
                        onClick={() => { logout(); onNavigate(); }}
                        className="flex items-center gap-2 py-2 text-sm font-semibold text-brand-red/90 hover:text-brand-red transition-colors w-full text-left cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    ) : subItem.children ? (
                      <div className="py-1">
                        <div className="text-sm font-bold text-slate-400 py-1 uppercase tracking-wider">{subItem.title}</div>
                        <div className="pl-3 space-y-1">
                          {subItem.children.map((nested, nIdx) => (
                            <Link
                              key={nIdx}
                              to={nested.path}
                              onClick={onNavigate}
                              className={`block py-1.5 text-sm font-semibold transition-colors
                                ${activePath === nested.path ? 'text-brand-blue' : 'text-slate-300 hover:text-white'}`}
                            >
                              {nested.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      subItem.path.startsWith("http") ? (
                        <a
                          href={subItem.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onNavigate}
                          className="block py-2 text-sm font-semibold text-slate-300 hover:text-white"
                        >
                          {subItem.title}
                        </a>
                      ) : (
                        <Link
                          to={subItem.path}
                          onClick={onNavigate}
                          className={`block py-2 text-sm font-semibold transition-colors
                            ${activePath === subItem.path ? 'text-brand-blue' : 'text-slate-300 hover:text-white'}`}
                        >
                          {subItem.title}
                        </Link>
                      )
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          to={item.path}
          onClick={onNavigate}
          className={`block py-2 text-lg font-black font-heading uppercase transition-colors
            ${activePath === item.path ? 'text-brand-blue' : 'text-white hover:text-brand-blue'}`}
        >
          {item.title}
        </Link>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let authRoutes = {
    title: "Admin Panel",
    path: "/admin",
    children: [
      { title: "Vacancies", path: "/admin/vacancies/panel" },
      { title: "CBSE Disclosure", path: "/admin/cbse-disclosure/panel" },
      { title: "Tc Requests", path: "/admin/tc-requests/panel" },
      { title: "Gallery", path: "/admin/gallery/panel" },
      { title: "Top Students", path: "/admin/top-students/panel" },
      { title: "Admissions", path: "/admin/admissions/panel" },
      { title: "Enquiry", path: "/admin/enquiry/panel" },
      { title: "CMS Admin", path: "/cms-admin" },
      { title: "Logout", path: "/logout" },
    ],
  };

  const navigation = [
    ...(admin ? [authRoutes] : []),
    {
      title: "The Academy",
      path: "/academy",
      children: [
        { title: "About RMCP", path: "/academy/about" },
        { title: "Mission Statement", path: "/academy/mission" },
        { title: "Founder Message", path: "/academy/founder-message" },
        { title: "Chairperson Message", path: "/academy/chairperson-message" },
        { title: "Principal's Message", path: "/academy/principal-message" },
        { title: "Accreditation", path: "/academy/accreditation" },
      ],
    },
    {
      title: "Academics",
      path: "/academics",
      children: [
        {
          title: "Methodology",
          path: "/academics/methodology",
          children: [
            { title: "Primary Wing", path: "/academics/methodology/primary" },
            { title: "Middle Wing", path: "/academics/methodology/middle" },
            { title: "Senior Wing", path: "/academics/methodology/senior" },
          ],
        },
        { title: "Holistic Development", path: "/academics/holistic-development" },
        { title: "Technology Integration", path: "/academics/technology" },
        { title: "Guidance & Counselling", path: "/academics/guidance-counseling" },
        { title: "Academic Calendar", path: "/academics/calendar" },
        { title: "CBSE Circulars", path: "https://www.cbse.gov.in/cbsenew/circulars.html" },
      ],
    },
    {
      title: "Infrastructure",
      path: "/infrastructure",
      children: [
        { title: "Auditorium", path: "/infrastructure/auditorium" },
        { title: "Sports Facilities", path: "/infrastructure/sports" },
        {
          title: "Facilities",
          path: "/infrastructure/facilities",
          children: [
            { title: "Transportation", path: "/infrastructure/facilities/transportation" },
            { title: "Health Clinic", path: "/infrastructure/facilities/health" },
            { title: "Security", path: "/infrastructure/facilities/security" },
          ],
        },
        { title: "Learning Centre", path: "/infrastructure/learning-centre" },
        { title: "Infrastructure Overview", path: "/infrastructure/overview" },
        { title: "Library", path: "/infrastructure/library" },
      ],
    },
    {
      title: "Admissions",
      path: "/admissions",
      children: [
        {
          title: "Admission",
          path: "/admissions/apply",
          children: [
            { title: "Primary Wing", path: "/admissions/apply/primary" },
            { title: "Middle Wing", path: "/admissions/apply/middle" },
            { title: "Senior Wing", path: "/admissions/apply/senior" },
          ],
        },
        { title: "TC Request", path: "/admissions/tc-request" },
      ],
    },
    {
      title: "Press",
      path: "/press",
      children: [
        { title: "Press Coverage", path: "/press/coverage" },
        { title: "E-Magazine", path: "/press/magazine" },
        { title: "Gallery", path: "/gallery" },
      ],
    },
    { title: "Mandatory Disclosure", path: "/cbse/ex" },
    { title: "Vacancies", path: "/vacancies" },
  ];

  const filteredNavigation = navigation.filter(item => Object.keys(item).length > 0);

  return (
    <>
      <header
        className="fixed z-50 transition-all duration-500 w-full left-0 right-0 top-3 bg-brand-text/95 backdrop-blur-xl border-b border-brand-blue/20 shadow-2xl py-3 px-6 sm:px-10 lg:px-16"
      >
        <div className="px-4 sm:px-6 w-full flex items-center justify-between">
          
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`p-0.5 rounded-lg border transition-all duration-300 group-hover:scale-105 bg-white shadow-sm border-white/20`}>
              <img className="h-10 w-auto sm:h-12" src={rmcp_logo} alt="RMCP Academy Logo" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={`text-lg sm:text-xl font-black tracking-wide font-heading leading-tight uppercase transition-colors text-white group-hover:text-brand-blue-light`}
              >
                RMCP ACADEMY
              </span>
              <span className={`text-[9px] tracking-widest uppercase font-bold block leading-none mt-0.5 ${(isScrolled || location.pathname !== "/") ? "text-brand-blue" : "text-brand-blue-light"}`}>
                Nurturing Excellence
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
            {filteredNavigation.map((item, index) => (
              <DropdownMenu key={index} item={item} activePath={location.pathname} logout={logout} isLightMode={false} />
            ))}
            <div className={`w-px h-6 mx-3 border-white/20`} />
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors cursor-pointer text-slate-200 hover:text-white hover:bg-white/10`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors cursor-pointer text-slate-200 hover:text-white`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 rounded-full transition-colors cursor-pointer text-slate-200 hover:text-white`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed inset-0 bg-brand-text/98 backdrop-blur-3xl z-[60] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-0.5 bg-white rounded-lg">
                  <img className="h-8 w-auto" src={rmcp_logo} alt="RMCP Academy Logo" />
                </div>
                <span className="text-white font-black font-heading tracking-wide">RMCP ACADEMY</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              {filteredNavigation.map((item, index) => (
                <MobileAccordion
                  key={index}
                  item={item}
                  activePath={location.pathname}
                  onNavigate={() => setIsMenuOpen(false)}
                  logout={logout}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
