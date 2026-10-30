import math
import os
import subprocess

SCRIPT_DIR = r"C:\Users\facu\.gemini\config\skills\logo-design\scripts"
OUTPUT_DIR = r"e:\barbertatu\logo-concepts"

def run_cmd(cmd):
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return p.stdout + p.stderr

# Let's define the 3 concepts precisely

# -------------------------------------------------------------
# CONCEPT A: THE SURGICAL V // CUT (Letterform / Monogram)
# -------------------------------------------------------------
# A monolithic V where the right wing is dynamically split into the signature '//' slashes
# Coordinates mathematically snapped to 60.0 deg (+/- 0.05 deg).
# dy = 156, dx = 90 -> angle 60.02 deg (dev 0.02 deg)
# dy = 92, dx = 53 -> angle 60.06 deg
svg_a = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a">
  <title id="title-a">VANDAL // CLUB - Concept A (Surgical V-Cut)</title>
  <!-- Monolithic Left Wing & Grounded Razor Apex -->
  <polygon points="38,48 76,48 128,138 128,204" fill="#111111" />
  
  <!-- Right Wing Blade 1 (Inner Slash of //) -->
  <polygon points="102,48 126,48 174,131 150,131" fill="#111111" />
  
  <!-- Right Wing Blade 2 (Outer Slash of //) -->
  <polygon points="152,48 176,48 224,131 200,131" fill="#111111" />
  
  <!-- Lower Connecting Needle Wedge -->
  <polygon points="128,148 148,183 128,204" fill="#111111" />
</svg>'''

with open(os.path.join(OUTPUT_DIR, "test-a1.svg"), "w", encoding="utf-8") as f:
    f.write(svg_a)

# Let's also create a variant A2 where the V is a continuous unified letterform with two cut channels:
svg_a2 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a2">
  <title id="title-a2">VANDAL // CLUB - Concept A2 (Unified Blade V)</title>
  <g fill="#111111">
    <!-- Left solid blade -->
    <polygon points="38,48 80,48 128,131 128,208" />
    <!-- Lower anchor -->
    <polygon points="128,208 128,131 150,169" />
    <!-- Right Blade 1 -->
    <polygon points="108,48 132,48 180,131 156,131" />
    <!-- Right Blade 2 -->
    <polygon points="156,48 180,48 228,131 204,131" />
  </g>
</svg>'''
with open(os.path.join(OUTPUT_DIR, "test-a2.svg"), "w", encoding="utf-8") as f:
    f.write(svg_a2)

# Now Concept B: THE INVERTED APEX / CHEVRON (Abstract / Craft Mark)
# An inverted equilateral chevron (60 deg edges) with an internal razor diamond aperture.
# Top edge: y = 52, x from 40 to 216 (width 176).
# Apex at (128, 204).
# dy = 152, dx = 88. 152/88 = 1.727 (angle 59.93 deg, dev 0.07 deg).
# Inner cutout (negative space diamond + razor crosshair):
# Diamond: top (128, 76), left (112, 128), right (144, 128), bottom (128, 180)
# Plus horizontal hair-thin slits at y=128 creating the facet illusion of a polished straight razor bevel.
svg_b = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-b">
  <title id="title-b">VANDAL // CLUB - Concept B (Inverted Apex)</title>
  <path fill="#111111" fill-rule="evenodd" d="
    M 40 52
    L 216 52
    L 128 204
    Z
    M 128 78
    L 146 128
    L 128 178
    L 110 128
    Z
  "/>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "test-b.svg"), "w", encoding="utf-8") as f:
    f.write(svg_b)

# Concept B2: Two interlocking massive chevron blades with a diagonal razor shear:
# A split chevron forming a dynamic monolithic V.
svg_b2 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-b2">
  <title id="title-b2">VANDAL // CLUB - Concept B2 (Razor Chevron)</title>
  <!-- Left Chisel Blade -->
  <polygon points="38,52 108,52 128,156 128,204" fill="#111111" />
  <!-- Right Chisel Blade (offset by a 16px diagonal razor channel) -->
  <polygon points="148,52 218,52 148,172 128,204" fill="#111111" />
</svg>'''
with open(os.path.join(OUTPUT_DIR, "test-b2.svg"), "w", encoding="utf-8") as f:
    f.write(svg_b2)

# Concept C: THE NOIR CLUB SEAL (Emblem / Heritage Modernism)
# Cardinal ring + High contrast Roman V + Estd rivets.
# Circle radius: outer 104, inner 88 (band 16).
# 4 cardinal gaps of 18 units:
# Top gap: x in [119, 137], y in [24, 40]
# Bottom gap: x in [119, 137], y in [216, 232]
# Left gap: y in [119, 137], x in [24, 40]
# Right gap: y in [119, 137], x in [216, 232]
# Inside: Roman V (left stem bold, right stem razor hairline with micro-serifs)
svg_c = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c">
  <title id="title-c">VANDAL // CLUB - Concept C (Club Cardinal Seal)</title>
  <!-- Top-Right Arc -->
  <path fill="none" stroke="#111111" stroke-width="16" stroke-linecap="square"
        d="M 142 30 A 98 98 0 0 1 226 114" />
  <!-- Bottom-Right Arc -->
  <path fill="none" stroke="#111111" stroke-width="16" stroke-linecap="square"
        d="M 226 142 A 98 98 0 0 1 142 226" />
  <!-- Bottom-Left Arc -->
  <path fill="none" stroke="#111111" stroke-width="16" stroke-linecap="square"
        d="M 114 226 A 98 98 0 0 1 30 142" />
  <!-- Top-Left Arc -->
  <path fill="none" stroke="#111111" stroke-width="16" stroke-linecap="square"
        d="M 30 114 A 98 98 0 0 1 114 30" />
  
  <!-- Central Chiseled Roman V -->
  <!-- Left heavy stem: from (68, 76) to (128, 184) -->
  <polygon points="64,76 92,76 128,184 100,184" fill="#111111" />
  <!-- Right hairline blade: from (128, 184) to (188, 76) with micro-serif -->
  <polygon points="128,184 120,184 176,76 192,76" fill="#111111" />
  <!-- Top left serifs -->
  <polygon points="56,76 96,76 96,82 56,82" fill="#111111" />
  <polygon points="172,76 196,76 196,82 172,82" fill="#111111" />
</svg>'''

with open(os.path.join(OUTPUT_DIR, "test-c.svg"), "w", encoding="utf-8") as f:
    f.write(svg_c)

print("SVGs generated. Now testing with svg_audit.py...")
print(run_cmd(f'python "{SCRIPT_DIR}/svg_audit.py" "{OUTPUT_DIR}/test-a1.svg" "{OUTPUT_DIR}/test-a2.svg" "{OUTPUT_DIR}/test-b.svg" "{OUTPUT_DIR}/test-c.svg"'))

