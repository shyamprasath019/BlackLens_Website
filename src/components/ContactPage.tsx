import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
    }, 3000);
  };

  const serviceTypes = [
    'Wedding Photography',
    'Pre-Wedding Shoot',
    'Event Photography',
    'Portrait Photography',
    'Fashion Photography',
    'Product Photography',
    'Corporate Headshots',
    'Cinematography',
    'Other',
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
            <h1 className="text-white mb-8">Get in Touch</h1>
            <p className="text-[#e5e5e5] text-xl max-w-3xl mx-auto px-4">
              Ready to capture your special moments? Contact us today and let's create something beautiful together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white mb-10">Contact Information</h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-2">Our Location</h4>
                    <p className="text-[#9ca3af] leading-relaxed">
                      Black Lens Photography Studio<br />
                      Thirunindravur, Chennai<br />
                      Tamil Nadu - 602024, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                    <Phone className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-2">Call Us</h4>
                    <a href="tel:+919876543210" className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block mb-1">
                      +91 98765 43210
                    </a>
                    <a href="tel:+919123456780" className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block">
                      +91 91234 56780
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                    <Mail className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-2">Email Us</h4>
                    <a href="mailto:info@blacklensphotography.com" 
                      className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block mb-1">
                      info@blacklensphotography.com
                    </a>
                    <a href="mailto:bookings@blacklensphotography.com" 
                      className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block">
                      bookings@blacklensphotography.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-2">WhatsApp</h4>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                      className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block mb-1">
                      +91 98765 43210
                    </a>
                    <p className="text-[#9ca3af] text-sm">Quick response on WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a]">
                <h4 className="text-white mb-6">Business Hours</h4>
                <div className="space-y-3 text-[#9ca3af]">
                  <div className="flex justify-between items-center">
                    <span>Monday - Saturday</span>
                    <span className="text-white">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sunday</span>
                    <span className="text-white">10:00 AM - 5:00 PM</span>
                  </div>
                  <p className="text-sm mt-6 text-[#d4af37]">
                    * Available 24/7 for event coverage bookings
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#1a1a1a] p-10 rounded-lg border border-[#2a2a2a]">
                <h3 className="text-white mb-8">Send us a Message</h3>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#d4af37]/20 border border-[#d4af37] text-white p-4 rounded-lg mb-8"
                  >
                    Thank you! We'll get back to you within 24 hours.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-5 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-white mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-5 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-white mb-3">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-5 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-white mb-3">
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-5 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-5 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                      placeholder="Tell us about your photography needs..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#d4af37] text-[#0a0a0a] px-6 py-4 rounded-lg hover:bg-[#b8964f] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-6">Find Us</h2>
            <p className="text-[#9ca3af] px-4">Visit our studio in Thirunindravur, Chennai</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden border border-[#2a2a2a] h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62187.43425885893!2d80.00863037910154!3d13.120547500000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261f0b13f9f61%3A0xebde6b4d6c39e47f!2sThirunindravur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1639999999999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Black Lens Photography Location"
            />
          </motion.div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white mb-6">We Cover All of Tamil Nadu</h3>
            <p className="text-[#9ca3af] mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
              Based in Chennai, we travel across Tamil Nadu for weddings, events, and photo shoots. 
              Major cities we frequently cover:
            </p>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                'Chennai',
                'Coimbatore',
                'Madurai',
                'Trichy',
                'Salem',
                'Tirunelveli',
                'Erode',
                'Vellore',
                'Thoothukudi',
                'Thanjavur',
                'Kanchipuram',
                'Pondicherry',
              ].map((city) => (
                <span key={city} className="bg-[#1a1a1a] text-[#e5e5e5] px-6 py-3 rounded-full border border-[#2a2a2a]">
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}