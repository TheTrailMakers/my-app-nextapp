/**
 * Database Seed Script
 * Reads generated JSON files from /output/ and updates Trek records in the database.
 *
 * Usage: node src/db-seed.js [--dry-run] [--trek <slug>]
 *
 * Options:
 *   --dry-run       Preview changes without writing to database
 *   --trek <slug>   Update only a specific trek
 *   --verify        Set contentVerified=true for all treks being updated
 */

// Load .env.local first (takes priority), then fall back to .env
// __dirname = scripts/content-pipeline/src/
require("dotenv").config({
  path: require("path").join(__dirname, "../../../.env.local"),
});
require("dotenv").config({
  path: require("path").join(__dirname, "../../../.env"),
});

const fs = require("fs");
const path = require("path");
const { sql } = require("../../db-client");

const OUTPUT_DIR = path.join(__dirname, "../output");

// Parse CLI args
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const VERIFY = args.includes("--verify");
const SPECIFIC_TREK = args.includes("--trek")
  ? args[args.indexOf("--trek") + 1]
  : null;

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("  TRAIL MAKERS — DATABASE SEED SCRIPT");
  console.log("=".repeat(70));
  console.log(`  Mode: ${DRY_RUN ? "DRY RUN (no writes)" : "LIVE UPDATE"}`);
  console.log(
    `  Verify content: ${VERIFY ? "YES" : "NO (contentVerified=false)"}`,
  );
  if (SPECIFIC_TREK) console.log(`  Trek: ${SPECIFIC_TREK}`);
  console.log("=".repeat(70) + "\n");

  // Read all JSON files from output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.error(`❌ Output directory not found: ${OUTPUT_DIR}`);
    console.error("   Run the pipeline first: node src/pipeline.js");
    process.exit(1);
  }

  let files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".json"));

  if (SPECIFIC_TREK) {
    files = files.filter((f) => f === `${SPECIFIC_TREK}.json`);
    if (files.length === 0) {
      console.error(`❌ No output file found for trek: ${SPECIFIC_TREK}`);
      process.exit(1);
    }
  }

  console.log(`📁 Found ${files.length} JSON file(s) to process\n`);

  if (files.length === 0) {
    console.log("No files to process. Run the pipeline first.");
    return;
  }

  const stats = { updated: 0, notFound: 0, failed: 0, skipped: 0 };

  for (const file of files) {
    const slug = file.replace(".json", "");
    const filePath = path.join(OUTPUT_DIR, file);

    let trekContent;
    try {
      trekContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error(`❌ Failed to parse ${file}: ${err.message}`);
      stats.failed++;
      continue;
    }

    // Skip dry-run output files (they don't have full content)
    if (trekContent.research_summary && !trekContent.aboutText) {
      console.log(`⏭️  Skipping ${slug} (dry-run output, no content)`);
      stats.skipped++;
      continue;
    }

    console.log(`📝 Processing: ${trekContent.name || slug}`);

    try {
      // Check if trek exists in database
      const existingTreks = await sql`
        select "slug", "inclusions", "exclusions"
        from "Trek"
        where "slug" = ${slug}
        limit 1
      `;
      const existingTrek = existingTreks[0];

      if (!existingTrek) {
        console.warn(`  ⚠️  Trek not found in database: ${slug}`);
        stats.notFound++;
        continue;
      }

      // Prepare update data
      const updateData = {
        tagline: trekContent.tagline || null,
        aboutText: trekContent.aboutText || null,
        itineraryJson: trekContent.itineraryJson
          ? JSON.stringify(trekContent.itineraryJson)
          : null,
        difficultyDetails: trekContent.difficultyDetails
          ? JSON.stringify(trekContent.difficultyDetails)
          : null,
        gearChecklist: trekContent.gearChecklist
          ? JSON.stringify(trekContent.gearChecklist)
          : null,
        faqsJson: trekContent.faqsJson
          ? JSON.stringify(trekContent.faqsJson)
          : null,
        bestTimeJson: trekContent.bestTimeJson
          ? JSON.stringify(trekContent.bestTimeJson)
          : null,
        gettingThere: trekContent.gettingThere
          ? JSON.stringify(trekContent.gettingThere)
          : null,
        permits: trekContent.permits
          ? JSON.stringify(trekContent.permits)
          : null,
        accommodationType: trekContent.accommodationType || null,
        pickupTime: trekContent.pickupTime || null,
        dropoffTime: trekContent.dropoffTime || null,
        bestFor: trekContent.bestFor || null,
        seoTitle: trekContent.seo?.title || null,
        seoDescription: trekContent.seo?.description || null,
        seoKeywords: trekContent.seo?.keywords || [],
        schemaMarkup: trekContent.seo?.schemaMarkup
          ? JSON.stringify(trekContent.seo.schemaMarkup)
          : null,
        contentVerified: VERIFY ? true : false,
        contentGeneratedAt: trekContent.contentGeneratedAt
          ? new Date(trekContent.contentGeneratedAt)
          : new Date(),
        contentSources: trekContent.sourcesUsed || [],
        inclusions:
          trekContent.inclusions && trekContent.inclusions.length > 0
            ? trekContent.inclusions
            : existingTrek.inclusions || [],
        exclusions:
          trekContent.exclusions && trekContent.exclusions.length > 0
            ? trekContent.exclusions
            : existingTrek.exclusions || [],
      };

      if (DRY_RUN) {
        console.log(`  🔍 DRY RUN: Would update ${slug}`);
        console.log(
          `     - tagline: ${updateData.tagline?.slice(0, 60) || "null"}`,
        );
        console.log(
          `     - aboutText: ${updateData.aboutText?.slice(0, 80) || "null"}...`,
        );
        console.log(`     - seoTitle: ${updateData.seoTitle || "null"}`);
        console.log(`     - contentVerified: ${updateData.contentVerified}`);
        stats.updated++;
        continue;
      }

      // Update the trek record
      await sql`
        update "Trek"
        set
          "tagline" = ${updateData.tagline},
          "aboutText" = ${updateData.aboutText},
          "itineraryJson" = ${updateData.itineraryJson},
          "difficultyDetails" = ${updateData.difficultyDetails},
          "gearChecklist" = ${updateData.gearChecklist},
          "faqsJson" = ${updateData.faqsJson},
          "bestTimeJson" = ${updateData.bestTimeJson},
          "gettingThere" = ${updateData.gettingThere},
          "permits" = ${updateData.permits},
          "accommodationType" = ${updateData.accommodationType},
          "pickupTime" = ${updateData.pickupTime},
          "dropoffTime" = ${updateData.dropoffTime},
          "bestFor" = ${updateData.bestFor},
          "seoTitle" = ${updateData.seoTitle},
          "seoDescription" = ${updateData.seoDescription},
          "seoKeywords" = ${updateData.seoKeywords},
          "schemaMarkup" = ${updateData.schemaMarkup},
          "contentVerified" = ${updateData.contentVerified},
          "contentGeneratedAt" = ${updateData.contentGeneratedAt},
          "contentSources" = ${updateData.contentSources},
          "inclusions" = ${updateData.inclusions},
          "exclusions" = ${updateData.exclusions},
          "updatedAt" = ${new Date()}
        where "slug" = ${slug}
      `;

      console.log(`  ✅ Updated: ${trekContent.name}`);
      if (trekContent.flaggedForReview) {
        console.log(
          `  ⚠️  Flagged for review (generation errors or conflicts)`,
        );
      }
      stats.updated++;
    } catch (err) {
      console.error(`  ❌ Failed to update ${slug}: ${err.message}`);
      stats.failed++;
    }
  }
  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("  DATABASE SEED COMPLETE — SUMMARY");
  console.log("=".repeat(70));
  console.log(`  ✅ Updated:   ${stats.updated}`);
  console.log(`  ⚠️  Not found: ${stats.notFound}`);
  console.log(`  ❌ Failed:    ${stats.failed}`);
  console.log(`  ⏭️  Skipped:  ${stats.skipped}`);

  if (!DRY_RUN) {
    console.log("\n  Next steps:");
    console.log("  1. Visit http://localhost:3000/admin/content-review");
    console.log("  2. Review and approve content for each trek");
    console.log("  3. Set contentVerified=true for approved treks");
  }
  console.log("=".repeat(70) + "\n");
}

main().catch((err) => {
  console.error("❌ Seed script crashed:", err);
  process.exit(1);
});
