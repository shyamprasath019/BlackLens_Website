import { Camera, Phone, Mail, MapPin, Instagram, Youtube, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const services = [
    'Event Photography',
    'Pre-Wedding Shoots',
    'Product Photography',
    'Fashion Photography',
    'Corporate Headshots',
    'Cinematography',
  ];

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Packages', id: 'packages' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-20">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#d4af37] p-2 rounded-lg">
                <Camera className="w-6 h-6 text-[#0a0a0a]" />
              </div>
              <div>
                <div className="text-white tracking-tight leading-tight">Black Lens</div>
                <div className="text-[#d4af37] text-xs tracking-wider">PHOTOGRAPHY</div>
              </div>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6 leading-relaxed">
              Professional Photography & Videography Services in Chennai and across Tamil Nadu. 
              Capturing stories, creating timeless memories.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-[#9ca3af] hover:text-[#d4af37] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="text-[#9ca3af] hover:text-[#d4af37] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="text-[#9ca3af] hover:text-[#d4af37] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#9ca3af] text-sm hover:text-[#d4af37] transition-colors"
                  >
                    {link.name}
                  </button>
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
                <p className="text-[#9ca3af] text-sm leading-relaxed">
                  Thirunindravur, Chennai,<br />Tamil Nadu, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d4af37]" />
                <a href="tel:+919876543210" className="text-[#9ca3af] text-sm hover:text-[#d4af37] transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d4af37]" />
                <a href="mailto:info@blacklensphotography.com" 
                  className="text-[#9ca3af] text-sm hover:text-[#d4af37] transition-colors">
                  info@blacklens.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a1a1a] mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9ca3af] text-sm text-center md:text-left">
            © 2025 Black Lens Photography. All rights reserved.
          </p>
          <p className="text-[#9ca3af] text-sm text-center md:text-right">
            Wedding Photographer in Tamil Nadu | Photography Studio in Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}