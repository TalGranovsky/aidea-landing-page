// Environment setup script
const fs = require('fs');
const path = require('path');

// Path to the .env.local file
const envPath = path.join(__dirname, '.env.local');

// Environment variables to set
const envVars = `# Supabase Configuration
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
NEXT_PUBLIC_SITE_URL=http://localhost:3001
COMPANY_PHONE=+972 52 660 2870
`;

// Write the environment variables to the .env.local file
fs.writeFileSync(envPath, envVars);

console.log(`✅ Environment variables written to ${envPath}`);
console.log('Please restart your development server for the changes to take effect.');
