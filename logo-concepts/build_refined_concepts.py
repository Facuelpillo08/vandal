import math
import os
import subprocess

SCRIPT_DIR = r"C:\Users\facu\.gemini\config\skills\logo-design\scripts"
OUTPUT_DIR = r"e:\barbertatu\logo-concepts"
RENDERS_DIR = os.path.join(OUTPUT_DIR, "renders")
os.makedirs(RENDERS_DIR, exist_ok=True)

SQ3 = math.sqrt(3)

# -------------------------------------------------------------------------
# CONCEPT A: THE SURGICAL V // CUT (Letterform / Monogram)
# -------------------------------------------------------------------------
svg_concept_a = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a">
  <title id="title-a">VANDAL // CLUB - Concept A (Surgical V-Cut)</title>
  <!-- Compound V with 60° geometry and signature // negative channel -->
  <path fill="#111111" fill-rule="evenodd" d="
    M 40.24 58
    L 84.24 58
    L 128 133.79
    L 171.76 58
    L 215.76 58
    L 128 210
    Z
    M 187.76 58
    L 199.76 58
    L 142.02 158
    L 130.02 158
    Z
  "/>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "concept-a.svg"), "w", encoding="utf-8") as f:
    f.write(svg_concept_a)

# -------------------------------------------------------------------------
# CONCEPT B: THE FACETED RAZOR CHEVRON (Abstract / Craft Mark)
# -------------------------------------------------------------------------
svg_concept_b = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-b">
  <title id="title-b">VANDAL // CLUB - Concept B (Faceted Razor Chevron)</title>
  <path fill="#111111" fill-rule="evenodd" d="
    M 40 54
    L 216 54
    L 128 206
    Z
    M 128 74
    L 142 124
    L 192 124
    L 192 132
    L 142 132
    L 128 182
    L 114 132
    L 64 132
    L 64 124
    L 114 124
    Z
  "/>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "concept-b.svg"), "w", encoding="utf-8") as f:
    f.write(svg_concept_b)

# -------------------------------------------------------------------------
# CONCEPT C: THE NOIR CLUB CIPHER (Emblem / Modern Seal)
# -------------------------------------------------------------------------
svg_concept_c = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c">
  <title id="title-c">VANDAL // CLUB - Concept C (Club Cardinal Seal)</title>
  <g fill="#111111">
    <!-- Top-Right Quadrant Arc -->
    <path d="M 136 29.08 A 100 100 0 0 1 226.92 120 L 211.27 120 A 84 84 0 0 0 136 44.82 Z" />
    <!-- Bottom-Right Quadrant Arc -->
    <path d="M 226.92 136 A 100 100 0 0 1 136 226.92 L 136 211.27 A 84 84 0 0 0 211.27 136 Z" />
    <!-- Bottom-Left Quadrant Arc -->
    <path d="M 120 226.92 A 100 100 0 0 1 29.08 136 L 44.82 136 A 84 84 0 0 0 120 211.27 Z" />
    <!-- Top-Left Quadrant Arc -->
    <path d="M 29.08 120 A 100 100 0 0 1 120 29.08 L 120 44.82 A 84 84 0 0 0 44.82 120 Z" />
    
    <!-- Central Interlocking VC Monogram -->
    <!-- The "C" Arc: Concentric ring on the right, r_out=60, r_in=44, from 45 deg to 315 deg -->
    <path d="
      M 162.43 85.57
      A 60 60 0 1 1 162.43 170.43
      L 151.11 159.11
      A 44 44 0 1 0 151.11 96.89
      Z
    " />
    
    <!-- The "V" Blade: Sharp monolithic V intersecting the C -->
    <polygon points="76,74 104,74 128,154 128,182 108,182" />
    <polygon points="128,182 128,154 156,74 180,74 138,182" />
  </g>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "concept-c.svg"), "w", encoding="utf-8") as f:
    f.write(svg_concept_c)

print("SVGs written. Running svg_audit.py...")
audit_out = subprocess.run(
    f'python "{SCRIPT_DIR}/svg_audit.py" "{OUTPUT_DIR}/concept-a.svg" "{OUTPUT_DIR}/concept-b.svg" "{OUTPUT_DIR}/concept-c.svg"',
    shell=True, capture_output=True, text=True
)
print(audit_out.stdout + audit_out.stderr)

print("Rendering PNGs with render_png.py...")
render_out = subprocess.run(
    f'python "{SCRIPT_DIR}/render_png.py" "{OUTPUT_DIR}/concept-a.svg" "{OUTPUT_DIR}/concept-b.svg" "{OUTPUT_DIR}/concept-c.svg" --out-dir "{RENDERS_DIR}" --size 512',
    shell=True, capture_output=True, text=True
)
print(render_out.stdout + render_out.stderr)
