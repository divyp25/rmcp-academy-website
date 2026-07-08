import { pool } from './utils/supabaseDb.js';

const seedData = [
  {
    title: "About RMCP Academy",
    content: "A premier educational academy dedicated to academic rigor, creative innovation, and comprehensive holistic student development. Founded in 2012, we aim to inspire excellence.",
    section: "About Us"
  },
  {
    title: "Our Mission",
    content: "Our mission is to empower students with knowledge, character, and leadership skills to navigate a rapidly changing world. We focus on ethical values, critical thinking, and inclusivity.",
    section: "Mission"
  },
  {
    title: "Founder's Message",
    content: "Education is not just about textbooks; it is about building the foundation of tomorrow's leaders. At RMCP Academy, we ensure every child receives the attention and resources they deserve to unlock their full potential.",
    section: "Messages"
  },
  {
    title: "Principal's Message",
    content: "Welcome to RMCP Academy. Our dedicated faculty and state-of-the-art infrastructure provide an ideal environment for nurturing young minds. Let's work together to inspire greatness.",
    section: "Messages"
  },
  {
    title: "Primary Wing Methodology",
    content: "Our primary wing focuses on experiential learning. Children aged 4-10 learn through play, interactive storytelling, and hands-on activities that foster curiosity and foundational skills.",
    section: "Academics"
  }
];

async function seed() {
  try {
    console.log("🌱 Seeding CMS data to Supabase...");
    for (const item of seedData) {
      await pool.query(
        "INSERT INTO cms_content (title, content, section) VALUES ($1, $2, $3)",
        [item.title, item.content, item.section]
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
