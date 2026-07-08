import React, { useState, useEffect } from "react";
import { X, Calendar, Image as ImageIcon, ZoomIn } from "lucide-react";
import axios from "axios";
import { API } from "../../assets/constant";
import { motion, AnimatePresence } from "framer-motion";

// import images
import gallery1 from "../../assets/img/newEvent/gal (1).jpg";
import gallery2 from "../../assets/img/newEvent/gal (2).jpg";
import gallery3 from "../../assets/img/newEvent/gal (3).jpg";
import gallery4 from "../../assets/img/newEvent/gal (4).jpg";
import gallery5 from "../../assets/img/newEvent/gal (5).jpg";
import gallery6 from "../../assets/img/newEvent/gal (6).jpg";
import gallery7 from "../../assets/img/newEvent/gal (7).jpg";
import gallery8 from "../../assets/img/newEvent/gal (8).jpg";
import gallery9 from "../../assets/img/newEvent/gal (9).jpg";
import gallery10 from "../../assets/img/newEvent/gal (10).jpg";
import gallery11 from "../../assets/img/newEvent/gal (11).jpg";
import gallery12 from "../../assets/img/newEvent/gal (12).jpg";
import gallery13 from "../../assets/img/newEvent/gal (13).jpg";
import gallery14 from "../../assets/img/newEvent/gal (14).jpg";
import gallery15 from "../../assets/img/newEvent/gal (15).jpg";
import gallery16 from "../../assets/img/newEvent/gal (16).jpg";
import gallery17 from "../../assets/img/newEvent/gal (17).jpg";
import gallery18 from "../../assets/img/newEvent/gal (18).jpg";
import gallery19 from "../../assets/img/newEvent/gal (19).jpg";
import gallery20 from "../../assets/img/newEvent/gal (20).jpg";
import gallery21 from "../../assets/img/newEvent/gal (21).jpg";
import gallery22 from "../../assets/img/newEvent/gal (22).jpg";
import gallery23 from "../../assets/img/newEvent/gal (23).jpg";

