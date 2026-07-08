import React from "react";
import {
  BookOpen,
  Users,
  Map,
  Film,
  Award,
  Lightbulb,
  Mic,
  Globe,
  PenTool,
  Puzzle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import primaryWingImg from "../../../assets/img/primary_wing.jpg";
import { useCMS } from "../../../hooks/useCMS";

const PrimaryWing = () => {
  const { data: cmsData } = useCMS('primary');
  const methodologies = [
    {
      id: 1,
      title: "Experiential Learning",
      description:
        "Our 'learning by doing' approach encourages students to actively participate in hands-on activities that reinforce theoretical concepts through practical application.",
      icon: <Lightbulb className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 2,
      title: "Character Education",
      description:
        "We integrate value-based teaching in every subject, nurturing ethical thinking, compassion, respect, and integrity as foundations for lifelong success.",
      icon: <Award className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 3,
      title: "Immersive Thematic Approach",
      description:
        "Our curriculum follows integrated themes that connect multiple subjects, helping students understand relationships between different areas of knowledge.",
      icon: <BookOpen className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 4,
      title: "Multimedia Learning",
      description:
        "Advanced audio-visual aids and digital resources enhance comprehension, retention, and engagement through multisensory learning experiences.",
      icon: <Film className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 5,
      title: "Exploratory Field Trips",
      description:
        "Regular educational excursions connect classroom knowledge with real-world contexts, providing authentic learning experiences beyond school walls.",
      icon: <Map className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 6,
      title: "Theatrical Expression",
      description:
        "Through role play and dramatization, students develop confidence, creativity, emotional intelligence, and effective communication skills.",
      icon: <Users className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 7,
      title: "Research & Presentation",
      description:
        "Project-based learning cultivates research skills, critical thinking, teamwork, and the ability to articulate ideas clearly and confidently.",
      icon: <PenTool className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 8,
      title: "Analytical Thinking",
      description:
        "Engaging problem-solving activities develop logical reasoning, creativity, perseverance, and the ability to approach challenges methodically.",
      icon: <Puzzle className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 9,
      title: "Language Enrichment",
      description:
        "Our specialized vocabulary building program and language labs help students develop strong communication foundations across multiple languages.",
      icon: <Globe className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 10,
      title: "Public Speaking Excellence",
      description:
        "Regular opportunities for recitation, debate, and presentations help students build confidence, articulation, and powerful oratorical abilities.",
      icon: <Mic className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
  ];

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest">
                Academics
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-text font-heading leading-tight uppercase tracking-wide">
                {cmsData?.wing_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.wing_title).replace('Primary Wing', '<span class="text-brand-blue">Primary Wing</span>') }} />
      ) : (
        <><span className="text-brand-blue">Primary</span> <span className="text-brand-blue">Wing</span></>
      )}
              </h2>
              <div className="w-20 h-1.5 bg-brand-blue rounded-full mt-4 mx-auto"></div>
            </div>

            <div className="space-y-5 text-slate-655 text-base sm:text-lg leading-relaxed pt-2 max-w-3xl mx-auto">
              <p className="font-semibold text-brand-text/90 italic">
                {cmsData?.wing_subtitle || "Building the foundation for lifelong learning through curiosity and exploration."}
              </p>
              <p>
                {cmsData?.methodology_description ? (
                  cmsData.methodology_description
                ) : (
                  <>
                    The Primary School years (Classes I to V) are crucial for establishing a 
                    strong educational foundation. At <span className="font-bold text-brand-blue">RMCP Academy</span>, 
                    we provide a vibrant, stimulating environment where children learn to question, analyze, and apply their knowledge.
                  </>
                )}
              </p>
              {!cmsData?.methodology_description && (
                <p>
                  Our curriculum is designed to foster intellectual, emotional, and social growth. 
                  We focus on developing strong communication skills, logical reasoning, and 
                  creative expression through a well-balanced academic program.
                </p>
              )}
            </div>
        </div>

        {/* Teaching Methodology Banner */}
        <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue/15 mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-2/3 space-y-4">
              <h3 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
                Our Teaching Methodology
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                At RMCP Academy's Primary Wing, we believe that young learners
                thrive in an environment that engages their natural curiosity
                and imagination. Our innovative teaching methodologies are
                carefully designed to make learning joyful, meaningful, and
                effective, creating a strong foundation for advanced learning in
                higher classes.
              </p>
            </div>
            <div className="lg:w-1/3 mt-6 lg:mt-0 flex justify-center">
              <div className="relative p-2 bg-white border border-brand-blue/10 rounded-2xl shadow-lg">
                <img
                  src={cmsData?.hero_image_url || primaryWingImg}
                  alt="Primary students engaged in learning"
                  className="rounded-xl shadow-md max-w-xs w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Methodology Grid */}
        <h3 className="text-2xl font-black text-brand-text mb-8 text-center font-heading uppercase tracking-wide">
          Core Pillars of Primary Methodology
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {methodologies.map((method) => (
            <div
              key={method.id}
              className={`${method.color} rounded-2xl p-6 shadow-md border hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform flex-shrink-0 border border-brand-blue/5">
                  {method.icon}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-brand-text font-heading mb-2">
                    {method.title}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{method.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Curriculum Highlights */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-blue/10">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/3 bg-brand-surface p-10 flex items-center justify-center border-r border-brand-blue/5 sticky top-24">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wider">
                    {cmsData?.wing_title?.split(' (')[0] || "Primary Years"}
                  </h3>
                  <p className="text-brand-orange font-extrabold uppercase tracking-widest text-xs">
                    {cmsData?.wing_title?.includes('(') ? cmsData.wing_title.split('(')[1].replace(')', '') : "Classes I - V"}
                  </p>
                  <div className="bg-white px-6 py-3.5 rounded-2xl shadow-md inline-block border border-brand-blue/5">
                    <p className="text-lg font-bold text-brand-blue">{cmsData?.age_group || "Ages 5 - 10"}</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/3 p-8 sm:p-10">
                <h3 className="text-2xl font-black text-brand-text mb-6 font-heading uppercase tracking-wide">
                  Curriculum Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-extrabold text-brand-blue mb-4 uppercase tracking-wider text-sm sm:text-base font-heading">
                      Core Subjects
                    </h4>
                    <ul className="space-y-3.5">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          English Language & Literature
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">Hindi, Sanskrit & Panjabi Language</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Mathematics & Mental Arithmetic
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          Environmental Studies
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Computer Science & Digital Literacy
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue mb-4 uppercase tracking-wider text-sm sm:text-base font-heading">
                      Co-Curricular Activities
                    </h4>
                    <ul className="space-y-3.5">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Visual Arts & Crafts
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          Music (Vocal & Instrumental)
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Dance (Classical & Contemporary)
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          Yoga & Physical Education
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Taekwondo & Self-Defense
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Life */}
        <div>
          <h3 className="text-2xl font-black text-brand-text mb-8 text-center font-heading uppercase tracking-wide">
            A Day in Primary Wing
          </h3>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-blue/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-brand-surface p-8 border-b md:border-b-0 md:border-r border-brand-blue/10">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm text-brand-orange font-extrabold border border-brand-blue/5">
                    1
                  </span>
                  Morning Assembly
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The day begins with prayers, meditation, and inspiring
                  thoughts that center students and prepare them for learning.
                </p>
              </div>

              <div className="bg-white p-8 border-b md:border-b-0 md:border-r border-brand-blue/10">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-brand-surface h-8 w-8 rounded-full flex items-center justify-center shadow-sm text-brand-blue font-extrabold border border-brand-blue/5">
                    2
                  </span>
                  Learning Sessions
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Engaging classroom sessions blend theoretical knowledge with
                  practical activities and technology-enhanced learning.
                </p>
              </div>

              <div className="bg-brand-surface p-8 border-b md:border-b-0 md:border-r border-brand-blue/10">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm text-brand-orange font-extrabold border border-brand-blue/5">
                    3
                  </span>
                  Activity Period
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Dedicated time for arts, music, dance, and sports to ensure
                  balanced physical, creative, and cognitive development.
                </p>
              </div>

              <div className="bg-white p-8">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-brand-surface h-8 w-8 rounded-full flex items-center justify-center shadow-sm text-brand-blue font-extrabold border border-brand-blue/5">
                    4
                  </span>
                  Reflection Time
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The day concludes with guided reflection, reinforcement of
                  learning, and preparation for the next day's journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryWing;
