import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'product', label: 'Product' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'cinematography', label: 'Cinematography' },
  ];

  const portfolioItems = [
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
      image: 'https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjYwODE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
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
      <section className="py-6 bg-[#1a1a1a] sticky top-20 z-40 border-b border-[#2a2a2a]">
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

      {/* Portfolio Grid */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
            <Masonry gutter="20px">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => setLightboxImage(item.image)}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="text-sm uppercase tracking-wider text-[#d4af37]">
                        {categories.find((c) => c.id === item.category)?.label}
                      </p>
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
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#d4af37] transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightboxImage}
              alt="Portfolio image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}