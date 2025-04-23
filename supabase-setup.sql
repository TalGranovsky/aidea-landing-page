-- Create the contact_submissions table
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
