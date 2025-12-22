import { motion } from 'motion/react';
import { Camera, Heart, Award, Users, Target, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our heart into every shot, treating each project as our own special moment.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering world-class photography that exceeds expectations.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with clients to bring their vision to life perfectly.',
    },
    {
      icon: Camera,
      title: 'Innovation',
      description: 'Using cutting-edge techniques and equipment for stunning results.',
    },
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Lead Photographer',
      experience: '10+ years',
    },
    {
      name: 'Priya Sharma',
      role: 'Senior Videographer',
      experience: '8+ years',
    },
    {
      name: 'Anand Venkat',
      role: 'Fashion Photographer',
      experience: '6+ years',
    },
    {
      name: 'Divya Reddy',
      role: 'Portrait Specialist',
      experience: '5+ years',
    },
  ];

  const achievements = [
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Events Covered' },
    { number: '8+', label: 'Years Experience' },
    { number: '15+', label: 'Team Members' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758851088217-df00ca346e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0b2dyYXBoeSUyMGNhbWVyYSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjYwODgxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Black Lens Photography team and equipment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white mb-8">About Black Lens Photography</h1>
            <p className="text-[#e5e5e5] text-xl max-w-3xl mx-auto px-4">
              Crafting visual stories with passion, precision, and artistry since 2017
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white mb-8">Our Story</h2>
              <div className="space-y-6 text-[#e5e5e5]">
                <p className="leading-relaxed">
                  Black Lens Photography was born from a simple passion - to capture the raw emotion, 
                  beauty, and authenticity of life's most precious moments. What started as a dream in 
                  2017 has grown into one of Chennai's most trusted photography studios.
                </p>
                <p className="leading-relaxed">
                  Based in Thirunindravur, we've had the privilege of covering over 1000 events across 
                  Tamil Nadu. From intimate family portraits to grand wedding celebrations, each project 
                  receives our unwavering commitment to excellence.
                </p>
                <p className="leading-relaxed">
                  Our team brings together diverse expertise in wedding photography, fashion shoots, 
                  product photography, and cinematography. We believe in pushing creative boundaries 
                  while maintaining the timeless elegance that makes memories last forever.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our photography work showcasing Black Lens style"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-10 rounded-lg border border-[#2a2a2a]"
            >
              <div className="bg-[#d4af37]/10 p-4 rounded-lg inline-block mb-6">
                <Eye className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-white mb-6">Our Vision</h3>
              <p className="text-[#e5e5e5] leading-relaxed">
                To be recognized as Tamil Nadu's premier photography studio, known for transforming 
                ordinary moments into extraordinary visual narratives that stand the test of time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#0a0a0a] p-10 rounded-lg border border-[#2a2a2a]"
            >
              <div className="bg-[#d4af37]/10 p-4 rounded-lg inline-block mb-6">
                <Target className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-white mb-6">Our Mission</h3>
              <p className="text-[#e5e5e5] leading-relaxed">
                To deliver exceptional photography and videography services that capture authentic emotions, 
                exceed client expectations, and create lasting memories through artistic excellence and 
                professional dedication.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Our Core Values</h2>
            <p className="text-[#9ca3af] max-w-2xl mx-auto px-4">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a] text-center hover:border-[#d4af37] transition-all"
              >
                <div className="bg-[#d4af37]/10 p-4 rounded-lg inline-block mb-6">
                  <value.icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h4 className="text-white mb-3">{value.title}</h4>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Our Journey in Numbers</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-[#d4af37] mb-3">{achievement.number}</div>
                <p className="text-[#9ca3af]">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Meet Our Team</h2>
            <p className="text-[#9ca3af] max-w-2xl mx-auto px-4">
              Talented professionals dedicated to capturing your special moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a] text-center hover:border-[#d4af37] transition-all"
              >
                <div className="w-20 h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-10 h-10 text-[#d4af37]" />
                </div>
                <h4 className="text-white mb-2">{member.name}</h4>
                <p className="text-[#d4af37] text-sm mb-2">{member.role}</p>
                <p className="text-[#9ca3af] text-sm">{member.experience}</p>
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: 'Professional Equipment',
                desc: 'State-of-the-art cameras, lenses, and lighting equipment',
              },
              {
                title: 'Experienced Team',
                desc: 'Skilled photographers with years of industry experience',
              },
              {
                title: 'Creative Approach',
                desc: 'Unique perspective and artistic vision for every project',
              },
              {
                title: 'Quick Turnaround',
                desc: 'Fast delivery without compromising on quality',
              },
              {
                title: 'Affordable Pricing',
                desc: 'Competitive packages to suit every budget',
              },
              {
                title: 'Customer Satisfaction',
                desc: 'Dedicated to exceeding client expectations every time',
              },
            ].map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0a0a0a] p-8 rounded-lg border border-[#2a2a2a]"
              >
                <h4 className="text-white mb-3">{reason.title}</h4>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">Let's Create Magic Together</h2>
            <p className="text-[#9ca3af] mb-10 max-w-2xl mx-auto px-4">
              Ready to work with us? Get in touch and let's discuss your photography needs
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('contact')}
              className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors"
            >
              Contact Us Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}