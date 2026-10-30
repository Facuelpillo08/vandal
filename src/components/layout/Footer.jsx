import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

export default function Footer() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacto" className="bg-obsidian border-t border-border-line text-ivory">
      {/* Top Editorial Callout */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-16 border-b border-border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
          <div className="lg:col-span-8">
            <span className="text-[11px] font-mono text-copper uppercase tracking-widest block mb-2">
              VNDL // THE SANCTUARY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              PRECISIÓN DE ACERO <span className="text-copper italic font-serif font-normal">//</span> TINTA INDELEBLE.
            </h3>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3 px-6 py-3.5 border border-border-line hover:border-copper font-mono text-xs tracking-widest uppercase transition-all"
            >
              <span>VOLVER AL INICIO</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Info */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 font-mono text-xs">
        {/* Col 1 */}
        <div>
          <span className="text-copper font-bold tracking-widest uppercase block mb-4">
            01 // ESTUDIO PRINCIPAL
          </span>
          <p className="text-muted-editorial leading-relaxed">
            {STUDIO_INFO.address}<br />
            {STUDIO_INFO.city}<br />
            LAT 34°36'12" S // LON 58°22'54" W
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <span className="text-copper font-bold tracking-widest uppercase block mb-4">
            02 // HORARIOS DE ATENCIÓN
          </span>
          <p className="text-muted-editorial leading-relaxed">
            LUNES A VIERNES // 10:00 A 21:00 HS<br />
            SÁBADOS // 11:00 A 20:00 HS<br />
            DOMINGOS // CERRADO POR DESINFECCIÓN
          </p>
        </div>

        {/* Col 3 */}
        <div>
          <span className="text-copper font-bold tracking-widest uppercase block mb-4">
            03 // CONTACTO DIRECTO
          </span>
          <p className="text-muted-editorial leading-relaxed">
            WHATSAPP // {STUDIO_INFO.phone}<br />
            INSTAGRAM // {STUDIO_INFO.instagram}<br />
            CONCIERGE // book@vandalclub.estd
          </p>
        </div>

        {/* Col 4 */}
        <div>
          <span className="text-copper font-bold tracking-widest uppercase block mb-4">
            04 // NORMAS DEL CLUB
          </span>
          <p className="text-muted-editorial leading-relaxed">
            ATENCIÓN EXCLUSIVA CON TURNO PREVIO.<br />
            TOLERANCIA MÁXIMA 15 MINUTOS.<br />
            POLÍTICA DE PAGO EFECTIVO & CRIPTO.
          </p>
        </div>
      </div>
    </footer>
  );
}
