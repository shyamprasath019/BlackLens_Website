import { motion } from 'motion/react';
import { Camera, Film, Users, Award, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanityClient';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const navigate = useNavigate();
  const [homeContent, setHomeContent] = useState<{
    heroTitle: string;
    heroSubtitle: string;
    heroCTA: string;
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
  >([
    { icon: Camera, title: 'Event Photography', description: 'Weddings, birthdays, celebrations captured beautifully' },
    { icon: Film, title: 'Cinematography', description: 'Cinematic videos and reels for social media' },
    { icon: Users, title: 'Portrait & Fashion', description: 'Professional portraits and fashion shoots' },
    { icon: Award, title: 'Commercial Shoots', description: 'Product photography and corporate headshots' },
  ]);

  const [statsData, setStatsData] = useState<{ label: string; value: string }[]>([
    { value: '500+', label: 'Happy Clients' },
    { value: '1000+', label: 'Events Covered' },
    { value: '8+', label: 'Years Experience' },
    { value: '50K+', label: 'Photos Captured' },
  ]);

  const [featuredPortfolio, setFeaturedPortfolio] = useState<{ imageUrl?: string; image?: any; alt?: string }[]>([
    { imageUrl: 'https://images.unsplash.com/photo-1764380750858-b85ffa2ef37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBtb21lbnR8ZW58MXx8fHwxNzY2MDg4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Wedding photography portfolio' },
    { imageUrl: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjAyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Portrait photography portfolio' },
    { imageUrl: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY2MDE3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Fashion photography portfolio' },
  ]);

  const [testimonialsData, setTestimonialsData] = useState<
    { name: string; quote: string; rating: number; service: string }[]
  >([
    { name: 'Priya & Rahul', quote: 'Black Lens Photography made our wedding day unforgettable. Every moment was captured with such artistry and emotion.', rating: 5, service: 'Wedding Photography' },
    { name: 'Ananya Sharma', quote: 'The pre-wedding shoot was beyond our expectations. Professional, creative, and so much fun!', rating: 5, service: 'Pre-Wedding Shoot' },
    { name: 'Tech Innovations Pvt Ltd', quote: 'Outstanding product photography that elevated our brand. Highly professional team!', rating: 5, service: 'Product Photography' },
  ]);

  const getOptimizedUrl = (item: any, width: number = 800) => {
    if (item.image) return urlFor(item.image).auto('format').fit('max').width(width).url();
    if (item.imageUrl) return item.imageUrl;
    return '';
  };

  useEffect(() => {
    // Fetch Home Page Settings
    sanityClient
      .fetch(`*[_type == "homePage"][0]{ heroTitle, heroSubtitle, heroCTA }`)
      .then(data => { if (data) setHomeContent(data); })
      .catch(console.error);

    // Fetch Services
    sanityClient
      .fetch(`*[_type == "service"]{ title, description, image, features }`)
      .then(data => { if (data && data.length > 0) setServicesData(data); })
      .catch(console.error);

    // Fetch Stats
    sanityClient
      .fetch(`*[_type == "stat"] | order(order asc) { label, "value": value }`)
      .then(data => { if (data && data.length > 0) setStatsData(data); })
      .catch(console.error);

    // Fetch Featured Portfolio
    sanityClient
      .fetch(`*[_type == "portfolioItem" && featured == true][0...6]{ image, alt }`)
      .then(data => { if (data && data.length > 0) setFeaturedPortfolio(data); })
      .catch(console.error);

    // Fetch Testimonials
    sanityClient
      .fetch(`*[_type == "testimonial"][0...3]{ name, quote, rating, service }`)
      .then(data => { if (data && data.length > 0) setTestimonialsData(data); })
      .catch(console.error);
  }, []);


  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Black Lens Photography | Professional Photographer in Chennai & Tamil Nadu</title>
        <meta name="description" content="Capturing stories and creating timeless memories. Professional photography and videography services across Tamil Nadu specializing in weddings, portraits, and cinematic storytelling." />
        <meta property="og:title" content="Black Lens Photography | Capturing Stories" />
        <meta property="og:description" content="Professional photography and videography services across Tamil Nadu." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Cinematic wedding photography by Black Lens Photography Chennai"
            className="w-full h-full object-cover"
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
                className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors flex items-center justify-center gap-2 font-medium"
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
      <section className="bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {(statsData.length > 0
              ? statsData
              : [
                  { value: '500+', label: 'Happy Clients' },
                  { value: '1000+', label: 'Events Covered' },
                  { value: '8+', label: 'Years Experience' },
                  { value: '50K+', label: 'Photos Captured' },
                ]
            ).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-[#d4af37] mb-3 text-4xl font-bold">{stat.value}</div>
                <p className="text-[#9ca3af]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Our Services</h2>
            <p className="text-[#9ca3af] max-w-2xl mx-auto px-4">
              From weddings to corporate events, we offer comprehensive photography and videography services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(servicesData.length > 0
              ? servicesData
              : [
                  { icon: Camera, title: 'Event Photography', description: 'Weddings, birthdays, celebrations captured beautifully' },
                  { icon: Film, title: 'Cinematography', description: 'Cinematic videos and reels for social media' },
                  { icon: Users, title: 'Portrait & Fashion', description: 'Professional portraits and fashion shoots' },
                  { icon: Award, title: 'Commercial Shoots', description: 'Product photography and corporate headshots' },
                ]
            ).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate('/services')}
                className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition-all cursor-pointer group"
              >
                <div className="bg-[#d4af37]/10 p-4 rounded-lg inline-block mb-6 group-hover:bg-[#d4af37]/20 transition-colors">
                  {service.icon ? (
                    <service.icon className="w-7 h-7 text-[#d4af37]" />
                  ) : (
                    <Camera className="w-7 h-7 text-[#d4af37]" />
                  )}
                </div>
                <h3 className="text-white mb-3">{service.title}</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/services"
              className="text-[#d4af37] hover:text-[#b8964f] transition-colors inline-flex items-center gap-2 font-medium"
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
            {(featuredPortfolio.length > 0
              ? featuredPortfolio
              : [
                  { imageUrl: 'https://images.unsplash.com/photo-1764380750858-b85ffa2ef37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBtb21lbnR8ZW58MXx8fHwxNzY2MDg4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Wedding photography portfolio' },
                  { imageUrl: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjAyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Portrait photography portfolio' },
                  { imageUrl: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY2MDE3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Fashion photography portfolio' },
                ]
            ).map((item, index) => (
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
                  alt={item.alt || 'Black Lens Photography Portfolio'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/portfolio"
              className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors font-medium"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(testimonialsData.length > 0
              ? testimonialsData
              : [
                  { name: 'Priya & Rahul', quote: 'Black Lens Photography made our wedding day unforgettable. Every moment was captured with such artistry and emotion.', rating: 5, service: 'Wedding Photography' },
                  { name: 'Ananya Sharma', quote: 'The pre-wedding shoot was beyond our expectations. Professional, creative, and so much fun!', rating: 5, service: 'Pre-Wedding Shoot' },
                  { name: 'Tech Innovations Pvt Ltd', quote: 'Outstanding product photography that elevated our brand. Highly professional team!', rating: 5, service: 'Product Photography' },
                ]
            ).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0a0a0a] p-8 rounded-lg border border-[#2a2a2a]"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <p className="text-[#e5e5e5] mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white mb-1">{testimonial.name}</p>
                  <p className="text-[#9ca3af] text-sm">{testimonial.service}</p>
                </div>
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
            <h2 className="text-white mb-6">Ready to Create Magic Together?</h2>
            <p className="text-[#9ca3af] mb-10 max-w-2xl mx-auto px-4">
              Let's capture your special moments with the artistry they deserve. 
              Book your session today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/contact"
                className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors font-medium text-center"
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