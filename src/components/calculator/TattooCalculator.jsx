import { useState, useMemo } from 'react';
import { ArrowUpRight, Sliders, ShieldCheck, Clock, Zap } from 'lucide-react';

export default function TattooCalculator({ onApplyQuote }) {
  const [sizeCm, setSizeCm] = useState(15);
  const [style, setStyle] = useState('blackwork');
  const [detail, setDetail] = useState('alto');
  const [placement, setPlacement] = useState('antebrazo');
  const [hasColor, setHasColor] = useState(false);

  // Estimación de cálculo en tiempo real
  const estimate = useMemo(() => {
    let basePrice = 16000;
    let baseMinutes = 60;

    // Multiplicador por tamaño
    const sizeFactor = (sizeCm / 10) * 1.4;
    basePrice *= sizeFactor;
    baseMinutes *= sizeFactor;

    // Multiplicador de estilo
    const styleMultipliers = {
      blackwork: 1.25,
      tradicional: 1.15,
      fineline: 1.1,
      realismo: 1.6,
      lettering: 0.95,
    };
    basePrice *= styleMultipliers[style] || 1;
    baseMinutes *= (styleMultipliers[style] || 1) * 0.9;

    // Complejidad
    const detailMultipliers = {
      minimo: 0.85,
      medio: 1.0,
      alto: 1.35,
      masterpiece: 1.8,
    };
    basePrice *= detailMultipliers[detail] || 1;
    baseMinutes *= detailMultipliers[detail] || 1;

    // Color
    if (hasColor) {
      basePrice *= 1.2;
      baseMinutes *= 1.25;
    }

    // Redondear a miles
    const roundedPrice = Math.round(basePrice / 500) * 500;
    const roundedMinutes = Math.round(baseMinutes / 15) * 15;

    return {
      price: `$${roundedPrice.toLocaleString('es-AR')}`,
      rawPrice: roundedPrice,
      duration: `${roundedMinutes} MIN`,
      sessions: roundedMinutes > 240 ? '2 SESIONES' : '1 SESIÓN',
    };
  }, [sizeCm, style, detail, placement, hasColor]);

  const handleBookWithQuote = () => {
    if (onApplyQuote) {
      onApplyQuote({
        serviceTitle: `TATUAJE // ${style.toUpperCase()}`,
        estimatedPrice: estimate.price,
        estimatedDuration: estimate.duration,
        details: `Tamaño: ~${sizeCm}cm, Zona: ${placement.toUpperCase()}, Detalle: ${detail.toUpperCase()}`,
      });
    }
  };

  return (
    <section id="cotizador" className="scroll-mt-20 relative z-30 bg-stone-dark border-t border-border-line/60 shadow-[0_-30px_90px_rgba(0,0,0,0.98)] py-20 lg:py-28 px-6 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-line pb-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-copper font-mono text-[11px] uppercase tracking-widest mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>03 // ESTIMADOR DE PROYECTO</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory">
              COTIZADOR INTERACTIVO <span className="text-copper italic font-serif font-normal">// TINTA</span>
            </h2>
          </div>
          <p className="text-muted-editorial font-mono text-xs max-w-md mt-4 md:mt-0">
            Valores orientativos basados en centímetros, densidad de tinta, zona anatómica y técnica aplicada.
          </p>
        </div>

        {/* 2 Columns: Controls on Left, Real-Time Result on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls Form */}
          <div className="lg:col-span-7 space-y-8 bg-obsidian/60 border border-border-line p-6 sm:p-10">
            {/* Slider de tamaño en cm */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-mono text-xs text-muted-editorial uppercase tracking-wider">
                  DIMENSIÓN APROXIMADA:
                </label>
                <span className="font-mono text-base font-bold text-copper">
                  {sizeCm} CM × {Math.round(sizeCm * 0.75)} CM
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={sizeCm}
                onChange={(e) => setSizeCm(Number(e.target.value))}
                className="w-full h-2 bg-stone-dark rounded-lg appearance-none cursor-pointer accent-copper"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-editorial/60 mt-1">
                <span>5 CM (MINI FLASH)</span>
                <span>20 CM (MEDIO BRAZO)</span>
                <span>45 CM (MANGA COMPLETA)</span>
              </div>
            </div>

            {/* Estilo selector */}
            <div>
              <label className="font-mono text-xs text-muted-editorial uppercase tracking-wider block mb-3">
                ESTILO TÉCNICO:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'blackwork', label: 'BLACKWORK' },
                  { id: 'tradicional', label: 'TRADICIONAL' },
                  { id: 'fineline', label: 'FINE LINE' },
                  { id: 'realismo', label: 'REALISMO' },
                  { id: 'lettering', label: 'LETTERING' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`py-3 px-4 font-mono text-xs tracking-wider border transition-all text-left ${
                      style === s.id
                        ? 'border-copper bg-copper/10 text-copper font-bold shadow-copper-subtle'
                        : 'border-border-line bg-stone-dark/50 text-muted-editorial hover:text-ivory'
                    }`}
                  >
                    {style === s.id && <span className="text-copper mr-1.5">✓</span>}
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nivel de Detalle */}
            <div>
              <label className="font-mono text-xs text-muted-editorial uppercase tracking-wider block mb-3">
                COMPLEJIDAD & SOMBREADO:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'minimo', label: 'LÍNEA PURA' },
                  { id: 'medio', label: 'MEDIO' },
                  { id: 'alto', label: 'ALTO' },
                  { id: 'masterpiece', label: 'EXTREMO' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDetail(d.id)}
                    className={`py-2.5 px-3 font-mono text-[11px] tracking-wider border transition-all text-center ${
                      detail === d.id
                        ? 'border-copper bg-copper text-obsidian font-bold'
                        : 'border-border-line bg-stone-dark/50 text-muted-editorial hover:text-ivory'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Zona corporal */}
            <div>
              <label className="font-mono text-xs text-muted-editorial uppercase tracking-wider block mb-3">
                ZONA DEL CUERPO:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: 'antebrazo', label: 'ANTEBRAZO' },
                  { id: 'brazo', label: 'BRAZO' },
                  { id: 'pierna', label: 'PIERNA' },
                  { id: 'pecho', label: 'PECHO' },
                  { id: 'espalda', label: 'ESPALDA' },
                  { id: 'cuello', label: 'CUELLO' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlacement(p.id)}
                    className={`py-2 px-2 font-mono text-[10px] tracking-wider border transition-all text-center ${
                      placement === p.id
                        ? 'border-copper text-copper font-bold bg-copper/5'
                        : 'border-border-line text-muted-editorial hover:text-ivory'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Switch de color vs blackwork */}
            <div className="flex items-center justify-between pt-4 border-t border-border-line/60">
              <span className="font-mono text-xs text-muted-editorial uppercase">
                INCLUYE PIGMENTOS DE COLOR:
              </span>
              <button
                onClick={() => setHasColor(!hasColor)}
                className={`w-14 h-7 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                  hasColor ? 'bg-copper' : 'bg-stone-dark border border-border-line'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-ivory transition-transform ${
                    hasColor ? 'translate-x-7 bg-obsidian' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Real-time Calculation Ticket Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-obsidian border border-copper/70 p-8 sm:p-10 shadow-2xl relative">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border-line pb-4">
                <span className="font-mono text-xs text-copper tracking-widest uppercase font-bold">
                  RESUMEN DE ESTIMACIÓN TÉCNICA
                </span>
                <span className="font-mono text-[10px] text-muted-editorial">COD: TC-2026</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-muted-editorial uppercase tracking-wider block mb-1">
                  PRECIO ESTIMADO ORIENTATIVO
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-black text-ivory tracking-tight">
                  {estimate.price}
                </div>
                <div className="text-[11px] font-mono text-copper mt-1">
                  INCLUYE CONSULTA DE DISEÑO + PRIMER CURADO
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-border-line/60 font-mono text-xs">
                <div>
                  <span className="text-muted-editorial block text-[10px]">TIEMPO EN SILLÓN:</span>
                  <div className="flex items-center gap-1.5 text-ivory font-bold mt-1">
                    <Clock className="w-3.5 h-3.5 text-copper" />
                    <span>{estimate.duration}</span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-editorial block text-[10px]">FORMATO DE SESIÓN:</span>
                  <div className="flex items-center gap-1.5 text-ivory font-bold mt-1">
                    <Zap className="w-3.5 h-3.5 text-copper" />
                    <span>{estimate.sessions}</span>
                  </div>
                </div>
              </div>

              {/* Badges de calidad */}
              <div className="space-y-2 text-[11px] font-mono text-muted-editorial">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-copper" />
                  <span>Tintas Dynamic / Eternal veganas homologadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-copper" />
                  <span>Agujas Bishop y Cheyenne selladas al vacío</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBookWithQuote}
              className="mt-8 w-full py-4 bg-copper text-obsidian font-mono font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:bg-copper-glow hover:shadow-copper-glow transition-all cursor-pointer"
            >
              <span>AGENDAR CON ESTA COTIZACIÓN ↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
