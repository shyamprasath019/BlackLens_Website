import { motion } from 'motion/react';
import { ShieldCheck, Lock, FileText, ArrowLeft, Shield, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanityClient';

interface PolicySection {
  title: string;
  content: string;
  items?: string[];
  icon?: string;
}

const getIcon = (name?: string) => {
  if (!name) return FileText;
  const n = name.toLowerCase();
  if (n.includes('lock')) return Lock;
  if (n.includes('shield') || n.includes('rights')) return Shield;
  if (n.includes('text') || n.includes('document') || n.includes('use')) return FileText;
  if (n.includes('phone') || n.includes('contact')) return Phone;
  return FileText;
};

export function PrivacyPolicyPage() {
  const [policyData, setPolicyData] = useState<{
    lastUpdated?: string;
    sections?: PolicySection[];
  } | null>(null);

  const [siteSettings, setSiteSettings] = useState<{
    phone?: string;
    email?: string;
    address?: string;
  } | null>(null);

  useEffect(() => {
    // Fetch Privacy Policy
    sanityClient
      .fetch(`*[_type == "privacyPolicy"] | order(_updatedAt desc)[0]{ lastUpdated, sections }`)
      .then(setPolicyData)
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
        <title>Privacy Policy | Black Lens Photography Chennai</title>
        <meta
          name="description"
          content="Privacy Policy for Black Lens Photography. Learn how we handle your personal data, shoot inquiries, and photographic media with care and confidentiality."
        />
        <link rel="canonical" href="https://blacklensphotography.com/privacy-policy" />
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
              <ShieldCheck className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-[#9ca3af] text-sm">
            Last Updated: {policyData?.lastUpdated || 'August 2026'} • Black Lens Photography, Thiruninravur, Chennai
          </p>
        </motion.div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1a1a1a] p-8 md:p-12 rounded-2xl border border-[#2a2a2a] text-[#e5e5e5] space-y-8 text-sm md:text-base leading-relaxed"
        >
          {!policyData ? (
            <div className="animate-pulse space-y-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gold/5 h-8 w-8 rounded-lg"></div>
                    <div className="bg-[#2a2a2a] h-7 w-1/3 rounded"></div>
                  </div>
                  <div className="bg-[#2a2a2a] h-4 w-full rounded"></div>
                  <div className="bg-[#2a2a2a] h-4 w-5/6 rounded"></div>
                  <div className="space-y-2 pl-4">
                    <div className="bg-[#2a2a2a] h-4 w-1/2 rounded"></div>
                    <div className="bg-[#2a2a2a] h-4 w-2/3 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            policyData.sections?.map((section, index) => {
              const IconComponent = getIcon(section.icon);
              const isContactSection = section.title.toLowerCase().includes('contact');

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
                      <p className="text-white font-medium">Black Lens Photography Studio</p>
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
