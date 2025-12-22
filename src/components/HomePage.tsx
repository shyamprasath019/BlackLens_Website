import { motion } from 'motion/react';
import { Camera, Film, Users, Award, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: Camera,
      title: 'Event Photography',
      description: 'Weddings, birthdays, celebrations captured beautifully',
    },
    {
      icon: Film,
      title: 'Cinematography',
      description: 'Cinematic videos and reels for social media',
    },
    {
      icon: Users,
      title: 'Portrait & Fashion',
      description: 'Professional portraits and fashion shoots',
    },
    {
      icon: Award,
      title: 'Commercial Shoots',
      description: 'Product photography and corporate headshots',
    },
  ];

  const testimonials = [
    {
      name: 'Priya & Rahul',
      text: 'Black Lens Photography made our wedding day unforgettable. Every moment was captured with such artistry and emotion.',
      rating: 5,
      service: 'Wedding Photography',
    },
    {
      name: 'Ananya Sharma',
      text: 'The pre-wedding shoot was beyond our expectations. Professional, creative, and so much fun!',
      rating: 5,
      service: 'Pre-Wedding Shoot',
    },
    {
      name: 'Tech Innovations Pvt Ltd',
      text: 'Outstanding product photography that elevated our brand. Highly professional team!',
      rating: 5,
      service: 'Product Photography',
    },
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Events Covered' },
    { number: '8+', label: 'Years Experience' },
    { number: '50K+', label: 'Photos Captured' },
  ];

  return (
    <div className="min-h-screen">
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
            <div className="inline-block mb-6 px-6 py-3 bg-[#d4af37]/20 border border-[#d4af37] rounded-full">
              <span className="text-[#d4af37] text-sm tracking-wider">PREMIUM PHOTOGRAPHY STUDIO</span>
            </div>
            <h1 className="text-white mb-8 max-w-4xl mx-auto px-4">
              Capturing Stories.<br />Creating Timeless Memories.
            </h1>
            <p className="text-[#e5e5e5] text-xl mb-10 max-w-2xl mx-auto px-4">
              Professional photography and videography services across Tamil Nadu. 
              Specializing in weddings, portraits, and cinematic storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors flex items-center justify-center gap-2"
              >
                Book a Shoot
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('portfolio')}
                className="bg-transparent text-white px-10 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-[#0a0a0a] transition-all"
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-[#d4af37] mb-3">{stat.number}</div>
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
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition-all cursor-pointer group"
              >
                <div className="bg-[#d4af37]/10 p-4 rounded-lg inline-block mb-6 group-hover:bg-[#d4af37]/20 transition-colors">
                  <service.icon className="w-7 h-7 text-[#d4af37]" />
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
            <button
              onClick={() => onNavigate('services')}
              className="text-[#d4af37] hover:text-[#b8964f] transition-colors inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </button>
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
            {[
              { src: 'https://images.unsplash.com/photo-1764380750858-b85ffa2ef37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHdlZGRpbmclMjBtb21lbnR8ZW58MXx8fHwxNzY2MDg4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Wedding photography portfolio' },
              { src: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NjAyMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Portrait photography portfolio' },
              { src: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY2MDE3Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Fashion photography portfolio' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative h-80 md:h-96 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => onNavigate('portfolio')}
              >
                <ImageWithFallback
                  src={item.src}
                  alt={item.alt}
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
            <button
              onClick={() => onNavigate('portfolio')}
              className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors"
            >
              Explore Full Portfolio
            </button>
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
            {testimonials.map((testimonial, index) => (
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
                <p className="text-[#e5e5e5] mb-6 italic leading-relaxed">"{testimonial.text}"</p>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors"
              >
                Book Your Shoot
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