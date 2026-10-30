import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Inicializar Lenis con inercia cinemática lerp 0.08
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      lerp: 0.08,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Sincronizar ScrollTrigger con eventos de Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Integrar Lenis en el ticker global de GSAP
    const updateGsap = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGsap);
    // Recomendado por GSAP para evitar saltos bruscos tras cambio de pestaña
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateGsap);
      window.lenis = null;
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div className="smooth-scroll-wrapper">{children}</div>;
}
