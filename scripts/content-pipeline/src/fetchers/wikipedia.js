/**
 * Wikipedia API Fetcher
 * Fetches real trek data from Wikipedia using the free MediaWiki API.
 * No API key required.
 */

const WIKI_API = 'https://en.wikipedia.org/w/api.php';

/**
 * Search Wikipedia for a trek and return the best matching article title.
 */
async function searchWikipedia(query) {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    srlimit: 5,
    format: 'json',
    origin: '*',
  });

  const url = `${WIKI_API}?${params}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TrailMakersContentBot/1.0 (trekking website content pipeline)' },
  });

  if (!res.ok) throw new Error(`Wikipedia search failed: ${res.status}`);
  const data = await res.json();
  const results = data?.query?.search || [];
  return results.map(r => r.title);
}

/**
 * Fetch the full extract (summary) of a Wikipedia article by title.
 */
async function fetchWikipediaExtract(title) {
  const params = new URLSearchParams({
    action: 'query',
    titles: title,
    prop: 'extracts|coordinates|categories',
    exintro: false,
    explaintext: true,
    exsectionformat: 'plain',
    cllimit: 20,
    format: 'json',
    origin: '*',
  });

  const url = `${WIKI_API}?${params}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TrailMakersContentBot/1.0 (trekking website content pipeline)' },
  });

  if (!res.ok) throw new Error(`Wikipedia fetch failed: ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages || {};
  const page = Object.values(pages)[0];

  if (!page || page.missing) return null;

  return {
    title: page.title,
    extract: page.extract || '',
    coordinates: page.coordinates?.[0] || null,
    categories: (page.categories || []).map(c => c.title.replace('Category:', '')),
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
  };
}

/**
 * Main function: fetch Wikipedia data for a trek.
 * Tries multiple search queries to find the best match.
 */
async function fetchWikipediaData(trekName, state) {
  // Generate multiple search queries from most specific to least
  const baseName = trekName
    .replace(/ Trek$/i, '')
    .replace(/ Pass$/i, '')
    .replace(/ Lake$/i, '')
    .replace(/ Base Camp$/i, '')
    .replace(/ Basecamp$/i, '')
    .trim();

  const queries = [
    trekName,                                    // "Hampta Pass Trek"
    `${baseName}`,                               // "Hampta Pass"
    `${baseName} ${state}`,                      // "Hampta Pass Himachal Pradesh"
    `${baseName} mountain pass India`,           // "Hampta Pass mountain pass India"
    `${baseName} trek Himalayas`,                // "Hampta Pass trek Himalayas"
    trekName.replace(' Trek', ' Pass'),          // Try as pass
    trekName.replace(' Trek', ' Lake'),          // Try as lake
  ].filter((q, i, arr) => arr.indexOf(q) === i); // deduplicate

  for (const query of queries) {
    try {
      const titles = await searchWikipedia(query);
      
      for (const title of titles.slice(0, 5)) {
        // Skip obviously irrelevant articles
        const titleLower = title.toLowerCase();
        const skipKeywords = ['disambiguation', 'list of', 'category:', 'template:'];
        if (skipKeywords.some(kw => titleLower.includes(kw))) continue;

        const article = await fetchWikipediaExtract(title);
        if (article && article.extract && article.extract.length > 150) {
          // Check if the article is at least somewhat relevant
          const extractLower = article.extract.toLowerCase();
          const isRelevant = 
            extractLower.includes('trek') ||
            extractLower.includes('pass') ||
            extractLower.includes('mountain') ||
            extractLower.includes('himalaya') ||
            extractLower.includes('altitude') ||
            extractLower.includes('india') ||
            extractLower.includes(state.toLowerCase().split(' ')[0]);

          if (isRelevant) {
            console.log(`  📖 Wikipedia: Found "${article.title}" for "${trekName}"`);
            return article;
          }
        }
        await sleep(300);
      }
    } catch (err) {
      console.warn(`  ⚠️  Wikipedia search failed for "${query}": ${err.message}`);
    }
    
    await sleep(500);
  }

  console.warn(`  ⚠️  No Wikipedia article found for "${trekName}"`);
  return null;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { fetchWikipediaData };
