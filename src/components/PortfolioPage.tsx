import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { sanityClient, urlFor } from '../lib/sanityClient';
import { Helmet } from 'react-helmet-async';

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showCategories, setShowCategories] = useState(true);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'product', label: 'Product' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'cinematography', label: 'Cinematography' },
  ];

  const [portfolioItems, setPortfolioItems] = useState<
    { id: string | number; category: string; image: any; alt?: string }[]
  >([
    {
      id: 1,
      category: 'weddings',
      image: 'https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Wedding photography Chennai',
    },
    {
      id: 2,
      category: 'weddings',
      image: 'https://images.unsplash.com/photo-1743684821666-05b9c5046937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY291cGxlJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzY2MDg4MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Indian wedding ceremony photography',
    },
    {
      id: 3,
      category: 'weddings',
      image: 'https://images.unsplash.com/photo-1764380750858-b85ffa2ef37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBtb21lbnR8ZW58MXx8fHwxNzY2MDg4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Bride wedding moment',
    },
    {
      id: 4,
      category: 'weddings',
      image: 'https://images.unsplash.com/photo-1662109905341-badae635c375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdhZ2VtZW50JTIwcmluZyUyMGNsb3NlfGVufDF8fHx8MTc2NjA4ODMxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Engagement ring photography',
    },
    {
      id: 5,
      category: 'portraits',
      image: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjAyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Professional portrait photography',
    },
    {
      id: 6,
      category: 'portraits',
      image: 'https://images.unsplash.com/photo-1560880453-98ae92fd499d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByb21hbnRpYyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjAxNjgyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Couple romantic portrait',
    },
    {
      id: 7,
      category: 'portraits',
      image: 'https://images.unsplash.com/photo-1688048703620-4554ea8b7f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjA4ODMxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Newborn baby photography',
    },
    {
      id: 8,
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY2MDE3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Fashion photography studio',
    },
    {
      id: 9,
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1696489283182-0446be970e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU5NzcxOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Woman fashion portrait',
    },
    {
      id: 10,
      category: 'product',
      image: 'https://images.unsplash.com/photo-1611930021698-a55ec4d5fe6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NjA0MzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Product photography minimalist',
    },
    {
      id: 11,
      category: 'product',
      image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHByb2R1Y3R8ZW58MXx8fHwxNzY1OTk0MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Luxury watch product photography',
    },
    {
      id: 12,
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjYwODE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Corporate headshot professional',
    },
    {
      id: 13,
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjAwNzE1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Business professional portrait',
    },
    {
      id: 14,
      category: 'cinematography',
      image: 'https://images.unsplash.com/photo-1758851088217-df00ca346e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0b2dyYXBoeSUyMGNhbWVyYSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjYwODgxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Cinematography camera equipment',
    },
  ]);

  const getOptimizedUrl = (image: any) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    return urlFor(image).auto('format').fit('max').width(800).url();
  };

  useEffect(() => {
    // Fetch categories display toggle
    sanityClient
      .fetch(`*[_type == "siteSettings"][0]{ showPortfolioCategories }`)
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
          category,
          image,
          alt
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          setPortfolioItems(data);
        }
      })
      .catch(console.error);
  }, []);

  const filteredItems =
    !showCategories || selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

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
        <meta property="og:image" content="https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:site_name" content="Black Lens Photography" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blacklensphotography.com/portfolio" />
        <meta property="twitter:title" content="Wedding & Event Photography Portfolio | Black Lens Photography Chennai" />
        <meta property="twitter:description" content="View our portfolio of stunning wedding, portrait, fashion, product, and corporate photography." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080" />

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
                      ? 'bg-[#d4af37] text-[#0a0a0a]'
                      : 'bg-[#0a0a0a] text-white border border-[#2a2a2a] hover:border-[#d4af37]'
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
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
                        {categories.find((c) => c.id === item.category)?.label}
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
              className="absolute top-6 right-6 text-slate-400 hover:text-[#d4af37] transition-colors z-50 p-3 bg-white/5 rounded-full hover:scale-105 duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-white/5 p-4 rounded-full hover:scale-105 duration-200 transition-all z-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
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
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  {categories.find((c) => c.id === filteredItems[selectedImageIndex].category)?.label}
                </span>
                <h3 className="text-white text-lg font-bold mt-1 max-w-xl">
                  {filteredItems[selectedImageIndex].alt || 'Portfolio Showcase'}
                </h3>
              </div>
            </div>

            {/* Right Button */}
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-white/5 p-4 rounded-full hover:scale-105 duration-200 transition-all z-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
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