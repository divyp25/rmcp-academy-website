-- Enable UUID generation extension if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. CMS Content
CREATE TABLE IF NOT EXISTS cms_content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  section VARCHAR(100),
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CMS Gallery
CREATE TABLE IF NOT EXISTS cms_gallery (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CMS Pages
CREATE TABLE IF NOT EXISTS cms_pages (
  page_id VARCHAR(100) PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Admins
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  contact VARCHAR(50) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Admissions
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

-- 6. CBSE Disclosures
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

-- 7. Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_class VARCHAR(100) NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255) NOT NULL,
  mother_name VARCHAR(255) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  father_mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  last_school_attended VARCHAR(255),
  father_occupation VARCHAR(255),
  mother_occupation VARCHAR(255),
  address TEXT NOT NULL,
  referred_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Galleries
CREATE TABLE IF NOT EXISTS galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Job Listings
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

-- 10. TC Requests
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
