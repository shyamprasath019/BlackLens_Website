import { motion } from 'motion/react';
import { Check, Star, ArrowRight } from 'lucide-react';

interface PackagesPageProps {
  onNavigate: (page: string) => void;
}

export function PackagesPage({ onNavigate }: PackagesPageProps) {
  const packages = [
    {
      name: 'Basic',
      price: '₹15,000',
      duration: 'Starting from',
      description: 'Perfect for small events and intimate gatherings',
      features: [
        '4 hours coverage',
        '200+ edited photos',
        'Online gallery',
        'Basic editing',
        '2 photographers',
        '15-day delivery',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      price: '₹35,000',
      duration: 'Starting from',
      description: 'Most popular choice for weddings and major events',
      features: [
        '8 hours coverage',
        '500+ edited photos',
        'Online gallery + USB',
        'Premium editing',
        '3 photographers + 1 videographer',
        'Cinematic video highlights',
        'Premium album',
        '10-day delivery',
      ],
      popular: true,
    },
    {
      name: 'Luxury',
      price: '₹75,000',
      duration: 'Starting from',
      description: 'Complete coverage with premium deliverables',
      features: [
        'Full day coverage',
        '1000+ edited photos',
        'Online gallery + USB + Cloud',
        'Luxury editing & retouching',
        '4 photographers + 2 videographers',
        'Cinematic wedding film',
        'Same-day edit video',
        'Luxury photobook album',
        'Pre-wedding shoot included',
        'Drone coverage',
        '7-day delivery',
      ],
      popular: false,
    },
  ];

  const additionalServices = [
    { name: 'Pre-Wedding Shoot', price: '₹12,000' },
    { name: 'Maternity Shoot', price: '₹8,000' },
    { name: 'Baby Shoot', price: '₹6,000' },
    { name: 'Birthday Coverage', price: '₹10,000' },
    { name: 'Product Photography (per item)', price: '₹500' },
    { name: 'Corporate Event Coverage', price: '₹20,000' },
    { name: 'Fashion Portfolio', price: '₹15,000' },
    { name: 'Drone Coverage (add-on)', price: '₹8,000' },
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
            <h1 className="text-white mb-8">Packages & Pricing</h1>
            <p className="text-[#e5e5e5] text-xl max-w-3xl mx-auto px-4">
              Choose the perfect package for your needs or request a custom quote. 
              All packages include professional photography and expert editing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative bg-[#1a1a1a] rounded-lg overflow-hidden border-2 ${
                  pkg.popular ? 'border-[#d4af37]' : 'border-[#2a2a2a]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0a0a0a] px-4 py-1.5 text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 inline" />
                    Most Popular
                  </div>
                )}

                <div className="p-10">
                  <h3 className="text-white mb-3">{pkg.name}</h3>
                  <p className="text-[#9ca3af] text-sm mb-6 leading-relaxed">{pkg.description}</p>
                  
                  <div className="mb-8">
                    <div className="text-[#d4af37] mb-2">{pkg.price}</div>
                    <p className="text-[#9ca3af] text-sm">{pkg.duration}</p>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[#e5e5e5]">
                        <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('contact')}
                    className={`w-full py-4 rounded-lg transition-colors ${
                      pkg.popular
                        ? 'bg-[#d4af37] text-[#0a0a0a] hover:bg-[#b8964f]'
                        : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0a0a0a]'
                    }`}
                  >
                    Book This Package
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Additional Services</h2>
            <p className="text-[#9ca3af] max-w-2xl mx-auto px-4">
              Enhance your package with these add-on services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0a0a0a] p-8 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition-all"
              >
                <h4 className="text-white mb-3">{service.name}</h4>
                <p className="text-[#d4af37]">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#d4af37]/10 to-[#b8964f]/10 border border-[#d4af37] rounded-lg p-12 md:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white mb-6">Need a Custom Package?</h2>
              <p className="text-[#e5e5e5] mb-10 max-w-2xl mx-auto px-4 leading-relaxed">
                Every event is unique. Let us create a personalized package that perfectly matches 
                your requirements and budget.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors inline-flex items-center gap-2"
              >
                Request Custom Quote
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Package FAQs</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How do I book a package?',
                a: 'Simply contact us through the contact form or call us directly. We\'ll discuss your requirements and confirm the booking with a 30% advance payment.',
              },
              {
                q: 'Can I customize a package?',
                a: 'Absolutely! All packages are flexible and can be customized based on your specific needs and budget.',
              },
              {
                q: 'What is the payment structure?',
                a: '30% advance to confirm booking, 40% before the event, and 30% upon delivery of final photos/videos.',
              },
              {
                q: 'How long does it take to receive photos?',
                a: 'Delivery times vary by package - Basic: 15 days, Premium: 10 days, Luxury: 7 days. Rush delivery available on request.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0a0a0a] p-8 rounded-lg border border-[#2a2a2a]"
              >
                <h4 className="text-white mb-3">{faq.q}</h4>
                <p className="text-[#9ca3af] leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}