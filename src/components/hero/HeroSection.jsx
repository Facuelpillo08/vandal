import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { BarberScissorsSVG, TattooMachineSVG } from './HeroSVGs';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onBookClick, onQuoteClick }) {
  const containerRef = useRef(null);

  // 16 Collage photos refs across the entire Hero canvas
  const photoRefs = [
    useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null),
  ];

  // Central Typography & Buttons
  const centerContentRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const headlineLine3Ref = useRef(null);
  const ctaGroupRef = useRef(null);

  // Floating animated SVGs
  const scissorsWrapperRef = useRef(null);
  const scissorsParallaxRef = useRef(null);
  const scissorsRef = useRef(null);
  const tattooMachineWrapperRef = useRef(null);
  const tattooMachineParallaxRef = useRef(null);
  const tattooMachineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const photos = photoRefs.map((r) => r.current).filter(Boolean);

      // 1. MOUSE 3D MULTI-LAYER PARALLAX
      const quickXPhotos = photos.map((p, i) =>
        gsap.quickTo(p, 'x', { duration: 0.85 + (i % 4) * 0.1, ease: 'power2.out' })
      );
      const quickYPhotos = photos.map((p, i) =>
        gsap.quickTo(p, 'y', { duration: 0.85 + (i % 4) * 0.1, ease: 'power2.out' })
      );

      // Reactive 3D Parallax & Tilt for Barber Scissors (isolated on parallax wrapper)
      const quickXScissors = gsap.quickTo(scissorsParallaxRef.current, 'x', { duration: 0.9, ease: 'power2.out' });
      const quickYScissors = gsap.quickTo(scissorsParallaxRef.current, 'y', { duration: 0.9, ease: 'power2.out' });
      const quickRotScissors = gsap.quickTo(scissorsParallaxRef.current, 'rotation', { duration: 1.0, ease: 'power2.out' });
      const quickRotXScissors = gsap.quickTo(scissorsParallaxRef.current, 'rotationX', { duration: 0.95, ease: 'power2.out' });
      const quickRotYScissors = gsap.quickTo(scissorsParallaxRef.current, 'rotationY', { duration: 0.95, ease: 'power2.out' });

      // Reactive 3D Parallax & Tilt for Tattoo Machine (isolated on parallax wrapper)
      const quickXTattoo = gsap.quickTo(tattooMachineParallaxRef.current, 'x', { duration: 1.0, ease: 'power2.out' });
      const quickYTattoo = gsap.quickTo(tattooMachineParallaxRef.current, 'y', { duration: 1.0, ease: 'power2.out' });
      const quickRotTattoo = gsap.quickTo(tattooMachineParallaxRef.current, 'rotation', { duration: 1.1, ease: 'power2.out' });
      const quickRotXTattoo = gsap.quickTo(tattooMachineParallaxRef.current, 'rotationX', { duration: 1.0, ease: 'power2.out' });
      const quickRotYTattoo = gsap.quickTo(tattooMachineParallaxRef.current, 'rotationY', { duration: 1.0, ease: 'power2.out' });

      let introFinished = false;

      const handleMouseMove = (e) => {
        if (!containerRef.current || !introFinished) return;
        // Don't calculate if user scrolled past the hero
        if (window.scrollY > window.innerHeight) return;

        const rect = containerRef.current.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;

        // Shift background photos according to their individual depth layer
        quickXPhotos.forEach((fn, i) => {
          const depthFactors = [
            28, -32, 18, 30, -35, 24, -28, 32,
            -20, 26, -22, 34, -26, 20, -30, 25
          ];
          fn(normX * (depthFactors[i] || 22));
        });

        quickYPhotos.forEach((fn, i) => {
          const depthFactors = [
            24, 28, 14, -26, 22, -24, 30, -22,
            18, -20, 26, -18, 22, -25, 19, -21
          ];
          fn(normY * (depthFactors[i] || 18));
        });

        // Dynamic 3D Parallax & Tilt on Barber Scissors
        if (scissorsParallaxRef.current) {
          quickXScissors(normX * 65);
          quickYScissors(normY * 55);
          quickRotScissors(-15 + normX * 18 + normY * 10);
          quickRotXScissors(-normY * 26);
          quickRotYScissors(normX * 28);
        }

        // Dynamic 3D Parallax & Tilt on Tattoo Machine
        if (tattooMachineParallaxRef.current) {
          quickXTattoo(normX * -70);
          quickYTattoo(normY * -60);
          quickRotTattoo(22 - normX * 16 - normY * 12);
          quickRotXTattoo(normY * 28);
          quickRotYTattoo(-normX * 30);
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // 2. ENTRANCE ANIMATION: Explosive full-hero reveal
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          introFinished = true;
        },
      });

      // Photos burst into their collage positions
      introTl
        .fromTo(
          photos,
          {
            scale: 0.45,
            opacity: 0,
            y: (i) => (i % 2 === 0 ? 80 : -80),
            rotation: (i) => (i % 2 === 0 ? -16 : 16),
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotation: (i) => [-4, 3, -2, 5, -3, 4, -5, 2, 6, -3, 2, -4, 5, -2, 3, -1][i] || 0,
            stagger: 0.05,
            duration: 1.2,
            ease: 'back.out(1.3)',
          }
        )
        // Mask-reveal headline typography
        .fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.1, duration: 1.1, ease: 'power4.out' },
          '-=0.9'
        )
        // Buttons scale in
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, scale: 0.85, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 },
          '-=0.6'
        )
        // Floating SVGs drop in with playful bounce
        .fromTo(
          [scissorsWrapperRef.current, tattooMachineWrapperRef.current],
          { opacity: 0, scale: 0.3, y: -30 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 1.0, ease: 'back.out(1.8)' },
          '-=0.8'
        );

      // 3. AMBIENT IDLE FLOATING LOOPS (Autonomous breathing motion on all viewports)
      if (scissorsRef.current) {
        gsap.to(scissorsRef.current, {
          y: '+=8',
          rotation: '-=3',
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (tattooMachineRef.current) {
        gsap.to(tattooMachineRef.current, {
          y: '-=10',
          rotation: '+=2.5',
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 4. SCROLLTRIGGER SCRUB ANIMATION (Wrappers drift with scroll)
      if (scissorsWrapperRef.current) {
        gsap.to(scissorsWrapperRef.current, {
          y: 320,
          rotation: 40,
          x: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (tattooMachineWrapperRef.current) {
        gsap.to(tattooMachineWrapperRef.current, {
          y: 340,
          rotation: -35,
          x: 32,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }

      // Photos drift with scroll at alternating speeds for deep parallax
      photos.forEach((photo, idx) => {
        const speed = [1.1, 0.8, 1.4, 0.9, 1.3, 0.75, 1.2, 0.85, 1.35, 0.95, 1.15, 0.8, 1.25, 0.9, 1.1, 0.85][idx] || 1;
        const direction = idx % 2 === 0 ? -1 : 1;
        gsap.to(photo, {
          yPercent: direction * 28 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1 + (idx % 3) * 0.15,
          },
        });
      });

      // Center typography subtle push
      if (centerContentRef.current) {
        gsap.to(centerContentRef.current, {
          yPercent: 18,
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // 5. Divided-speed exit parallax (drifts at half-speed while Archive overlaps)
      gsap.to(containerRef.current, {
        yPercent: -18,
        opacity: 0.75,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 90%',
          end: 'bottom top',
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-border-line px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
    >
      {/* Background Architectural Grid Coordinates */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-6 left-8 text-[11px] font-mono text-muted-editorial/40">
          SEC.01 // DENSE ART COLLAGE
        </div>
        <div className="absolute bottom-6 left-8 text-[11px] font-mono text-muted-editorial/40">
          SYS_CORD: 45.1982 // ELEV: 12M
        </div>
        <div className="absolute top-6 right-12 text-[11px] font-mono text-muted-editorial/40">
          VNDL // RAW CRAFT
        </div>
        <div className="absolute bottom-6 right-12 text-[11px] font-mono text-muted-editorial/40">
          FULL_HERO_ARCHIVE // 2026
        </div>
      </div>

      {/* ======================================================== */}
      {/* 16-PHOTO DENSE MULTI-LAYER COLLAGE (NO EMPTY BLACK VOIDS) */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10">
        {/* 1. Master Barber Trimming Hair (Top-Left) */}
        <div
          ref={photoRefs[0]}
          className="absolute top-2 sm:top-6 left-2 sm:left-6 md:left-8 w-44 sm:w-56 md:w-68 lg:w-76 aspect-[4/5] shadow-2xl will-change-transform"
        >
          <div className="torn-paper-backing torn-photo-diagonal"></div>
          <div className="relative w-full h-full border border-copper/40 bg-stone-dark overflow-hidden torn-photo-diagonal">
            <img
              src="/images/hero_barber.jpg"
              alt="Corte clásico de autor"
              className="w-full h-full object-cover filter contrast-110 brightness-95"
            />
            <div className="absolute bottom-2 left-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[9px] font-mono text-copper">
              01 // CORTE AUTOR
            </div>
          </div>
        </div>

        {/* 2. Textured Modern Crop (Top-Center-Left) */}
        <div
          ref={photoRefs[1]}
          className="absolute top-0 sm:top-4 left-[20%] sm:left-[22%] md:left-[24%] w-36 sm:w-44 md:w-52 lg:w-60 aspect-[3/4] shadow-2xl will-change-transform opacity-95"
        >
          <div className="torn-paper-backing torn-photo-bottom"></div>
          <div className="relative w-full h-full border border-border-line bg-stone-dark overflow-hidden torn-photo-bottom">
            <img
              src="/images/archive_crop.jpg"
              alt="Crop texturado moderno"
              className="w-full h-full object-cover filter contrast-110"
            />
            <div className="absolute top-2 right-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-ivory">
              LUCAS V. // TEXTURA
            </div>
          </div>
        </div>

        {/* 3. Shears & Barber Chair B&W (Top-Center) */}
        <div
          ref={photoRefs[2]}
          className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 lg:w-[460px] aspect-[16/9] overflow-hidden shadow-2xl opacity-60 mix-blend-luminosity pointer-events-none -z-10"
        >
          <div className="torn-paper-backing torn-photo-top"></div>
          <div className="relative w-full h-full border border-border-line/70 bg-stone-dark overflow-hidden torn-photo-top">
            <img
              src="/images/hero_barber_chair.jpg"
              alt="Sillón de barbería vintage en cuero"
              className="w-full h-full object-cover filter contrast-125"
            />
          </div>
        </div>

        {/* 4. Traditional Panther & Roses (Top-Center-Right) */}
        <div
          ref={photoRefs[3]}
          className="absolute top-0 sm:top-4 right-[20%] sm:right-[22%] md:right-[24%] w-36 sm:w-44 md:w-52 lg:w-60 aspect-square shadow-2xl will-change-transform opacity-95"
        >
          <div className="torn-paper-backing torn-photo-diagonal"></div>
          <div className="relative w-full h-full border border-copper/40 bg-[#F4EFE6] overflow-hidden torn-photo-diagonal">
            <img
              src="/images/hero_panther.jpg"
              alt="Flash Art Tradicional"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute bottom-2 left-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-copper">
              FLASH ART // 2026
            </div>
          </div>
        </div>

        {/* 5. Geometric Blackwork Sleeve (Top-Right) */}
        <div
          ref={photoRefs[4]}
          className="absolute top-2 sm:top-6 right-2 sm:right-6 md:right-8 w-44 sm:w-56 md:w-68 lg:w-76 aspect-[4/5] shadow-2xl will-change-transform"
        >
          <div className="torn-paper-backing torn-photo-right"></div>
          <div className="relative w-full h-full border border-copper/50 bg-stone-dark overflow-hidden torn-photo-right">
            <img
              src="/images/archive_blackwork.jpg"
              alt="Manga blackwork"
              className="w-full h-full object-cover filter contrast-120"
            />
            <div className="absolute top-2 right-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[9px] font-mono text-ivory">
              FRANCO INK // BLACKWORK
            </div>
          </div>
        </div>

        {/* 6. Razor Grooming Classic (Mid-Left Edge) */}
        <div
          ref={photoRefs[5]}
          className="absolute top-[40%] -left-3 sm:left-2 md:left-4 -translate-y-1/2 w-40 sm:w-52 md:w-60 lg:w-68 aspect-[3/4] shadow-2xl will-change-transform"
        >
          <div className="torn-paper-backing torn-photo-left"></div>
          <div className="relative w-full h-full border border-border-line bg-stone-dark overflow-hidden torn-photo-left">
            <img
              src="/images/archive_corte.jpg"
              alt="Perfilado y navaja"
              className="w-full h-full object-cover filter contrast-110"
            />
            <div className="absolute bottom-2 left-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-copper">
              MATEO NAVAJA // MASTER
            </div>
          </div>
        </div>

        {/* 7. Tattoo Artist Inking Arm (Mid-Right Edge) */}
        <div
          ref={photoRefs[6]}
          className="absolute top-[40%] -right-3 sm:right-2 md:right-4 -translate-y-1/2 w-40 sm:w-52 md:w-60 lg:w-68 aspect-[3/4] shadow-2xl will-change-transform"
        >
          <div className="torn-paper-backing torn-photo-right"></div>
          <div className="relative w-full h-full border border-border-line bg-stone-dark overflow-hidden torn-photo-right">
            <img
              src="/images/hero_tattoo.jpg"
              alt="Tatuador en acción"
              className="w-full h-full object-cover filter contrast-115"
            />
            <div className="absolute bottom-2 right-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-copper">
              02 // TINTA DIRECTA
            </div>
          </div>
        </div>

        {/* 8. Master Styling Portrait (Mid-Center-Left behind text) */}
        <div
          ref={photoRefs[7]}
          className="hidden md:block absolute top-[44%] left-[18%] lg:left-[20%] -translate-y-1/2 w-44 lg:w-52 aspect-[3/4] shadow-2xl will-change-transform opacity-75"
        >
          <div className="torn-paper-backing torn-photo-diagonal"></div>
          <div className="relative w-full h-full border border-copper/30 bg-stone-dark overflow-hidden torn-photo-diagonal">
            <img
              src="/images/hero_shave_lather.jpg"
              alt="Afeitado clásico a navaja"
              className="w-full h-full object-cover filter contrast-115"
            />
            <div className="absolute top-2 left-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-ivory">
              VNDL // NAVAJA
            </div>
          </div>
        </div>

        {/* 9. Needles & Black Pigments (Mid-Center-Right behind text) */}
        <div
          ref={photoRefs[8]}
          className="hidden md:block absolute top-[44%] right-[18%] lg:right-[20%] -translate-y-1/2 w-44 lg:w-52 aspect-[3/4] shadow-2xl will-change-transform opacity-75"
        >
          <div className="torn-paper-backing torn-photo-diagonal"></div>
          <div className="relative w-full h-full border border-copper/30 bg-stone-dark overflow-hidden torn-photo-diagonal">
            <img
              src="/images/hero_ink_station.jpg"
              alt="Pigmentos y estación de tinta"
              className="w-full h-full object-cover filter contrast-120"
            />
            <div className="absolute top-2 right-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-copper">
              ESTUDIO // TINTA
            </div>
          </div>
        </div>

        {/* 10. Barber Salon Action (Bottom-Left) */}
        <div
          ref={photoRefs[9]}
          className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6 md:left-8 w-44 sm:w-56 md:w-64 lg:w-72 aspect-[4/5] shadow-2xl will-change-transform"
        >
          <div className="torn-paper-backing torn-photo-bottom"></div>
          <div className="relative w-full h-full border border-copper/30 bg-stone-dark overflow-hidden torn-photo-bottom">
            <img
              src="/images/hero_scissor_craft.jpg"
              alt="Tijeras japonesas y corte artesanal"
              className="w-full h-full object-cover filter contrast-110"
            />
            <div className="absolute top-2 left-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[9px] font-mono text-ivory">
              TIJERA // ARTESANAL
            </div>
          </div>
        </div>

        {/* 11. Needles & Ink Close-Up (Bottom-Center-Left) */}
        <div
          ref={photoRefs[10]}
          className="absolute bottom-1 sm:bottom-3 left-[22%] sm:left-[24%] md:left-[25%] w-36 sm:w-44 md:w-52 lg:w-60 aspect-[4/3] shadow-2xl will-change-transform opacity-95"
        >
          <div className="torn-paper-backing torn-photo-top"></div>
          <div className="relative w-full h-full border border-border-line bg-stone-dark overflow-hidden torn-photo-top">
            <img
              src="/images/booking_tattoo.jpg"
              alt="Agujas de tatuaje"
              className="w-full h-full object-cover filter contrast-120"
            />
            <div className="absolute bottom-2 left-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-copper">
              PRECISIÓN // TINTA
            </div>
          </div>
        </div>

        {/* 12. Sharp Taper Fade (Bottom-Center) */}
        <div
          ref={photoRefs[11]}
          className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 lg:w-[460px] aspect-[16/9] overflow-hidden shadow-2xl opacity-60 mix-blend-luminosity pointer-events-none -z-10"
        >
          <div className="torn-paper-backing torn-photo-bottom"></div>
          <div className="relative w-full h-full border border-border-line/70 bg-stone-dark overflow-hidden torn-photo-bottom">
            <img
              src="/images/hero_fade_profile.jpg"
              alt="Skin fade y perfilado editorial"
              className="w-full h-full object-cover filter contrast-120"
            />
          </div>
        </div>

        {/* 13. Traditional Flash Art Roses & Dagger (Bottom-Center-Right) */}
        <div
          ref={photoRefs[12]}
          className="absolute bottom-1 sm:bottom-3 right-[22%] sm:right-[24%] md:right-[25%] w-36 sm:w-44 md:w-52 lg:w-60 aspect-[4/3] shadow-2xl will-change-transform opacity-95"
        >
          <div className="torn-paper-backing torn-photo-top"></div>
          <div className="relative w-full h-full border border-border-line bg-[#F4EFE6] overflow-hidden torn-photo-top">
            <img
              src="/images/hero_tiger_flash.jpg"
              alt="Flash Art tigre y daga"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute bottom-2 right-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[8px] font-mono text-ivory">
              TIGER // BLADE
            </div>
          </div>
        </div>

        {/* 14. Tattoo Artist Inking Close-Up (Bottom-Right) */}
        <div
          ref={photoRefs[13]}
          className="absolute bottom-2 sm:bottom-4 right-2 sm:right-6 md:right-8 w-44 sm:w-56 md:w-64 lg:w-72 aspect-[4/5] shadow-2xl will-change-transform"
        >
          <div className="torn-paper-backing torn-photo-left"></div>
          <div className="relative w-full h-full border border-copper/40 bg-stone-dark overflow-hidden torn-photo-left">
            <img
              src="/images/hero_ornamental_back.jpg"
              alt="Tatuaje ornamental de autor"
              className="w-full h-full object-cover filter contrast-115"
            />
            <div className="absolute bottom-2 right-2 bg-obsidian/90 px-2 py-0.5 border border-border-line text-[9px] font-mono text-copper">
              ARTE // PERMANENTE
            </div>
          </div>
        </div>

        {/* 15. Outer Left Edge Crop (Far Left) */}
        <div
          ref={photoRefs[14]}
          className="hidden xl:block absolute top-[65%] -left-8 -translate-y-1/2 w-48 aspect-[3/4] shadow-2xl will-change-transform opacity-85"
        >
          <div className="torn-paper-backing torn-photo-right"></div>
          <div className="relative w-full h-full border border-border-line bg-stone-dark overflow-hidden torn-photo-right">
            <img
              src="/images/booking_barber.jpg"
              alt="Ambiente de salón"
              className="w-full h-full object-cover filter contrast-110"
            />
          </div>
        </div>

        {/* 16. Outer Right Edge Blackwork (Far Right) */}
        <div
          ref={photoRefs[15]}
          className="hidden xl:block absolute top-[65%] -right-8 -translate-y-1/2 w-48 aspect-[3/4] shadow-2xl will-change-transform opacity-85"
        >
          <div className="torn-paper-backing torn-photo-left"></div>
          <div className="relative w-full h-full border border-border-line bg-stone-dark overflow-hidden torn-photo-left">
            <img
              src="/images/hero_hand_tattoo.jpg"
              alt="Blackwork geométrico en mano"
              className="w-full h-full object-cover filter contrast-120"
            />
          </div>
        </div>

        {/* Deep Ambient Studio Backdrop (Seamless full-canvas coverage) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-25 mix-blend-luminosity pointer-events-none -z-20">
          <img
            src="/images/booking_barber.jpg"
            alt="Ambiente estudio"
            className="w-full h-full object-cover filter grayscale contrast-130 scale-105"
          />
        </div>
      </div>

      {/* Floating Animated Barber Scissors SVG (Mouse 3D Parallax & Ambient Motion) */}
      <div
        ref={scissorsWrapperRef}
        className="absolute top-16 sm:top-24 left-[4%] sm:left-[10%] md:left-[14%] lg:left-[16%] z-30 pointer-events-none select-none [perspective:1000px]"
      >
        <div
          ref={scissorsParallaxRef}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        >
          <div
            ref={scissorsRef}
            className="w-16 sm:w-24 md:w-32 lg:w-40 drop-shadow-[0_15px_35px_rgba(212,140,70,0.45)] transition-opacity opacity-85 sm:opacity-100 will-change-transform"
            title="Tijeras de Autor"
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
          >
            <BarberScissorsSVG className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Floating Animated Tattoo Machine SVG (Mouse 3D Parallax & Ambient Motion) */}
      <div
        ref={tattooMachineWrapperRef}
        className="absolute bottom-14 sm:bottom-20 right-[4%] sm:right-[10%] md:right-[14%] lg:right-[16%] z-30 pointer-events-none select-none [perspective:1000px]"
      >
        <div
          ref={tattooMachineParallaxRef}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        >
          <div
            ref={tattooMachineRef}
            className="w-16 sm:w-24 md:w-32 lg:w-40 drop-shadow-[0_15px_35px_rgba(212,140,70,0.5)] transition-opacity opacity-85 sm:opacity-100 will-change-transform"
            title="Máquina de Tatuar Rotativa"
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
          >
            <TattooMachineSVG className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MONUMENTAL TYPOGRAPHY & BUTTONS DIRECTLY OVER COLLAGE    */}
      {/* ======================================================== */}
      <div
        ref={centerContentRef}
        className="relative z-20 max-w-5xl w-full mx-auto text-center flex flex-col items-center justify-center px-4"
      >
        {/* Soft radial backdrop illumination for 100% legibility */}
        <div className="absolute inset-0 -inset-x-12 -inset-y-16 bg-radial from-obsidian/95 via-obsidian/75 to-transparent pointer-events-none -z-10 rounded-full blur-2xl"></div>

        {/* Mask Reveal Monumental Headline */}
        <div className="overflow-hidden mb-6 select-none">
          <h1 className="font-serif text-[2.65rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight text-ivory leading-[0.98] drop-shadow-[0_12px_40px_rgba(0,0,0,0.98)]">
            <div className="overflow-hidden">
              <span ref={headlineLine1Ref} className="inline-block transform-gpu">
                SHARP CUTS <span className="text-copper font-sans font-light">//</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span ref={headlineLine2Ref} className="inline-block transform-gpu">
                PERMANENT
              </span>
            </div>
            <div className="overflow-hidden">
              <span ref={headlineLine3Ref} className="inline-block transform-gpu italic text-ivory font-serif">
                ART.
              </span>
            </div>
          </h1>
        </div>

        {/* Action CTA: Architectural Sanctuary Ticket */}
        <div
          ref={ctaGroupRef}
          className="flex items-center justify-center mt-6 sm:mt-8"
        >
          <button
            onClick={onBookClick}
            className="group relative inline-flex items-center gap-4 px-10 sm:px-14 py-4 sm:py-5 rounded-none border border-copper/50 bg-obsidian/85 hover:bg-copper text-ivory hover:text-obsidian font-mono text-xs sm:text-sm font-semibold tracking-[0.26em] uppercase transition-[background-color,border-color,color,box-shadow] duration-500 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(212,140,70,0.18)] hover:shadow-[0_16px_48px_rgba(212,140,70,0.45)] cursor-pointer backdrop-blur-xl"
          >
            {/* Corner architectural steel brackets */}
            <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-copper pointer-events-none"></span>
            <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-copper pointer-events-none"></span>

            {/* Glowing amber needle indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-copper group-hover:bg-obsidian transition-colors shadow-[0_0_8px_#D48C46]"></span>

            <span>RESERVAR TURNO</span>

            <span className="text-copper group-hover:text-obsidian font-light transition-colors">//</span>

            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
