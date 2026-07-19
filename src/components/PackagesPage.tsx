import { Check, Star, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanityClient';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function PackagesPage() {
  const [packages, setPackages] = useState<
    { name: string; price: string; description: string; features: string[]; popular: boolean; duration?: string }[]
  >([
    {
      name: 'Basic',
      price: '₹15,000',
      duration: 'Starting from',
      description: 'Perfect for small events and intimate gatherings',
      features: ['4 hours coverage', '200+ edited photos', 'Online gallery', 'Basic editing', '2 photographers', '15-day delivery'],
      popular: false,
    },
    {
      name: 'Premium',
      price: '₹35,000',
      duration: 'Starting from',
      description: 'Most popular choice for weddings and major events',
      features: ['8 hours coverage', '500+ edited photos', 'Online gallery + USB', 'Premium editing', '3 photographers + 1 videographer', 'Cinematic video highlights', 'Premium album', '10-day delivery'],
      popular: true,
    },
    {
      name: 'Luxury',
      price: '₹75,000',
      duration: 'Starting from',
      description: 'Complete coverage with premium deliverables',
      features: ['Full day coverage', '1000+ edited photos', 'Online gallery + USB + Cloud', 'Luxury editing & retouching', '4 photographers + 2 videographers', 'Cinematic wedding film', 'Same-day edit video', 'Luxury photobook album', 'Pre-wedding shoot included', 'Drone coverage', '7-day delivery'],
      popular: false,
    },
  ]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "package"] | order(price asc) {
          name,
          price,
          description,
          features,
          popular,
          "duration": "Starting from"
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          setPackages(data);
        }
      })
      .catch(console.error);
  }, []);

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

  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://blacklensphotography.com/packages/#breadcrumb",
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
            "name": "Packages",
            "item": "https://blacklensphotography.com/packages"
          }
        ]
      },
      {
        "@type": "Product",
        "@id": "https://blacklensphotography.com/packages/#photography-packages",
        "name": "Black Lens Photography Packages",
        "image": "https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA",
        "description": "Professional photography and videography packages in Chennai for weddings, events, portraits, and fashion shoots.",
        "brand": {
          "@type": "Brand",
          "name": "Black Lens Photography"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "15000",
          "highPrice": "75000",
          "offerCount": packages.length.toString(),
          "offers": packages.map((pkg) => ({
            "@type": "Offer",
            "name": `${pkg.name} Package`,
            "price": pkg.price.replace(/[^\d]/g, ''),
            "priceCurrency": "INR",
            "url": "https://blacklensphotography.com/packages",
            "eligibleRegion": "IN",
            "availability": "https://schema.org/InStock"
          }))
        }
      },

      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I book a package?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply contact us through the contact form or call us directly. We'll discuss your requirements and confirm the booking with a 30% advance payment."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize a package?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! All packages are flexible and can be customized based on your specific needs and budget."
            }
          },
          {
            "@type": "Question",
            "name": "What is the payment structure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "30% advance to confirm booking, 40% before the event, and 30% upon delivery of final photos/videos."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to receive photos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Delivery times vary by package - Basic: 15 days, Premium: 10 days, Luxury: 7 days. Rush delivery available on request."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>Photography Packages & Pricing in Chennai | Black Lens Photography Tamil Nadu</title>
        <meta name="description" content="Affordable photography packages starting ₹15,000. Wedding, event & portrait photography packages in Chennai. Custom quotes available. Call now!" />
        <link rel="canonical" href="https://blacklensphotography.com/packages" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.120547;80.00863" />
        <meta name="ICBM" content="13.120547, 80.00863" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blacklensphotography.com/packages" />
        <meta property="og:title" content="Photography Packages & Pricing in Chennai | Black Lens Photography" />
        <meta property="og:description" content="View our photography and videography packages. We offer custom packages for weddings, events, and portraits." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1697335638916-ecddb1af171f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY2MDE0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:site_name" content="Black Lens Photography" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blacklensphotography.com/packages" />
        <meta property="twitter:title" content="Photography Packages & Pricing in Chennai | Black Lens Photography" />
        <meta property="twitter:description" content="View our photography and videography packages. We offer custom packages for weddings, events, and portraits." />
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

                  <Link
                    to="/contact"
                    className={`block text-center w-full py-4 rounded-lg transition-colors font-medium ${
                      pkg.popular
                        ? 'bg-[#d4af37] text-[#0a0a0a] hover:bg-[#b8964f]'
                        : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0a0a0a]'
                    }`}
                  >
                    Book This Package
                  </Link>
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
              <Link
                to="/contact"
                className="bg-[#d4af37] text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-[#b8964f] transition-colors inline-flex items-center gap-2 font-medium"
              >
                Request Custom Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
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