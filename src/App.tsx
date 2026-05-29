import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Lazy load page components
const HomePage = lazy(() => import('./components/HomePage').then(module => ({ default: module.HomePage })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(module => ({ default: module.ServicesPage })));
const PortfolioPage = lazy(() => import('./components/PortfolioPage').then(module => ({ default: module.PortfolioPage })));
const PackagesPage = lazy(() => import('./components/PackagesPage').then(module => ({ default: module.PackagesPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

import { Studio } from 'sanity';
import config from './sanity/sanity.config';

const AdminPanel = () => {
  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <Studio config={config} />
    </div>
  );
};

const MainLayout = () => (
  <>
    <Header />
    <main>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0a0a]">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback to 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/admin/*" element={<Suspense fallback={<PageLoader />}><AdminPanel /></Suspense>} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}
