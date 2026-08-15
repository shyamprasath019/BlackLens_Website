import { motion } from 'motion/react';
import { Camera, Film, Users, Award, ArrowRight, Star, Heart, Baby, Gift, ShoppingBag, Shirt, Briefcase, Video, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanityClient';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ICON_MAP: Record<string, any> = {
  camera: Camera,
  utensils: Utensils,
  food: Utensils,
  heart: Heart,
  wedding: Heart,
  event: Heart,
  film: Film,
  cine: Film,
  users: Users,
  portrait: Users,
  'shopping-bag': ShoppingBag,
  product: ShoppingBag,
  shirt: Shirt,
  fashion: Shirt,
  briefcase: Briefcase,
  corporate: Briefcase,
  baby: Baby,
  maternity: Baby,
  gift: Gift,
  birthday: Gift,
  award: Award,
  commercial: Award,
  video: Video,
  star: Star,
};

const getServiceIcon = (iconKey?: string, title?: string) => {
  if (iconKey && ICON_MAP[iconKey.toLowerCase()]) {
    return ICON_MAP[iconKey.toLowerCase()];
  }
  if (title) {
    const t = title.toLowerCase();
    if (t.includes('food') || t.includes('culinary') || t.includes('restaurant')) return Utensils;
    if (t.includes('wedding') || t.includes('event')) return Heart;
    if (t.includes('maternity') || t.includes('baby')) return Baby;
    if (t.includes('birthday')) return Gift;
    if (t.includes('product')) return ShoppingBag;
    if (t.includes('commercial')) return Award;
    if (t.includes('fashion')) return Shirt;
    if (t.includes('portrait')) return Users;
    if (t.includes('corporate')) return Briefcase;
    if (t.includes('video') || t.includes('cine') || t.includes('film')) return Film;
  }
  return Camera;
};

