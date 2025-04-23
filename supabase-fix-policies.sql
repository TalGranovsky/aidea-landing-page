-- Check if the table exists, if not create it
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" 
  ON contact_submissions 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated reads
CREATE POLICY "Allow authenticated reads" 
  ON contact_submissions 
  FOR SELECT 
  TO authenticated
  USING (auth.role() = 'authenticated');

-- Create policy to allow anonymous inserts without authentication
-- This is a more permissive policy that might be needed for your contact form
CREATE POLICY "Allow public inserts" 
  ON contact_submissions 
  FOR INSERT 
  TO public
  WITH CHECK (true);
