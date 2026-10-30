import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

export default function Navbar({ onBookClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when scrolling past 50px
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -30, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-obsidian/90 backdrop-blur-xl border-b border-border-line/60 shadow-[0_12px_40px_rgba(0,0,0,0.9)] py-3 sm:py-3.5'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT COLUMN: Brand Logo (Only appears when scrolling) */}
        <div className="flex-1 flex items-center justify-start">
          <a 
            href="#" 
            className={`flex items-center gap-3.5 group cursor-pointer transition-all duration-500 ease-out ${
              scrolled 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 -translate-x-6 pointer-events-none'
            }`}
          >
            {/* Official VANDAL Surgical V // Cut Emblem */}
            <div className="w-8 h-8 rounded-sm bg-stone-dark/90 border border-copper/40 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(212,140,70,0.15)] group-hover:border-copper group-hover:shadow-[0_0_20px_rgba(212,140,70,0.35)] transition-all">
              <svg viewBox="0 0 256 256" className="w-full h-full text-copper fill-current" aria-hidden="true">
                <path fillRule="evenodd" d="M 40.24 58 L 84.24 58 L 128 133.79 L 171.76 58 L 215.76 58 L 128 210 Z M 187.76 58 L 199.76 58 L 142.02 158 L 130.02 158 Z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ivory group-hover:text-copper transition-colors">
                VANDAL <span className="text-copper font-sans font-normal">//</span> CLUB
              </span>
            </div>

            <div className="hidden xl:flex flex-col border-l border-border-line/60 pl-3 text-[9px] font-mono leading-tight tracking-[0.2em] text-muted-editorial">
              <span className="font-medium text-ivory/70">BUENOS AIRES</span>
              <span>ESTD. 2026</span>
            </div>
          </a>
        </div>

        {/* CENTER COLUMN: Highly Legible Floating Navigation Links */}
        <nav className="hidden md:flex items-center">
          <div className={`flex items-center gap-7 lg:gap-9 px-6 sm:px-8 py-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-transparent border-transparent'
              : 'bg-obsidian/75 backdrop-blur-md border-border-line/70 shadow-[0_6px_25px_rgba(0,0,0,0.7)]'
          }`}>
            <button 
              onClick={() => scrollToSection('galeria')} 
              className="group relative py-1 text-xs font-mono font-medium tracking-[0.2em] uppercase text-ivory/90 hover:text-copper transition-colors cursor-pointer"
            >
              <span>EL ARCHIVO</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper group-hover:w-full transition-all duration-300"></span>
            </button>

            <button 
              onClick={() => scrollToSection('cotizador')} 
              className="group relative py-1 text-xs font-mono font-medium tracking-[0.2em] uppercase text-ivory/90 hover:text-copper transition-colors cursor-pointer"
            >
              <span>COTIZADOR</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper group-hover:w-full transition-all duration-300"></span>
            </button>

            <button 
              onClick={() => scrollToSection('turnos')} 
              className="group relative py-1 text-xs font-mono font-medium tracking-[0.2em] uppercase text-ivory/90 hover:text-copper transition-colors cursor-pointer"
            >
              <span>TURNOS</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper group-hover:w-full transition-all duration-300"></span>
            </button>

            <button 
              onClick={() => scrollToSection('contacto')} 
              className="group relative py-1 text-xs font-mono font-medium tracking-[0.2em] uppercase text-ivory/90 hover:text-copper transition-colors cursor-pointer"
            >
              <span>CONTACTO</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        </nav>

        {/* RIGHT COLUMN: Mobile Trigger & Layout Balance */}
        <div className="flex-1 flex items-center justify-end">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ivory hover:text-copper transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 top-[60px] bg-obsidian/75 backdrop-blur-sm z-30"
            aria-hidden="true"
          />
          <div className="md:hidden relative z-40 w-full bg-obsidian/95 backdrop-blur-2xl border-b border-border-line px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-editorial pb-3 border-b border-border-line/60">
              <span>{STUDIO_INFO.schedule}</span>
              <span className="text-copper">{STUDIO_INFO.city}</span>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('galeria')}
                className="text-left font-serif text-2xl text-ivory hover:text-copper transition-colors cursor-pointer"
              >
                EL ARCHIVO
              </button>
              <button
                onClick={() => scrollToSection('cotizador')}
                className="text-left font-serif text-2xl text-ivory hover:text-copper transition-colors cursor-pointer"
              >
                COTIZADOR TATTOO
              </button>
              <button
                onClick={() => scrollToSection('turnos')}
                className="text-left font-serif text-2xl text-ivory hover:text-copper transition-colors cursor-pointer"
              >
                AGENDAR TURNO
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="text-left font-serif text-2xl text-ivory hover:text-copper transition-colors cursor-pointer"
              >
                CONTACTO & UBICACIÓN
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('turnos');
              }}
              className="w-full mt-2 py-3.5 rounded-sm bg-copper text-obsidian font-mono font-bold tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2 cursor-pointer shadow-copper-glow hover:bg-copper-glow transition-all"
            >
              <span>RESERVAR TURNO</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </header>
  );
}