export function HomePage() {
  const navigate = useNavigate();
  const [homeContent, setHomeContent] = useState<{
    heroTitle: string;
    heroSubtitle: string;
    heroCTA: string;
    heroImage?: any;
  } | null>(null);

  const [servicesData, setServicesData] = useState<
    {
      title: string;
      description: string;
      imageUrl?: string;
      image?: any;
      features?: string[];
      icon?: any;
    }[]
  >([]);

  const [statsData, setStatsData] = useState<{ label: string; value: string }[]>([]);

  const [featuredPortfolio, setFeaturedPortfolio] = useState<{ imageUrl?: string; image?: any; alt?: string }[]>([]);

  const [testimonialsData, setTestimonialsData] = useState<
    { name: string; quote: string; rating: number; service: string }[]
  >([]);

  const getOptimizedUrl = (item: any, width: number = 800) => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    if (item.asset) {
      try {
        return urlFor(item).auto('format').quality(80).fit('max').width(width).url();
      } catch (e) {
        console.error('Error building Sanity URL:', e);
      }
    }
    if (item.image) {
      if (typeof item.image === 'string') return item.image;
      if (item.image.asset) {
        try {
          return urlFor(item.image).auto('format').quality(80).fit('max').width(width).url();
        } catch (e) {
          console.error('Error building Sanity URL:', e);
        }
      }
    }
    if (item.imageUrl) return item.imageUrl;
    return '';
  };

  useEffect(() => {
    // Fetch Home Page Settings
    sanityClient
      .fetch(`*[_type == "homePage"][0]{ heroTitle, heroSubtitle, heroCTA, heroImage }`)
      .then(data => { if (data) setHomeContent(data); })
      .catch(console.error);

    // Fetch Services
    sanityClient
      .fetch(`*[_type == "service" && featured == true] | order(order asc, _createdAt asc)[0...4]{ title, description, image, features, icon, order }`)
      .then(data => {
        if (data && data.length > 0) {
          const mappedData = data.map((item: any) => {
            return { ...item, icon: getServiceIcon(item.icon, item.title) };
          });
          setServicesData(mappedData);
        }
      })
      .catch(console.error);

    // Fetch Stats
    sanityClient
      .fetch(`*[_type == "stat"] | order(order asc) { label, "value": value }`)
      .then(data => { if (data && data.length > 0) setStatsData(data); })
      .catch(console.error);

    // Fetch Featured Portfolio: Query featured items first, fallback to latest portfolio items
    sanityClient
      .fetch(`*[_type == "portfolioItem" && featured == true][0...6]{ image, alt }`)
      .then(data => {
        const withImages = (data || []).filter((item: any) => item.image && item.image.asset);
        if (withImages.length > 0) {
          setFeaturedPortfolio(withImages);
        } else {
          // Fallback: latest portfolioItems that have images
          sanityClient
            .fetch(`*[_type == "portfolioItem" && defined(image.asset)] | order(_createdAt desc)[0...6]{ image, alt }`)
            .then(latestData => {
              const latestWithImages = (latestData || []).filter((item: any) => item.image && item.image.asset);
              if (latestWithImages.length > 0) {
                setFeaturedPortfolio(latestWithImages);
              }
              // else: keep local /Photos/client/ defaults
            })
            .catch(console.error);
        }
      })
      .catch(console.error);

    // Fetch Testimonials
    sanityClient
      .fetch(`*[_type == "testimonial"]{ name, quote, rating, service }`)
      .then(data => { if (data && data.length > 0) setTestimonialsData(data); })
      .catch(console.error);
  }, []);


  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PhotographyBusiness",
        "@id": "https://blacklensphotography.com/#business",
        "name": "Black Lens Photography",
        "alternateName": "Black Lens Photography Chennai",
        "url": "https://blacklensphotography.com",
        "telephone": "+919876543210",
        "email": "info@blacklensphotography.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Thirunindravur",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "602024",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 13.120547,
          "longitude": 80.00863
        },
        "image": "/Photos/weddings/01.jpg",
        "priceRange": "₹₹",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "10:00",
            "closes": "17:00"
          }
        ],
        "areaServed": [
          {"@type": "City", "name": "Chennai"},
          {"@type": "State", "name": "Tamil Nadu"}
        ],
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Priya & Rahul"
            },
            "reviewBody": "Black Lens Photography made our wedding day unforgettable. Every moment was captured with such artistry and emotion.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Ananya Sharma"
            },
            "reviewBody": "The pre-wedding shoot was beyond our expectations. Professional, creative, and so much fun!",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://blacklensphotography.com/#website",
        "url": "https://blacklensphotography.com",
        "name": "Black Lens Photography",
        "publisher": {
          "@id": "https://blacklensphotography.com/#business"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Black Lens Photography Chennai | Wedding & Event Photographer in Tamil Nadu</title>
        <meta name="description" content="Black Lens Photography, Chennai's premier wedding & event photographer. 500+ happy clients, 1000+ events across Tamil Nadu. Book your shoot today!" />
        <link rel="canonical" href="https://blacklensphotography.com/" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.120547;80.00863" />
        <meta name="ICBM" content="13.120547, 80.00863" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blacklensphotography.com/" />
        <meta property="og:title" content="Black Lens Photography Chennai | Wedding & Event Photographer" />
        <meta property="og:description" content="Capturing stories and creating timeless memories. Professional photography and videography services across Tamil Nadu specializing in weddings, portraits, and cinematic storytelling." />
        <meta property="og:image" content="/Photos/weddings/01.jpg" />
        <meta property="og:site_name" content="Black Lens Photography" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blacklensphotography.com/" />
        <meta property="twitter:title" content="Black Lens Photography Chennai | Wedding & Event Photographer" />
        <meta property="twitter:description" content="Capturing stories and creating timeless memories. Professional photography and videography services across Tamil Nadu." />
        <meta property="twitter:image" content="/Photos/weddings/01.jpg" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={getOptimizedUrl(homeContent?.heroImage, 1920) || "/Photos/weddings/01.jpg"}
            fallbackSrc="/Photos/weddings/01.jpg"
            alt="Cinematic wedding photography by Black Lens Photography Chennai"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-white mb-8 max-w-4xl mx-auto px-4">
              {homeContent?.heroTitle ?? (
                <>
                  Capturing Stories.<br />Creating Timeless Memories.
                </>
              )}
            </h1>

            <p className="text-[#e5e5e5] text-xl mb-10 max-w-2xl mx-auto px-4">
              {homeContent?.heroSubtitle ??
                "Professional photography and videography services across Tamil Nadu. Specializing in weddings, portraits, and cinematic storytelling."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/contact"
                className="bg-gold text-[#0a0a0a] hover:bg-goldMuted hover:text-white px-10 py-4 rounded-lg shadow-lg hover:shadow-gold/20 transition-all duration-300 flex items-center justify-center gap-2 font-bold"
              >
                {homeContent?.heroCTA ?? "Book a Shoot"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/portfolio"
                className="bg-transparent text-white px-10 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-[#0a0a0a] transition-all font-medium text-center"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>


      </section>

      {/* Stats Section */}
      <section className="bg-[#0c0c0c] py-20 relative overflow-hidden dark-grid-texture border-y border-white/5">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {statsData.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="bg-[#1a1a1a] h-10 w-20 mx-auto rounded mb-3"></div>
                  <div className="bg-[#1a1a1a] h-6 w-32 mx-auto rounded"></div>
                </div>
              ))
            ) : (
              statsData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative premium-glow"
                >
                  <div className="text-gold mb-3 text-4xl font-bold tracking-tight">{stat.value}</div>
                  <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#050505] relative overflow-hidden dark-grid-texture">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Our Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto px-4">
              From weddings to corporate events, we offer comprehensive photography and videography services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-[#1a1a1a] p-8 rounded-xl animate-pulse space-y-4">
                  <div className="bg-[#2a2a2a] h-14 w-14 rounded-lg"></div>
                  <div className="bg-[#2a2a2a] h-6 w-2/3 rounded"></div>
                  <div className="bg-[#2a2a2a] h-12 w-full rounded"></div>
                </div>
              ))
            ) : (
              servicesData.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate('/services')}
                  className="premium-glass premium-card-border p-8 rounded-xl transition-all duration-300 cursor-pointer group shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/5 to-transparent rounded-full blur-xl pointer-events-none" />
                  <div className="bg-gold/10 p-4 rounded-lg inline-block mb-6 group-hover:bg-gold/20 transition-colors">
                    {service.icon ? (
                      <service.icon className="w-7 h-7 text-gold" />
                    ) : (
                      <Camera className="w-7 h-7 text-gold" />
                    )}
                  </div>
                  <h3 className="text-white text-lg font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/services"
              className="text-gold hover:text-goldMuted transition-colors inline-flex items-center gap-2 font-medium"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Featured Work</h2>
            <p className="text-[#9ca3af] max-w-2xl mx-auto px-4">
              Browse through our curated collection of memorable moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPortfolio.length === 0 ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 md:h-96 rounded-lg bg-[#121212] animate-pulse"></div>
              ))
            ) : (
              featuredPortfolio.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-80 md:h-96 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => navigate('/portfolio')}
                >
                  <ImageWithFallback
                    src={getOptimizedUrl(item)}
                    fallbackSrc="/Photos/weddings/01.jpg"
                    alt={item.alt || "Black Lens Photography Portfolio Item"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white border border-white/40 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      View Project
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/portfolio"
              className="bg-gold text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-goldMuted transition-colors font-medium"
            >
              Explore Full Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">What Our Clients Say</h2>
            <p className="text-[#9ca3af] max-w-2xl mx-auto px-4">
              Don't just take our word for it - hear from our happy clients
            </p>
          </motion.div>

          <div className="overflow-hidden relative w-full py-4">
            {/* Left and right fading edges for a premium look */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"></div>
            
            {testimonialsData.length === 0 ? (
              <div className="flex gap-6 justify-center w-full animate-pulse">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-[#0a0a0a] p-8 rounded-lg border border-[#2a2a2a] w-80 md:w-96 h-48 flex-shrink-0"></div>
                ))}
              </div>
            ) : (
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="flex gap-6 w-max"
              >
                {[
                  ...testimonialsData,
                  ...testimonialsData
                ].map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-${index}`}
                    className="bg-[#0a0a0a] p-8 rounded-lg border border-[#2a2a2a] w-80 md:w-96 flex-shrink-0 hover:border-gold transition-colors"
                  >
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-[#e5e5e5] mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                    <div>
                      <p className="text-white mb-1 font-bold">{testimonial.name}</p>
                      <p className="text-gold text-xs font-semibold uppercase tracking-wider">{testimonial.service}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">Ready to Create Magic Together?</h2>
            <p className="text-[#9ca3af] mb-10 max-w-2xl mx-auto px-4">
              Let's capture your special moments with the artistry they deserve. 
              Book your session today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/contact"
                className="bg-gold text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-goldMuted transition-colors font-medium text-center"
              >
                Book Your Shoot
              </Link>
              <Link
                to="/packages"
                className="bg-transparent text-white px-10 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-[#0a0a0a] transition-all font-medium text-center"
              >
                View Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}