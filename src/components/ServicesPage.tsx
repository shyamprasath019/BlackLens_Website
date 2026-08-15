import { Camera, Heart, Baby, Gift, Briefcase, ShoppingBag, Shirt, Video, ArrowRight, Utensils, Film, Users, Award, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanityClient';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ICON_MAP: Record<string, any> = {
  camera: Camera,
  utensils: Utensils,
  food: Utensils,
  heart: Heart,
  wedding: Heart,
  event: Heart,
  film: Film,
  cine: Film,
  users: Users,
  portrait: Users,
  'shopping-bag': ShoppingBag,
  product: ShoppingBag,
  shirt: Shirt,
  fashion: Shirt,
  briefcase: Briefcase,
  corporate: Briefcase,
  baby: Baby,
  maternity: Baby,
  gift: Gift,
  birthday: Gift,
  award: Award,
  commercial: Award,
  video: Video,
  star: Star,
};

const getServiceIcon = (iconKey?: string, title?: string) => {
  if (iconKey && ICON_MAP[iconKey.toLowerCase()]) {
    return ICON_MAP[iconKey.toLowerCase()];
  }
  if (title) {
    const t = title.toLowerCase();
    if (t.includes('food') || t.includes('culinary') || t.includes('restaurant')) return Utensils;
    if (t.includes('wedding') || t.includes('event')) return Heart;
    if (t.includes('maternity') || t.includes('baby')) return Baby;
    if (t.includes('birthday')) return Gift;
    if (t.includes('product')) return ShoppingBag;
    if (t.includes('commercial')) return Award;
    if (t.includes('fashion')) return Shirt;
    if (t.includes('portrait')) return Users;
    if (t.includes('corporate')) return Briefcase;
    if (t.includes('video') || t.includes('cine') || t.includes('film')) return Film;
  }
  return Camera;
};

export function ServicesPage() {
  const [services, setServices] = useState<
    { icon: any; title: string; description: string; features: string[]; image: any }[]
  >([]);

  const getOptimizedUrl = (image: any) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image.asset) {
      try {
        return urlFor(image).auto('format').quality(80).fit('max').width(1000).url();
      } catch (e) {
        console.error('Error generating Sanity URL:', e);
      }
    }
    return '';
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "service"] | order(order asc, _createdAt asc){
          title,
          description,
          features,
          image,
          icon,
          order
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          const mappedData = data.map((item: any) => {
            const defaultItem = services.find(s => s.title.toLowerCase() === item.title.toLowerCase());
            const Icon = getServiceIcon(item.icon, item.title);
            return {
              ...item,
              icon: Icon,
              image: (item.image && item.image.asset) ? item.image : (defaultItem?.image || '/Photos/client/01.jpg')
            };
          });
          setServices(mappedData);
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
        "@id": "https://blacklensphotography.com/services/#breadcrumb",
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
            "name": "Services",
            "item": "https://blacklensphotography.com/services"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Wedding Photography & Cinematography",
        "provider": {
          "@type": "PhotographyBusiness",
          "name": "Black Lens Photography",
          "url": "https://blacklensphotography.com"
        },
        "areaServed": {
          "@type": "State",
          "name": "Tamil Nadu"
        },
        "description": "Premium cinematic wedding photography and videography coverage across Chennai and Tamil Nadu."
      },
      {
        "@type": "Service",
        "name": "Portrait & Fashion Photography",
        "provider": {
          "@type": "PhotographyBusiness",
          "name": "Black Lens Photography",
          "url": "https://blacklensphotography.com"
        },
        "areaServed": {
          "@type": "State",
          "name": "Tamil Nadu"
        },
        "description": "Professional studio portraits, maternity shoots, model portfolios, and lookbooks."
      },
      {
        "@type": "Service",
        "name": "Product & Commercial Photography",
        "provider": {
          "@type": "PhotographyBusiness",
          "name": "Black Lens Photography",
          "url": "https://blacklensphotography.com"
        },
        "areaServed": {
          "@type": "State",
          "name": "Tamil Nadu"
        },
        "description": "E-commerce product shots, lifestyle shoots, catalog creation, and corporate team headshots."
      }
    ]
  };

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>Photography & Videography Services in Chennai | Black Lens Photography Tamil Nadu</title>
        <meta name="description" content="Professional wedding photography, cinematography, portraits, product shoots & fashion photography in Chennai. Serving Thirunindravur & all Tamil Nadu." />
        <link rel="canonical" href="https://blacklensphotography.com/services" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.120547;80.00863" />
        <meta name="ICBM" content="13.120547, 80.00863" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blacklensphotography.com/services" />
        <meta property="og:title" content="Photography & Videography Services in Chennai | Black Lens Photography" />
        <meta property="og:description" content="Explore our comprehensive photography and videography services including weddings, corporate events, portraits, and more." />
        <meta property="og:image" content="/Photos/weddings/01.jpg" />
        <meta property="og:site_name" content="Black Lens Photography" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blacklensphotography.com/services" />
        <meta property="twitter:title" content="Photography & Videography Services in Chennai | Black Lens Photography" />
        <meta property="twitter:description" content="Explore our comprehensive photography and videography services including weddings, corporate events, portraits, and more." />
        <meta property="twitter:image" content="/Photos/weddings/01.jpg" />

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
            {services.length === 0 ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
                  <div className={`bg-[#121212] h-96 lg:h-[500px] rounded-lg ${i % 2 === 1 ? 'lg:order-2' : ''}`}></div>
                  <div className={`space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="bg-gold/5 h-16 w-16 rounded-lg"></div>
                    <div className="bg-[#121212] h-10 w-2/3 rounded"></div>
                    <div className="bg-[#121212] h-24 w-full rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#121212] h-8 w-full rounded"></div>
                      <div className="bg-[#121212] h-8 w-full rounded"></div>
                      <div className="bg-[#121212] h-8 w-full rounded"></div>
                      <div className="bg-[#121212] h-8 w-full rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              services.map((service, index) => (
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
                        src={getOptimizedUrl(service.image)}
                        fallbackSrc="/Photos/weddings/01.jpg"
                        alt={`${service.title} - Black Lens Photography Chennai`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent"></div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="bg-gold/10 p-4 rounded-lg inline-block mb-6">
                      <service.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h2 className="text-white mb-6">{service.title}</h2>
                    <p className="text-[#9ca3af] text-lg mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mb-8">
                      <h4 className="text-white mb-4">What's Included:</h4>
                      <ul className="space-y-3">
                        {service.features && service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-[#9ca3af]">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2.5 flex-shrink-0"></div>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  <Link
                    to="/contact"
                    state={{ service: service.title }}
                    className="bg-gold text-[#0a0a0a] px-8 py-4 rounded-lg hover:bg-goldMuted transition-colors inline-flex items-center gap-2 font-medium"
                  >
                    Enquire Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            )))}
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
              <Link
                to="/contact"
                className="bg-gold text-[#0a0a0a] px-10 py-4 rounded-lg hover:bg-goldMuted transition-colors font-medium text-center"
              >
                Contact Us
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