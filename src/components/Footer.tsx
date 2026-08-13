import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanityClient';
import { Link } from 'react-router-dom';

export function Footer() {
  const [services, setServices] = useState<string[]>([
    'Wedding Photography',
    'Event Photography',
    'Family & Maternity',
    'Birthday & Celebrations',
    'Food & Culinary Photography',
    'Product Photography',
    'Fashion Photography',
    'Corporate Headshots',
    'Cinematography & Reels',
  ]);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const [settings, setSettings] = useState<{
    instagram?: string;
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null>(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "siteSettings"][0]{ phone, email, address, businessHours, instagram, facebook, youtube, whatsapp }`)
      .then(setSettings)
      .catch(console.error);

    sanityClient
      .fetch(`*[_type == "service"] | order(order asc, _createdAt asc){ title }`)
      .then((data) => {
        if (data && data.length > 0) {
          const titles = data.map((s: any) => s.title).filter(Boolean);
          setServices(titles);
        }
      })
      .catch(console.error);
  }, []);

  const phoneNumbers = settings?.phone
    ? settings.phone.split(',').map((p) => p.trim())
    : ['+91 9361177140', '+91 7092221429'];

  const whatsappUrl = settings?.whatsapp
    ? settings.whatsapp.startsWith('http')
      ? settings.whatsapp
      : `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`
    : 'https://wa.me/919361177140';

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-12 md:mt-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <Link to="/" className="flex items-center mb-5">
              <img 
                src="/logo.png" 
                alt="Black Lens Photography" 
                className="h-10 md:h-12 w-auto object-contain" 
              />
            </Link>
            <p className="text-[#9ca3af] text-sm mb-5 leading-relaxed">
              Professional Photography & Videography Services in Chennai and across Tamil Nadu. 
              Capturing stories, creating timeless memories.
            </p>
            <div className="flex items-center gap-3 mb-5">
              <a href={settings?.instagram || "https://www.instagram.com/blacklens_studio_/"} target="_blank" rel="noopener noreferrer" 
                className="bg-[#1a1a1a] p-2.5 rounded-lg text-[#9ca3af] hover:text-gold hover:bg-[#2a2a2a] transition-all"
                aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="bg-[#1a1a1a] p-2.5 rounded-lg text-[#9ca3af] hover:text-gold hover:bg-[#2a2a2a] transition-all"
                aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href={settings?.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer"
                className="bg-[#1a1a1a] p-2.5 rounded-lg text-[#9ca3af] hover:text-gold hover:bg-[#2a2a2a] transition-all"
                aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer"
                  className="bg-[#1a1a1a] p-2.5 rounded-lg text-[#9ca3af] hover:text-gold hover:bg-[#2a2a2a] transition-all"
                  aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-gold hover:text-[#0a0a0a] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-base mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[#9ca3af] text-sm hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (2-Column Layout) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold text-base mb-5">Our Services</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[#9ca3af] text-sm hover:text-gold transition-colors block truncate"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <Link 
              to="/contact" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white font-semibold text-base mb-5 inline-flex items-center gap-2 group hover:text-gold transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                <p className="text-[#9ca3af] text-sm leading-relaxed whitespace-pre-line">
                  {settings?.address || 'No: 23, Gomathi Puram, 1st Main Road, Thiruninravur, Chennai, Tamil Nadu'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  {phoneNumbers.map((phoneNum, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
                      className="text-[#9ca3af] text-sm hover:text-gold transition-colors"
                    >
                      {phoneNum}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`mailto:${settings?.email || "info@blacklensphotography.com"}`} 
                  className="text-[#9ca3af] text-sm hover:text-gold transition-colors truncate">
                  {settings?.email || "info@blacklensphotography.com"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a1a1a] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9ca3af] text-xs text-center md:text-left">
            © {new Date().getFullYear()} Black Lens Photography. All rights reserved.
          </p>
          <p className="text-[#9ca3af] text-xs text-center">
            Crafted by <a href="https://klyph.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors underline decoration-gold/40 underline-offset-4">Klyph Studios</a>
          </p>
          <p className="text-[#9ca3af] text-xs text-center md:text-right">
            Wedding Photographer in Tamil Nadu | Photography Studio in Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}