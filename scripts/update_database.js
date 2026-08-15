const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Helper to retrieve the global Sanity auth token
function getSanityToken() {
  if (process.env.SANITY_AUTH_TOKEN) {
    return process.env.SANITY_AUTH_TOKEN;
  }
  try {
    const homedir = require('os').homedir();
    const configPath = path.join(homedir, '.config', 'sanity', 'config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.authToken) {
        return config.authToken;
      }
    }
  } catch (err) {
    console.error('Failed to read sanity token from global config:', err.message);
  }
  return null;
}

const token = getSanityToken();
if (!token) {
  console.error('ERROR: Could not find Sanity auth token. Please log in using `npx sanity login` or set SANITY_AUTH_TOKEN.');
  process.exit(1);
}

const client = createClient({
  projectId: '76et40at',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// Dictionary mapping filename prefixes and categories to beautiful titles and descriptive alts
function getDescriptiveMetadata(filename, category) {
  const fileUpper = filename.toUpperCase();
  
  if (category === 'weddings') {
    if (fileUpper.includes('01') || fileUpper.includes('2235')) {
      return {
        title: "Traditional Mangalsutra Ceremony",
        alt: "Groom tying the mangalsutra in a traditional South Indian wedding ceremony, captured in Chennai"
      };
    }
    if (fileUpper.includes('02') || fileUpper.includes('2239') || fileUpper.includes('2250')) {
      return {
        title: "Elegant South Indian Groom Portrait",
        alt: "Elegant portrait of the groom in traditional pattu veshti and shirt with warm lighting"
      };
    }
    if (fileUpper.includes('2259') || fileUpper.includes('2260')) {
      return {
        title: "Bridal Henna & Gold Details",
        alt: "Close-up of bridal hands showcasing detailed mehendi design and traditional gold bangles"
      };
    }
    if (fileUpper.includes('2279') || fileUpper.includes('2293')) {
      return {
        title: "Gorgeous Bridal Silk Saree Portrait",
        alt: "Classic bridal portrait of the bride smiling in a red and gold Kanchipuram silk saree"
      };
    }
    if (fileUpper.includes('2298') || fileUpper.includes('2368') || fileUpper.includes('2376')) {
      return {
        title: "Candid Wedding Laughs",
        alt: "Candid capture of the bride and groom laughing together during their wedding reception"
      };
    }
    if (fileUpper.includes('2396') || fileUpper.includes('2406') || fileUpper.includes('2426')) {
      return {
        title: "Bridal Entrance Walk",
        alt: "Bride walking down the aisle surrounded by family and bridesmaids at her wedding reception"
      };
    }
    if (fileUpper.includes('2436') || fileUpper.includes('2471') || fileUpper.includes('2481')) {
      return {
        title: "Candid Couple Portrait",
        alt: "Beautiful candid portrait of the newlywed couple in outdoor setting during sunset"
      };
    }
    if (fileUpper.includes('2489') || fileUpper.includes('2503') || fileUpper.includes('2513')) {
      return {
        title: "Traditional Garland Exchange",
        alt: "The bride and groom exchanging flower garlands during their South Indian wedding rituals"
      };
    }
    return {
      title: "Candid Wedding Moment",
      alt: "Candid wedding ceremony moment captured beautifully by Black Lens"
    };
  }
  
  if (category === 'portraits') {
    if (fileUpper.includes('03') || fileUpper.includes('9879')) {
      return {
        title: "Studio Lighting Headshot",
        alt: "Professional headshot of a corporate client in a suit, shot in studio with soft lighting"
      };
    }
    if (fileUpper.includes('04') || fileUpper.includes('9888')) {
      return {
        title: "Outdoor Couple Portrait",
        alt: "Romantic portrait of a couple holding hands in an outdoor park setting"
      };
    }
    return {
      title: "Expressive Studio Portrait",
      alt: "Close-up portrait of a model capturing natural expressions with professional studio setup"
    };
  }
  
  if (category === 'fashion') {
    if (fileUpper.includes('GV_01') || fileUpper.includes('GV_02')) {
      return {
        title: "Ethnic Wear Fashion Lookbook",
        alt: "Model posing in designer traditional ethnic wear for a fashion lookbook portfolio"
      };
    }
    if (fileUpper.includes('GV_03') || fileUpper.includes('GV_04')) {
      return {
        title: "High Fashion Outdoor Shoot",
        alt: "Outdoor editorial fashion shoot capturing high fashion garments in dramatic natural light"
      };
    }
    return {
      title: "Contemporary Fashion Portfolio",
      alt: "Professional studio fashion shoot highlighting modern clothing and styles"
    };
  }

  if (category === 'corporate') {
    return {
      title: "Corporate Event Group Coverage",
      alt: "Candid group photo of corporate executives and team members during a conference event"
    };
  }

  if (category === 'product' || fileUpper.includes('IDLI')) {
    return {
      title: "South Indian Food Styling - Idli Sambar",
      alt: "Food styling of traditional South Indian steamed idlis served on a plate with sambar and coconut chutney"
    };
  }
  
  return {
    title: "Black Lens Photography Capture",
    alt: "Professional photograph captured by Black Lens Photography"
  };
}

async function updateDatabase() {
  console.log('Fetching all services from Sanity...');
  const services = await client.fetch('*[_type == "service"]{ _id, title }');
  console.log(`Found ${services.length} services in Sanity.\n`);

  // Map service titles to their document IDs
  const serviceMap = {};
  services.forEach(s => {
    serviceMap[s.title.toLowerCase()] = s._id;
  });

  // If "Wedding Photography" or "Food & Culinary Photography" doesn't have standard IDs,
  // we will map strings accordingly.
  const getServiceIdForCategory = (catStr) => {
    const norm = catStr.toLowerCase().trim();
    if (norm === 'weddings' || norm === 'wedding-photography') {
      return serviceMap['wedding photography'];
    }
    if (norm === 'portraits' || norm === 'photo-studio') {
      return serviceMap['photo studio'];
    }
    if (norm === 'fashion' || norm === 'fashion-photography') {
      return serviceMap['fashion photography'];
    }
    if (norm === 'product' || norm === 'product-photography') {
      return serviceMap['product photography'];
    }
    if (norm === 'corporate' || norm === 'corporate-headshots') {
      return serviceMap['corporate headshots'];
    }
    if (norm === 'cinematography' || norm === 'cinematography-reels') {
      return serviceMap['cinematography & reels'];
    }
    if (norm === 'food' || norm === 'food-photography') {
      return serviceMap['food & culinary photography'];
    }
    // Try fuzzy match
    for (const key of Object.keys(serviceMap)) {
      if (key.includes(norm) || norm.includes(key)) {
        return serviceMap[key];
      }
    }
    return null;
  };

  // 1. Clean up "Event Photography" service (service_static_2) to remove wedding stuff
  console.log('Updating Event Photography service (service_static_2) to remove wedding references...');
  await client.patch('service_static_2')
    .set({
      description: "Professional coverage for corporate events, social gatherings, housewarmings, and special milestone celebrations.",
      features: [
        "Corporate Events & Conferences",
        "Milestone Birthday Parties",
        "Housewarming Ceremonies",
        "Cultural & Social Gatherings"
      ],
      icon: "gift", // Display gift icon for events
      featured: true,
      order: 3,
    })
    .commit();
  console.log('✓ Updated service_static_2 (Event Photography)\n');

  // 2. Set clean featured and order properties for other services
  const serviceConfigs = [
    { title: "Wedding Photography", featured: true, order: 1, icon: "heart" },
    { title: "Photo Studio", featured: true, order: 2, icon: "camera" },
    { title: "Family & Maternity", featured: true, order: 4, icon: "baby" },
    { title: "Birthday & Celebrations", featured: false, order: 5, icon: "gift" },
    { title: "Product Photography", featured: false, order: 6, icon: "shopping-bag" },
    { title: "Fashion Photography", featured: false, order: 7, icon: "shirt" },
    { title: "Corporate Headshots", featured: false, order: 8, icon: "briefcase" },
    { title: "Cinematography & Reels", featured: false, order: 9, icon: "film" },
    { title: "Food & Culinary Photography", featured: false, order: 10, icon: "utensils" },
  ];

  for (const config of serviceConfigs) {
    const id = serviceMap[config.title.toLowerCase()];
    if (id) {
      console.log(`Setting order: ${config.order}, featured: ${config.featured}, icon: ${config.icon} for "${config.title}" (${id})...`);
      await client.patch(id)
        .set({
          featured: config.featured,
          order: config.order,
          icon: config.icon
        })
        .commit();
    }
  }
  console.log('✓ Configured featured, order, and icon for all services\n');

  // 3. Fetch all portfolio items
  console.log('Fetching all portfolio items...');
  const portfolioItems = await client.fetch('*[_type == "portfolioItem"]{ _id, title, alt, category, image }');
  console.log(`Found ${portfolioItems.length} portfolio items.\n`);

  let deletedCount = 0;
  let updatedCount = 0;

  for (const item of portfolioItems) {
    // A. Delete legacy stock portfolio items (portfolio_1 to portfolio_14)
    if (/^portfolio_\d+$/.test(item._id)) {
      console.log(`Deleting stock item: ${item._id} ("${item.title}")`);
      await client.delete(item._id);
      deletedCount++;
      continue;
    }

    // B. Keep client-uploaded items (random IDs) and locally-uploaded photos (portfolio_photo_...)
    // Determine the string category first
    let catStr = '';
    if (typeof item.category === 'string') {
      catStr = item.category;
    } else if (item.category && item.category._ref) {
      // It is already a reference, resolve its title to double check
      const refService = services.find(s => s._id === item.category._ref);
      if (refService) {
        catStr = refService.title;
      }
    }

    if (!catStr) {
      catStr = 'portraits'; // default fallback
    }

    // Resolve matching service document ID
    const serviceId = getServiceIdForCategory(catStr);
    if (!serviceId) {
      console.warn(`WARNING: Could not resolve service ID for category string: "${catStr}" on item: ${item._id}`);
      continue;
    }

    // Determine descriptive metadata
    let filename = item.title || '';
    if (item._id.startsWith('portfolio_photo_')) {
      // e.g. portfolio_photo_0c3a2235_jpg -> 0C3A2235
      filename = item._id.replace('portfolio_photo_', '').replace('_jpg', '').replace('_png', '').toUpperCase();
    }

    // Determine final title and alt text
    let newTitle = item.title;
    let newAlt = item.alt;

    if (!newTitle || newTitle === filename || /^[0-9a-zA-Z_-]+$/.test(newTitle)) {
      // Title is null or a raw filename, map to descriptive title
      const meta = getDescriptiveMetadata(filename || newTitle || '', catStr);
      newTitle = meta.title;
      newAlt = meta.alt;
    } else if (item.alt && (item.alt.includes('by Black Lens') || !item.alt.trim())) {
      // Update alt text to match the beautiful title
      const meta = getDescriptiveMetadata(filename || newTitle || '', catStr);
      newAlt = meta.alt;
    }

    console.log(`Updating portfolio item: ${item._id}`);
    console.log(`  Old Category: "${catStr}" -> New Category Ref: "${serviceId}"`);
    console.log(`  Title: "${item.title}" -> "${newTitle}"`);
    console.log(`  Alt: "${item.alt}" -> "${newAlt}"`);

    await client.patch(item._id)
      .set({
        title: newTitle,
        alt: newAlt,
        category: {
          _type: 'reference',
          _ref: serviceId
        }
      })
      .commit();
    updatedCount++;
  }

  console.log(`\nDatabase update complete! Deleted: ${deletedCount} stock items, Updated: ${updatedCount} real client/photo items.`);
}

updateDatabase().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
