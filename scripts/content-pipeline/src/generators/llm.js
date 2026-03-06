/**
 * LLM Content Generator - Ollama Local Version
 * 
 * Uses Ollama running locally at http://localhost:11434
 * Model: llama3.2
 * 
 * Generates trek content section by section to avoid hallucination
 * and stay within token limits.
 */

const http = require('http');
const https = require('https');

const OLLAMA_HOST = 'localhost';
const OLLAMA_PORT = 11434;
const OLLAMA_MODEL = 'llama3.2';

/**
 * Call Ollama API - direct HTTP request
 */
async function callOllama(prompt, retries = 3) {
  const postData = JSON.stringify({
    model: OLLAMA_MODEL,
    prompt: prompt,
    stream: false,
    options: {
      temperature: 0.4,
      num_predict: 4096,
    }
  });

  const options = {
    hostname: OLLAMA_HOST,
    port: OLLAMA_PORT,
    path: '/api/generate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              try {
                const parsed = JSON.parse(data);
                resolve(parsed.response || '');
              } catch (e) {
                reject(new Error(`Failed to parse Ollama response: ${e.message}`));
              }
            } else {
              reject(new Error(`Ollama HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
            }
          });
        });
        req.on('error', reject);
        req.setTimeout(300000, () => {
          req.destroy();
          reject(new Error('Ollama request timeout after 300s'));
        });
        req.write(postData);
        req.end();
      });
      
      if (result && result.trim()) {
        return result;
      }
      throw new Error('Empty response from Ollama');
    } catch (err) {
      console.warn(`  ⚠️  Ollama attempt ${attempt} failed: ${err.message}`);
      if (attempt === retries) throw err;
      await sleep(2000 * attempt);
    }
  }
}

/**
 * Main LLM call function - uses Ollama
 */
async function callLLM(prompt) {
  const result = await callOllama(prompt);
  return { text: result, provider: 'ollama' };
}

/**
 * Extract JSON from LLM response (handles markdown code blocks and truncated responses).
 */
function extractJSON(text) {
  // Remove markdown code blocks if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();
  
  // Try to parse full response first
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Try to find JSON object/array in the text - look for complete objects
    const jsonMatch = cleaned.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (e2) {
        // Try to fix common truncation issues
        let fixed = jsonMatch[1];
        
        // If JSON is truncated (missing closing braces), try to fix it
        const openBraces = (fixed.match(/\{/g) || []).length;
        const closeBraces = (fixed.match(/\}/g) || []).length;
        if (openBraces > closeBraces) {
          // Add missing closing braces
          fixed += '}'.repeat(openBraces - closeBraces);
        }
        
        const openBrackets = (fixed.match(/\[/g) || []).length;
        const closeBrackets = (fixed.match(/\]/g) || []).length;
        if (openBrackets > closeBrackets) {
          fixed += ']'.repeat(openBrackets - closeBrackets);
        }
        
        try {
          return JSON.parse(fixed);
        } catch (e3) {
          throw new Error(`Failed to parse JSON: ${e.message}
Text: ${cleaned.slice(0, 300)}`);
        }
      }
    }
    throw new Error(`No valid JSON found in response: ${cleaned.slice(0, 200)}`);
  }
}

// ============================================================
// SYSTEM PROMPT
// ============================================================
const SYSTEM_PROMPT = `You are a factual content writer for Trail Makers, an Indian trekking company.
CRITICAL RULES:
1. Write ONLY based on the provided research data. Do NOT invent facts.
2. If specific data is missing, use general knowledge about that region/altitude but mark it as approximate.
3. Never hallucinate specific numbers (altitude, distance, duration) - use only what's provided.
4. Tone: conversational, inspiring, like a seasoned trekker talking to a friend.
5. Return ONLY valid JSON matching the exact schema requested. No extra text.
6. All text should be in English.`;

// ============================================================
// SECTION GENERATORS
// ============================================================

/**
 * Generate tagline and about text.
 */
async function generateAbout(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- State/Region: ${research.state}
- Difficulty: ${research.difficulty}
- Duration: ${research.duration} days
- Max Altitude: ${research.maxAltitude ? research.maxAltitude + 'm' : 'unknown'}
- Distance: ${research.distance ? research.distance + 'km' : 'unknown'}
- Best Season: ${research.bestSeason || 'unknown'}
- Tags: ${research.tags?.join(', ') || ''}
- Existing Description: ${research.existingDescription || ''}
- Wikipedia Extract (use this as primary source): ${research.wikiExtract?.slice(0, 2000) || 'Not available'}
- DDG Abstract: ${research.ddgAbstract?.slice(0, 500) || 'Not available'}

Generate a JSON object with:
{
  "tagline": "One evocative line (max 15 words) that captures the essence of this trek",
  "aboutText": "250-400 word conversational description. Cover: what makes it unique, landscape/terrain, brief history or cultural context if relevant, who should attempt it. Write like a seasoned trekker talking to a friend. Use ONLY facts from the provided data."
}`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate structured itinerary.
 */
async function generateItinerary(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- Duration: ${research.duration} days
- State: ${research.state}
- Max Altitude: ${research.maxAltitude ? research.maxAltitude + 'm' : 'unknown'}
- Distance: ${research.distance ? research.distance + 'km' : 'unknown'}
- Existing Itinerary Text: ${research.existingItinerary || 'Not available'}
- Wikipedia Extract: ${research.wikiExtract?.slice(0, 1500) || 'Not available'}

Generate a JSON array of day objects for a ${research.duration}-day trek:
[
  {
    "day": 1,
    "title": "Day 1: [Start Point] to [End Point]",
    "startPoint": "village/camp name",
    "endPoint": "village/camp name",
    "altitudeStart": number_in_meters_or_null,
    "altitudeEnd": number_in_meters_or_null,
    "distance": number_in_km_or_null,
    "walkingHours": "e.g. 4-5 hours",
    "highlights": "Key highlights of the day in 1-2 sentences",
    "camp": "Camp/accommodation name"
  }
]

IMPORTANT: Base the itinerary on the existing itinerary text and Wikipedia data. If specific camp names are unknown, use descriptive names like "Riverside Camp" or "High Camp". Do NOT invent specific place names that don't exist.`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate difficulty breakdown.
 */
async function generateDifficulty(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- Difficulty Rating: ${research.difficulty}
- Max Altitude: ${research.maxAltitude ? research.maxAltitude + 'm' : 'unknown'}
- Duration: ${research.duration} days
- Distance: ${research.distance ? research.distance + 'km' : 'unknown'}
- State: ${research.state}
- Tags: ${research.tags?.join(', ') || ''}

Generate a JSON object:
{
  "overall": "${research.difficulty}",
  "justification": "2-3 sentences explaining why this difficulty rating is appropriate",
  "altitudeSicknessRisk": "Low / Moderate / High / Very High - with brief explanation",
  "fitnessRequirement": "Specific fitness requirement description (e.g., 'Must be able to walk 6-8 hours daily on uneven terrain')",
  "priorExperience": "What prior experience is recommended or required",
  "technicalDifficulty": "Any technical skills needed (rock climbing, river crossings, etc.) or 'None required'"
}`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate best time to visit.
 */
async function generateBestTime(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- State/Region: ${research.state}
- Max Altitude: ${research.maxAltitude ? research.maxAltitude + 'm' : 'unknown'}
- Best Season (from DB): ${research.bestSeason || 'unknown'}
- Wikipedia Extract: ${research.wikiExtract?.slice(0, 1000) || 'Not available'}

Generate a JSON object about the best time to visit:
{
  "peakSeason": "e.g. July-September",
  "offSeason": "e.g. November-May",
  "months": {
    "January": { "weather": "brief weather description", "trailCondition": "Open/Closed/Difficult", "recommended": true/false },
    "February": { ... },
    "March": { ... },
    "April": { ... },
    "May": { ... },
    "June": { ... },
    "July": { ... },
    "August": { ... },
    "September": { ... },
    "October": { ... },
    "November": { ... },
    "December": { ... }
  },
  "peakSeasonPros": "Why peak season is good",
  "peakSeasonCons": "Downsides of peak season (crowds, cost)",
  "offSeasonPros": "Benefits of off-season trekking",
  "offSeasonCons": "Challenges of off-season"
}

Base this on the region's known climate patterns and the provided best season data.`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate getting there information.
 */
async function generateGettingThere(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- State/Region: ${research.state}
- Wikipedia Extract: ${research.wikiExtract?.slice(0, 800) || 'Not available'}

Generate a JSON object about how to reach this trek:
{
  "nearestAirport": "Airport name and distance/time from trek base",
  "nearestRailway": "Railway station name and distance/time from trek base",
  "fromDelhi": "Route and estimated travel time from Delhi",
  "fromMumbai": "Route and estimated travel time from Mumbai (if applicable)",
  "localTransport": "Local transport options (bus, taxi, shared jeep etc.)",
  "baseVillage": "Name of the base village/town where trek starts",
  "summary": "2-3 sentence summary of how to reach"
}

Use only factual information about ${research.state} region. If specific distances are unknown, give approximate ranges.`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate permits and regulations.
 */
async function generatePermits(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- State/Region: ${research.state}
- Tags: ${research.tags?.join(', ') || ''}
- Wikipedia Categories: ${research.wikiCategories?.join(', ') || ''}

Generate a JSON object about permits and regulations:
{
  "permitsRequired": true/false,
  "permitTypes": [
    {
      "name": "Permit name",
      "cost": "Cost in INR or 'Free'",
      "where": "Where to obtain it",
      "notes": "Any important notes"
    }
  ],
  "innerLinePermit": true/false,
  "innerLinePermitDetails": "Details if ILP is required, else null",
  "nationalParkFee": "Fee if in national park, else null",
  "restrictions": "Any restrictions (photography, camping zones, etc.)",
  "summary": "1-2 sentence summary of permit requirements"
}

Base this on known regulations for ${research.state}. Common patterns:
- Himachal Pradesh: Usually no permits for standard treks, some areas need forest permits
- Uttarakhand: National parks need entry fees, some areas need permits
- Ladakh: Inner Line Permit required for border areas
- J&K: Some areas need permits
- Sikkim: Protected Area Permit required`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate gear checklist and FAQs.
 */
async function generateGearAndFAQs(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- Difficulty: ${research.difficulty}
- Max Altitude: ${research.maxAltitude ? research.maxAltitude + 'm' : 'unknown'}
- Duration: ${research.duration} days
- Best Season: ${research.bestSeason || 'unknown'}
- State: ${research.state}

Generate a JSON object with gear checklist and FAQs:
{
  "gearChecklist": {
    "essential": [
      "Item name - brief note on why/spec"
    ],
    "clothing": [
      "Clothing item"
    ],
    "doNotCarry": [
      "Item to avoid and why"
    ]
  },
  "faqs": [
    {
      "question": "Specific question about this trek",
      "answer": "Factual, helpful answer in 2-4 sentences"
    }
  ]
}

For gear: tailor to the altitude (${research.maxAltitude || 'moderate'}m) and season (${research.bestSeason || 'summer'}).
For FAQs: generate 6-8 questions specific to THIS trek (not generic). Include questions about:
- Fitness/difficulty
- Best time to visit
- Altitude sickness risk
- What to expect on the trail
- Accommodation/food
- Permits/costs
- Specific challenges of this trek`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate SEO fields.
 */
async function generateSEO(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- State: ${research.state}
- Difficulty: ${research.difficulty}
- Duration: ${research.duration} days
- Max Altitude: ${research.maxAltitude ? research.maxAltitude + 'm' : 'unknown'}
- Best Season: ${research.bestSeason || 'unknown'}
- Coordinates: ${research.wikiCoordinates ? JSON.stringify(research.wikiCoordinates) : 'unknown'}
- Base Price: approximately ₹${Math.round((research.basePrice || 15000) / 100).toLocaleString()}

Generate a JSON object for SEO:
{
  "seoTitle": "Max 60 chars: [Trek Name] – [Key Benefit] | Trail Makers",
  "seoDescription": "Max 155 chars: Include trek name, location, duration, difficulty, and a CTA like 'Book now'",
  "focusKeyphrase": "Primary keyword phrase (e.g., 'Hampta Pass Trek')",
  "secondaryKeywords": [
    "5-8 secondary keyword phrases"
  ],
  "schemaMarkup": {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "${research.name}",
    "description": "Brief description",
    "url": "https://thetrailmakers.in/treks/${research.slug}",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": null_or_number,
      "longitude": null_or_number
    },
    "touristType": "Adventure tourists, trekkers",
    "availableLanguage": "English, Hindi",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "${research.state}",
      "addressCountry": "IN"
    }
  }
}

IMPORTANT: seoTitle must be EXACTLY under 60 characters. seoDescription must be EXACTLY under 155 characters.`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

/**
 * Generate trek metadata (accommodation type, pickup/dropoff, best for).
 */
async function generateMetadata(research) {
  const prompt = `${SYSTEM_PROMPT}

TREK DATA:
- Name: ${research.name}
- Difficulty: ${research.difficulty}
- Duration: ${research.duration} days
- Max Altitude: ${research.maxAltitude ? research.maxAltitude + 'm' : 'unknown'}
- State: ${research.state}
- Best Season: ${research.bestSeason || 'unknown'}

Generate a JSON object with metadata:
{
  "accommodationType": "Type of accommodation (e.g., 'Camping + Guesthouse', 'Camping Only', 'Homestay + Camping')",
  "pickupTime": "Standard pickup time (e.g., '06:00 AM from base village')",
  "dropoffTime": "Standard dropoff time (e.g., '04:00 PM at base village')",
  "bestFor": "Who this trek is best for (e.g., 'Adventure seekers, fitness enthusiasts, first-time trekkers')",
  "ageRange": "Recommended age range (e.g., '18-55 years')",
  "groupSize": "Typical group size range (e.g., '8-15 people')"
}`;

  const { text } = await callLLM(prompt);
  return extractJSON(text);
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  generateAbout,
  generateItinerary,
  generateDifficulty,
  generateBestTime,
  generateGettingThere,
  generatePermits,
  generateGearAndFAQs,
  generateSEO,
  generateMetadata,
  sleep,
};

// Simple sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
