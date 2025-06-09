#!/usr/bin/env node

/**
 * WordPress API Connection Test Script
 * Tests all aspects of WordPress API connectivity for the Sports Heroes app
 */

require('dotenv').config({ path: '.env.local' });

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_PASSWORD = process.env.WORDPRESS_PASSWORD;

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName) {
  console.log(`\n${colors.blue}${colors.bold}🧪 Testing: ${testName}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function makeRequest(endpoint, options = {}) {
  const url = `${WORDPRESS_URL}/index.php?rest_route=/wp/v2/${endpoint}`;
  const auth = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_PASSWORD}`).toString('base64');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
      ...options.headers,
    },
  });

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data: response.ok ? await response.json() : await response.text()
  };
}

async function testEnvironmentVariables() {
  logTest('Environment Variables');
  
  if (!WORDPRESS_URL) {
    logError('NEXT_PUBLIC_WORDPRESS_URL is not set');
    return false;
  }
  logSuccess(`WordPress URL: ${WORDPRESS_URL}`);
  
  if (!WORDPRESS_USERNAME) {
    logError('WORDPRESS_USERNAME is not set');
    return false;
  }
  logSuccess(`WordPress Username: ${WORDPRESS_USERNAME}`);
  
  if (!WORDPRESS_PASSWORD) {
    logError('WORDPRESS_PASSWORD is not set');
    return false;
  }
  logSuccess('WordPress Password: [CONFIGURED]');
  
  return true;
}

async function testBasicConnectivity() {
  logTest('Basic WordPress Site Connectivity');
  
  try {
    const response = await fetch(WORDPRESS_URL);
    if (response.ok) {
      logSuccess(`WordPress site is accessible (Status: ${response.status})`);
      return true;
    } else {
      logError(`WordPress site returned status: ${response.status}`);
      return false;
    }
  } catch (error) {
    logError(`Cannot reach WordPress site: ${error.message}`);
    return false;
  }
}

