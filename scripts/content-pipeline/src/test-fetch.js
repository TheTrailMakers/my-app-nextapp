/**
 * Test script to verify data fetching works correctly.
 * Run: node src/test-fetch.js
 */

require('dotenv').config({ path: '../../.env.local' });

const { fetchWikipediaData } = require('./fetchers/wikipedia');
const { fetchWebData } = require('./fetchers/websearch');

async function test() {
  console.log('Testing data fetchers...\n');

  // Test 1: Wikipedia for Hampta Pass
  console.log('=== Test 1: Wikipedia - Hampta Pass ===');
  const wiki1 = await fetchWikipediaData('Hampta Pass Trek', 'Himachal Pradesh');
  if (wiki1) {
    console.log('✓ Found:', wiki1.title);
    console.log('  Extract (first 300 chars):', wiki1.extract.slice(0, 300));
    console.log('  Coordinates:', wiki1.coordinates);
    console.log('  URL:', wiki1.url);
  } else {
    console.log('✗ Not found');
  }

  console.log('\n=== Test 2: Wikipedia - Triund Trek ===');
  const wiki2 = await fetchWikipediaData('Triund Trek', 'Himachal Pradesh');
  if (wiki2) {
    console.log('✓ Found:', wiki2.title);
    console.log('  Extract (first 300 chars):', wiki2.extract.slice(0, 300));
  } else {
    console.log('✗ Not found');
  }

  console.log('\n=== Test 3: Wikipedia - Roopkund Trek ===');
  const wiki3 = await fetchWikipediaData('Roopkund Trek', 'Uttarakhand');
  if (wiki3) {
    console.log('✓ Found:', wiki3.title);
    console.log('  Extract (first 300 chars):', wiki3.extract.slice(0, 300));
  } else {
    console.log('✗ Not found');
  }

  console.log('\n=== Test 4: DuckDuckGo - Kedarkantha Trek ===');
  const web1 = await fetchWebData('Kedarkantha Trek', 'Uttarakhand', { description: 'Snow trek' });
  console.log('DDG Abstract:', web1.ddgData?.abstract?.slice(0, 200) || 'None');
  console.log('Wiki Summary:', web1.wikiSummary?.extract?.slice(0, 200) || 'None');
  console.log('Sources:', web1.sources);

  console.log('\n✅ Tests complete');
}

test().catch(console.error);
