import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { sanityClient, urlFor } from '../lib/sanityClient';
import { Helmet } from 'react-helmet-async';

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showCategories, setShowCategories] = useState(true);

  const [categories, setCategories] = useState<{ id: string; label: string }[]>([
    { id: 'all', label: 'All Work' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'product', label: 'Product' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'cinematography', label: 'Cinematography' },
  ]);

  const [portfolioItems, setPortfolioItems] = useState<
    { id: string | number; category: string; image: any; alt?: string }[]
  >([]);

  const getOptimizedUrl = (image: any) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image.asset) {
      try {
        return urlFor(image).auto('format').quality(80).fit('max').width(800).url();
      } catch (e) {
        console.error('Error generating Sanity URL:', e);
      }
    }
    return '';
  };

  useEffect(() => {
    // Fetch categories display toggle
    sanityClient
      .fetch(`*[_type == "siteSettings"] | order(_updatedAt desc)[0]{ showPortfolioCategories }`)
      .then((settings) => {
        if (settings && typeof settings.showPortfolioCategories === 'boolean') {
          setShowCategories(settings.showPortfolioCategories);
        }
      })
      .catch(console.error);

    // Fetch portfolio items
    sanityClient
      .fetch(
        `*[_type == "portfolioItem"]{
          "id": _id,
          "category": coalesce(category->title, category),
          image,
          alt
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          // Only use Sanity data if items actually have uploaded images
          const withImages = data.filter(
            (item: any) => item.image && item.image.asset
          );
          if (withImages.length > 0) {
            setPortfolioItems(withImages);
          }
          // else: keep the local-file defaults already in state
        }
      })
      .catch(console.error);

    // Fetch all services to build the portfolio filter categories dynamically
    sanityClient
      .fetch(`*[_type == "service"]{ title }`)
      .then((services: { title: string }[]) => {
        if (services && services.length > 0) {
          const dynamicCategories = services.map((s) => ({
            id: slugify(s.title),
            label: s.title,
          }));

          setCategories((prev) => {
            const combined = [...prev];
            dynamicCategories.forEach((dc) => {
              const mappedId = dc.id === 'wedding-photography' ? 'weddings'
                             : dc.id === 'photo-studio' ? 'portraits'
                             : dc.id === 'fashion-photography' ? 'fashion'
                             : (dc.id === 'product-photography' || dc.id === 'food-culinary-photography') ? 'product'
                             : dc.id === 'corporate-headshots' ? 'corporate'
                             : dc.id === 'cinematography-reels' ? 'cinematography'
                             : dc.id;

              if (!combined.some((c) => slugify(c.id) === slugify(mappedId))) {
                combined.push({ id: mappedId, label: dc.label });
              }
            });
            return combined;
          });
        }
      })
      .catch(console.error);
  }, []);

  const matchCategory = (itemCategory: string, selectedTab: string) => {
    const itemSlug = slugify(itemCategory);
    const tabSlug = slugify(selectedTab);
    
    if (tabSlug === 'all') return true;
    
    if (tabSlug === 'weddings') {
      return itemSlug === 'wedding-photography' || itemSlug === 'weddings' || itemSlug === 'wedding';
    }
    if (tabSlug === 'portraits') {
      return itemSlug === 'photo-studio' || itemSlug === 'portraits' || itemSlug === 'portrait';
    }
    if (tabSlug === 'fashion') {
      return itemSlug === 'fashion-photography' || itemSlug === 'fashion';
    }
    if (tabSlug === 'product') {
      return itemSlug === 'product-photography' || itemSlug === 'product' || itemSlug === 'food-culinary-photography' || itemSlug === 'food-&-culinary-photography';
    }
    if (tabSlug === 'corporate') {
      return itemSlug === 'corporate-headshots' || itemSlug === 'corporate';
    }
    if (tabSlug === 'cinematography') {
      return itemSlug === 'cinematography-reels' || itemSlug === 'cinematography' || itemSlug === 'cinematography-&-reels';
    }
    
    return itemSlug === tabSlug;
  };

  const filteredItems =
    !showCategories || selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => matchCategory(item.category, selectedCategory));

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems]);

  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://blacklensphotography.com/portfolio/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://blacklensphotography.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Portfolio",
            "item": "https://blacklensphotography.com/portfolio"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen pt-20 bg-[#050505]">
      <Helmet>
        <title>Wedding & Event Photography Portfolio | Black Lens Photography Chennai</title>
        <meta name="description" content="Explore stunning wedding, portrait, fashion & product photography by Black Lens Photography Chennai. 1000+ events covered across Tamil Nadu since 2017." />
        <link rel="canonical" href="https://blacklensphotography.com/portfolio" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.120547;80.00863" />
        <meta name="ICBM" content="13.120547, 80.00863" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blacklensphotography.com/portfolio" />
        <meta property="og:title" content="Wedding & Event Photography Portfolio | Black Lens Photography Chennai" />
        <meta property="og:description" content="View our portfolio of stunning wedding, portrait, fashion, product, and corporate photography." />
        <meta property="og:image" content="/Photos/weddings/01.jpg" />
        <meta property="og:site_name" content="Black Lens Photography" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blacklensphotography.com/portfolio" />
        <meta property="twitter:title" content="Wedding & Event Photography Portfolio | Black Lens Photography Chennai" />
        <meta property="twitter:description" content="View our portfolio of stunning wedding, portrait, fashion, product, and corporate photography." />
        <meta property="twitter:image" content="/Photos/weddings/01.jpg" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white mb-8">Our Portfolio</h1>
            <p className="text-[#e5e5e5] text-xl max-w-3xl mx-auto px-4">
              Browse through our collection of memorable moments and stunning visuals. 
              Each image tells a unique story captured with passion and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      {showCategories && (
        <section className="py-6 bg-[#121212] border-b border-white/10">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2.5 rounded-full transition-all text-sm ${
                    selectedCategory === category.id
                      ? 'bg-gold text-[#0a0a0a]'
                      : 'bg-[#0a0a0a] text-white border border-[#2a2a2a] hover:border-gold'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      <section className="py-16 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
            {filteredItems.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[#121212] rounded-xl" style={{ height: i % 2 === 0 ? '300px' : '450px' }}></div>
                ))}
              </div>
            ) : (
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
                <Masonry gutter="24px">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="relative cursor-pointer group overflow-hidden rounded-xl border border-white/5 bg-[#121212]"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <div className="overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={getOptimizedUrl(item.image)}
                          alt={item.alt || 'Portfolio Item'}
                          className="w-full h-auto object-cover display-block"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-1">
                            {categories.find((c) => c.id === item.category || c.label.toLowerCase() === item.category?.toLowerCase())?.label || item.category}
                          </p>
                          <h3 className="text-white text-base font-bold tracking-tight">
                            {item.alt || 'View Showcase'}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 select-none"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-slate-400 hover:text-gold transition-colors z-50 p-3 bg-white/5 rounded-full hover:scale-105 duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-white/5 p-4 rounded-full hover:scale-105 duration-200 transition-all z-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              onClick={handlePrev}
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image Container with Title/Category details below */}
            <div className="relative flex flex-col items-center max-w-full max-h-[85vh] md:max-h-[90vh]">
              <motion.img
                key={selectedImageIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={getOptimizedUrl(filteredItems[selectedImageIndex].image)}
                alt={filteredItems[selectedImageIndex].alt || 'Portfolio image'}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl z-40 border border-white/10"
              />
              
              <div className="mt-4 text-center z-40">
                <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                  {categories.find((c) => c.id === filteredItems[selectedImageIndex].category)?.label}
                </span>
                <h3 className="text-white text-lg font-bold mt-1 max-w-xl">
                  {filteredItems[selectedImageIndex].alt || 'Portfolio Showcase'}
                </h3>
              </div>
            </div>

            {/* Right Button */}
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-white/5 p-4 rounded-full hover:scale-105 duration-200 transition-all z-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              onClick={handleNext}
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}