import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { sanityClient } from '../lib/sanityClient';

export function ContactPage() {
  const location = useLocation();
  const [settings, setSettings] = useState<{
    phone?: string;
    email?: string;
    address?: string;
    businessHours?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    mapEmbedUrl?: string;
    locationsCovered?: string[];
  } | null>(null);

  const [serviceTypes, setServiceTypes] = useState<string[]>([
    'Wedding Photography',
    'Pre-Wedding Shoot',
    'Event Photography',
    'Photo Studio',
    'Family & Maternity',
    'Birthday & Celebrations',
    'Food & Culinary Photography',
    'Product Photography',
    'Fashion Photography',
    'Corporate Headshots',
    'Cinematography & Reels',
    'Other',
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });

  useEffect(() => {
    if (location.state?.service) {
      setFormData((prev) => ({ ...prev, serviceType: location.state.service }));
    }
  }, [location.state]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY || '9a094bba-6e46-43be-bc33-4d8c5677d1eb';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    const payload = {
      access_key: web3FormsKey,
      subject: "New Enquiry - Black Lens Photography",
      from_name: formData.name,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.serviceType,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "siteSettings"][0]{ phone, email, address, businessHours, whatsapp, instagram, facebook, mapEmbedUrl, locationsCovered }`)
      .then(setSettings)
      .catch(console.error);

    sanityClient
      .fetch(`*[_type == "service"] | order(order asc, _createdAt asc){ title }`)
      .then((data) => {
        if (data && data.length > 0) {
          const titles = data.map((s: any) => s.title).filter(Boolean);
          const combined = Array.from(new Set([...titles, 'Pre-Wedding Shoot', 'Other']));
          setServiceTypes(combined);
        }
      })
      .catch(console.error);
  }, []);

  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://blacklensphotography.com/contact/#breadcrumb",
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
            "name": "Contact",
            "item": "https://blacklensphotography.com/contact"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>Contact Black Lens Photography Chennai | Book a Photographer in Tamil Nadu</title>
        <meta name="description" content="Book Black Lens Photography Chennai for weddings, events & portraits. Studio in Thirunindravur. Call +91 98765 43210 or WhatsApp for instant quotes." />
        <link rel="canonical" href="https://blacklensphotography.com/contact" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.120547;80.00863" />
        <meta name="ICBM" content="13.120547, 80.00863" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blacklensphotography.com/contact" />
        <meta property="og:title" content="Contact Black Lens Photography Chennai | Book a Photographer" />
        <meta property="og:description" content="Get in touch with Black Lens Photography for bookings, inquiries, and custom packages." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:site_name" content="Black Lens Photography" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blacklensphotography.com/contact" />
        <meta property="twitter:title" content="Contact Black Lens Photography Chennai | Book a Photographer" />
        <meta property="twitter:description" content="Get in touch with Black Lens Photography for bookings, inquiries, and custom packages." />
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
                    <p className="text-[#9ca3af] leading-relaxed whitespace-pre-line">
                      {settings?.address || 'No: 23, Gomathi Puram, 1st Main Road, Thiruninravur, Chennai, Tamil Nadu'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                    <Phone className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-2">Call Us</h4>
                    {(settings?.phone ? settings.phone.split(',') : ['9361177140', '7092221429']).map((pNum, i) => {
                      const cleanNum = pNum.trim();
                      return (
                        <a
                          key={i}
                          href={`tel:${cleanNum.replace(/[^0-9+]/g, '')}`}
                          className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block mb-1"
                        >
                          {cleanNum}
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                    <Mail className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-2">Email Us</h4>
                    <a
                      href={`mailto:${settings?.email || 'info@blacklensphotography.com'}`}
                      className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block mb-1"
                    >
                      {settings?.email || 'info@blacklensphotography.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-2">WhatsApp</h4>
                    <a
                      href={
                        settings?.whatsapp
                          ? settings.whatsapp.startsWith('http')
                            ? settings.whatsapp
                            : `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`
                          : 'https://wa.me/919361177140'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9ca3af] hover:text-[#d4af37] transition-colors block mb-1"
                    >
                      {settings?.whatsapp || '+91 93611 77140'}
                    </a>
                    <p className="text-[#9ca3af] text-sm">Quick response on WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#2a2a2a]">
                <h4 className="text-white mb-6">Business Hours</h4>
                <div className="space-y-3 text-[#9ca3af]">
                  <p className="text-white font-medium">
                    {settings?.businessHours || 'Monday - Saturday: 9:00 AM - 7:00 PM | Sunday: 10:00 AM - 5:00 PM'}
                  </p>
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

                {error && (
                      <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6">
                        {error}
                      </div>
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
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : undefined}
                    whileTap={!loading ? { scale: 0.98 } : undefined}
                    className={`w-full px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors
                      ${loading 
                        ? "bg-[#b8964f] cursor-not-allowed" 
                        : "bg-[#d4af37] hover:bg-[#b8964f]"
                      } text-[#0a0a0a]`}
                  >
                    <Send className="w-5 h-5" />
                    {loading ? "Sending..." : "Send Message"}
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
              src={settings?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62187.43425885893!2d80.00863037910154!3d13.120547500000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261f0b13f9f61%3A0xebde6b4d6c39e47f!2sThirunindravur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1639999999999!5m2!1sen!2sin"}
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
              {(settings?.locationsCovered && settings.locationsCovered.length > 0
                ? settings.locationsCovered
                : [
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
                  ]
              ).map((city) => (
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