import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorState, setCursorState] = useState({
    isGallery: false,
    isHoveringButton: false,
    text: '',
    visible: false,
  });

  useEffect(() => {
    // Solo activar en dispositivos con puntero fino (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Usar gsap.quickTo para rendimiento óptimo a 60-120fps con inercia suave
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      setCursorState((prev) => (prev.visible ? prev : { ...prev, visible: true }));
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseEnter = () => {
      setCursorState((prev) => ({ ...prev, visible: true }));
    };

    const handleMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, visible: false }));
    };

    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      const buttonTarget = e.target.closest('button, a, input, select');

      if (target) {
        const type = target.getAttribute('data-cursor');
        if (type === 'gallery') {
          setCursorState((prev) => {
            if (prev.isGallery && prev.visible) return prev;
            return {
              isGallery: true,
              isHoveringButton: false,
              text: 'VER MÁS ↗',
              visible: true,
            };
          });
          return;
        }
      }

      if (buttonTarget) {
        setCursorState((prev) => {
          if (prev.isHoveringButton && !prev.isGallery && prev.visible) return prev;
          return {
            isGallery: false,
            isHoveringButton: true,
            text: '',
            visible: true,
          };
        });
        return;
      }

      // Default state
      setCursorState((prev) => {
        if (!prev.isHoveringButton && !prev.isGallery && prev.visible) return prev;
        return {
          isGallery: false,
          isHoveringButton: false,
          text: '',
          visible: true,
        };
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleOver);
    };
  }, []);

  if (!cursorState.visible) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-dot fixed pointer-events-none z-[9999] flex items-center justify-center font-mono font-bold select-none transition-[width,height,background-color,border-color,opacity] duration-200 ease-out will-change-transform ${cursorState.isGallery
          ? 'w-[94px] h-[94px] bg-copper text-obsidian text-[11px] tracking-wider shadow-copper-glow opacity-100'
          : cursorState.isHoveringButton
            ? 'w-10 h-10 bg-copper/25 border border-copper text-transparent'
            : 'w-3 h-3 bg-copper opacity-90'
        }`}
    >
      {cursorState.isGallery && (
        <span ref={textRef} className="text-center font-mono uppercase font-bold px-2 leading-tight">
          VER MÁS ↗
        </span>
      )}
    </div>
  );
}
