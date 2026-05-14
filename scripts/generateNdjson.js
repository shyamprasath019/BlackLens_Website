const fs = require('fs');

const generateUUID = () => require('crypto').randomUUID();

const ndjsonLines = [];

// 1. Home Page Settings
ndjsonLines.push(JSON.stringify({
  _id: 'homePage_settings',
  _type: 'homePage',
  heroTitle: 'Capturing Your Most Beautiful Moments',
  heroSubtitle: 'Professional photography and videography services across Tamil Nadu',
  heroCTA: 'Book a Shoot'
}));

// 2. Services
const services = [
  {
    title: 'Photo Studio',
    description: 'Professional studio setups with state-of-the-art lighting and backdrops for perfect shots every time.',
    features: ['Studio Portraits', 'Family Photos', 'Professional Headshots', 'Creative Concepts'],
    image: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjAyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Event Photography',
    description: 'Capturing your special celebrations with artistic precision. From weddings to anniversaries, we tell your story.',
    features: ['Weddings', 'Pre-Wedding Shoots', 'Engagement Ceremonies', 'Anniversary Celebrations'],
    image: 'https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Family & Maternity',
    description: 'Beautiful memories of growing families. Pregnancy shoots, newborn photography, and children portraits.',
    features: ['Maternity Shoots', 'Newborn Photography', 'Baby Milestones', 'Family Portraits'],
    image: 'https://images.unsplash.com/photo-1560880453-98ae92fd499d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByb21hbnRpYyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjAxNjgyMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Birthday & Celebrations',
    description: 'Make every birthday memorable with our creative photography coverage and candid moments.',
    features: ['Birthday Parties', 'Theme Celebrations', 'Candid Moments', 'Decoration Coverage'],
    image: 'https://images.unsplash.com/photo-1764380750858-b85ffa2ef37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBtb21lbnR8ZW58MXx8fHwxNzY2MDg4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Product Photography',
    description: 'Showcase your products with high-quality, professional images perfect for e-commerce and marketing.',
    features: ['E-commerce Photos', 'Catalog Shoots', 'Lifestyle Product Shots', 'Creative Styling'],
    image: 'https://images.unsplash.com/photo-1611930021698-a55ec4d5fe6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NjA0MzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Fashion Photography',
    description: 'Editorial and commercial fashion shoots that bring style and elegance to life through our lens.',
    features: ['Editorial Shoots', 'Portfolio Building', 'Lookbook Creation', 'Model Photography'],
    image: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY2MDE3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Corporate Headshots',
    description: 'Professional corporate photography for business profiles, LinkedIn, and company websites.',
    features: ['Executive Portraits', 'Team Photos', 'LinkedIn Headshots', 'Company Events'],
    image: 'https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjYwODE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Cinematography & Reels',
    description: 'Cinematic videos, Instagram reels, and social media content that tells your story in motion.',
    features: ['Wedding Films', 'Instagram Reels', 'YouTube Shorts', 'Commercial Videos'],
    image: 'https://images.unsplash.com/photo-1758851088217-df00ca346e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0b2dyYXBoeSUyMGNhbWVyYSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjYwODgxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];
services.forEach((svc, index) => {
  ndjsonLines.push(JSON.stringify({
    _id: `service_static_${index + 1}`,
    _type: 'service',
    title: svc.title,
    description: svc.description,
    features: svc.features,
    featured: index < 4,
    image: {
      _type: 'image',
      _sanityAsset: `image@${svc.image}`
    }
  }));
});

// 3. Stats
const stats = [
  { value: '500+', label: 'Happy Clients', order: 1 },
  { value: '1000+', label: 'Events Covered', order: 2 },
  { value: '8+', label: 'Years Experience', order: 3 },
  { value: '50K+', label: 'Photos Captured', order: 4 },
];
stats.forEach((stat, index) => {
  ndjsonLines.push(JSON.stringify({
    _id: `stat_static_${index + 1}`,
    _type: 'stat',
    label: stat.label,
    value: stat.value,
    order: stat.order
  }));
});

// 4. Testimonials
const testimonials = [
  { name: 'Priya & Rahul', quote: 'Black Lens Photography made our wedding day unforgettable. Every moment was captured with such artistry and emotion.', rating: 5, service: 'Wedding Photography' },
  { name: 'Ananya Sharma', quote: 'The pre-wedding shoot was beyond our expectations. Professional, creative, and so much fun!', rating: 5, service: 'Pre-Wedding Shoot' },
  { name: 'Tech Innovations Pvt Ltd', quote: 'Outstanding product photography that elevated our brand. Highly professional team!', rating: 5, service: 'Product Photography' },
];
testimonials.forEach((test, index) => {
  ndjsonLines.push(JSON.stringify({
    _id: `testimonial_static_${index + 1}`,
    _type: 'testimonial',
    name: test.name,
    quote: test.quote,
    rating: test.rating,
    service: test.service
  }));
});

// 5. Packages
const packages = [
  {
    name: 'Standard',
    price: '₹15,000',
    description: 'Perfect for small events and intimate gatherings',
    features: ['4 hours coverage', '200+ edited photos', 'Online gallery', 'Basic editing', '2 photographers', '15-day delivery'],
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹35,000',
    description: 'Most popular choice for weddings and major events',
    features: ['8 hours coverage', '500+ edited photos', 'Online gallery + USB', 'Premium editing', '3 photographers + 1 videographer', 'Cinematic video highlights', 'Premium album', '10-day delivery'],
    popular: true,
  },
  {
    name: 'Luxury',
    price: '₹75,000',
    description: 'Complete coverage with premium deliverables',
    features: ['Full day coverage', '1000+ edited photos', 'Online gallery + USB + Cloud', 'Luxury editing & retouching', '4 photographers + 2 videographers', 'Cinematic wedding film', 'Same-day edit video', 'Luxury photobook album', 'Pre-wedding shoot included', 'Drone coverage', '7-day delivery'],
    popular: false,
  },
];
packages.forEach((pkg, index) => {
  ndjsonLines.push(JSON.stringify({
    _id: `package_static_${index + 1}`,
    _type: 'package',
    name: pkg.name,
    price: pkg.price,
    description: pkg.description,
    features: pkg.features,
    popular: pkg.popular
  }));
});

const portfolio = [
  { id: 1, category: 'weddings', image: 'https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Wedding photography Chennai' },
  { id: 2, category: 'weddings', image: 'https://images.unsplash.com/photo-1743684821666-05b9c5046937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY291cGxlJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzY2MDg4MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Indian wedding ceremony photography' },
  { id: 3, category: 'weddings', image: 'https://images.unsplash.com/photo-1764380750858-b85ffa2ef37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBtb21lbnR8ZW58MXx8fHwxNzY2MDg4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Bride wedding moment', featured: true },
  { id: 4, category: 'weddings', image: 'https://images.unsplash.com/photo-1662109905341-badae635c375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdhZ2VtZW50JTIwcmluZyUyMGNsb3NlfGVufDF8fHx8MTc2NjA4ODMxOHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Engagement ring photography' },
  { id: 5, category: 'portraits', image: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjAyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Professional portrait photography', featured: true },
  { id: 6, category: 'portraits', image: 'https://images.unsplash.com/photo-1560880453-98ae92fd499d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByb21hbnRpYyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjAxNjgyMHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Couple romantic portrait' },
  { id: 7, category: 'portraits', image: 'https://images.unsplash.com/photo-1688048703620-4554ea8b7f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjA4ODMxNnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Newborn baby photography' },
  { id: 8, category: 'fashion', image: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY2MDE3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Fashion photography studio', featured: true },
  { id: 9, category: 'fashion', image: 'https://images.unsplash.com/photo-1696489283182-0446be970e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU5NzcxOTR8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Woman fashion portrait' },
  { id: 10, category: 'product', image: 'https://images.unsplash.com/photo-1611930021698-a55ec4d5fe6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NjA0MzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Product photography minimalist' },
  { id: 11, category: 'product', image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHByb2R1Y3R8ZW58MXx8fHwxNzY1OTk0MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Luxury watch product photography' },
  { id: 12, category: 'corporate', image: 'https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjYwODE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Corporate headshot professional' },
  { id: 13, category: 'corporate', image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjAwNzE1MXww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Business professional portrait' },
  { id: 14, category: 'cinematography', image: 'https://images.unsplash.com/photo-1758851088217-df00ca346e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0b2dyYXBoeSUyMGNhbWVyYSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjYwODgxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Cinematography camera equipment' }
];

portfolio.forEach(item => {
  ndjsonLines.push(JSON.stringify({
    _id: `portfolio_${item.id}`,
    _type: 'portfolioItem',
    title: item.alt, // Use alt text as title
    category: item.category,
    alt: item.alt,
    featured: item.featured || false,
    image: {
      _type: 'image',
      _sanityAsset: `image@${item.image}` // Magic string for sanity CLI
    }
  }));
});

fs.writeFileSync('sanity_import.ndjson', ndjsonLines.join('\n'), 'utf8');
console.log('Successfully generated sanity_import.ndjson');
