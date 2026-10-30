import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, AlertCircle, ArrowUpRight } from 'lucide-react';
import { SERVICES, ARTISTS, TIME_SLOTS, AVAILABLE_DAYS, STUDIO_INFO } from '../../data/studioData';

export default function BookingSection({ preselectedService, preselectedQuote }) {
  // Service selection state
  const [selectedServiceId, setSelectedServiceId] = useState('corte_barba');
  const [selectedArtistId, setSelectedArtistId] = useState('mateo');
  const [activeCustomQuote, setActiveCustomQuote] = useState(null);

  // Date and Time selection state
  const [dayIndex, setDayIndex] = useState(0); // LUN 26 OCT default
  const [selectedTime, setSelectedTime] = useState('16:00 PM');

  // Customer form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [validationError, setValidationError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Sync if preselected from other components
  useEffect(() => {
    if (preselectedService) {
      setActiveCustomQuote(null);
      // Smart mapping from Archive items to Service & Artist
      if (preselectedService.id === '03') {
        setSelectedServiceId('texturado_fade');
        setSelectedArtistId('lucas');
      } else if (preselectedService.id === '04') {
        setSelectedServiceId('tattoo_flash');
        setSelectedArtistId('franco');
      } else if (preselectedService.id === '02' || preselectedService.id === '06') {
        setSelectedServiceId('tattoo_blackwork');
        setSelectedArtistId('franco');
      } else if (preselectedService.category === 'tatuajes') {
        setSelectedServiceId('tattoo_blackwork');
        setSelectedArtistId('franco');
      } else {
        setSelectedServiceId('corte_barba');
        setSelectedArtistId('mateo');
      }
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedQuote) {
      setSelectedServiceId('tattoo_blackwork');
      setSelectedArtistId('franco');
      setActiveCustomQuote(preselectedQuote);
    }
  }, [preselectedQuote]);

  // Current selections
  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const currentArtist = ARTISTS.find((a) => a.id === selectedArtistId) || ARTISTS[0];
  const currentDay = AVAILABLE_DAYS[dayIndex] || AVAILABLE_DAYS[0];

  // Dynamic values factoring in custom quotes
  const displayServiceTitle = activeCustomQuote
    ? activeCustomQuote.serviceTitle
    : currentService.title;
  const displayPrice = activeCustomQuote
    ? activeCustomQuote.estimatedPrice
    : currentService.price;
  const displayDuration = activeCustomQuote
    ? activeCustomQuote.estimatedDuration
    : currentService.duration;
  const displayDetails = activeCustomQuote
    ? activeCustomQuote.details
    : null;

  // Alternar artistas
  const handleNextArtist = () => {
    const currentIndex = ARTISTS.findIndex((a) => a.id === selectedArtistId);
    const nextIndex = (currentIndex + 1) % ARTISTS.length;
    setSelectedArtistId(ARTISTS[nextIndex].id);
  };

  // Day navigation
  const handlePrevDay = () => {
    setDayIndex((prev) => (prev > 0 ? prev - 1 : AVAILABLE_DAYS.length - 1));
  };

  const handleNextDay = () => {
    setDayIndex((prev) => (prev < AVAILABLE_DAYS.length - 1 ? prev + 1 : 0));
  };

  // WhatsApp confirmation submission
  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.length < 8) {
      setValidationError('Por favor ingresa un número de teléfono válido.');
      return;
    }

    const bookingData = {
      id: `VNDL-${Date.now().toString().slice(-4)}`,
      service: displayServiceTitle,
      artist: currentArtist.name,
      date: `${currentDay.day} ${currentDay.date} ${currentDay.month}`,
      time: selectedTime,
      price: displayPrice,
      duration: displayDuration,
      details: displayDetails,
      clientName: customerName.trim(),
      clientPhone: customerPhone.trim(),
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('vandal_bookings') || '[]');
      existing.push(bookingData);
      localStorage.setItem('vandal_bookings', JSON.stringify(existing));
    } catch {
      // ignore storage failure
    }

    setConfirmedBooking(bookingData);

    // Format WhatsApp message
    const textMsg = encodeURIComponent(
      `*RESERVA // VANDAL CLUB*\n\n` +
      `⚡ *Código:* ${bookingData.id}\n` +
      `✂️ *Servicio:* ${bookingData.service}\n` +
      (bookingData.details ? `📐 *Detalles:* ${bookingData.details}\n` : '') +
      `👤 *Profesional:* ${bookingData.artist}\n` +
      `📅 *Fecha:* ${bookingData.date} a las ${bookingData.time}\n` +
      `⏱️ *Duración:* ${bookingData.duration}\n` +
      `💵 *Inversión:* ${bookingData.price}\n\n` +
      `👤 *Cliente:* ${bookingData.clientName}\n` +
      `📱 *Contacto:* ${bookingData.clientPhone}\n\n` +
      `_Confirmación generada desde vandalclub.estd_`
    );

    const whatsappUrl = `https://wa.me/${STUDIO_INFO.whatsapp}?text=${textMsg}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <section id="turnos" className="scroll-mt-20 relative z-40 bg-obsidian border-t border-border-line/60 shadow-[0_-30px_90px_rgba(0,0,0,0.98)] py-16 lg:py-24 px-4 sm:px-8 md:px-12">
      {/* Background Architectural Grid Markers */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-4 left-6 text-[10px] font-mono text-muted-editorial/40">233 / 04</span>
        <span className="absolute top-4 right-1/3 text-[10px] font-mono text-muted-editorial/40">02</span>
        <span className="absolute top-4 right-8 text-[10px] font-mono text-muted-editorial/40">05.</span>
        <span className="absolute bottom-6 left-12 text-[10px] font-mono text-muted-editorial/40">08.</span>
        <span className="absolute bottom-6 right-1/3 text-[10px] font-mono text-muted-editorial/40">198.</span>
      </div>

      <div className="max-w-[1920px] mx-auto">
        {/* Main 3-Column Architectural Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-border-line bg-obsidian shadow-2xl">
          
          {/* COLUMN 1: SELECT SERVICE & ARTIST (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border-line flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="mb-8">
                <span className="text-copper font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase block mb-2">
                  02 // AGENDAR TURNO
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-ivory leading-[0.98]">
                  RESERVA TU<br />ESPACIO
                </h2>
              </div>

              {/* Sub-label */}
              <div className="mb-6 pt-6 border-t border-border-line/60">
                <span className="text-[11px] font-mono text-copper tracking-wider uppercase block">
                  01 // SELECCIONAR SERVICIO & ARTISTA
                </span>
                <span className="text-[10px] font-mono text-muted-editorial uppercase tracking-widest">
                  SELECT DE SERVICIO & PROFESIONAL
                </span>
              </div>

              {/* Service Selection Dropdown */}
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-mono text-muted-editorial tracking-wider uppercase block mb-2">
                    SELECCIÓN
                  </label>
                  <div className="relative">
                    <select
                      value={selectedServiceId}
                      onChange={(e) => {
                        const newId = e.target.value;
                        setSelectedServiceId(newId);
                        setActiveCustomQuote(null);
                        const s = SERVICES.find((item) => item.id === newId);
                        if (s && s.defaultArtist) {
                          setSelectedArtistId(s.defaultArtist);
                        }
                      }}
                      className="w-full bg-stone-dark border border-copper text-ivory font-mono text-xs sm:text-sm px-4 py-3.5 appearance-none focus:outline-none focus:ring-1 focus:ring-copper cursor-pointer tracking-wider"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id} className="bg-stone-dark text-ivory py-2">
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-copper">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                  {activeCustomQuote && (
                    <div className="mt-2.5 p-2 bg-copper/10 border border-copper/40 flex items-center justify-between text-[10px] font-mono text-copper">
                      <span>✓ Cotización personalizada activa</span>
                      <button
                        type="button"
                        onClick={() => setActiveCustomQuote(null)}
                        className="underline hover:text-ivory cursor-pointer"
                      >
                        Restablecer
                      </button>
                    </div>
                  )}
                </div>

                {/* Professional Selector Card */}
                <div className="mt-6 pt-4 border-t border-border-line/40">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-muted-editorial uppercase tracking-wider">
                      PROFESIONAL
                    </span>
                    <button
                      type="button"
                      onClick={handleNextArtist}
                      className="text-[10px] font-mono text-copper hover:text-copper-glow underline underline-offset-2 uppercase tracking-wider cursor-pointer"
                    >
                      CAMBIAR ARTISTA ↻
                    </button>
                  </div>

                  <div className="p-4 bg-stone-dark border border-border-line hover:border-copper/60 transition-colors flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-ivory">
                        {currentArtist.name}
                      </div>
                      <div className="text-[10px] font-mono text-muted-editorial mt-0.5">
                        {currentArtist.specialty}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs sm:text-sm text-copper font-bold">
                        {currentService.price}
                      </div>
                      <div className="text-[10px] font-mono text-muted-editorial">
                        // {currentService.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service description preview */}
                <p className="text-muted-editorial text-xs font-sans leading-relaxed pt-2">
                  {currentService.description}
                </p>
              </div>
            </div>

            {/* Micro bottom status */}
            <div className="mt-8 pt-4 border-t border-border-line/40 text-[10px] font-mono text-muted-editorial/60 flex justify-between">
              <span>ESTD. 2026</span>
              <span>ESTUDIO EDITORIAL</span>
            </div>
          </div>

          {/* COLUMN 2: DATE & TIME (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border-line relative flex flex-col justify-between overflow-hidden">
            {/* Background tattoo imagery with atmospheric warmth */}
            <div className="absolute inset-0 pointer-events-none opacity-30 -z-0">
              <img
                src="/images/booking_tattoo.jpg"
                alt="Background tattoo session"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian"></div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-6">
                <span className="text-copper font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase block mb-1">
                  02 // FECHA Y HORA
                </span>
                <span className="text-[10px] font-mono text-muted-editorial uppercase tracking-widest">
                  AGENDA SEMANAL EN TIEMPO REAL
                </span>
              </div>

              {/* Horizontal Date Selector (All available days) */}
              <div className="relative flex items-center justify-between gap-1 mb-8 select-none">
                <button
                  onClick={handlePrevDay}
                  className="p-1.5 text-muted-editorial hover:text-copper transition-colors cursor-pointer"
                  aria-label="Día anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 flex-1">
                  {AVAILABLE_DAYS.map((d, idx) => {
                    const isSelected = idx === dayIndex;
                    return (
                      <button
                        key={d.date}
                        onClick={() => setDayIndex(idx)}
                        className={`flex flex-col items-center justify-center py-3 sm:py-4 px-1 sm:px-2 font-mono transition-all duration-300 border cursor-pointer ${
                          isSelected
                            ? 'bg-copper text-obsidian border-copper shadow-copper-glow font-bold'
                            : 'bg-stone-dark/85 text-muted-editorial border-border-line hover:border-copper/40 hover:text-ivory'
                        }`}
                      >
                        <span className="text-[9px] sm:text-[10px] tracking-wider uppercase">{d.day}</span>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-black my-0.5 leading-tight">
                          {d.date}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-widest uppercase">{d.month}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNextDay}
                  className="p-1.5 text-muted-editorial hover:text-copper transition-colors cursor-pointer"
                  aria-label="Día siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Time Slots 3-Column Grid matching reference Image 1 */}
              <div>
                <label className="text-[10px] font-mono text-muted-editorial tracking-wider uppercase block mb-3">
                  FRANJAS HORARIAS DISPONIBLES
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    const isDisabled = !slot.available;

                    return (
                      <button
                        key={slot.time}
                        disabled={isDisabled}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-3 px-2 font-mono text-xs tracking-wider border text-center transition-all duration-300 cursor-pointer ${
                          isDisabled
                            ? 'bg-stone-dark/40 border-border-line/40 text-muted-editorial/40 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-stone-dark border-copper text-copper font-bold shadow-copper-glow ring-1 ring-copper'
                            : 'bg-stone-dark/80 border-border-line text-ivory hover:border-copper/50 hover:bg-stone-dark'
                        }`}
                      >
                        <div>{slot.time}</div>
                        {slot.label && (
                          <div className="text-[8px] uppercase tracking-tighter text-muted-editorial/60 mt-0.5">
                            {slot.label}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live slot reminder */}
            <div className="relative z-10 mt-8 pt-4 border-t border-border-line/60 text-[10px] font-mono text-copper flex items-center justify-between">
              <span>TURNO SELECCIONADO:</span>
              <span className="font-bold text-ivory">{currentDay.fullLabel} // {selectedTime}</span>
            </div>
          </div>

          {/* COLUMN 3: BOOKING CONFIRMATION - LUXURY DIE-CUT TICKET (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-obsidian">
            <div>
              {/* Header Photo: Master Barber at work with gradient blend */}
              <div className="relative w-full h-36 sm:h-44 overflow-hidden border border-border-line mb-6">
                <img
                  src="/images/booking_barber.jpg"
                  alt="Barbero de Autor trabajando"
                  className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-ivory/80 uppercase tracking-widest">
                  ESTUDIO // AUTOR DIRECTO
                </div>
              </div>

              {/* LUXURY DIE-CUT TICKET */}
              <div className="ticket-wrapper relative p-6 sm:p-7 shadow-2xl bg-[#12100E] border border-copper">
                {/* Semicircular notches on left & right borders */}
                <div className="ticket-notch-left top-[50px]"></div>
                <div className="ticket-notch-right top-[50px]"></div>

                {/* Ticket Header */}
                <div className="flex items-center justify-between pb-3">
                  <span className="text-copper font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                    03 // CONFIRMACIÓN DE CITA
                  </span>
                  <span className="text-[9px] font-mono text-muted-editorial">VNDL-PASS</span>
                </div>

                {/* Perforation Dashed Line */}
                <div className="border-b border-dashed border-copper/50 my-2"></div>

                {/* Real-time Dynamic Summary */}
                <div className="space-y-3 py-3 font-mono text-xs">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-editorial uppercase tracking-wider block">
                        RESUMEN
                      </span>
                      {activeCustomQuote && (
                        <span className="text-[9px] font-mono bg-copper/20 text-copper px-1.5 py-0.5 border border-copper/40 uppercase">
                          A MEDIDA
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-ivory text-sm tracking-wide mt-0.5">
                      {displayServiceTitle}
                    </div>
                    {displayDetails && (
                      <div className="text-[10px] text-copper mt-1 bg-stone-dark/80 p-1.5 border border-border-line">
                        {displayDetails}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-[10px] text-muted-editorial uppercase tracking-wider">ARTISTA: </span>
                      <span className="text-ivory font-medium">{currentArtist.name}</span>
                    </div>
                    <div className="text-copper font-bold text-sm">
                      {displayPrice}
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="text-[10px] text-muted-editorial uppercase tracking-wider">DURACIÓN ESTIMADA:</span>
                    <span className="text-ivory/90">{displayDuration}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-editorial uppercase tracking-wider block">
                      FECHA SELECCIONADA
                    </span>
                    <div className="text-copper font-bold tracking-wider">
                      {currentDay.day} {currentDay.date} {currentDay.month} // {selectedTime}
                    </div>
                  </div>
                </div>

                {/* Customer Input Fields */}
                <form onSubmit={handleConfirmReservation} className="space-y-4 pt-3 border-t border-border-line/60">
                  <div>
                    <label className="text-[10px] font-mono text-muted-editorial tracking-wider uppercase block mb-1">
                      NOMBRE COMPLETO
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Lucas Ferrari"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-obsidian border border-border-line focus:border-copper text-ivory font-mono text-xs px-3.5 py-2.5 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-muted-editorial tracking-wider uppercase block mb-1">
                      TELÉFONO DE CONTACTO
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +54 9 11 4059-3321"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-obsidian border border-border-line focus:border-copper text-ivory font-mono text-xs px-3.5 py-2.5 outline-none transition-colors"
                    />
                  </div>

                  {validationError && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-red-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Base full-width solid copper button */}
                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-copper hover:bg-copper-glow text-obsidian font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-copper-glow hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>CONFIRMAR RESERVA VÍA WHATSAPP</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Feedback alert if booked */}
            {confirmedBooking && (
              <div className="mt-4 p-3 bg-stone-dark border border-copper/60 text-xs font-mono text-copper flex items-center justify-between">
                <span>Cita #{confirmedBooking.id} guardada</span>
                <span className="text-[10px] text-ivory">Enviando WhatsApp...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
