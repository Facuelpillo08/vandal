import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Compass, ShieldAlert, Phone } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

export default function NotFoundPage({ onNavigateHome }) {
  const containerRef = useRef(null);
  const numberTopRef = useRef(null);
  const numberBottomRef = useRef(null);
  const slashLineRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Badge & Logo entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // 2. Razor Sliced 404 explosion
      tl.fromTo(
        numberTopRef.current,
        { opacity: 0, x: -40, y: -20 },
        { opacity: 1, x: 0, y: 0, duration: 1.1, ease: 'back.out(1.4)' },
        '-=0.5'
      )
      .fromTo(
        numberBottomRef.current,
        { opacity: 0, x: 40, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 1.1, ease: 'back.out(1.4)' },
        '-=1.0'
      )
      .fromTo(
        slashLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      );

      // 3. Editorial content & CTA buttons reveal
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.4'
      );

      // 4. Subtle mouse parallax on the sliced halves
      const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;

        if (numberTopRef.current) {
          gsap.to(numberTopRef.current, {
            x: normX * -18,
            y: normY * -12,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
        if (numberBottomRef.current) {
          gsap.to(numberBottomRef.current, {
            x: normX * 18,
            y: normY * 12,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-obsidian text-ivory flex flex-col justify-between overflow-hidden selection:bg-copper selection:text-obsidian px-6 py-8 sm:py-12"
    >
      {/* 3% Film Grain Analog Noise Overlay */}
      <div className="film-grain" aria-hidden="true"></div>

      {/* Background Architectural Grid Coordinates */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-6 left-8 text-[11px] font-mono text-muted-editorial/40">
          ERR.04 // SECTOR VOID
        </div>
        <div className="absolute top-6 right-12 text-[11px] font-mono text-muted-editorial/40">
          VNDL // SANCTUARY OFFLINE
        </div>
        <div className="absolute bottom-6 left-8 text-[11px] font-mono text-muted-editorial/40">
          SYS_CORD: 00.0000 // ELEV: -99M
        </div>
        <div className="absolute bottom-6 right-12 text-[11px] font-mono text-muted-editorial/40">
          NULL_POINTER // EXCEPTION 404
        </div>

        {/* Ambient radial copper flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-copper/10 rounded-full blur-[140px] pointer-events-none"></div>
      </div>

      {/* TOP HEADER: Brand Emblem & Lost Status */}
      <header className="relative z-10 flex items-center justify-between border-b border-border-line/60 pb-6">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          {/* Surgical V Logo Emblem */}
          <div className="w-8 h-8 rounded-sm bg-stone-dark/90 border border-copper/40 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(212,140,70,0.15)] group-hover:border-copper group-hover:shadow-[0_0_20px_rgba(212,140,70,0.35)] transition-all">
            <svg viewBox="0 0 256 256" className="w-full h-full text-copper fill-current" aria-hidden="true">
              <path fillRule="evenodd" d="M 40.24 58 L 84.24 58 L 128 133.79 L 171.76 58 L 215.76 58 L 128 210 Z M 187.76 58 L 199.76 58 L 142.02 158 L 130.02 158 Z" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ivory group-hover:text-copper transition-colors">
              VANDAL <span className="text-copper font-sans font-normal">//</span> CLUB
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-muted-editorial">
              BUENOS AIRES // ESTD. 2026
            </span>
          </div>
        </button>

        {/* Status Pill */}
        <div
          ref={badgeRef}
          className="flex items-center gap-2 px-3 py-1 bg-stone-dark/80 border border-copper/30 rounded-none text-[10px] font-mono tracking-widest uppercase text-copper"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          <span>ESTADO: FUERA DE MAPA</span>
        </div>
      </header>

      {/* CENTERPIECE: Razor Sliced Monumental 404 & Narrative */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-12 text-center max-w-4xl mx-auto">
        {/* Giant Razor-Sliced 404 Display */}
        <div className="relative select-none my-4">
          {/* Top Half of 404 (Sliced along diagonal) */}
          <div
            ref={numberTopRef}
            className="font-serif font-black text-[110px] xs:text-[140px] sm:text-[200px] md:text-[250px] lg:text-[290px] leading-[0.82] tracking-tighter text-ivory drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 58%, 0% 48%)',
              transform: 'translate(-8px, -4px)',
            }}
          >
            404
          </div>

          {/* Incision Razor Slice Laser Line */}
          <div
            ref={slashLineRef}
            className="absolute top-[49%] left-[-10%] right-[-10%] h-[2px] bg-gradient-to-r from-transparent via-copper to-transparent shadow-[0_0_15px_#D48C46] pointer-events-none transform -rotate-[4deg] z-20 origin-center"
          >
            <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-obsidian px-2 border border-copper/60 text-[9px] font-mono text-copper uppercase tracking-widest">
              LÍNEA DE CORTE // 0.25MM
            </span>
          </div>

          {/* Bottom Half of 404 (Shifted in opposition) */}
          <div
            ref={numberBottomRef}
            className="font-serif font-black text-[110px] xs:text-[140px] sm:text-[200px] md:text-[250px] lg:text-[290px] leading-[0.82] tracking-tighter text-muted-editorial/85 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
            style={{
              clipPath: 'polygon(0% 50%, 100% 60%, 100% 100%, 0% 100%)',
              transform: 'translate(8px, 4px)',
            }}
          >
            404
          </div>
        </div>

        {/* Narrative & Explanatory Copy */}
        <div ref={contentRef} className="space-y-6 mt-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-copper font-mono text-xs uppercase tracking-[0.25em]">
            <Compass className="w-4 h-4 animate-spin [animation-duration:12s]" />
            <span>COORDENADA EXTRAVIADA // ESTUDIO FUERA DE RANGO</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory">
            EL CORTE FUE <span className="text-copper italic font-serif font-normal">// DEMASIADO PROFUNDO.</span>
          </h1>

          <p className="text-muted-editorial font-mono text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Has alcanzado un sector no cartografiado de VANDAL CLUB. Ni la navaja japonesa más afilada ni la aguja más precisa pueden trazar una línea en este destino.
          </p>

          {/* Technical Terminal Diagnostics Box */}
          <div className="bg-[#12100E] border border-border-line p-4 text-left font-mono text-[11px] text-muted-editorial shadow-2xl space-y-1.5 max-w-md mx-auto">
            <div className="flex items-center justify-between text-copper border-b border-border-line/60 pb-1 mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>VNDL_DIAGNOSTIC // PROTOCOL 404</span>
              </span>
              <span className="text-[9px] text-ivory">TERMINAL_01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-editorial/70">RUTA_SOLICITADA:</span>
              <span className="text-ivory font-bold">{typeof window !== 'undefined' ? window.location.pathname : '/unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-editorial/70">ACCIÓN_RECOMENDADA:</span>
              <span className="text-copper">RETORNAR AL SANTUARIO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-editorial/70">COORDENADAS_CENTRAL:</span>
              <span className="text-ivory">LAT 34°36'12" S // LON 58°22'54" W</span>
            </div>
          </div>

          {/* Action Navigation Hub */}
          <div className="flex items-center justify-center pt-4">
            {/* Primary Button: Return Home */}
            <button
              onClick={onNavigateHome}
              className="group relative inline-flex items-center gap-3.5 px-10 sm:px-14 py-4 sm:py-5 bg-copper hover:bg-copper-glow text-obsidian font-mono text-xs sm:text-sm font-bold tracking-[0.24em] uppercase transition-all duration-300 shadow-copper-glow cursor-pointer justify-center"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>VOLVER AL SANTUARIO</span>
            </button>
          </div>
        </div>
      </main>

      {/* BOTTOM FOOTER: Direct Emergency Concierge WhatsApp */}
      <footer className="relative z-10 border-t border-border-line/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-editorial">
        <div className="flex items-center gap-2">
          <span>¿TE HAS PERDIDO?</span>
          <span className="text-border-line">//</span>
          <a
            href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=${encodeURIComponent('Hola VANDAL CLUB, me perdí en la web buscando información.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-copper hover:underline underline-offset-4 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>CONTACTAR CONCIERGE WHATSAPP</span>
          </a>
        </div>

        <div className="text-[10px] text-muted-editorial/60">
          © 2026 VANDAL // CLUB. ARCHITECTURAL LUXURY DIVISION.
        </div>
      </footer>
    </div>
  );
}

