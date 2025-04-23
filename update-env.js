// Environment update script
const fs = require('fs');
const path = require('path');

// Path to the .env.local file
const envPath = path.join(__dirname, '.env.local');

// Read the current .env.local file
let envContent = fs.readFileSync(envPath, 'utf8');

// Add the PARTNER_EMAIL variable if it doesn't exist
if (!envContent.includes('PARTNER_EMAIL=')) {
  envContent += '\nPARTNER_EMAIL=tal.gr@aideallabs.com\n';
}

// Write the updated content back to the .env.local file
fs.writeFileSync(envPath, envContent);

console.log(`✅ Added PARTNER_EMAIL to ${envPath}`);
console.log('Please restart your development server for the changes to take effect.');
