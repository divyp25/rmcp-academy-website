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
  Beaker,
  Users2,
  Microscope,
  Monitor,
  Headphones,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import SeniorWingImg from "../../../assets/img/senior_wing.jpg";
import { useCMS } from "../../../hooks/useCMS";

const SeniorWing = () => {
  const { data: cmsData } = useCMS('senior');
  const methodologies = [
    {
      id: 1,
      title: "Experiential Learning",
      description:
        "Advanced hands-on activities transform theoretical knowledge into practical competencies, following Aristotle's principle of 'learning by doing'.",
      icon: <Lightbulb className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 2,
      title: "Value-Based Education",
      description:
        "Ethical principles are integrated into academic pursuits, preparing students to make responsible choices as they enter higher education and careers.",
      icon: <Award className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 3,
      title: "Research & Application",
      description:
        "Students conduct in-depth research projects with real-world applications, developing critical analysis and innovative problem-solving skills.",
      icon: <PenTool className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 4,
      title: "Field Studies",
      description:
        "Educational visits to industries, universities, and research centers connect academic learning with professional environments and career insights.",
      icon: <Map className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 5,
      title: "Laboratory Excellence",
      description:
        "State-of-the-art science and computer labs enable advanced experimentation and technical skill development for future STEM careers.",
      icon: <Microscope className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 6,
      title: "Collaborative Projects",
      description:
        "Team-based assignments simulate professional environments, building leadership, delegation, and complex problem-solving capabilities.",
      icon: <Users2 className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 7,
      title: "Sports & Co-curricular",
      description:
        "Competitive sports and specialized clubs develop discipline, teamwork, and balanced mental and physical well-being essential for academic success.",
      icon: <Users className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 8,
      title: "Digital Technology Integration",
      description:
        "Advanced digital resources and multimedia learning platforms prepare students for technology-driven higher education and workplace environments.",
      icon: <Monitor className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
    {
      id: 9,
      title: "Career Guidance",
      description:
        "Personalized counseling, industry exposure, and university preparation support students in making informed decisions about their future.",
      icon: <GraduationCap className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
      id: 10,
      title: "Language Proficiency",
      description:
        "Our digital language lab enhances communication skills across multiple languages, preparing students for global academic and professional opportunities.",
      icon: <Headphones className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40",
    },
  ];

  const streams = [
    {
      name: "Science",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "Biotechnology",
        "Computer Science",
        "Informatics Practices",
      ],
      icon: <Beaker className="h-8 w-8 text-brand-blue" />,
    },
    {
      name: "Commerce",
      subjects: [
        "Accountancy",
        "Business Studies",
        "Economics",
        "Mathematics",
        "Entrepreneurship",
        "Informatics Practices",
        "Financial Markets",
      ],
      icon: <Briefcase className="h-8 w-8 text-brand-orange" />,
    },
    {
      name: "Humanities",
      subjects: [
        "History",
        "Political Science",
        "Geography",
        "Psychology",
        "Sociology",
        "Economics",
        "Languages (English, Hindi, Sanskrit)",
      ],
      icon: <BookOpen className="h-8 w-8 text-brand-blue" />,
    },
  ];

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Academics Wing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.wing_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData.wing_title.split(' (')[0]).replace('Senior Wing', '<span class="text-brand-blue">Senior Wing</span>') }} />
      ) : (
        <><span className="text-brand-blue">Senior</span> <span className="text-brand-blue">Wing</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="font-semibold text-brand-text/90 italic mt-2">
            {cmsData?.wing_subtitle || "Preparing for board examinations, career choices, and college readiness."}
          </p>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.methodology_description || "The culmination of school education at RMCP Academy focuses on intensive academic preparation, specialized skill development, and comprehensive career planning. We provide a rigorous yet supportive environment that equips students for success in board examinations and higher education pursuits."}
          </p>
        </div>

        {/* Aristotle Quote Banner */}
        <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue/15 mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-2/3 space-y-6">
              <h3 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
                Our Educational Philosophy
              </h3>
              <blockquote className="italic text-base sm:text-lg text-slate-700 border-l-4 border-brand-orange pl-5 py-2 bg-brand-orange/5 rounded-r-xl">
                “Learning gives creativity, creativity leads to thinking, thinking provides knowledge, and knowledge makes you great.”
                <footer className="text-right font-bold text-xs uppercase tracking-widest text-brand-blue mt-2">
                  – A.P.J. Abdul Kalam
                </footer>
              </blockquote>
              <p className="text-slate-600 text-base leading-relaxed">
                The Senior Wing embodies this timeless wisdom through
                specialized academic streams that balance theoretical knowledge
                with practical application. Our students don't just study
                subjects; they engage with them through research,
                experimentation, and real-world projects that prepare them for
                university excellence and future careers.
              </p>
            </div>
            <div className="lg:w-1/3 mt-6 lg:mt-0 flex justify-center">
              <div className="relative p-2 bg-white border border-brand-blue/10 rounded-2xl shadow-lg">
                <img
                  src={cmsData?.hero_image_url || SeniorWingImg}
                  alt="Senior students in modern laboratory"
                  className="rounded-xl shadow-md max-w-xs w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Streams Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-black text-brand-text mb-10 text-center font-heading uppercase tracking-wide">
            Academic Streams
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {streams.map((stream, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-blue/10 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-brand-surface p-6 flex items-center border-b border-brand-blue/5">
                    <div className="bg-white p-3 rounded-xl shadow-sm mr-4 border border-brand-blue/5">
                      {stream.icon}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
                      {stream.name}
                    </h4>
                  </div>
                  <div className="p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Subject Offerings</p>
                    <ul className="space-y-3">
                      {stream.subjects.map((subject, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                          <span className="text-slate-655 text-sm sm:text-base font-semibold">{subject}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Methodology Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-black text-brand-text mb-10 text-center font-heading uppercase tracking-wide">
            Our Teaching Approach
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Framework */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-blue/10">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/3 bg-brand-surface p-10 flex items-center justify-center border-r border-brand-blue/5">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wider">
                    Senior Years
                  </h3>
                  <p className="text-brand-orange font-extrabold uppercase tracking-widest text-xs">
                    Classes IX to XII
                  </p>
                  <div className="bg-white px-6 py-3.5 rounded-2xl shadow-md inline-block border border-brand-blue/5">
                    <p className="text-lg font-bold text-brand-blue">Ages 12-18</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/3 p-8 sm:p-10">
                <h3 className="text-2xl font-black text-brand-text mb-6 font-heading uppercase tracking-wide">
                  Specialized Education Framework
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-extrabold text-brand-blue mb-4 uppercase tracking-wider text-sm sm:text-base font-heading">
                      Classes IX-X
                    </h4>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                      Foundation years that prepare students for stream selection through:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Comprehensive core curriculum
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Aptitude assessment and guidance
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Subject sampling opportunities
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Career exploration workshops
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">
                          Board examination preparation
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue mb-4 uppercase tracking-wider text-sm sm:text-base font-heading">
                      Classes XI-XII
                    </h4>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                      Specialized stream-based education featuring:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          In-depth subject specialization
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          Advanced research projects
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          University entrance exam coaching
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          Internship opportunities
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">
                          Leadership development programs
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorWing;
