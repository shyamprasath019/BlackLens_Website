import { motion } from 'motion/react';
import { Camera, Heart, Baby, Gift, Briefcase, ShoppingBag, Shirt, Video, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: Camera,
      title: 'Photo Studio',
      description: 'Professional studio setups with state-of-the-art lighting and backdrops for perfect shots every time.',
      features: ['Studio Portraits', 'Family Photos', 'Professional Headshots', 'Creative Concepts'],
      image: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjAyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Heart,
      title: 'Event Photography',
      description: 'Capturing your special celebrations with artistic precision. From weddings to anniversaries, we tell your story.',
      features: ['Weddings', 'Pre-Wedding Shoots', 'Engagement Ceremonies', 'Anniversary Celebrations'],
      image: 'https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Baby,
      title: 'Family & Maternity',
      description: 'Beautiful memories of growing families. Pregnancy shoots, newborn photography, and children portraits.',
      features: ['Maternity Shoots', 'Newborn Photography', 'Baby Milestones', 'Family Portraits'],
      image: 'https://images.unsplash.com/photo-1560880453-98ae92fd499d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByb21hbnRpYyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjAxNjgyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Gift,
      title: 'Birthday & Celebrations',
      description: 'Make every birthday memorable with our creative photography coverage and candid moments.',
      features: ['Birthday Parties', 'Theme Celebrations', 'Candid Moments', 'Decoration Coverage'],
      image: 'https://images.unsplash.com/photo-1764380750858-b85ffa2ef37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBtb21lbnR8ZW58MXx8fHwxNzY2MDg4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: ShoppingBag,
      title: 'Product Photography',
      description: 'Showcase your products with high-quality, professional images perfect for e-commerce and marketing.',
      features: ['E-commerce Photos', 'Catalog Shoots', 'Lifestyle Product Shots', 'Creative Styling'],
      image: 'https://images.unsplash.com/photo-1611930021698-a55ec4d5fe6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NjA0MzI4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Shirt,
      title: 'Fashion Photography',
      description: 'Editorial and commercial fashion shoots that bring style and elegance to life through our lens.',
      features: ['Editorial Shoots', 'Portfolio Building', 'Lookbook Creation', 'Model Photography'],
      image: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY2MDE3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Briefcase,
      title: 'Corporate Headshots',
      description: 'Professional corporate photography for business profiles, LinkedIn, and company websites.',
      features: ['Executive Portraits', 'Team Photos', 'LinkedIn Headshots', 'Company Events'],
      image: 'https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjYwODE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Video,
      title: 'Cinematography & Reels',
      description: 'Cinematic videos, Instagram reels, and social media content that tells your story in motion.',
      features: ['Wedding Films', 'Instagram Reels', 'YouTube Shorts', 'Commercial Videos'],
      image: 'https://images.unsplash.com/photo-1758851088217-df00ca346e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0b2dyYXBoeSUyMGNhbWVyYSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjYwODgxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

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
            <h1 className="text-white mb-8">Our Services</h1>
            <p className="text-[#e5e5e5] text-xl max-w-3xl mx-auto px-4">
              Comprehensive photography and videography services tailored to capture your most precious moments. 
              Serving Chennai and all of Tamil Nadu with premium quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden"
                  >
                    <ImageWithFallback
                      src={service.image}
                      alt={`${service.title} - Black Lens Photography Chennai`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent"></div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg inline-block mb-6">
                    <service.icon className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <h2 className="text-white mb-6">{service.title}</h2>
                  <p className="text-[#e5e5e5] mb-8 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-white mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[#9ca3af]">
                          <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2.5 flex-shrink-0"></div>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('contact')}
                    className="bg-[#d4af37] text-[#0a0a0a] px-8 py-4 rounded-lg hover:bg-[#b8964f] transition-colors inline-flex items-center gap-2"
                  >
                    Enquire Now
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Why Choose Black Lens Photography</h2>
            <p className="text-[#9ca3af] max-w-2xl mx-auto px-4">
              What sets us apart in the photography industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Premium Quality', desc: 'High-end equipment and expert editing' },
              { title: 'Professional Team', desc: 'Experienced photographers and videographers' },
              { title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality' },
              { title: 'Affordable Pricing', desc: 'Competitive packages for every budget' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0a0a0a] p-8 rounded-lg border border-[#2a2a2a] text-center"
              >
                <h4 className="text-white mb-3">{item.title}</h4>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="text-white mb-6">Ready to Get Started?</h2>
            <p className="text-[#9ca3af] mb-10 max-w-2xl mx-auto px-4">
              Contact us today to discuss your photography needs and get a custom quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors"
              >
                Contact Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('packages')}
                className="bg-transparent text-white px-10 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-[#0a0a0a] transition-all"
              >
                View Packages
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}