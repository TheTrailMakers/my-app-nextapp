/**
 * Trek Content Pipeline - Main Orchestrator
 *
 * Fetches real trek data from Wikipedia + DuckDuckGo,
 * generates SEO-optimized content using Ollama (llama3.2),
 * and saves structured JSON files for each trek.
 *
 * Usage: node src/pipeline.js [--resume] [--trek <slug>]
 *
 * Options:
 *   --resume        Resume from last saved progress
 *   --trek <slug>   Process only a specific trek
 *   --dry-run       Fetch data but don't call LLM (for testing)
 */

// Load .env.local first (takes priority), then fall back to .env
// __dirname = scripts/content-pipeline/src/
// .env.local is at my-app-nextapp/.env.local = ../../../.env.local
require('dotenv').config({ path: require('path').join(__dirname, '../../../.env.local') });
require('dotenv').config({ path: require('path').join(__dirname, '../../../.env') });

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const { fetchWikipediaData } = require('./fetchers/wikipedia');
const { fetchWebData, aggregateResearchData } = require('./fetchers/websearch');
const {
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
} = require('./generators/llm');

// ============================================================
// CONFIGURATION
// ============================================================
const OUTPUT_DIR = path.join(__dirname, '../output');
const LOGS_DIR = path.join(__dirname, '../logs');
const PROGRESS_FILE = path.join(__dirname, '../progress.json');

// Delay between LLM calls (ms) - no rate limits with local Ollama
const LLM_CALL_DELAY = 1000;  // 1 second between calls for Ollama
const TREK_DELAY = 2000;       // 2 seconds between treks
const SAVE_EVERY = 5;          // Save progress every N treks

// Parse CLI args
const args = process.argv.slice(2);
const RESUME = args.includes('--resume');
const DRY_RUN = args.includes('--dry-run');
const SPECIFIC_TREK = args.includes('--trek') ? args[args.indexOf('--trek') + 1] : null;

// ============================================================
// SETUP
// ============================================================
function ensureDirs() {
  [OUTPUT_DIR, LOGS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return {
    lastProcessedIndex: -1,
    completed: [],
    failed: [],
    flagged: [],
    startedAt: new Date().toISOString(),
    lastSavedAt: null,
  };
}

function saveProgress(progress) {
  progress.lastSavedAt = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${level}] ${message}`;
  console.log(logLine);
  
  const logFile = path.join(LOGS_DIR, `pipeline-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, logLine + '\n');
}

