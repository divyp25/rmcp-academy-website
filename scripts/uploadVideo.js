import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadVideo = () => {
  const videoPath = path.join(__dirname, 'client', 'src', 'assets', 'video', 'Untitled design.mp4');
  
  if (!fs.existsSync(videoPath)) {
    console.error("Video not found at:", videoPath);
    return;
  }

  console.log("Uploading massive video to Cloudinary. This might take a few minutes...");
  
  cloudinary.uploader.upload_large(videoPath, {
    resource_type: "video",
    folder: "rmcp_assets/videos",
    chunk_size: 20000000 // 20MB
  }, function(error, result) {
    if (error) {
       console.error("UPLOAD FAILED:", error);
       process.exit(1);
    } else {
       console.log("SUCCESS!");
       console.log("Video URL:", result.secure_url);
       // Now replace it in Hero.jsx
       const heroPath = path.join(__dirname, 'client', 'src', 'components', 'Hero.jsx');
       let heroContent = fs.readFileSync(heroPath, 'utf8');
       heroContent = heroContent.replace(
         /import heroVideo from ['"]\.\.\/assets\/video\/Untitled design\.mp4['"];/, 
         `const heroVideo = "${result.secure_url}";`
       );
       fs.writeFileSync(heroPath, heroContent);
       console.log("Updated Hero.jsx!");
       
       // Delete the file
       fs.unlinkSync(videoPath);
       console.log("Deleted local massive video file!");
       process.exit(0);
    }
  });
};

uploadVideo();
