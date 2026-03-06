/**
 * Test LLM generation with a single trek.
 * Run: node src/test-llm.js
 */

require('dotenv').config({ path: '../../.env.local' });

const { initClients, generateAbout, sleep } = require('./generators/llm');

async function test() {
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  
  console.log('Testing LLM generation...');
  console.log(`Gemini key: ${geminiKey ? '✓ Set' : '✗ Missing'}`);
  console.log(`Groq key: ${groqKey ? '✓ Set' : '✗ Missing'}\n`);

  initClients(geminiKey, groqKey);

  const testResearch = {
    name: 'Hampta Pass Trek',
    slug: 'hampta-pass-trek',
    state: 'Himachal Pradesh',
    difficulty: 'HARD',
    duration: 6,
    distance: 25,
    maxAltitude: 4270,
    bestSeason: 'Jun-Sep',
    tags: ['alpine', 'challenging', '6-days', 'views'],
    existingDescription: 'A stunning trek through alpine meadows to the Hampta Pass at 4,270m',
    existingLongDescription: 'The Hampta Pass Trek is one of the most scenic treks in Himachal',
    existingItinerary: 'Day 1: Reach Jobri\nDay 2: Trek to Shoja\nDay 3: Chika\nDay 4: Hampta Pass\nDay 5: Tani Jubari\nDay 6: Return',
    wikiExtract: `Hamta Pass is a corridor in the Himalayas, between the Chandra Valley in Lahaul and the Kullu valley of Himachal Pradesh, India. The pass is named after Hamta Village, below Sethan village. Lower Himalayan shepherds use the pass in summer for its high altitude grasslands. The pass is at an altitude of 4,270 metres (14,009 ft). The trek to Hamta Pass starts from Jobra, near Manali. The route passes through alpine meadows, dense forests, and glacial terrain. The pass offers dramatic views of the Dhauladhar and Pir Panjal ranges. The trek is considered challenging due to the high altitude and steep terrain.`,
    ddgAbstract: '',
    ddgRelatedTopics: [],
    ddgInfobox: {},
    wikiSummaryExtract: '',
    wikiCoordinates: { lat: 31.963024, lon: 77.453296 },
    wikiCategories: ['Mountain passes of Himachal Pradesh'],
    sources: ['https://en.wikipedia.org/wiki/Hamta_Pass'],
    conflicts: [],
    basePrice: 1600000,
  };

  console.log('Generating About section...');
  try {
    const about = await generateAbout(testResearch);
    console.log('\n✅ About generated:');
    console.log('Tagline:', about.tagline);
    console.log('About (first 200 chars):', about.aboutText?.slice(0, 200));
  } catch (err) {
    console.error('❌ About generation failed:', err.message);
  }

  console.log('\n✅ LLM test complete');
}

test().catch(console.error);
