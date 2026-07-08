import React from 'react';
import { BookOpen, Users, Map, Film, Award, Lightbulb, Mic, Globe, PenTool, Puzzle, Beaker, Users2, CheckCircle } from 'lucide-react';
import middleWingImg from "../../../assets/img/middle_wing.jpg";
import { useCMS } from "../../../hooks/useCMS";

const MiddleWing = () => {
  const { data: cmsData } = useCMS('middle');
  const methodologies = [
    {
      id: 1,
      title: "Experiential Learning",
      description: "Students engage in hands-on activities that transform theoretical concepts into practical understanding, following Aristotle's principle of 'learning by doing'.",
      icon: <Lightbulb className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40"
    },
    {
      id: 2,
      title: "Value-Based Education",
      description: "We integrate ethical principles and character development across all subjects, nurturing responsible, compassionate, and principled individuals.",
      icon: <Award className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40"
    },
    {
      id: 3,
      title: "Research & Analysis",
      description: "Students develop critical thinking through research projects that encourage questioning, investigation, and application of knowledge.",
      icon: <PenTool className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40"
    },
    {
      id: 4,
      title: "Laboratory-Based Learning",
      description: "Our well-equipped science and computer labs facilitate experimental learning, helping students discover concepts through guided exploration.",
      icon: <Beaker className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40"
    },
    {
      id: 5,
      title: "Educational Field Trips",
      description: "Regular excursions to historical sites, natural environments, and institutions bridge classroom learning with real-world contexts.",
      icon: <Map className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40"
    },
    {
      id: 6,
      title: "Collaborative Learning",
      description: "Group projects and peer teaching develop teamwork, leadership, and communication skills essential for success in the modern world.",
      icon: <Users2 className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40"
    },
    {
      id: 7,
      title: "Sports & Co-curricular",
      description: "Balanced development through athletics, arts, and clubs strengthens physical fitness, creativity, and essential life skills.",
      icon: <Users className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40"
    },
    {
      id: 8,
      title: "Library-Based Learning",
      description: "Our extensive library resources cultivate research skills, literary appreciation, and a lifelong love for independent learning.",
      icon: <BookOpen className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40"
    },
    {
      id: 9,
      title: "Project Work",
      description: "Cross-disciplinary projects encourage students to apply knowledge from multiple subjects to solve complex, real-world problems.",
      icon: <Puzzle className="h-7 w-7 text-brand-orange" />,
      color: "bg-brand-surface border-brand-orange/20 hover:border-brand-orange/40"
    },
    {
      id: 10,
      title: "Audio-Visual Teaching",
      description: "Modern multimedia resources enhance learning experiences, catering to diverse learning styles and deepening conceptual understanding.",
      icon: <Film className="h-7 w-7 text-brand-blue" />,
      color: "bg-brand-surface border-brand-blue/20 hover:border-brand-blue/40"
    }
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
        <span dangerouslySetInnerHTML={{ __html: String(cmsData.wing_title.split(' (')[0]).replace('Middle Wing', '<span class="text-brand-blue">Middle Wing</span>') }} />
      ) : (
        <><span className="text-brand-blue">Middle</span> <span className="text-brand-blue">Wing</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="font-semibold text-brand-text/90 italic mt-2">
            {cmsData?.wing_subtitle || "Transitioning to independent learning and advanced critical thinking."}
          </p>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.methodology_description || "The formative years at RMCP Academy's Middle Wing bridge childhood curiosity with adolescent analytical thinking, providing a structured environment where students develop academic excellence, emotional intelligence, and social responsibility."}
          </p>
        </div>

        {/* Aristotle Quote Banner */}
        <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue/15 mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-2/3 space-y-6">
              <h3 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide">Our Educational Philosophy</h3>
              <blockquote className="italic text-base sm:text-lg text-slate-700 border-l-4 border-brand-orange pl-5 py-2 bg-brand-orange/5 rounded-r-xl">
                "For the things we have to learn before we can do them, we learn by doing them."
                <footer className="text-right font-bold text-xs uppercase tracking-widest text-brand-blue mt-2">— Aristotle</footer>
              </blockquote>
              <p className="text-slate-600 text-base leading-relaxed">
                At RMCP Academy's Middle Wing, we embrace Aristotle's timeless wisdom by creating 
                learning environments where students actively engage with knowledge. Our approach balances 
                academic rigor with practical application, preparing students for higher education while 
                nurturing critical thinking and character development.
              </p>
            </div>
            <div className="lg:w-1/3 mt-6 lg:mt-0 flex justify-center">
              <div className="relative p-2 bg-white border border-brand-blue/10 rounded-2xl shadow-lg">
                <img 
                  src={cmsData?.hero_image_url || middleWingImg}
                  alt="Middle wing students collaborating" 
                  className="rounded-xl shadow-md max-w-xs w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Methodology Grid */}
        <h3 className="text-2xl font-black text-brand-text mb-8 text-center font-heading uppercase tracking-wide">
          Core Pillars of Middle Methodology
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
                  <h4 className="text-base sm:text-lg font-bold text-brand-text font-heading mb-2">{method.title}</h4>
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
              <div className="lg:w-1/3 bg-brand-surface p-10 flex items-center justify-center border-r border-brand-blue/5">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wider">Middle Years</h3>
                  <p className="text-brand-orange font-extrabold uppercase tracking-widest text-xs">Classes I to V</p>
                  <div className="bg-white px-6 py-3.5 rounded-2xl shadow-md inline-block border border-brand-blue/5">
                    <p className="text-lg font-bold text-brand-blue">Ages 6-11</p>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="lg:w-2/3 p-8 sm:p-10">
                <h3 className="text-2xl font-black text-brand-text mb-6 font-heading uppercase tracking-wide">Curriculum Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-extrabold text-brand-blue mb-4 uppercase tracking-wider text-sm sm:text-base font-heading">Academic Disciplines</h4>
                    <ul className="space-y-3.5">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">English Language & Literature</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">Hindi, Sanskrit & Panjabi Language</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">Mathematics & Advanced Problem Solving</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">Science (Physics, Chemistry, Biology)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">Social Studies & Civics</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">Computer Science & Digital Projects</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-blue mb-4 uppercase tracking-wider text-sm sm:text-base font-heading">Skill Development Programs</h4>
                    <ul className="space-y-3.5">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">Fine Arts & Creative Expression</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">Music & Performing Arts</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">Debate, MUN & Public Speaking</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">Sports & Physical Education</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">Entrepreneurship & Innovation</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-655 text-sm">Community Service & Leadership</span>
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
          <h3 className="text-2xl font-black text-brand-text mb-8 text-center font-heading uppercase tracking-wide">A Day in Middle Wing</h3>
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-blue/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-brand-surface p-8 border-b md:border-b-0 md:border-r border-brand-blue/10">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-white h-8 w-8 rounded-full flex items-center justify-center mr-2 shadow-sm text-brand-orange font-extrabold border border-brand-blue/5">
                    1
                  </span>
                  Morning Assembly
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Day begins with student-led assemblies featuring presentations on current affairs, mindfulness exercises, and inspiring messages.
                </p>
              </div>
              
              <div className="bg-white p-8 border-b md:border-b-0 md:border-r border-brand-blue/10">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-brand-surface h-8 w-8 rounded-full flex items-center justify-center mr-2 shadow-sm text-brand-blue font-extrabold border border-brand-blue/5">
                    2
                  </span>
                  Academic Sessions
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Interactive subject-specific classes with specialized teachers include discussions, debates, and project work with technology integration.
                </p>
              </div>
              
              <div className="bg-brand-surface p-8 border-b md:border-b-0 md:border-r border-brand-blue/10">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-white h-8 w-8 rounded-full flex items-center justify-center mr-2 shadow-sm text-brand-orange font-extrabold border border-brand-blue/5">
                    3
                  </span>
                  Clubs & Activities
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Scheduled time for sports, arts, STEM clubs, literary activities, and student-led initiatives that develop specific talents and interests.
                </p>
              </div>
              
              <div className="bg-white p-8">
                <h4 className="font-extrabold text-brand-text mb-4 flex items-center gap-2.5 font-heading">
                  <span className="bg-brand-surface h-8 w-8 rounded-full flex items-center justify-center mr-2 shadow-sm text-brand-blue font-extrabold border border-brand-blue/5">
                    4
                  </span>
                  Synthesis & Planning
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The day concludes with mentoring sessions for assignment planning, goal-setting, and reflection on learning achievements.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MiddleWing;