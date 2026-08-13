import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect } from 'react';
import { Studio } from 'sanity';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { sanityClient } from './lib/sanityClient';
import config from './sanity/sanity.config';

// Scroll to Top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Lazy load page components
const HomePage = lazy(() => import('./components/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PortfolioPage = lazy(() => import('./components/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const PackagesPage = lazy(() => import('./components/PackagesPage').then(m => ({ default: m.PackagesPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./components/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Sanity Studio Admin Panel — completely isolated, no site chrome
const AdminPanel = () => (
  <div style={{ height: '100vh', overflow: 'hidden' }}>
    <Studio config={config} />
  </div>
);

// Main site layout — header + outlet + footer
const MainLayout = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <Header />
    <main>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default function App() {
  // Inject CMS primary brand color as CSS variable on every page load
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "siteSettings"][0]{ primaryColor }`)
      .then((data: { primaryColor?: { hex?: string } }) => {
        const hex = data?.primaryColor?.hex;
        if (hex) {
          document.documentElement.style.setProperty('--color-gold', hex);
          document.documentElement.style.setProperty('--color-gold-muted', hex + 'cc');
        }
      })
      .catch(() => {
        // Fallback: keep default gold from index.css
      });
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Sanity Studio — no Header/Footer */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminPanel />
              </Suspense>
            }
          />
          {/* All public site routes — wrapped in MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
