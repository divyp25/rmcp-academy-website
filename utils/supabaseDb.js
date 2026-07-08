import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Supabase PostgreSQL connection string from user
const connectionString = "postgresql://postgres:2725Sprj2725@db.pkzcpirbrilhtrzrlxrw.supabase.co:5432/postgres";

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

export const initSupabaseDb = async () => {
  try {
    const client = await pool.connect();
    
    // Create all tables if they don't exist
    await client.query(`
      -- CMS tables (existing)
      CREATE TABLE IF NOT EXISTS cms_content (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        section VARCHAR(100),
        status VARCHAR(20) DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS cms_gallery (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        alt_text VARCHAR(255),
        status VARCHAR(20) DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cms_pages (
        page_id VARCHAR(100) PRIMARY KEY,
        page_name VARCHAR(100) NOT NULL,
        data JSONB NOT NULL DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Admins table
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        contact VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Admissions table
      CREATE TABLE IF NOT EXISTS admissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_first_name VARCHAR(255) NOT NULL,
        student_middle_name VARCHAR(255),
        student_last_name VARCHAR(255) NOT NULL,
        student_aadhar_no VARCHAR(50) NOT NULL,
        student_aadhar_file TEXT,
        student_photo TEXT,
        student_migration_document TEXT,
        student_birth_certificate TEXT,
        abc_card TEXT,
        abc_id VARCHAR(100),
        father_first_name VARCHAR(255) NOT NULL,
        father_middle_name VARCHAR(255),
        father_last_name VARCHAR(255) NOT NULL,
        father_aadhar_file TEXT,
        father_photo TEXT,
        mother_first_name VARCHAR(255) NOT NULL,
        mother_middle_name VARCHAR(255),
        mother_last_name VARCHAR(255) NOT NULL,
        mother_aadhar_file TEXT,
        mother_photo TEXT,
        domicile_certificate TEXT,
        contact_no VARCHAR(50) NOT NULL,
        previous_school_tc TEXT,
        previous_marksheet TEXT,
        admission_class VARCHAR(50) NOT NULL,
        government_scholarship VARCHAR(10) DEFAULT 'no',
        scholarship_document TEXT,
        payment_status VARCHAR(20) DEFAULT 'pending',
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- CBSE Disclosures table
      CREATE TABLE IF NOT EXISTS cbse_disclosures (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        general_info JSONB DEFAULT '{}',
        documents JSONB DEFAULT '{}',
        academics JSONB DEFAULT '{}',
        staff JSONB DEFAULT '{}',
        infrastructure JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Enquiries table
      CREATE TABLE IF NOT EXISTS enquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admission_class VARCHAR(100) NOT NULL,
        student_name VARCHAR(255) NOT NULL,
        father_name VARCHAR(255) NOT NULL,
        mother_name VARCHAR(255),
        gender VARCHAR(20),
        date_of_birth DATE,
        father_mobile VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        last_school_attended VARCHAR(255),
        father_occupation VARCHAR(255),
        mother_occupation VARCHAR(255),
        address TEXT,
        referred_by VARCHAR(255),
        payment_status VARCHAR(20) DEFAULT 'pending',
        transaction_id VARCHAR(255),
        token_number VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Galleries table
      CREATE TABLE IF NOT EXISTS galleries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        image TEXT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Top Students table
      CREATE TABLE IF NOT EXISTS top_students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        class VARCHAR(100) NOT NULL,
        percentile VARCHAR(50) NOT NULL,
        photo TEXT,
        rank INT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Job Listings table
      CREATE TABLE IF NOT EXISTS job_listings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        job_title VARCHAR(255) NOT NULL,
        job_description TEXT NOT NULL,
        key_responsibilities TEXT[] NOT NULL DEFAULT '{}',
        qualifications_and_requirements TEXT[] NOT NULL DEFAULT '{}',
        employment_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- TC Requests table
      CREATE TABLE IF NOT EXISTS tc_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_name VARCHAR(255) NOT NULL,
        admission_number VARCHAR(100) NOT NULL,
        aadhar_uid VARCHAR(50) NOT NULL,
        parent_name VARCHAR(255) NOT NULL,
        reason TEXT NOT NULL,
        contact VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'pending' NOT NULL,
        transaction_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Chatbot Feedback table
      CREATE TABLE IF NOT EXISTS chatbot_feedback (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        rating INT,
        suggestions TEXT,
        chat_history JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Run migrations for enquiries table
    try {
      await client.query("ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending'");
      await client.query("ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS transaction_id VARCHAR(255)");
      await client.query("ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS token_number VARCHAR(100)");
      await client.query("ALTER TABLE enquiries ALTER COLUMN mother_name DROP NOT NULL");
      await client.query("ALTER TABLE enquiries ALTER COLUMN gender DROP NOT NULL");
      await client.query("ALTER TABLE enquiries ALTER COLUMN date_of_birth DROP NOT NULL");
      await client.query("ALTER TABLE enquiries ALTER COLUMN category DROP NOT NULL");
      await client.query("ALTER TABLE enquiries ALTER COLUMN address DROP NOT NULL");
    } catch (migErr) {
      console.warn("⚠️ Migration on enquiries table warning:", migErr.message);
    }
    
    console.log("✅ Supabase PostgreSQL connected & tables initialized.");
    client.release();
  } catch (error) {
    console.error("❌ Failed to connect to Supabase PostgreSQL:", error);
  }
};
