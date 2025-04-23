# Complete Setup Instructions for AIDEA Contact Form

Follow these step-by-step instructions to set up your contact form with Supabase and Google Workspace email.

## Step 1: Create Your .env.local File

1. Create a new file named `.env.local` in your project root directory
2. Copy and paste the following content:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://vmqrdrisadshyikhkoiv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtcXJkcmlzYWRzaHlpa2hrb2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjAzMzAsImV4cCI6MjA2MDk5NjMzMH0.7tptF2aDIS1xVRdY3v_IVS6XpOSJ-TfbjYCocOcWwN0

# Email Configuration (Google Workspace)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=shaked.gr@aideallabs.com
EMAIL_PASS=ldec xzuq pplk hixw
EMAIL_FROM=shaked.gr@aideallabs.com
ADMIN_EMAIL=shaked.gr@aideallabs.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
COMPANY_PHONE=+972 52 660 2870
```

## Step 2: Set Up Supabase Database Table

1. Log in to your Supabase dashboard at [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to the SQL Editor
4. Create a new query
5. Copy and paste the SQL from the `supabase-setup.sql` file:

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

6. Click "Run" to execute the SQL

## Step 3: Test Your Setup

1. Start your development server:
   ```
   npm run dev
   ```

2. Navigate to the "Let's Begin" page
3. Fill out the contact form with test data
4. Submit the form
5. You should see a success message

## Step 4: Verify Everything Works

### Check Email Delivery
- Check the email address you submitted in the form for a confirmation email
- Check your admin email (shaked.gr@aideallabs.com) for the notification email

### Check Supabase Database
1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Select the `contact_submissions` table
4. Verify that your test submission appears in the table

## Troubleshooting

### If Emails Aren't Sending
- Check your Google Workspace settings to ensure SMTP is enabled
- Verify that the app password is entered correctly
- Try restarting your development server

### If Database Submissions Fail
- Check your browser console for error messages
- Verify your Supabase URL and anon key are correct
- Make sure the table structure matches what's expected in the API route

## Production Deployment

When you're ready to deploy to production:

1. Update the `NEXT_PUBLIC_SITE_URL` in your environment variables to your actual domain
2. Make sure your hosting provider (Vercel, Netlify, etc.) has all the environment variables set
3. Test the form on your production site to ensure everything works