async function testRestAPIDiscovery() {
  logTest('REST API Discovery');
  
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/`);
    if (response.ok) {
      const data = await response.json();
      logSuccess('REST API is accessible');
      logInfo(`API Name: ${data.name || 'Unknown'}`);
      logInfo(`API Description: ${data.description || 'No description'}`);
      logInfo(`WordPress Version: ${data.gmt_offset !== undefined ? 'Available' : 'Unknown'}`);
      return true;
    } else {
      logError(`REST API discovery failed (Status: ${response.status})`);
      return false;
    }
  } catch (error) {
    logError(`REST API discovery error: ${error.message}`);
    return false;
  }
}

async function testAuthentication() {
  logTest('Authentication');
  
  try {
    const result = await makeRequest('users/me');
    
    if (result.ok) {
      logSuccess('Authentication successful');
      logInfo(`Authenticated as: ${result.data.name || result.data.username || 'Unknown'}`);
      logInfo(`User ID: ${result.data.id}`);
      logInfo(`User Roles: ${result.data.roles ? result.data.roles.join(', ') : 'Unknown'}`);
      return true;
    } else {
      logError(`Authentication failed (Status: ${result.status})`);
      logError(`Response: ${result.data}`);
      return false;
    }
  } catch (error) {
    logError(`Authentication error: ${error.message}`);
    return false;
  }
}

async function testUsersEndpoint() {
  logTest('Users Endpoint Access');
  
  try {
    const result = await makeRequest('users');
    
    if (result.ok) {
      logSuccess(`Users endpoint accessible (Found ${result.data.length} users)`);
      if (result.data.length > 0) {
        logInfo(`Sample user: ${result.data[0].name || result.data[0].username}`);
      }
      return true;
    } else {
      logError(`Users endpoint failed (Status: ${result.status})`);
      logError(`Response: ${result.data}`);
      return false;
    }
  } catch (error) {
    logError(`Users endpoint error: ${error.message}`);
    return false;
  }
}

async function testCustomPostType() {
  logTest('Custom Post Type (sports-progress)');
  
  try {
    const result = await makeRequest('sports-progress');
    
    if (result.ok) {
      logSuccess(`Custom post type 'sports-progress' is accessible`);
      logInfo(`Found ${result.data.length} progress records`);
      return true;
    } else if (result.status === 404) {
      logWarning('Custom post type "sports-progress" not found');
      logInfo('This means the WordPress plugin is not installed or activated');
      return false;
    } else {
      logError(`Custom post type access failed (Status: ${result.status})`);
      logError(`Response: ${result.data}`);
      return false;
    }
  } catch (error) {
    logError(`Custom post type error: ${error.message}`);
    return false;
  }
}

async function testCreateUser() {
  logTest('User Creation (Test)');
  
  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'TestPassword123!',
    first_name: 'Test',
    last_name: 'User'
  };
  
  try {
    const result = await makeRequest('users', {
      method: 'POST',
      body: JSON.stringify({
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
        first_name: testUser.first_name,
        last_name: testUser.last_name,
        roles: ['subscriber']
      })
    });
    
    if (result.ok) {
      logSuccess('User creation successful');
      logInfo(`Created user: ${result.data.username} (ID: ${result.data.id})`);
      
      // Clean up - delete the test user
      try {
        await makeRequest(`users/${result.data.id}`, {
          method: 'DELETE',
          body: JSON.stringify({ force: true, reassign: 1 })
        });
        logInfo('Test user cleaned up successfully');
      } catch (cleanupError) {
        logWarning('Could not clean up test user - manual deletion may be required');
      }
      
      return true;
    } else {
      logError(`User creation failed (Status: ${result.status})`);
      logError(`Response: ${result.data}`);
      return false;
    }
  } catch (error) {
    logError(`User creation error: ${error.message}`);
    return false;
  }
}

async function testProgressSaving() {
  logTest('Progress Saving (Test)');
  
  if (!(await testCustomPostType())) {
    logWarning('Skipping progress saving test - custom post type not available');
    return false;
  }
  
  const testProgress = {
    title: `Test Progress - ${Date.now()}`,
    content: JSON.stringify({
      user_id: 999,
      athlete_id: 1,
      athlete_name: 'Test Athlete',
      story_read: true,
      quiz_completed: true,
      quiz_score: 3,
      total_questions: 3,
      completion_date: new Date().toISOString(),
      time_spent_reading: 120
    }),
    status: 'publish',
    meta: {
      user_id: 999,
      athlete_id: 1,
      athlete_name: 'Test Athlete',
      story_read: true,
      quiz_completed: true,
      quiz_score: 3,
      total_questions: 3,
      completion_date: new Date().toISOString(),
      time_spent_reading: 120
    }
  };
  
  try {
    const result = await makeRequest('sports-progress', {
      method: 'POST',
      body: JSON.stringify(testProgress)
    });
    
    if (result.ok) {
      logSuccess('Progress saving successful');
      logInfo(`Created progress record (ID: ${result.data.id})`);
      
      // Clean up - delete the test progress
      try {
        await makeRequest(`sports-progress/${result.data.id}`, {
          method: 'DELETE',
          body: JSON.stringify({ force: true })
        });
        logInfo('Test progress record cleaned up successfully');
      } catch (cleanupError) {
        logWarning('Could not clean up test progress record');
      }
      
      return true;
    } else {
      logError(`Progress saving failed (Status: ${result.status})`);
      logError(`Response: ${result.data}`);
      return false;
    }
  } catch (error) {
    logError(`Progress saving error: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log(`${colors.bold}${colors.blue}🚀 WordPress API Connection Test Suite${colors.reset}`);
  console.log(`${colors.blue}Testing connection to: ${WORDPRESS_URL}${colors.reset}\n`);
  
  const tests = [
    { name: 'Environment Variables', fn: testEnvironmentVariables },
    { name: 'Basic Connectivity', fn: testBasicConnectivity },
    { name: 'REST API Discovery', fn: testRestAPIDiscovery },
    { name: 'Authentication', fn: testAuthentication },
    { name: 'Users Endpoint', fn: testUsersEndpoint },
    { name: 'Custom Post Type', fn: testCustomPostType },
    { name: 'User Creation', fn: testCreateUser },
    { name: 'Progress Saving', fn: testProgressSaving }
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      results.push({ name: test.name, passed: result });
    } catch (error) {
      logError(`Test "${test.name}" threw an error: ${error.message}`);
      results.push({ name: test.name, passed: false });
    }
  }
  
  // Summary
  console.log(`\n${colors.bold}${colors.blue}📊 Test Results Summary${colors.reset}`);
  console.log('='.repeat(50));
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  results.forEach(result => {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    const color = result.passed ? 'green' : 'red';
    log(`${status} ${result.name}`, color);
  });
  
  console.log('='.repeat(50));
  log(`Overall: ${passed}/${total} tests passed`, passed === total ? 'green' : 'red');
  
  if (passed === total) {
    logSuccess('🎉 All tests passed! Your WordPress API connection is working correctly.');
  } else {
    logError('❌ Some tests failed. Please check the issues above.');
    
    // Provide specific guidance based on failures
    const failedTests = results.filter(r => !r.passed).map(r => r.name);
    
    if (failedTests.includes('Environment Variables')) {
      logInfo('\n💡 Fix: Check your .env.local file and ensure all WordPress variables are set correctly.');
    }
    
    if (failedTests.includes('Basic Connectivity') || failedTests.includes('REST API Discovery')) {
      logInfo('\n💡 Fix: Check your WordPress URL and ensure the site is accessible.');
    }
    
    if (failedTests.includes('Authentication')) {
      logInfo('\n💡 Fix: Verify your WordPress username and application password are correct.');
    }
    
    if (failedTests.includes('Custom Post Type')) {
      logInfo('\n💡 Fix: Install and activate the sports-heroes-progress.php WordPress plugin.');
    }
  }
  
  return passed === total;
}

// Run the tests
if (require.main === module) {
  runAllTests().catch(error => {
    logError(`Test suite failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { runAllTests, makeRequest };
