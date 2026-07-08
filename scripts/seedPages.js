import { pool } from './utils/supabaseDb.js';

const seedPages = [
  {
    page_id: "home",
    page_name: "Home Page",
    data: JSON.stringify({
      hero_title: "Empowering Minds, Inspiring Futures",
      hero_subtitle: "Welcome to RMCP Academy, where academic excellence meets character building.",
      hero_button_primary: "Explore Admissions",
      hero_button_secondary: "Virtual Tour"
    })
  },
  {
    page_id: "about",
    page_name: "About Us",
    data: JSON.stringify({
      page_title: "ABOUT RMCP ACADEMY",
      page_subtitle: "A premier educational academy dedicated to academic rigor, creative innovation, and comprehensive holistic student development.",
      legacy_badge: "Established 2012",
      stats_affiliated_board: "CBSE curriculum integrated with modern learning approaches",
      stats_campus: "10-acre lush green campus designed for health and safety",
      stats_faculty: "75+ Highly qualified educators dedicated to student growth",
      stats_alumni: "1000+ Successful alumni placed in top institutions globally"
    })
  },
  {
    page_id: "mission",
    page_name: "Mission & Vision",
    data: JSON.stringify({
      mission_title: "OUR MISSION",
      mission_description: "To empower students with knowledge, skills, and values, fostering critical thinking, creativity, and a global perspective to navigate an ever-changing world.",
      vision_title: "OUR VISION",
      vision_description: "To be a center of excellence that nurtures holistic development, instilling a lifelong love for learning, compassion, and ethical leadership in every student.",
      hero_image_url: ""
    })
  },
  {
    page_id: "founder",
    page_name: "Founder's Message",
    data: JSON.stringify({
      founder_name: "LATE SMT. CHANDRIKA PRASAD",
      founder_title: "Founder, RMCP Academy",
      founder_message: "Education is the most powerful tool we can use to change the world. It is our duty to empower the next generation with not just academic knowledge, but strong moral character and a desire to contribute positively to society. RMCP Academy was built on the foundation of providing quality education that reaches every child.",
      founder_image_url: ""
    })
  },
  {
    page_id: "principal",
    page_name: "Principal's Message",
    data: JSON.stringify({
      principal_name: "MR. ANANT SAXENA",
      principal_title: "Principal, RMCP Academy",
      principal_message: "Welcome to RMCP Academy. Our institution stands for academic excellence and holistic development. We believe in providing an environment where every child feels valued and inspired to achieve their maximum potential. Our dedicated faculty ensures that learning is engaging, meaningful, and character-building.",
      principal_image_url: ""
    })
  },
  {
    page_id: "primary",
    page_name: "Primary Wing",
    data: JSON.stringify({
      wing_title: "Primary Wing (Classes I - V)",
      wing_subtitle: "Building the foundation for lifelong learning through curiosity and exploration.",
      age_group: "Ages 5 - 10 Years",
      methodology_description: "Our primary education approach focuses on experiential learning, where children actively participate in the discovery process. We combine traditional academics with creative arts, physical education, and value-based lessons.",
      hero_image_url: ""
    })
  },
  {
    page_id: "auditorium",
    page_name: "Grand Auditorium",
    data: JSON.stringify({
      facility_title: "State-of-the-art Auditorium",
      facility_description: "Our multi-purpose grand auditorium has a seating capacity of over 800 people. Fully air-conditioned and equipped with advanced acoustics and professional lighting, it serves as the perfect venue for cultural fests, seminars, and guest lectures.",
      capacity: "800+ Seats",
      main_image_url: ""
    })
  },
  {
    page_id: "chairperson",
    page_name: "Chairperson's Message",
    data: JSON.stringify({
      chairperson_name: "MRS. CHAIRPERSON",
      chairperson_title: "Chairperson, RMCP Academy",
      chairperson_message: "It is our core philosophy to provide a nurturing environment where students thrive. We believe in strong partnerships with parents to develop the next generation of ethical leaders.",
      chairperson_image_url: ""
    })
  },
  {
    page_id: "accreditation",
    page_name: "Accreditation",
    data: JSON.stringify({
      accreditation_title: "Our Accreditations",
      accreditation_description: "RMCP Academy is fully accredited and recognized by the Central Board of Secondary Education (CBSE), ensuring the highest standards of academic excellence and global recognition."
    })
  },
  {
    page_id: "middle",
    page_name: "Middle Wing",
    data: JSON.stringify({
      wing_title: "Middle Wing (Classes VI - VIII)",
      wing_subtitle: "Transitioning to independent learning and advanced critical thinking.",
      age_group: "Ages 11 - 13 Years",
      methodology_description: "The Middle Wing focuses on specialized subjects, project-based learning, and developing independent research skills to prepare students for the rigorous Senior secondary curriculum."
    })
  },
  {
    page_id: "senior",
    page_name: "Senior Wing",
    data: JSON.stringify({
      wing_title: "Senior Wing (Classes IX - XII)",
      wing_subtitle: "Preparing for board examinations, career choices, and college readiness.",
      age_group: "Ages 14 - 18 Years",
      methodology_description: "Our Senior Wing curriculum is highly rigorous, focusing on board examination preparation, career counseling, and advanced academic concepts across Science, Commerce, and Humanities streams."
    })
  },
  {
    page_id: "holistic",
    page_name: "Holistic Development",
    data: JSON.stringify({
      page_title: "Holistic Development",
      page_subtitle: "Nurturing the mind, body, and soul through a balanced approach to education.",
      description: "We focus on the all-round development of our students through arts, sports, and cultural activities alongside academics."
    })
  },
  {
    page_id: "technology",
    page_name: "Technology Integration",
    data: JSON.stringify({
      page_title: "Technology Integration",
      page_subtitle: "Preparing students for the digital future.",
      description: "Our classrooms are equipped with smart boards, and we have advanced computer labs to ensure digital literacy from an early age."
    })
  },
  {
    page_id: "guidance",
    page_name: "Guidance & Counseling",
    data: JSON.stringify({
      page_title: "Guidance & Counseling",
      page_subtitle: "Supporting student well-being and career choices.",
      description: "Professional counselors are available to support students' emotional well-being and provide expert career guidance."
    })
  },
  {
    page_id: "sports",
    page_name: "Sports Facility",
    data: JSON.stringify({
      facility_title: "Sports & Athletics",
      facility_description: "We offer sprawling sports fields, basketball courts, and indoor sports facilities to promote physical fitness and team spirit."
    })
  },
  {
    page_id: "transportation",
    page_name: "Transportation",
    data: JSON.stringify({
      facility_title: "Safe Transportation",
      facility_description: "A fleet of GPS-enabled buses ensures safe and comfortable commute for students across the city."
    })
  },
  {
    page_id: "health",
    page_name: "Health Clinic",
    data: JSON.stringify({
      facility_title: "Health Clinic",
      facility_description: "A fully equipped health clinic with a trained nurse is available on campus to handle medical emergencies and routine health checkups."
    })
  },
  {
    page_id: "security",
    page_name: "Campus Security",
    data: JSON.stringify({
      facility_title: "Campus Security",
      facility_description: "24/7 CCTV surveillance and trained security personnel ensure a safe and secure environment for all students."
    })
  },
  {
    page_id: "library",
    page_name: "Library",
    data: JSON.stringify({
      facility_title: "Resourceful Library",
      facility_description: "Our library is stocked with thousands of books, journals, and digital resources to foster a love for reading and research."
    })
  },
  {
    page_id: "campus",
    page_name: "Campus Overview",
    data: JSON.stringify({
      facility_title: "Campus Overview",
      facility_description: "Our 10-acre lush green campus provides a serene and inspiring environment for holistic learning."
    })
  },
  {
    page_id: "learning_center",
    page_name: "Learning Center",
    data: JSON.stringify({
      facility_title: "Advanced Learning Center",
      facility_description: "Dedicated spaces for collaborative projects, robotics, and advanced scientific research."
    })
  }
];

async function seed() {
  try {
    console.log("🌱 Seeding JSON Page data to Supabase...");
    for (const page of seedPages) {
      await pool.query(
        `INSERT INTO cms_pages (page_id, page_name, data) 
         VALUES ($1, $2, $3)
         ON CONFLICT (page_id) DO UPDATE SET data = $3`,
        [page.page_id, page.page_name, page.data]
      );
    }
    console.log("✅ Seed complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    pool.end();
  }
}

seed();
