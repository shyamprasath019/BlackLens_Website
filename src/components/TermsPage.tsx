import { motion } from 'motion/react';
import { Scale, FileCheck, Calendar, ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanityClient';

interface TermsSection {
  title: string;
  content: string;
  items?: string[];
  icon?: string;
}

const getIcon = (name?: string) => {
  if (!name) return FileCheck;
  const n = name.toLowerCase();
  if (n.includes('calendar') || n.includes('booking') || n.includes('schedule')) return Calendar;
  if (n.includes('check') || n.includes('payment') || n.includes('deliverable')) return FileCheck;
  if (n.includes('scale') || n.includes('copyright') || n.includes('license') || n.includes('law')) return Scale;
  if (n.includes('phone') || n.includes('contact') || n.includes('studio')) return Phone;
  return FileCheck;
};

export function TermsPage() {
  const [termsData, setTermsData] = useState<{
    lastUpdated?: string;
    sections?: TermsSection[];
  } | null>(null);

  const [siteSettings, setSiteSettings] = useState<{
    phone?: string;
    email?: string;
    address?: string;
  } | null>(null);

  useEffect(() => {
    // Fetch Terms of Service
    sanityClient
      .fetch(`*[_type == "termsOfService"] | order(_updatedAt desc)[0]{ lastUpdated, sections }`)
      .then(setTermsData)
      .catch(console.error);

    // Fetch Contact settings
    sanityClient
      .fetch(`*[_type == "siteSettings"] | order(_updatedAt desc)[0]{ phone, email, address }`)
      .then(setSiteSettings)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0a0a0a]">
      <Helmet>
        <title>Terms of Service | Black Lens Photography Chennai</title>
        <meta
          name="description"
          content="Terms of Service and booking guidelines for Black Lens Photography studio in Thiruninravur, Chennai."
        />
        <link rel="canonical" href="https://blacklensphotography.com/terms" />
      </Helmet>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold text-sm hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gold/10 p-3 rounded-xl border border-gold/20">
              <Scale className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-[#9ca3af] text-sm">
            Effective Date: {termsData?.lastUpdated || 'August 2026'} • Black Lens Photography, Chennai
          </p>
        </motion.div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1a1a1a] p-8 md:p-12 rounded-2xl border border-[#2a2a2a] text-[#e5e5e5] space-y-8 text-sm md:text-base leading-relaxed"
        >
          {!termsData ? (
            <div className="animate-pulse space-y-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gold/5 h-8 w-8 rounded-lg"></div>
                    <div className="bg-[#2a2a2a] h-7 w-1/3 rounded"></div>
                  </div>
                  <div className="bg-[#2a2a2a] h-4 w-full rounded"></div>
                  <div className="bg-[#2a2a2a] h-4 w-5/6 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            termsData.sections?.map((section, index) => {
              const IconComponent = getIcon(section.icon);
              const isContactSection = section.title.toLowerCase().includes('contact') || section.title.toLowerCase().includes('studio');

              return (
                <section key={index} className="space-y-3">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-gold" />
                    {section.title}
                  </h2>
                  <p className="text-[#9ca3af]">{section.content}</p>
                  {section.items && section.items.length > 0 && (
                    <ul className="list-disc list-inside space-y-1.5 text-[#9ca3af] pl-4">
                      {section.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {isContactSection && siteSettings && (
                    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#2a2a2a] text-sm text-[#9ca3af] mt-4 space-y-1">
                      <p className="text-white font-medium">Black Lens Photography</p>
                      {siteSettings.address && <p>{siteSettings.address}</p>}
                      {siteSettings.email && (
                        <p>
                          Email:{' '}
                          <a href={`mailto:${siteSettings.email}`} className="text-gold hover:underline">
                            {siteSettings.email}
                          </a>
                        </p>
                      )}
                      {siteSettings.phone && <p>Phone: {siteSettings.phone}</p>}
                    </div>
                  )}
                </section>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
}
