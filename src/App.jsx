import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';

const BenefitsPage = lazy(() => import('./pages/BenefitsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage'));

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.slice(1);
      const scrollToHashTarget = () => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      };

      window.requestAnimationFrame(scrollToHashTarget);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.hash, location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/products/:productSlug" element={<ProductPage />} />
            <Route path="/services/:serviceSlug" element={<ServicePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
