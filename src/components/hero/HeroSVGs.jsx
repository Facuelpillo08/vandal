import React from 'react';

/**
 * Dark Luxury & Industrial Craft Barber Scissors SVG
 * Features: Japanese convex razor edge, Damascus steel ripples,
 * faceted ergonomic crane handle, ruby-gem tension dial, and polished copper chamfers.
 */
export function BarberScissorsSVG({ className = '', style = {}, innerRef }) {
  return (
    <svg
      ref={innerRef}
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Damascus & Titanium Steel Gradients */}
        <linearGradient id="scisSteelPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="15%" stopColor="#E5E0D8" />
          <stop offset="45%" stopColor="#8C857B" />
          <stop offset="70%" stopColor="#3A3530" />
          <stop offset="100%" stopColor="#181614" />
        </linearGradient>

        <linearGradient id="scisSteelSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF8F5" />
          <stop offset="25%" stopColor="#D48C46" />
          <stop offset="50%" stopColor="#6E675F" />
          <stop offset="85%" stopColor="#221F1C" />
          <stop offset="100%" stopColor="#0D0C0B" />
        </linearGradient>

        {/* Polished Copper Accents */}
        <linearGradient id="scisCopperGlow" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFE0BA" />
          <stop offset="30%" stopColor="#E6A96B" />
          <stop offset="70%" stopColor="#D48C46" />
          <stop offset="100%" stopColor="#7A4217" />
        </linearGradient>

        <linearGradient id="scisRubyJewel" x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="40%" stopColor="#C92A2A" />
          <stop offset="80%" stopColor="#5C0D0D" />
          <stop offset="100%" stopColor="#2B0505" />
        </linearGradient>

        <linearGradient id="scisHandleShank" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D2824" />
          <stop offset="45%" stopColor="#181614" />
          <stop offset="80%" stopColor="#0D0C0B" />
          <stop offset="100%" stopColor="#221F1C" />
        </linearGradient>

        {/* Dynamic Specular Highlights */}
        <linearGradient id="scisRazorEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E6A96B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>

        {/* Multi-layer Drop Shadow */}
        <filter id="scisLuxuryShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#0D0C0B" floodOpacity="0.85" />
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#D48C46" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#scisLuxuryShadow)">
        {/* ================= BLADE 1: CONVEX HAMAGURI-BA (RIGHT/FRONT) ================= */}
        {/* Blade Base Silhouette */}
        <path
          d="M96 136 L168 28 C170 24 173 25 174 29 C176 36 162 76 142 112 L108 152 Z"
          fill="url(#scisSteelPrimary)"
          stroke="#D48C46"
          strokeWidth="1.2"
        />

        {/* Damascus Pattern Wave Micro-lines on Blade 1 */}
        <path
          d="M106 132 C116 112 134 94 150 64 M114 126 C122 108 140 88 156 56 M122 118 C132 98 148 78 162 46"
          stroke="url(#scisCopperGlow)"
          strokeWidth="0.7"
          strokeDasharray="4 2"
          opacity="0.55"
        />

        {/* Razor-Sharp Polished Micro-Bevel Cutting Edge */}
        <path
          d="M96 136 L168 28"
          stroke="url(#scisRazorEdge)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Specular Glint Reflection on Blade Spine */}
        <path
          d="M108 152 L174 29"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          opacity="0.75"
        />

        {/* ================= BLADE 2: COUNTER SWORD BLADE (LEFT/BACK) ================= */}
        {/* Blade Base Silhouette */}
        <path
          d="M104 136 L32 28 C30 24 27 25 26 29 C24 36 38 76 58 112 L92 152 Z"
          fill="url(#scisSteelSecondary)"
          stroke="#E6A96B"
          strokeWidth="1.2"
        />

        {/* Damascus Wave Micro-lines on Blade 2 */}
        <path
          d="M94 132 C84 112 66 94 50 64 M86 126 C78 108 60 88 44 56 M78 118 C68 98 52 78 38 46"
          stroke="url(#scisSteelPrimary)"
          strokeWidth="0.7"
          strokeDasharray="4 2"
          opacity="0.45"
        />

        {/* Razor-Sharp Cutting Edge Left */}
        <path
          d="M104 136 L32 28"
          stroke="url(#scisRazorEdge)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Editorial Engraving on Left Blade Fuller */}
        <text
          x="62"
          y="102"
          fill="#D48C46"
          fontSize="4.2"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="1.2"
          transform="rotate(50 62 102)"
          opacity="0.8"
        >
          VNDL // COBALT 6.0
        </text>

        {/* ================= ERGONOMIC CRANE HANDLES & RINGS ================= */}
        {/* Right Shank & Finger Ring */}
        <path
          d="M108 148 C116 164 132 178 142 195 C150 208 152 226 142 240 C130 254 108 250 102 232 C97 220 104 206 106 190 Z"
          fill="url(#scisHandleShank)"
          stroke="url(#scisCopperGlow)"
          strokeWidth="2.2"
        />
        {/* Right Finger Ring Inner Hole with Comfort Chamfer */}
        <ellipse
          cx="126"
          cy="226"
          rx="15"
          ry="17"
          fill="#0D0C0B"
          stroke="#D48C46"
          strokeWidth="1.8"
        />
        <ellipse
          cx="126"
          cy="226"
          rx="12.5"
          ry="14.5"
          fill="none"
          stroke="url(#scisCopperGlow)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Ergonomic Curved Finger Tang / Rest */}
        <path
          d="M142 240 C154 247 167 250 174 244 C177 241 175 236 168 235 C159 235 150 238 142 240 Z"
          fill="url(#scisCopperGlow)"
          stroke="#8C5325"
          strokeWidth="0.8"
        />

        {/* Left Shank & Thumb Ring */}
        <path
          d="M92 148 C84 164 68 178 58 195 C50 208 48 226 58 240 C70 254 92 250 98 232 C103 220 96 206 94 190 Z"
          fill="url(#scisHandleShank)"
          stroke="url(#scisCopperGlow)"
          strokeWidth="2.2"
        />
        {/* Left Thumb Ring Inner Hole with Comfort Chamfer */}
        <ellipse
          cx="74"
          cy="226"
          rx="15"
          ry="17"
          fill="#0D0C0B"
          stroke="#D48C46"
          strokeWidth="1.8"
        />
        <ellipse
          cx="74"
          cy="226"
          rx="12.5"
          ry="14.5"
          fill="none"
          stroke="url(#scisCopperGlow)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Rubberized Acoustic Silencer / Bumper */}
        <circle cx="100" cy="208" r="3.8" fill="#181614" stroke="#D48C46" strokeWidth="1.2" />
        <circle cx="100" cy="208" r="1.8" fill="#E6A96B" />

        {/* ================= MECHANICAL PIVOT & RUBY JEWEL DIAL ================= */}
        {/* Outer Knurled Click-Tension Wheel (Stepped Gear Plate) */}
        <circle cx="100" cy="140" r="14" fill="#181614" stroke="url(#scisCopperGlow)" strokeWidth="2.5" />
        
        {/* Gear dial radial notches (12 precision micro-teeth) */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="128"
            x2="100"
            y2="131"
            stroke="#FFE0BA"
            strokeWidth="1.5"
            transform={`rotate(${deg} 100 140)`}
          />
        ))}

        {/* Ball Bearing Intermediate Ring */}
        <circle cx="100" cy="140" r="9.5" fill="#292521" stroke="#D48C46" strokeWidth="1" />

        {/* Center Ruby Jewel Tension Dial */}
        <circle cx="100" cy="140" r="6.5" fill="url(#scisRubyJewel)" stroke="#E6A96B" strokeWidth="1.2" />
        {/* Facet Light Sparkle on Ruby */}
        <polygon points="98,136 102,136 104,139 101,142 97,141" fill="#FFFFFF" opacity="0.6" />
        <circle cx="98.5" cy="138" r="1.2" fill="#FFFFFF" opacity="0.9" />
      </g>
    </svg>
  );
}

