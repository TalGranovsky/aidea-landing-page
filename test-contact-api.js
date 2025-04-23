// Test script for contact API
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testContactApi() {
  try {
    console.log('Testing contact API...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1 555-555-5555',
      company: 'Test Company',
      budget: '$1000-$5000',
      message: 'This is a test message from the API test script.'
    };
    
    console.log('Sending test data:', testData);
    
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    // Log the raw response
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Try to parse the JSON
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed API response:', result);
      
      if (response.ok) {
        console.log('✅ API test successful!');
      } else {
        console.log('❌ API test failed with error:', result.message);
      }
    } catch (parseError) {
      console.error('❌ Error parsing API response:', parseError);
      console.error('Response was not valid JSON:', responseText);
    }
  } catch (error) {
    console.error('❌ Error testing API:', error);
  }
}

// Run the test
testContactApi();
