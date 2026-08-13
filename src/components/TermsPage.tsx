import { motion } from 'motion/react';
import { Scale, FileCheck, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function TermsPage() {
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
            className="inline-flex items-center gap-2 text-[#d4af37] text-sm hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#d4af37]/10 p-3 rounded-xl border border-[#d4af37]/20">
              <Scale className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-[#9ca3af] text-sm">
            Effective Date: August 2026 • Black Lens Photography, Chennai
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
              <Calendar className="w-5 h-5 text-[#d4af37]" />
              1. Shoot Bookings & Advance Payment
            </h2>
            <p className="text-[#9ca3af]">
              To reserve shoot dates for weddings, events, or studio sessions, an advance booking deposit is required. Bookings are confirmed only upon receipt of the deposit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#d4af37]" />
              2. Payment Schedule & Deliverables
            </h2>
            <p className="text-[#9ca3af]">
              Final balance payments must be cleared upon raw photo selection or prior to final album print delivery. Digital galleries and photobooks are handed over strictly after complete payment settlement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Rescheduling & Cancellation Policy</h2>
            <p className="text-[#9ca3af]">
              Event date changes must be requested at least 14 days in advance, subject to studio availability. Advance deposits are non-refundable in the case of client cancellations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Copyright & License Rights</h2>
            <p className="text-[#9ca3af]">
              Black Lens Photography retains full artistic copyright over all photographs and video footage created. Clients receive a personal, non-commercial reproduction license for personal sharing and printing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Studio Contact</h2>
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#2a2a2a] text-sm text-[#9ca3af]">
              <p className="text-white font-medium">Black Lens Photography</p>
              <p>Thiruninravur, Chennai, Tamil Nadu</p>
              <p>Email: info@blacklensphotography.com</p>
              <p>Phone: +91 9361177140</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
