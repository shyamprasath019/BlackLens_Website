import { motion } from 'motion/react';
import { Camera, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <Helmet>
        <title>Page Not Found | Black Lens Photography Chennai</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://blacklensphotography.com/404" />
      </Helmet>

      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b8964f]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-lg"
      >
        <div className="bg-[#d4af37]/10 p-6 rounded-full inline-block mb-8 border border-[#d4af37]/20">
          <Camera className="w-16 h-16 text-[#d4af37]" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">Capture Missed!</h2>
        
        <p className="text-[#9ca3af] text-lg mb-10 leading-relaxed">
          The moment you are looking for has faded. Either the page has been moved, deleted, or the URL is incorrect. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-[#d4af37] text-[#0a0a0a] px-8 py-4 rounded-lg hover:bg-[#b8964f] transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-[#d4af37]/10"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/portfolio"
            className="bg-transparent text-white px-8 py-4 rounded-lg border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all font-medium text-center"
          >
            Explore Portfolio
          </Link>
        </div>
      </motion.div>

      {/* Subtle brand footer */}
      <div className="absolute bottom-8 text-center text-[#9ca3af]/40 text-xs tracking-widest uppercase">
        Black Lens Photography Chennai
      </div>
    </div>
  );
}
