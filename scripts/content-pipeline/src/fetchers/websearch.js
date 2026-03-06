/**
 * Web Search Fetcher
 * Uses DuckDuckGo Instant Answer API (free, no key required)
 * and direct Wikipedia REST API for additional data.
 * 
 * Note: DuckDuckGo's /html endpoint is used for search results.
 * We extract structured data from the results without scraping individual pages.
 */

const DDGO_API = 'https://api.duckduckgo.com/';

/**
 * Fetch DuckDuckGo Instant Answer for a trek.
 * Returns abstract text, related topics, and infobox data.
 */
async function fetchDDGInstantAnswer(query) {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    no_html: '1',
    skip_disambig: '1',
    t: 'TrailMakersBot',
  });

  const url = `${DDGO_API}?${params}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'TrailMakersContentBot/1.0 (trekking website content pipeline)',
      },
    });

    if (!res.ok) return null;
    const data = await res.json();

    const result = {
      abstract: data.Abstract || '',
      abstractSource: data.AbstractSource || '',
      abstractUrl: data.AbstractURL || '',
      answer: data.Answer || '',
      definition: data.Definition || '',
      relatedTopics: (data.RelatedTopics || [])
        .filter(t => t.Text)
        .slice(0, 5)
        .map(t => t.Text),
      infobox: {},
    };

    // Extract infobox data if available
    if (data.Infobox && data.Infobox.content) {
      for (const item of data.Infobox.content) {
        if (item.label && item.value) {
          result.infobox[item.label.toLowerCase()] = item.value;
        }
      }
    }

    return result;
  } catch (err) {
    console.warn(`  ⚠️  DDG instant answer failed: ${err.message}`);
    return null;
  }
}

/**
 * Fetch Wikipedia REST API summary (different from MediaWiki API).
 * Returns a clean summary with coordinates and description.
 */
async function fetchWikipediaRestSummary(searchTerm) {
  // Try to get a direct page summary
  const encodedTerm = encodeURIComponent(searchTerm.replace(/ /g, '_'));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTerm}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'TrailMakersContentBot/1.0 (trekking website content pipeline)',
        'Accept': 'application/json',
      },
    });

    if (!res.ok) return null;
    const data = await res.json();

    if (data.type === 'disambiguation') return null;

    return {
      title: data.title,
      description: data.description || '',
      extract: data.extract || '',
      coordinates: data.coordinates || null,
      url: data.content_urls?.desktop?.page || '',
    };
  } catch (err) {
    return null;
  }
}

/**
 * Main function: fetch web data for a trek from multiple sources.
 */
async function fetchWebData(trekName, state, trekData) {
  const results = {
    ddgData: null,
    wikiSummary: null,
    sources: [],
  };

  // 1. Try DuckDuckGo instant answer
  const ddgQuery = `${trekName} trek ${state} India altitude distance`;
  results.ddgData = await fetchDDGInstantAnswer(ddgQuery);
  if (results.ddgData?.abstractUrl) {
    results.sources.push(results.ddgData.abstractUrl);
  }

  await sleep(1000);

  // 2. Try Wikipedia REST API with various search terms
  const wikiSearchTerms = [
    trekName,
    `${trekName.replace(' Trek', '')}`,
    `${trekName.replace(' Trek', '')} Pass`,
    `${trekName.replace(' Trek', '')} Lake`,
  ];

  for (const term of wikiSearchTerms) {
    const summary = await fetchWikipediaRestSummary(term);
    if (summary && summary.extract && summary.extract.length > 100) {
      results.wikiSummary = summary;
      results.sources.push(summary.url);
      break;
    }
    await sleep(300);
  }

  return results;
}

/**
 * Aggregate all fetched data into a structured research object.
 */
function aggregateResearchData(trekData, wikiArticle, webData) {
  const research = {
    name: trekData.name,
    slug: trekData.slug,
    state: trekData.state,
    difficulty: trekData.difficulty,
    duration: trekData.duration,
    distance: trekData.distance,
    maxAltitude: trekData.maxAltitude,
    bestSeason: trekData.bestSeason,
    existingDescription: trekData.description,
    existingLongDescription: trekData.longDescription,
    existingItinerary: trekData.itinerary,
    existingInclusions: trekData.inclusions,
    existingExclusions: trekData.exclusions,
    existingRequirements: trekData.requirements,
    tags: trekData.tags,
    
    // Wikipedia data
    wikiExtract: wikiArticle?.extract || '',
    wikiTitle: wikiArticle?.title || '',
    wikiCoordinates: wikiArticle?.coordinates || webData?.wikiSummary?.coordinates || null,
    wikiCategories: wikiArticle?.categories || [],
    
    // Web data
    ddgAbstract: webData?.ddgData?.abstract || '',
    ddgRelatedTopics: webData?.ddgData?.relatedTopics || [],
    ddgInfobox: webData?.ddgData?.infobox || {},
    wikiSummaryExtract: webData?.wikiSummary?.extract || '',
    
    // Sources
    sources: [
      ...(wikiArticle?.url ? [wikiArticle.url] : []),
      ...(webData?.sources || []),
    ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i), // deduplicate
    
    // Conflict flags
    conflicts: [],
  };

  // Check for altitude conflicts
  if (research.ddgInfobox.elevation && research.maxAltitude) {
    const ddgAlt = parseInt(research.ddgInfobox.elevation.replace(/[^0-9]/g, ''));
    if (ddgAlt && Math.abs(ddgAlt - research.maxAltitude) > 200) {
      research.conflicts.push({
        field: 'maxAltitude',
        dbValue: research.maxAltitude,
        webValue: ddgAlt,
        source: 'DuckDuckGo infobox',
      });
    }
  }

  return research;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { fetchWebData, aggregateResearchData };
