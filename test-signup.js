const fetch = require('node-fetch');

async function testSignup() {
  const testUser = {
    email: 'test@example.com',
    name: 'Test User',
    username: 'testuser123',
    password: 'password123'
  };

  try {
    console.log('Testing signup with:', testUser);
    
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);

    if (response.ok) {
      console.log('✅ Signup successful!');
    } else {
      console.log('❌ Signup failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

async function testLogin() {
  const loginData = {
    email: 'test@example.com',
    password: 'password123'
  };

  try {
    console.log('\nTesting login with:', loginData);
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);

    if (response.ok) {
      console.log('✅ Login successful!');
    } else {
      console.log('❌ Login failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

async function runTests() {
  console.log('🧪 Testing Authentication System\n');
  
  await testSignup();
  await testLogin();
  
  console.log('\n🏁 Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
} 