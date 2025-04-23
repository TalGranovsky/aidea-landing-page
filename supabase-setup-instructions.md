# Supabase Setup Instructions

Follow these steps to set up your Supabase database for the contact form:

## 1. Log in to Supabase

1. Go to [https://app.supabase.co/](https://app.supabase.co/) and log in to your account
2. Select your project (or create a new one if you haven't already)

## 2. Run the SQL Setup Script

1. Navigate to the SQL Editor in your Supabase dashboard
2. Create a new query
3. Copy and paste the following SQL code:

```sql
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
```

4. Click "Run" to execute the SQL commands

## 3. Verify the Setup

1. Go to the "Table Editor" in your Supabase dashboard
2. You should see the `contact_submissions` table listed
3. Click on the table to verify its structure
4. Check that Row Level Security (RLS) is enabled

## 4. Test the Contact Form

1. Go back to your website and submit the contact form
2. Check the Supabase Table Editor to verify that the submission was stored
3. Check your email to verify that the confirmation and notification emails were sent

## Troubleshooting

If you encounter any issues:

1. Make sure your Supabase URL and Anon Key are correctly set in your `.env.local` file
2. Verify that the SQL commands executed successfully without errors
3. Check that Row Level Security (RLS) is enabled and the policies are correctly set up
4. Check the browser console for any error messages
