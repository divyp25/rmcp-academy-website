import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dns from 'dns';
import Gallery from './models/gallery.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  console.warn("⚠️ Warning: Failed to set custom DNS servers:", err.message);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MONGO_URL = process.env.MONGO_URL;

const custGalleryData = [
  { id: 1, image: 'gal (1).jpg', title: "RMCP Annual Day", description: "Celebrating academic and extracurricular achievements.", date: "Feb 2025" },
  { id: 2, image: 'gal (2).jpg', title: "Sports Tournament", description: "Inter-school championship events.", date: "Jan 2025" },
  { id: 3, image: 'gal (3).jpg', title: "Taekwondo Exhibition", description: "Martial arts demonstration and training session.", date: "Mar 2025" },
  { id: 4, image: 'gal (4).jpg', title: "Science Exhibition", description: "Students demonstrating models and innovations.", date: "Dec 2024" },
  { id: 5, image: 'gal (5).jpg', title: "Independence Day Celebration", description: "Patriotic programs and flag hoisting ceremony.", date: "Aug 2024" },
  { id: 6, image: 'gal (6).jpg', title: "Classroom Activity", description: "Interactive and technology-integrated learning sessions.", date: "Nov 2024" },
  { id: 7, image: 'gal (7).jpg', title: "Art & Craft Showcase", description: "Creative expressions of RMCP Academy students.", date: "Oct 2024" },
  { id: 8, image: 'gal (8).jpg', title: "Taekwondo Practice", description: "Self-defense drills and high kick demonstrations.", date: "Mar 2025" },
  { id: 9, image: 'gal (9).jpg', title: "Cultural Festival", description: "Classical dance and musical programs.", date: "Oct 2024" },
  { id: 10, image: 'gal (10).jpg', title: "Primary Wing Event", description: "Fun educational activities for young kids.", date: "Nov 2024" },
  { id: 11, image: 'gal (11).jpg', title: "Farewell Ceremony", description: "Bidding adieu to our outgoing senior batches.", date: "Feb 2025" },
  { id: 12, image: 'gal (12).jpg', title: "Smart Classroom Session", description: "Digital panel learning with interactive models.", date: "Jan 2025" },
  { id: 13, image: 'gal (13).jpg', title: "Martial Arts Drills", description: "Students demonstrating speed and discipline.", date: "Mar 2025" },
  { id: 14, image: 'gal (14).jpg', title: "Speech Competition", description: "Developing public speaking and debate capabilities.", date: "Sep 2024" },
  { id: 15, image: 'gal (15).jpg', title: "Taekwondo Sparring", description: "Excellence in athletic agility and discipline.", date: "Mar 2025" },
  { id: 16, image: 'gal (16).jpg', title: "Group Discussion", description: "Collaborative reasoning and active discussion.", date: "Dec 2024" },
  { id: 17, image: 'gal (17).jpg', title: "Taekwondo Belt Grading", description: "Honoring achievements and progression in martial arts.", date: "Mar 2025" },
  { id: 18, image: 'gal (18).jpg', title: "Computer Lab Practice", description: "Programming and coding sessions in the computer center.", date: "Jan 2025" },
  { id: 19, image: 'gal (19).jpg', title: "Yoga Demonstration", description: "Nurturing mental wellness and physical flexibility.", date: "Jun 2024" },
  { id: 20, image: 'gal (20).jpg', title: "Teacher's Training Workshop", description: "Continuous development for our educators.", date: "May 2024" },
  { id: 21, image: 'gal (21).jpg', title: "Music & Band Performance", description: "Harmonious musical displays during assembly.", date: "Nov 2024" },
  { id: 22, image: 'gal (22).jpg', title: "Plantation Drive", description: "Eco-club initiative to foster environmental care.", date: "Jul 2024" },
  { id: 23, image: 'gal (23).jpg', title: "Math Olympiad winners", description: "Awarding stellar academic problem solvers.", date: "Dec 2024" },
];

async function seedGallery() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB.');

    for (const item of custGalleryData) {
      const imagePath = path.join(__dirname, 'client', 'src', 'assets', 'img', 'newEvent', item.image);
      
      if (!fs.existsSync(imagePath)) {
        console.log(`File not found: ${imagePath}`);
        continue;
      }
      
      console.log(`Uploading ${item.image}...`);
      
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'rmcp_gallery'
      });

      console.log(`Uploaded to Cloudinary: ${result.secure_url}`);

      const galleryEntry = new Gallery({
        image: result.secure_url,
        title: item.title,
        description: item.description
      });

      await galleryEntry.save();
      console.log(`Saved to MongoDB: ${item.title}`);
    }

    console.log('Gallery seeding completed successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding gallery:', error);
    mongoose.connection.close();
  }
}

seedGallery();
