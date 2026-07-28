import { Camera, Phone, Mail, MapPin, Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanityClient';
import { Link } from 'react-router-dom';

export function Footer() {
  const services = [
    'Event Photography',
    'Pre-Wedding Shoots',
    'Product Photography',
    'Fashion Photography',
    'Corporate Headshots',
    'Cinematography',
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const [settings, setSettings] = useState<{
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null>(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "siteSettings"][0]{ phone, email, address, businessHours, instagram, facebook, whatsapp }`)
      .then(setSettings)
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
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-20">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img 
                src="/logo.png" 
                alt="Black Lens Photography" 
                className="h-12 md:h-14 w-auto object-contain" 
              />
            </Link>
            <p className="text-[#9ca3af] text-sm mb-6 leading-relaxed">
              Professional Photography & Videography Services in Chennai and across Tamil Nadu. 
              Capturing stories, creating timeless memories.
            </p>
            <div className="flex gap-4">
              <a href={settings?.instagram || "https://www.instagram.com/blacklens_studio_/"} target="_blank" rel="noopener noreferrer" 
                className="text-[#9ca3af] hover:text-[#d4af37] transition-colors"
                aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="text-[#9ca3af] hover:text-[#d4af37] transition-colors"
                aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={settings?.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer"
                className="text-[#9ca3af] hover:text-[#d4af37] transition-colors"
                aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[#9ca3af] text-sm hover:text-[#d4af37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-[#9ca3af] text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-1" />
                <p className="text-[#9ca3af] text-sm leading-relaxed whitespace-pre-line">
                  {settings?.address || 'No: 23, Gomathi Puram, 1st Main Road, Thiruninravur, Chennai, Tamil Nadu'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  {phoneNumbers.map((phoneNum, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
                      className="text-[#9ca3af] text-sm hover:text-[#d4af37] transition-colors"
                    >
                      {phoneNum}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <a href={`mailto:${settings?.email || "info@blacklensphotography.com"}`} 
                  className="text-[#9ca3af] text-sm hover:text-[#d4af37] transition-colors">
                  {settings?.email || "info@blacklensphotography.com"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a1a1a] mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9ca3af] text-sm text-center md:text-left">
            © {new Date().getFullYear()} Black Lens Photography. All rights reserved.
          </p>
          <p className="text-[#9ca3af] text-sm text-center md:text-right">
            Wedding Photographer in Tamil Nadu | Photography Studio in Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}