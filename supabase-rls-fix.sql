-- First, drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;

-- Temporarily disable RLS to check if that's the issue
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS with a more permissive policy
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a completely permissive policy for inserts
CREATE POLICY "Allow all inserts" 
  ON contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow authenticated reads
CREATE POLICY "Allow all reads" 
  ON contact_submissions 
  FOR SELECT
  USING (true);

-- Grant permissions to the anon role
GRANT ALL ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO authenticated;
GRANT ALL ON contact_submissions TO service_role;
