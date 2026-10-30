import { useState, useEffect } from 'react';
import SmoothScroll from './components/core/SmoothScroll';
import CustomCursor from './components/core/CustomCursor';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import ArchiveGallery from './components/archive/ArchiveGallery';
import TattooCalculator from './components/calculator/TattooCalculator';
import BookingSection from './components/booking/BookingSection';
import Footer from './components/layout/Footer';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [currentHash, setCurrentHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const [preselectedService, setPreselectedService] = useState(null);
  const [preselectedQuote, setPreselectedQuote] = useState(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setCurrentHash('');
    window.scrollTo(0, 0);
  };

  const is404 =
    currentHash.includes('404') ||
    (currentPath !== '/' &&
     currentPath !== '' &&
     currentPath !== '/index.html');

  const scrollToTarget = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -30, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = (service = null) => {
    if (service) setPreselectedService(service);
    scrollToTarget('turnos');
  };

  const scrollToCalculator = () => {
    scrollToTarget('cotizador');
  };

  const handleApplyQuote = (quoteData) => {
    setPreselectedQuote(quoteData);
    scrollToTarget('turnos');
  };

  // 404 Not Found Page Route
  if (is404) {
    return (
      <div className="min-h-screen bg-obsidian text-ivory">
        <CustomCursor />
        <NotFoundPage onNavigateHome={() => navigateTo('/')} />
      </div>
    );
  }

  return (
    <SmoothScroll>
      {/* 3% Film Grain Analog Noise Overlay */}
      <div className="film-grain" aria-hidden="true"></div>

      {/* GSAP Magnetic Custom Cursor with Gallery Expansion */}
      <CustomCursor />

      {/* Main Experience */}
      <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-copper selection:text-obsidian">
        <Navbar onBookClick={() => scrollToBooking()} />

        <main>
          {/* 1. Hero Section with Mask Reveal & Parallax Ripped Paper Collage */}
          <HeroSection
            onBookClick={() => scrollToBooking()}
          />

          {/* 2. The Archive // Arte Gallery with Colossal Marquee & Image Reveal */}
          <ArchiveGallery
            onSelectService={(item) => scrollToBooking(item)}
          />

          {/* 3. Interactive Real-time Tattoo Calculator */}
          <TattooCalculator
            onApplyQuote={handleApplyQuote}
          />

          {/* 4. Architectural 3-Column Booking System with Luxury Die-Cut Ticket */}
          <BookingSection
            preselectedService={preselectedService}
            preselectedQuote={preselectedQuote}
          />
        </main>

        <Footer onTrigger404={() => navigateTo('/404')} />
      </div>
    </SmoothScroll>
  );
}

export default App;
