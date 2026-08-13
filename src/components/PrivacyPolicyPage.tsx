import { motion } from 'motion/react';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function PrivacyPolicyPage() {
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
            Last Updated: August 2026 • Black Lens Photography, Thiruninravur, Chennai
          </p>
        </motion.div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1a1a1a] p-8 md:p-12 rounded-2xl border border-[#2a2a2a] text-[#e5e5e5] space-y-8 text-sm md:text-base leading-relaxed"
        >
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              1. Information We Collect
            </h2>
            <p className="text-[#9ca3af]">
              At Black Lens Photography, we respect your personal privacy. When you interact with our website, inquire about our photography packages, or book a shoot, we may collect the following details:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[#9ca3af] pl-4">
              <li>Full Name and Contact details (Phone number, Email address)</li>
              <li>Event location, shoot dates, and package preferences</li>
              <li>Inquiry form messages and WhatsApp correspondence</li>
              <li>Website usage analytics (IP address, browser type, page visit duration)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              2. How We Use Your Information
            </h2>
            <p className="text-[#9ca3af]">
              The information collected is strictly used to fulfill your service requests and deliver exceptional photography experiences:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[#9ca3af] pl-4">
              <li>Communicating shoot schedules, quotes, and contract terms</li>
              <li>Delivering digital galleries, photo previews, and custom albums</li>
              <li>Improving website performance and service offerings</li>
              <li>Sending occasional studio updates with your prior consent</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Image Rights & Portfolio Usage</h2>
            <p className="text-[#9ca3af]">
              As a professional photography studio, we celebrate our clients&apos; stories through our portfolio, website, and social media channels (e.g., Instagram, Facebook). If you prefer your private event or portrait photos to remain undisclosed from public marketing channels, please notify us in writing prior to your shoot date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Data Security</h2>
            <p className="text-[#9ca3af]">
              We implement industry-standard encryption and secure digital storage protocols to protect your personal details and high-resolution photo archives from unauthorized access or disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Third-Party Services</h2>
            <p className="text-[#9ca3af]">
              We do not sell, rent, or trade your personal information to third parties. Third-party cloud storage and gallery hosting platforms used for delivering high-res photos adhere to strict data privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Contact Us</h2>
            <p className="text-[#9ca3af]">
              If you have any questions regarding this Privacy Policy or wish to update your data preferences, please contact our studio team:
            </p>
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#2a2a2a] text-sm text-[#9ca3af]">
              <p className="text-white font-medium">Black Lens Photography Studio</p>
              <p>No: 23, Gomathi Puram, 1st Main Road, Thiruninravur, Chennai, Tamil Nadu</p>
              <p>Email: <a href="mailto:info@blacklensphotography.com" className="text-gold hover:underline">info@blacklensphotography.com</a></p>
              <p>Phone: +91 9361177140 / +91 7092221429</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
