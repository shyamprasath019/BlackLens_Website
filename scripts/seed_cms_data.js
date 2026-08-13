/**
 * seed_cms_data.js
 * Seeds Sanity CMS dataset with current website default data for:
 *  - aboutPage
 *  - teamMember
 *  - addOnService
 *
 * Usage:
 *  $env:SANITY_AUTH_TOKEN="your-token" ; node scripts/seed_cms_data.js
 *  OR
 *  npx sanity dataset import sanity_import.ndjson production --replace
 */

const { createClient } = require('@sanity/client');

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || '76et40at';
const DATASET = process.env.VITE_SANITY_DATASET || 'production';
const API_VERSION = '2024-01-01';
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.log('--------------------------------------------------');
  console.log('NOTE: SANITY_AUTH_TOKEN environment variable not found.');
  console.log('To import data directly using Sanity CLI, run:');
  console.log('  npx sanity dataset import sanity_import.ndjson production --replace');
  console.log('Or set SANITY_AUTH_TOKEN and re-run this script.');
  console.log('--------------------------------------------------');
  process.exit(0);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
});

async function seedData() {
  console.log('Seeding Sanity CMS datasets...');

  // 1. About Page
  const aboutPageDoc = {
    _id: 'aboutPage_settings',
    _type: 'aboutPage',
    heroTitle: 'About Black Lens Photography',
    heroSubtitle: 'Crafting visual stories with passion, precision, and artistry since 2017',
    storyTitle: 'Our Story',
    storyParagraphs: [
      "Black Lens Photography was born from a simple passion - to capture the raw emotion, beauty, and authenticity of life's most precious moments. What started as a dream in 2017 has grown into one of Chennai's most trusted photography studios.",
      "Based in Thirunindravur, we've had the privilege of covering over 1000 events across Tamil Nadu. From intimate family portraits to grand wedding celebrations, each project receives our unwavering commitment to excellence.",
      "Our team brings together diverse expertise in wedding photography, fashion shoots, product photography, and cinematography. We believe in pushing creative boundaries while maintaining the timeless elegance that makes memories last forever."
    ],
    visionText: "To be recognized as Tamil Nadu's premier photography studio, known for transforming ordinary moments into extraordinary visual narratives that stand the test of time.",
    missionText: "To deliver exceptional photography and videography services that capture authentic emotions, exceed client expectations, and create lasting memories through artistic excellence and professional dedication."
  };
  await client.createOrReplace(aboutPageDoc);
  console.log('✓ Seeded aboutPage settings');

  // 2. Team Members
  const teamMembers = [
    { _id: 'team_static_1', _type: 'teamMember', name: 'Rajesh Kumar', role: 'Lead Photographer', experience: '10+ years', order: 1 },
    { _id: 'team_static_2', _type: 'teamMember', name: 'Priya Sharma', role: 'Senior Videographer', experience: '8+ years', order: 2 },
    { _id: 'team_static_3', _type: 'teamMember', name: 'Anand Venkat', role: 'Fashion Photographer', experience: '6+ years', order: 3 },
    { _id: 'team_static_4', _type: 'teamMember', name: 'Divya Reddy', role: 'Portrait Specialist', experience: '5+ years', order: 4 },
  ];
  for (const member of teamMembers) {
    await client.createOrReplace(member);
  }
  console.log(`✓ Seeded ${teamMembers.length} team members`);

  // 3. Add-on Services
  const addOnServices = [
    { _id: 'addon_static_1', _type: 'addOnService', name: 'Pre-Wedding Shoot', price: '₹12,000', order: 1 },
    { _id: 'addon_static_2', _type: 'addOnService', name: 'Maternity Shoot', price: '₹8,000', order: 2 },
    { _id: 'addon_static_3', _type: 'addOnService', name: 'Baby Shoot', price: '₹6,000', order: 3 },
    { _id: 'addon_static_4', _type: 'addOnService', name: 'Birthday Coverage', price: '₹10,000', order: 4 },
    { _id: 'addon_static_5', _type: 'addOnService', name: 'Product Photography (per item)', price: '₹500', order: 5 },
    { _id: 'addon_static_6', _type: 'addOnService', name: 'Corporate Event Coverage', price: '₹20,000', order: 6 },
    { _id: 'addon_static_7', _type: 'addOnService', name: 'Fashion Portfolio', price: '₹15,000', order: 7 },
    { _id: 'addon_static_8', _type: 'addOnService', name: 'Drone Coverage (add-on)', price: '₹8,000', order: 8 },
  ];
  for (const addon of addOnServices) {
    await client.createOrReplace(addon);
  }
  console.log(`✓ Seeded ${addOnServices.length} add-on services`);

  console.log('All schemas seeded successfully!');
}

seedData().catch(console.error);
