import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SiteLayout from './components/SiteLayout';
import BenefitsPage from './pages/BenefitsPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import FeaturesPage from './pages/FeaturesPage';
import HomePage from './pages/HomePage';
import ProcessPage from './pages/ProcessPage';
import ProductPage from './pages/ProductPage';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';

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
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/products/:productSlug" element={<ProductPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
