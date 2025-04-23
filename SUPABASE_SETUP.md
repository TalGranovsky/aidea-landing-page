# Supabase Backend Setup for AIDEA Landing Page

This document provides instructions for setting up the Supabase backend and email functionality for the AIDEA landing page contact form.

## Prerequisites

- A Supabase account (https://supabase.com)
- An SMTP email provider (Gmail, SendGrid, Amazon SES, etc.)
- Node.js and npm installed

## Supabase Setup

1. **Create a new Supabase project**:
   - Go to https://app.supabase.com and log in
   - Click "New Project"
   - Enter a name for your project and set a secure database password
   - Choose a region closest to your target audience
   - Click "Create new project"

2. **Create the contact_submissions table**:
   - In your Supabase dashboard, go to the "Table Editor" section
   - Click "New Table"
   - Set the table name to `contact_submissions`
   - Add the following columns:
     - `id` (type: uuid, primary key, default: `uuid_generate_v4()`)
     - `name` (type: text, not null)
     - `email` (type: text, not null)
     - `phone` (type: text, not null)
     - `company` (type: text, nullable)
     - `budget` (type: text, nullable)
     - `message` (type: text, not null)
     - `created_at` (type: timestamp with time zone, not null, default: `now()`)
   - Click "Save"

3. **Set up Row Level Security (RLS)**:
   - Go to the "Authentication" section
   - Click on "Policies"
   - Select the `contact_submissions` table
   - Enable RLS by clicking the toggle
   - Add a policy for INSERT operations:
     - Name: `Allow anonymous inserts`
     - Operation: `INSERT`
     - Target roles: `anon, authenticated`
     - Using expression: `true`
   - Add a policy for SELECT operations (for admin access):
     - Name: `Allow authenticated reads`
     - Operation: `SELECT`
     - Target roles: `authenticated`
     - Using expression: `auth.role() = 'authenticated'`

4. **Get your API keys**:
   - Go to the "Settings" section
   - Click on "API"
   - Copy the "URL" and "anon public" key
   - These will be used in your `.env.local` file

## Email Setup

1. **Configure your SMTP provider**:
   - Set up an account with an SMTP provider if you don't have one
   - Get the SMTP host, port, username, and password
   - Make sure your SMTP provider allows sending emails programmatically

2. **Environment Variables Setup**:
   - Copy the `.env.local.example` file to `.env.local`
   - Fill in the environment variables with your actual values:
     ```
     # Supabase Configuration
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

     # Email Configuration
     EMAIL_HOST=smtp.example.com
     EMAIL_PORT=587
     EMAIL_SECURE=false
     EMAIL_USER=your-email@example.com
     EMAIL_PASS=your-email-password
     EMAIL_FROM=noreply@yourdomain.com
     ADMIN_EMAIL=your-admin-email@example.com

     # Site Configuration
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     COMPANY_PHONE=+1 (555) 123-4567
     ```

## Testing the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test the contact form**:
   - Go to the "Let's Begin" page
   - Fill out the contact form
   - Submit the form
   - You should receive a success message
   - Check your admin email for the notification
   - Check the user's email for the confirmation

3. **Verify data in Supabase**:
   - Go to your Supabase dashboard
   - Navigate to the "Table Editor"
   - Select the `contact_submissions` table
   - You should see the submitted form data

## Troubleshooting

- **Form submission fails**: Check the browser console for errors. Make sure your Supabase URL and key are correct.
- **Emails not sending**: Verify your SMTP configuration. Some providers require app-specific passwords or special security settings.
- **Database errors**: Check your Supabase logs for any SQL errors or permission issues.

## Production Deployment

When deploying to production:

1. Update the `NEXT_PUBLIC_SITE_URL` to your actual domain
2. Consider using environment variables provided by your hosting platform (Vercel, Netlify, etc.)
3. Make sure your SMTP provider allows sending from your production domain
4. Test the form submission in the production environment

## Security Considerations

- Never expose your email password or Supabase service role key
- Consider implementing rate limiting for the contact form to prevent abuse
- Regularly review your Supabase logs for any suspicious activity
- Consider adding CAPTCHA verification to the form for additional spam protection
