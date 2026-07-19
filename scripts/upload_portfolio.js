/**
 * upload_portfolio.js
 * Uploads photos from public/Photos/ to Sanity and creates portfolioItem documents.
 * Run with: node scripts/upload_portfolio.js
 * Requires SANITY_AUTH_TOKEN env var (or pass via command line).
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const PROJECT_ID = '76et40at';
const DATASET = 'production';
const API_VERSION = '2024-01-01';

// Try to get token from env
const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_AUTH_TOKEN environment variable is required.');
  console.error('Run: $env:SANITY_AUTH_TOKEN="your-token" ; node scripts/upload_portfolio.js');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
});

const PHOTOS_DIR = path.join(__dirname, '..', 'public', 'Photos');

/**
 * Determine category based on filename prefix.
 * 
 * Prefixes in the shoot:
 *  0C3A22xx (0C3A2235–0C3A2675)  → weddings (large wedding shoot)
 *  0C3A9xxx (0C3A9879–0C3A9917)  → portraits
 *  373A18xx / 373A19xx           → fashion
 *  373A28xx / 373A29xx           → weddings
 *  732A17xx / 732A19xx           → corporate
 *  ChatGPT Image ...             → skip (it's a generated placeholder)
 */
function getCategory(filename) {
  const base = filename.toUpperCase();

  if (base.startsWith('CHATGPT')) return null; // skip AI-generated image

  const num = parseInt(base.replace(/[^0-9]/g, ''), 10);

  if (base.startsWith('0C3A')) {
    const n = parseInt(base.replace('0C3A', '').replace(/\..+$/, ''), 10);
    if (n >= 2235 && n <= 2675) return 'weddings';
    if (n >= 9879 && n <= 9917) return 'portraits';
  }

  if (base.startsWith('373A')) {
    const n = parseInt(base.replace('373A', '').replace(/\..+$/, ''), 10);
    if (n >= 1832 && n <= 1905) return 'fashion';
    if (n >= 2846 && n <= 2994) return 'weddings';
  }

  if (base.startsWith('732A')) {
    return 'corporate';
  }

  return 'portraits'; // fallback
}

async function uploadAndCreate() {
  const files = fs.readdirSync(PHOTOS_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  console.log(`Found ${files.length} images to process.\n`);

  let created = 0;
  let skipped = 0;

  for (const filename of files) {
    const category = getCategory(filename);
    if (!category) {
      console.log(`  SKIP  ${filename} (no category)`);
      skipped++;
      continue;
    }

    const filePath = path.join(PHOTOS_DIR, filename);
    const docId = `portfolio_photo_${filename.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '').toLowerCase()}`;

    // Check if document already exists
    try {
      const existing = await client.getDocument(docId);
      if (existing) {
        console.log(`  SKIP  ${filename} (already in Sanity)`);
        skipped++;
        continue;
      }
    } catch (_) {}

    console.log(`  UPLOAD  ${filename} → category: ${category}`);

    try {
      // 1. Upload the image asset
      const fileBuffer = fs.readFileSync(filePath);
      const asset = await client.assets.upload('image', fileBuffer, {
        filename,
        contentType: 'image/jpeg',
      });

      // 2. Create the portfolioItem document
      await client.createOrReplace({
        _id: docId,
        _type: 'portfolioItem',
        title: filename.replace(/\.[^.]+$/, ''),
        category,
        alt: `${category.charAt(0).toUpperCase() + category.slice(1)} photography by Black Lens`,
        featured: false,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      });

      console.log(`    ✓ Created document: ${docId}`);
      created++;
    } catch (err) {
      console.error(`    ✗ Error processing ${filename}:`, err.message);
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

uploadAndCreate().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