const ImageGallery = () => {
  const [custGallery, setCustGallery] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGallery();
    setCustGallery([
      { id: 1, image: gallery1, title: "RMCP Annual Day", description: "Celebrating academic and extracurricular achievements.", date: "Feb 2025" },
      { id: 2, image: gallery2, title: "Sports Tournament", description: "Inter-school championship events.", date: "Jan 2025" },
      { id: 3, image: gallery3, title: "Taekwondo Exhibition", description: "Martial arts demonstration and training session.", date: "Mar 2025" },
      { id: 4, image: gallery4, title: "Science Exhibition", description: "Students demonstrating models and innovations.", date: "Dec 2024" },
      { id: 5, image: gallery5, title: "Independence Day Celebration", description: "Patriotic programs and flag hoisting ceremony.", date: "Aug 2024" },
      { id: 6, image: gallery6, title: "Classroom Activity", description: "Interactive and technology-integrated learning sessions.", date: "Nov 2024" },
      { id: 7, image: gallery7, title: "Art & Craft Showcase", description: "Creative expressions of RMCP Academy students.", date: "Oct 2024" },
      { id: 8, image: gallery8, title: "Taekwondo Practice", description: "Self-defense drills and high kick demonstrations.", date: "Mar 2025" },
      { id: 9, image: gallery9, title: "Cultural Festival", description: "Classical dance and musical programs.", date: "Oct 2024" },
      { id: 10, image: gallery10, title: "Primary Wing Event", description: "Fun educational activities for young kids.", date: "Nov 2024" },
      { id: 11, image: gallery11, title: "Farewell Ceremony", description: "Bidding adieu to our outgoing senior batches.", date: "Feb 2025" },
      { id: 12, image: gallery12, title: "Smart Classroom Session", description: "Digital panel learning with interactive models.", date: "Jan 2025" },
      { id: 13, image: gallery13, title: "Martial Arts Drills", description: "Students demonstrating speed and discipline.", date: "Mar 2025" },
      { id: 14, image: gallery14, title: "Speech Competition", description: "Developing public speaking and debate capabilities.", date: "Sep 2024" },
      { id: 15, image: gallery15, title: "Taekwondo Sparring", description: "Excellence in athletic agility and discipline.", date: "Mar 2025" },
      { id: 16, image: gallery16, title: "Group Discussion", description: "Collaborative reasoning and active discussion.", date: "Dec 2024" },
      { id: 17, image: gallery17, title: "Taekwondo Belt Grading", description: "Honoring achievements and progression in martial arts.", date: "Mar 2025" },
      { id: 18, image: gallery18, title: "Computer Lab Practice", description: "Programming and coding sessions in the computer center.", date: "Jan 2025" },
      { id: 19, image: gallery19, title: "Yoga Demonstration", description: "Nurturing mental wellness and physical flexibility.", date: "Jun 2024" },
      { id: 20, image: gallery20, title: "Teacher's Training Workshop", description: "Continuous development for our educators.", date: "May 2024" },
      { id: 21, image: gallery21, title: "Music & Band Performance", description: "Harmonious musical displays during assembly.", date: "Nov 2024" },
      { id: 22, image: gallery22, title: "Plantation Drive", description: "Eco-club initiative to foster environmental care.", date: "Jul 2024" },
      { id: 23, image: gallery23, title: "Math Olympiad winners", description: "Awarding stellar academic problem solvers.", date: "Dec 2024" },
    ]);
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/api/gallery`);
      if (response.status === 200) {
        setGallery(response.data);
      } else {
        throw new Error("Failed to load gallery");
      }
    } catch (err) {
      setError("Error fetching gallery images");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image, isLocal = false) => {
    if (isLocal) {
      setSelectedImage({
        image: image.image,
        title: image.title,
        description: image.description || "Academy Event Gallery Image",
        updatedAt: image.date || "Recent Event",
        isLocal: true,
      });
    } else {
      try {
        axios.get(`${API}/api/gallery/${image._id}`).then((res) => {
          setSelectedImage({
            ...res.data,
            isLocal: false,
          });
        });
      } catch (err) {
        console.log(err);
        alert("An error occurred while fetching gallery item details.");
      }
    }
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden font-sans min-h-screen">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            Campus Life
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Events <span className="text-brand-blue">& Gallery</span>
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
            "Capturing Moments, Inspiring Futures." Take a glimpse into our active learning environments, academic forums, and sports leagues.
          </p>
        </div>

        {/* Loading & Error Indicators */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-brand-blue animate-spin"></div>
            <p className="text-slate-500 font-semibold text-sm">Loading campus gallery...</p>
          </div>
        )}
        
        {error && (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-red-50 border border-red-100 text-center text-red-700 font-semibold mb-8 text-sm">
            {error}
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            
            {/* Database uploaded images */}
            {gallery &&
              gallery.map((image) => (
                <motion.div
                  key={image._id}
                  variants={cardVariants}
                  className="group relative bg-white border border-slate-100 rounded-2xl shadow-md shadow-slate-200/50 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={() => handleImageClick(image, false)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={`${API}${image.image}`}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-extrabold text-slate-800 text-base font-heading group-hover:text-brand-blue transition-colors line-clamp-1">
                      {image.title}
                    </h3>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" /> Uploaded Event
                    </div>
                  </div>
                </motion.div>
              ))}

            {/* Static high-res assets */}
            {custGallery &&
              custGallery.map((image) => (
                <motion.div
                  key={image.id}
                  variants={cardVariants}
                  className="group relative bg-white border border-slate-100 rounded-2xl shadow-md shadow-slate-200/50 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={() => handleImageClick(image, true)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-extrabold text-slate-800 text-base font-heading group-hover:text-brand-blue transition-colors line-clamp-1">
                      {image.title}
                    </h3>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" /> {image.date}
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}

        {/* Image Details Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white max-w-4xl w-full rounded-3xl border border-white/20 overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-950/50 hover:bg-slate-950 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image Column */}
                <div className="w-full md:w-3/5 bg-slate-900 flex items-center justify-center p-6 min-h-[300px] md:min-h-0">
                  <img
                    src={selectedImage.isLocal ? selectedImage.image : `${API}${selectedImage.image}`}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[40vh] md:max-h-[70vh] object-contain rounded-lg"
                  />
                </div>

                {/* Details Column */}
                <div className="w-full md:w-2/5 bg-slate-50 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
                      <ImageIcon className="w-3.5 h-3.5" /> Academy Album
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 font-heading leading-tight">
                      {selectedImage.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    <span>
                      {selectedImage.isLocal
                        ? selectedImage.updatedAt
                        : new Date(selectedImage.updatedAt).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                    </span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ImageGallery;