/**
 * Dark Luxury & Industrial Craft Tattoo Machine SVG
 * Features: High-precision custom wireless pen machine, OLED digital readout,
 * transparent inspection glass showing rotary motor cam wheel, dual-tone knurled grip,
 * calibrated needle depth collar, and razor surgical cartridge with ink sheen.
 */
export function TattooMachineSVG({ className = '', style = {}, innerRef }) {
  return (
    <svg
      ref={innerRef}
      viewBox="0 0 180 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Aerospace Titanium & Anodized Metal */}
        <linearGradient id="tatMachineChassis" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#322E2A" />
          <stop offset="25%" stopColor="#1C1A18" />
          <stop offset="60%" stopColor="#0D0C0B" />
          <stop offset="85%" stopColor="#221F1C" />
          <stop offset="100%" stopColor="#3A3530" />
        </linearGradient>

        {/* Polished Warm Copper Gradients */}
        <linearGradient id="tatCopperWarm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE0BA" />
          <stop offset="35%" stopColor="#E6A96B" />
          <stop offset="70%" stopColor="#D48C46" />
          <stop offset="100%" stopColor="#8C5325" />
        </linearGradient>

        <linearGradient id="tatCopperGrip" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E6A96B" />
          <stop offset="30%" stopColor="#D48C46" />
          <stop offset="70%" stopColor="#7A4217" />
          <stop offset="100%" stopColor="#E6A96B" />
        </linearGradient>

        {/* Smoked Inspection Glass */}
        <linearGradient id="tatSmokedGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3A3530" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#181614" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0D0C0B" stopOpacity="0.95" />
        </linearGradient>

        {/* Surgical Steel Needle */}
        <linearGradient id="tatNeedleSteel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#B5AEA4" />
          <stop offset="100%" stopColor="#8C857B" />
        </linearGradient>

        {/* Multi-layer Shadow Filter */}
        <filter id="tatLuxuryShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#0D0C0B" floodOpacity="0.9" />
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#D48C46" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#tatLuxuryShadow)">
        {/* ================= 1. TOP WIRELESS BATTERY MODULE & OLED SCREEN ================= */}
        {/* Top RCA/Battery Connector Cap */}
        <path d="M80 14 L100 14 L97 26 L83 26 Z" fill="#8C857B" stroke="#292521" strokeWidth="1.2" />
        <rect x="76" y="26" width="28" height="8" rx="2" fill="url(#tatCopperWarm)" />

        {/* Main Battery Housing */}
        <rect
          x="66"
          y="34"
          width="48"
          height="38"
          rx="5"
          fill="url(#tatMachineChassis)"
          stroke="#D48C46"
          strokeWidth="1.6"
        />

        {/* OLED Digital Display Frame */}
        <rect x="72" y="42" width="36" height="20" rx="3" fill="#050505" stroke="#292521" strokeWidth="1.2" />

        {/* OLED Voltage Glow Readout */}
        <text
          x="90"
          y="54"
          fill="#FFE0BA"
          fontSize="7.5"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          8.4V
        </text>
        <text
          x="90"
          y="60"
          fill="#D48C46"
          fontSize="4"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="middle"
          letterSpacing="1"
        >
          112 HZ
        </text>

        {/* Micro tactile buttons (+ / -) */}
        <circle cx="70" cy="52" r="1.8" fill="#D48C46" />
        <circle cx="110" cy="52" r="1.8" fill="#D48C46" />

        {/* Copper Battery Collar Ring */}
        <rect x="64" y="72" width="52" height="6" rx="2" fill="url(#tatCopperWarm)" />

        {/* ================= 2. MOTOR SECTION WITH CAM INSPECTION WINDOW ================= */}
        {/* Main Pen Chassis */}
        <rect
          x="62"
          y="78"
          width="56"
          height="72"
          rx="6"
          fill="url(#tatMachineChassis)"
          stroke="#D48C46"
          strokeWidth="1.6"
        />

        {/* Laser Branding Typography */}
        <text
          x="90"
          y="93"
          fill="#FAF8F5"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="2.5"
        >
          VNDL
        </text>
        <text
          x="90"
          y="101"
          fill="#D48C46"
          fontSize="4.5"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="middle"
          letterSpacing="1.2"
        >
          DIRECT DRIVE // 4.0MM
        </text>

        {/* Smoked Quartz Rotary Inspection Window */}
        <rect
          x="73"
          y="108"
          width="34"
          height="34"
          rx="17"
          fill="url(#tatSmokedGlass)"
          stroke="url(#tatCopperWarm)"
          strokeWidth="1.8"
        />

        {/* Internal Rotary Eccentric Cam Wheel (Moving Mechanical Heart) */}
        <circle cx="90" cy="125" r="11" fill="#181614" stroke="#8C5325" strokeWidth="1.5" />
        <circle cx="90" cy="125" r="7.5" fill="url(#tatCopperWarm)" />
        {/* Eccentric Bearing & Counterweight Pin */}
        <circle cx="93" cy="122" r="3.2" fill="#0D0C0B" stroke="#FAF8F5" strokeWidth="1" />
        <circle cx="93" cy="122" r="1.4" fill="#D48C46" />
        {/* Curved Glass Specular Highlight Reflection */}
        <path
          d="M77 114 C82 110 98 110 103 114"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* ================= 3. NEEDLE DEPTH CLICK COLLAR ================= */}
        <rect x="64" y="150" width="52" height="10" fill="#181614" stroke="#D48C46" strokeWidth="1.2" />
        {/* Calibration Ticks (0, 1.5, 3.0, 4.5 mm) */}
        {[-18, -9, 0, 9, 18].map((offset, i) => (
          <line
            key={i}
            x1={90 + offset}
            y1="151"
            x2={90 + offset}
            y2="159"
            stroke={offset === 0 ? '#FFE0BA' : '#8C857B'}
            strokeWidth={offset === 0 ? '1.5' : '1'}
          />
        ))}

        {/* ================= 4. DUAL-TONE DIAMOND KNURLED GRIP ================= */}
        {/* Tapered Ergonomic Grip Body */}
        <rect
          x="65"
          y="160"
          width="50"
          height="45"
          rx="5"
          fill="url(#tatCopperGrip)"
          stroke="#8C5325"
          strokeWidth="1.5"
        />

        {/* Diamond Knurling Pattern Cross-Hatching */}
        <g opacity="0.45" stroke="#181614" strokeWidth="1.2">
          {/* Diagonal Lines Left to Right */}
          <line x1="66" y1="168" x2="114" y2="198" />
          <line x1="66" y1="176" x2="114" y2="206" />
          <line x1="66" y1="160" x2="114" y2="190" />
          <line x1="66" y1="184" x2="100" y2="205" />
          {/* Diagonal Lines Right to Left */}
          <line x1="114" y1="168" x2="66" y2="198" />
          <line x1="114" y1="176" x2="66" y2="206" />
          <line x1="114" y1="160" x2="66" y2="190" />
          <line x1="114" y1="184" x2="80" y2="205" />
        </g>

        {/* Center Polished Dark Titanium Accent Band on Grip */}
        <rect x="67" y="177" width="46" height="11" rx="2" fill="#181614" stroke="#D48C46" strokeWidth="1.2" />
        <line x1="69" y1="182" x2="111" y2="182" stroke="url(#tatCopperWarm)" strokeWidth="1" strokeDasharray="4 2" />

        {/* ================= 5. SURGICAL CARTRIDGE & 3RL NEEDLE ================= */}
        {/* Cartridge Lock Collar */}
        <polygon points="70,205 110,205 104,220 76,220" fill="url(#tatCopperWarm)" stroke="#292521" strokeWidth="1.2" />

        {/* Smoked Medical-Grade Polycarbonate Cartridge Nozzle */}
        <polygon
          points="78,220 102,220 95,258 85,258"
          fill="#292521"
          opacity="0.88"
          stroke="#8C857B"
          strokeWidth="1.2"
        />

        {/* Amber Safety Membrane inside Cartridge */}
        <ellipse cx="90" cy="227" rx="8" ry="3" fill="#E6A96B" opacity="0.9" />

        {/* Internal Surgical Steel Needle Bar */}
        <line
          x1="90"
          y1="220"
          x2="90"
          y2="280"
          stroke="url(#tatNeedleSteel)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 3RL Micro Needle Taper cluster */}
        <line x1="88.8" y1="268" x2="88.8" y2="280" stroke="#FFFFFF" strokeWidth="0.8" />
        <line x1="91.2" y1="268" x2="91.2" y2="280" stroke="#FFFFFF" strokeWidth="0.8" />

        {/* Fresh Obsidian Ink Drop at Needle Tip with Copper Specular Glow */}
        <circle cx="90" cy="283" r="3.2" fill="#0D0C0B" stroke="#D48C46" strokeWidth="1.4" />
        <circle cx="89" cy="282" r="1.1" fill="#FFE0BA" opacity="0.9" />
      </g>
    </svg>
  );
}
