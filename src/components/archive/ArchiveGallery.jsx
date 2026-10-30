import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARCHIVE_ITEMS } from '../../data/studioData';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ArchiveGallery({ onSelectService }) {
  const sectionRef = useRef(null);
  const marqueeTextRef = useRef(null);
  const colRightRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('todos');

  const filteredItems = ARCHIVE_ITEMS.filter((item) => {
    if (activeFilter === 'todos') return true;
    return item.category === activeFilter;
  });

  // Separate into 2 columns for asymmetric staggered layout
  const colLeftItems = filteredItems.filter((_, idx) => idx % 2 === 0);
  const colRightItems = filteredItems.filter((_, idx) => idx % 2 === 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Colossal background text floating and moving with parallax
      if (marqueeTextRef.current) {
        gsap.to(marqueeTextRef.current, {
          xPercent: -18,
          y: 200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Parallax offset for the right column on desktop (creates the broken grid flow)
      if (colRightRef.current && window.innerWidth >= 1024) {
        gsap.fromTo(
          colRightRef.current,
          { y: 0 },
          {
            y: -140,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // 3. Velocity Inertia & Scrub Parallax on each card (driven by Lenis smooth scroll)
      const cards = sectionRef.current.querySelectorAll('.archive-card');
      cards.forEach((card, i) => {
        const wrapper = card.querySelector('.archive-image-wrapper');
        const img = card.querySelector('.archive-image');
        const isOdd = i % 2 === 1;

        // Asymmetric column vertical drift
        gsap.fromTo(
          wrapper,
          {
            y: isOdd ? 85 : 30,
          },
          {
            y: isOdd ? -85 : -30,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        );

        // Continuous silky counter-parallax on the photography inside the frame
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -15, scale: 1.14 },
            {
              yPercent: 15,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        // Soft entry opacity & scale reveal
        gsap.fromTo(
          wrapper,
          { opacity: 0.35, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 4. Divided-speed exit parallax as next section overlaps
      gsap.to(sectionRef.current, {
        yPercent: -16,
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 90%',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Sincronizar coordenadas de ScrollTrigger y Lenis tras el cambio de altura del filtro
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (window.lenis) {
          window.lenis.resize();
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const handleCardClick = (item) => {
    if (onSelectService) {
      onSelectService(item);
    }
  };

  // Helper to render an individual work card in the broken grid
  const renderCard = (item) => {
    // Proporciones monumentales estilo Awwwards
    let aspectClass = 'aspect-[4/5]';
    if (item.aspect === 'tall') aspectClass = 'aspect-[3/4] sm:aspect-[4/5]';
    if (item.aspect === 'wide') aspectClass = 'aspect-[16/11] sm:aspect-[16/10]';
    if (item.aspect === 'square') aspectClass = 'aspect-square';

    return (
      <article
        key={item.id}
        onClick={() => handleCardClick(item)}
        data-cursor="gallery"
        className="archive-card group relative flex flex-col cursor-pointer transition-transform duration-500 w-full"
      >
        {/* Framing & Image with subtle negative space */}
        <div
          className={`archive-image-wrapper relative w-full overflow-hidden bg-stone-dark ${aspectClass} border border-border-line/40 group-hover:border-copper/60 transition-colors duration-700 shadow-2xl`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="archive-image w-full h-full object-cover filter contrast-[1.08] brightness-[0.94] group-hover:scale-105 group-hover:brightness-100 transition-transform duration-700 ease-out will-change-transform"
          />

          {/* Vignette & soft analog lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </article>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="scroll-mt-20 relative z-20 min-h-screen bg-obsidian border-t border-border-line/60 shadow-[0_-30px_90px_rgba(0,0,0,0.98)] py-28 lg:py-48 overflow-hidden"
    >
      {/* Colossal Background Text "VNDL ART //" */}
      <div className="absolute top-16 left-0 right-0 pointer-events-none select-none overflow-hidden z-0 whitespace-nowrap">
        <div
          ref={marqueeTextRef}
          className="font-display font-black text-[130px] sm:text-[190px] md:text-[240px] lg:text-[320px] text-white/[0.03] tracking-tighter uppercase leading-none"
        >
          VNDL ART // VNDL ART // VNDL ART //
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header: Airy & Editorial */}
        <div className="pb-16 lg:pb-24 border-b border-border-line/40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-copper" />
                <span className="text-[11px] font-mono tracking-widest text-muted-editorial uppercase">
                  TRABAJOS REALIZADOS // ARCHIVO VISUAL
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ivory">
                THE ARCHIVE <span className="text-copper italic font-serif font-normal">// ARTE</span>
              </h2>
            </div>

            {/* Filter Bar & Dynamic Counter */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-6 sm:gap-10 border-t md:border-t-0 pt-4 md:pt-0 border-border-line/40">
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono tracking-widest uppercase">
                <button
                  onClick={() => setActiveFilter('todos')}
                  className={`transition-all py-1.5 cursor-pointer ${
                    activeFilter === 'todos'
                      ? 'text-copper border-b-2 border-copper font-bold'
                      : 'text-muted-editorial hover:text-ivory'
                  }`}
                >
                  TODOS
                </button>
                <span className="text-border-line">//</span>
                <button
                  onClick={() => setActiveFilter('barberia')}
                  className={`transition-all py-1.5 cursor-pointer ${
                    activeFilter === 'barberia'
                      ? 'text-copper border-b-2 border-copper font-bold'
                      : 'text-muted-editorial hover:text-ivory'
                  }`}
                >
                  BARBERÍA
                </button>
                <span className="text-border-line">//</span>
                <button
                  onClick={() => setActiveFilter('tatuajes')}
                  className={`transition-all py-1.5 cursor-pointer ${
                    activeFilter === 'tatuajes'
                      ? 'text-copper border-b-2 border-copper font-bold'
                      : 'text-muted-editorial hover:text-ivory'
                  }`}
                >
                  TATUAJES
                </button>
              </div>

              {/* Dynamic counter */}
              <div className="font-mono text-xs sm:text-sm tracking-widest text-muted-editorial">
                <span className="text-copper font-bold">01</span> / 0{filteredItems.length} PIEZAS
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* AWWWARDS ASYMMETRIC BROKEN GRID (DEEP EDITORIAL SPACING) */}
        {/* ======================================================== */}
        <div className="mt-28 lg:mt-48 grid grid-cols-1 lg:grid-cols-2 gap-y-64 sm:gap-y-80 lg:gap-y-[380px] xl:gap-y-[480px] gap-x-20 sm:gap-x-28 lg:gap-x-72 xl:gap-x-96 2xl:gap-x-[420px] items-start">
          {/* COLUMN 1 (Left stream - starts high) */}
          <div className="flex flex-col space-y-64 sm:space-y-80 lg:space-y-[380px] xl:space-y-[480px]">
            {colLeftItems.map((item) => renderCard(item))}
          </div>

          {/* COLUMN 2 (Right stream - offset downwards for broken-grid rhythm) */}
          <div
            ref={colRightRef}
            className="flex flex-col space-y-64 sm:space-y-80 lg:space-y-[380px] xl:space-y-[480px] lg:pt-80 xl:pt-[340px] 2xl:pt-[400px]"
          >
            {colRightItems.map((item) => renderCard(item))}
          </div>
        </div>
      </div>
    </section>
  );
}