// ============================================================
// TREK PROCESSOR
// ============================================================
async function processTrek(trekData, progress) {
  const { slug, name, state } = trekData;
  log(`\n${'='.repeat(60)}`);
  log(`Processing: ${name} (${slug})`);
  log(`${'='.repeat(60)}`);

  const outputFile = path.join(OUTPUT_DIR, `${slug}.json`);

  // Skip if already completed (unless specific trek requested)
  if (!SPECIFIC_TREK && progress.completed.includes(slug)) {
    log(`  ⏭️  Skipping ${slug} (already completed)`);
    return { status: 'skipped' };
  }

  try {
    // ---- STEP 1: Fetch Wikipedia data ----
    log(`  📖 Fetching Wikipedia data...`);
    let wikiArticle = null;
    try {
      wikiArticle = await fetchWikipediaData(name, state);
    } catch (err) {
      log(`  ⚠️  Wikipedia fetch failed: ${err.message}`, 'WARN');
    }
    await sleep(1000);

    // ---- STEP 2: Fetch web data ----
    log(`  🌐 Fetching web data...`);
    let webData = null;
    try {
      webData = await fetchWebData(name, state, trekData);
    } catch (err) {
      log(`  ⚠️  Web fetch failed: ${err.message}`, 'WARN');
    }
    await sleep(1000);

    // ---- STEP 3: Aggregate research ----
    const research = aggregateResearchData(trekData, wikiArticle, webData || { ddgData: null, wikiSummary: null, sources: [] });
    
    // Log data quality
    const hasWikiData = research.wikiExtract.length > 100;
    const hasWebData = research.ddgAbstract.length > 50 || research.wikiSummaryExtract.length > 100;
    log(`  📊 Data quality: Wikipedia=${hasWikiData ? '✓' : '✗'}, Web=${hasWebData ? '✓' : '✗'}`);
    
    if (!hasWikiData && !hasWebData) {
      log(`  ⚠️  Insufficient data for ${name}. Flagging for manual review.`, 'WARN');
      progress.flagged.push({ slug, reason: 'Insufficient web data found' });
    }

    if (DRY_RUN) {
      log(`  🔍 DRY RUN: Skipping LLM generation`);
      const dryOutput = { trek_slug: slug, name, research_summary: { hasWikiData, hasWebData, sources: research.sources } };
      fs.writeFileSync(outputFile, JSON.stringify(dryOutput, null, 2));
      return { status: 'dry-run' };
    }

    // ---- STEP 4: Generate content section by section ----
    log(`  🤖 Generating content with LLM...`);
    
    const content = {};
    const errors = [];

    // 4a. About + Tagline
    log(`    → About & Tagline...`);
    try {
      const aboutData = await generateAbout(research);
      content.tagline = aboutData.tagline || '';
      content.aboutText = aboutData.aboutText || '';
      log(`    ✓ About generated (${content.aboutText.length} chars)`);
    } catch (err) {
      errors.push(`about: ${err.message}`);
      log(`    ✗ About failed: ${err.message}`, 'ERROR');
      content.tagline = '';
      content.aboutText = trekData.longDescription || trekData.description || '';
    }
    await sleep(LLM_CALL_DELAY);

    // 4b. Itinerary
    log(`    → Itinerary...`);
    try {
      content.itineraryJson = await generateItinerary(research);
      log(`    ✓ Itinerary generated (${content.itineraryJson.length} days)`);
    } catch (err) {
      errors.push(`itinerary: ${err.message}`);
      log(`    ✗ Itinerary failed: ${err.message}`, 'ERROR');
      content.itineraryJson = [];
    }
    await sleep(LLM_CALL_DELAY);

    // 4c. Difficulty
    log(`    → Difficulty breakdown...`);
    try {
      content.difficultyDetails = await generateDifficulty(research);
      log(`    ✓ Difficulty generated`);
    } catch (err) {
      errors.push(`difficulty: ${err.message}`);
      log(`    ✗ Difficulty failed: ${err.message}`, 'ERROR');
      content.difficultyDetails = { overall: trekData.difficulty, justification: '' };
    }
    await sleep(LLM_CALL_DELAY);

    // 4d. Best Time
    log(`    → Best time to visit...`);
    try {
      content.bestTimeJson = await generateBestTime(research);
      log(`    ✓ Best time generated`);
    } catch (err) {
      errors.push(`bestTime: ${err.message}`);
      log(`    ✗ Best time failed: ${err.message}`, 'ERROR');
      content.bestTimeJson = { peakSeason: trekData.bestSeason || 'Unknown' };
    }
    await sleep(LLM_CALL_DELAY);

    // 4e. Getting There
    log(`    → Getting there...`);
    try {
      content.gettingThere = await generateGettingThere(research);
      log(`    ✓ Getting there generated`);
    } catch (err) {
      errors.push(`gettingThere: ${err.message}`);
      log(`    ✗ Getting there failed: ${err.message}`, 'ERROR');
      content.gettingThere = { summary: `Located in ${state}` };
    }
    await sleep(LLM_CALL_DELAY);

    // 4f. Permits
    log(`    → Permits & regulations...`);
    try {
      content.permits = await generatePermits(research);
      log(`    ✓ Permits generated`);
    } catch (err) {
      errors.push(`permits: ${err.message}`);
      log(`    ✗ Permits failed: ${err.message}`, 'ERROR');
      content.permits = { permitsRequired: false, summary: 'Check with local authorities' };
    }
    await sleep(LLM_CALL_DELAY);

    // 4g. Gear + FAQs
    log(`    → Gear checklist & FAQs...`);
    try {
      const gearFaqs = await generateGearAndFAQs(research);
      content.gearChecklist = gearFaqs.gearChecklist || { essential: [], clothing: [], doNotCarry: [] };
      content.faqsJson = gearFaqs.faqs || [];
      log(`    ✓ Gear (${content.gearChecklist.essential?.length || 0} items) & FAQs (${content.faqsJson.length}) generated`);
    } catch (err) {
      errors.push(`gearFaqs: ${err.message}`);
      log(`    ✗ Gear/FAQs failed: ${err.message}`, 'ERROR');
      content.gearChecklist = { essential: [], clothing: [], doNotCarry: [] };
      content.faqsJson = [];
    }
    await sleep(LLM_CALL_DELAY);

    // 4h. SEO
    log(`    → SEO fields...`);
    try {
      const seoData = await generateSEO(research);
      content.seoTitle = seoData.seoTitle || `${name} | Trail Makers`;
      content.seoDescription = seoData.seoDescription || trekData.description?.slice(0, 155) || '';
      content.seoKeywords = [seoData.focusKeyphrase, ...(seoData.secondaryKeywords || [])].filter(Boolean);
      content.schemaMarkup = seoData.schemaMarkup || {};
      log(`    ✓ SEO generated (title: ${content.seoTitle.length} chars)`);
    } catch (err) {
      errors.push(`seo: ${err.message}`);
      log(`    ✗ SEO failed: ${err.message}`, 'ERROR');
      content.seoTitle = `${name} | Trail Makers`;
      content.seoDescription = trekData.description?.slice(0, 155) || '';
      content.seoKeywords = [name];
      content.schemaMarkup = {};
    }
    await sleep(LLM_CALL_DELAY);

    // 4i. Metadata
    log(`    → Trek metadata...`);
    try {
      const meta = await generateMetadata(research);
      content.accommodationType = meta.accommodationType || 'Tent';
      content.pickupTime = meta.pickupTime || '6:00 AM';
      content.dropoffTime = meta.dropoffTime || '5:00 PM';
      content.bestFor = meta.bestFor || 'All fitness levels';
      log(`    ✓ Metadata generated`);
    } catch (err) {
      errors.push(`metadata: ${err.message}`);
      log(`    ✗ Metadata failed: ${err.message}`, 'ERROR');
      content.accommodationType = 'Tent';
      content.pickupTime = '6:00 AM';
      content.dropoffTime = '5:00 PM';
      content.bestFor = 'All fitness levels';
    }

    // ---- STEP 5: Assemble final output ----
    const output = {
      trek_slug: slug,
      name,
      state,
      difficulty: trekData.difficulty,
      duration: trekData.duration,
      distance: trekData.distance,
      maxAltitude: trekData.maxAltitude,
      basePrice: trekData.basePrice,
      
      // Generated content
      tagline: content.tagline,
      aboutText: content.aboutText,
      itineraryJson: content.itineraryJson,
      difficultyDetails: content.difficultyDetails,
      bestTimeJson: content.bestTimeJson,
      gettingThere: content.gettingThere,
      permits: content.permits,
      gearChecklist: content.gearChecklist,
      faqsJson: content.faqsJson,
      
      // Metadata
      accommodationType: content.accommodationType,
      pickupTime: content.pickupTime,
      dropoffTime: content.dropoffTime,
      bestFor: content.bestFor,
      
      // Existing data (preserved)
      inclusions: trekData.inclusions || [],
      exclusions: trekData.exclusions || [],
      
      // SEO
      seo: {
        title: content.seoTitle,
        description: content.seoDescription,
        keywords: content.seoKeywords,
        schemaMarkup: content.schemaMarkup,
      },
      
      // Pipeline metadata
      contentVerified: false,
      contentGeneratedAt: new Date().toISOString(),
      sourcesUsed: research.sources,
      conflicts: research.conflicts,
      generationErrors: errors,
      flaggedForReview: errors.length > 3 || research.conflicts.length > 0,
    };

    // Save JSON file
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    log(`  ✅ Saved: ${outputFile}`);

    if (errors.length > 0) {
      log(`  ⚠️  ${errors.length} section(s) had errors: ${errors.join(', ')}`, 'WARN');
    }

    return { status: 'success', errors };

  } catch (err) {
    log(`  ❌ Fatal error processing ${slug}: ${err.message}`, 'ERROR');
    log(err.stack, 'ERROR');
    return { status: 'failed', error: err.message };
  }
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('  TRAIL MAKERS — TREK CONTENT PIPELINE');
  console.log('='.repeat(70));
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN' : 'FULL PIPELINE'}`);
  console.log(`  Resume: ${RESUME ? 'YES' : 'NO'}`);
  if (SPECIFIC_TREK) console.log(`  Trek: ${SPECIFIC_TREK}`);
  console.log('='.repeat(70) + '\n');

  if (!DRY_RUN) {
    // Using Ollama (llama3.2) - no API keys needed
    console.log(`✓ LLM: Ollama (llama3.2) at localhost:11434`);
  }

  ensureDirs();

  // Connect to database
  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });

  let treks;
  try {
    treks = await prisma.trek.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        state: true,
        difficulty: true,
        duration: true,
        distance: true,
        maxAltitude: true,
        bestSeason: true,
        basePrice: true,
        description: true,
        longDescription: true,
        itinerary: true,
        inclusions: true,
        exclusions: true,
        requirements: true,
        tags: true,
      },
      orderBy: { name: 'asc' },
    });
    console.log(`✓ Loaded ${treks.length} treks from database\n`);
  } catch (err) {
    console.error(`❌ Database connection failed: ${err.message}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }

  // Filter to specific trek if requested
  if (SPECIFIC_TREK) {
    treks = treks.filter(t => t.slug === SPECIFIC_TREK);
    if (treks.length === 0) {
      console.error(`❌ Trek "${SPECIFIC_TREK}" not found in database`);
      process.exit(1);
    }
  }

  // Load progress
  const progress = RESUME ? loadProgress() : {
    lastProcessedIndex: -1,
    completed: [],
    failed: [],
    flagged: [],
    startedAt: new Date().toISOString(),
    lastSavedAt: null,
  };

  if (RESUME && progress.completed.length > 0) {
    console.log(`📂 Resuming from progress: ${progress.completed.length} already completed\n`);
  }

  // Process treks
  const stats = { completed: 0, failed: 0, skipped: 0, flagged: 0 };
  
  for (let i = 0; i < treks.length; i++) {
    const trek = treks[i];
    
    // Skip if already done (resume mode)
    if (RESUME && progress.completed.includes(trek.slug)) {
      stats.skipped++;
      continue;
    }

    const result = await processTrek(trek, progress);
    
    if (result.status === 'success') {
      stats.completed++;
      progress.completed.push(trek.slug);
      if (result.errors?.length > 3) {
        stats.flagged++;
        if (!progress.flagged.find(f => f.slug === trek.slug)) {
          progress.flagged.push({ slug: trek.slug, reason: `${result.errors.length} section errors` });
        }
      }
    } else if (result.status === 'failed') {
      stats.failed++;
      progress.failed.push({ slug: trek.slug, error: result.error });
    } else if (result.status === 'skipped') {
      stats.skipped++;
    } else if (result.status === 'dry-run') {
      stats.completed++;
    }

    progress.lastProcessedIndex = i;

    // Save progress every N treks
    if ((i + 1) % SAVE_EVERY === 0) {
      saveProgress(progress);
      log(`💾 Progress saved (${i + 1}/${treks.length} processed)`);
    }

    // Delay between treks (except last one)
    if (i < treks.length - 1 && result.status !== 'skipped') {
      log(`⏳ Waiting ${TREK_DELAY/1000}s before next trek...`);
      await sleep(TREK_DELAY);
    }
  }

  // Final save
  saveProgress(progress);

  // ---- SUMMARY ----
  console.log('\n' + '='.repeat(70));
  console.log('  PIPELINE COMPLETE — SUMMARY');
  console.log('='.repeat(70));
  console.log(`  ✅ Completed:  ${stats.completed}`);
  console.log(`  ❌ Failed:     ${stats.failed}`);
  console.log(`  ⏭️  Skipped:   ${stats.skipped}`);
  console.log(`  ⚠️  Flagged:   ${stats.flagged}`);
  console.log(`  📁 Output:    ${OUTPUT_DIR}`);
  
  if (progress.failed.length > 0) {
    console.log('\n  Failed treks:');
    progress.failed.forEach(f => console.log(`    - ${f.slug}: ${f.error}`));
  }
  
  if (progress.flagged.length > 0) {
    console.log('\n  Flagged for review:');
    progress.flagged.forEach(f => console.log(`    - ${f.slug}: ${f.reason}`));
  }

  console.log('\n  Next steps:');
  console.log('  1. Review output JSON files in /output/');
  console.log('  2. Run: node src/db-seed.js  (to push to database)');
  console.log('  3. Visit /admin/content-review to approve content');
  console.log('='.repeat(70) + '\n');
}

main().catch(err => {
  console.error('❌ Pipeline crashed:', err);
  process.exit(1);
});
