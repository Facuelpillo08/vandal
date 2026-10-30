import math
import os
import subprocess

SCRIPT_DIR = r"C:\Users\facu\.gemini\config\skills\logo-design\scripts"
OUTPUT_DIR = r"e:\barbertatu\logo-concepts"
RENDERS_DIR = os.path.join(OUTPUT_DIR, "renders")

SQ3 = math.sqrt(3)

# -------------------------------------------------------------
# Refined Concept B: "THE RAZOR APEX / NEEDLE CORE"
# -------------------------------------------------------------
# Equilateral chevron: Top y = 52, Apex at (128, 204.42).
# All angles strictly 60.00 deg or 0 deg or 90 deg.
# Outer triangle: (40, 52) -> (216, 52) -> (128, 204.42)
# Inside:
# 60° Diamond: Top (128, 76), Right (158, 128), Bottom (128, 180), Left (98, 128)
# All 4 edges of diamond: dy = 52, dx = 30 -> 52/30 = 1.7333 ~= SQ3 (60.02 deg, dev 0.02 deg!)
# Plus two horizontal razor slots at y=128 running from x=60 to x=98 (left) and x=158 to x=196 (right),
# with height 8 (from y=124 to y=132).
# Let's verify angles of horizontal slots: 0 deg and 90 deg!
# This creates a multifaceted steel badge: an inverted shield with a tattoo needle diamond core
# and razor-caliper wings.

# Let's write Concept B using clean evenodd path:
# Outer triangle clockwise:
# (40, 52) -> (216, 52) -> (128, 204.42) -> Z
# Diamond counter-clockwise:
# (128, 76) -> (98, 128) -> (128, 180) -> (158, 128) -> Z

svg_b_refined = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-b">
  <title id="title-b">VANDAL // CLUB - Concept B: Razor Apex</title>
  <!-- Inverted Equilateral Chevron with 60° Tattoo Diamond Aperture -->
  <path fill="#111111" fill-rule="evenodd" d="
    M 40 52
    L 216 52
    L 128 204.42
    Z
    M 128 76
    L 98 128
    L 128 180
    L 158 128
    Z
  "/>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "concept-b.svg"), "w", encoding="utf-8") as f:
    f.write(svg_b_refined)

# -------------------------------------------------------------
# Refined Concept C: "THE HERITAGE CLUB SEAL"
# -------------------------------------------------------------
# Centered at (128, 128).
# Outer ring: r_out = 96, r_in = 84 (thickness 12).
# 4 cardinal notches of 14px:
# At 90 deg (top): x in [121, 135], y in [32, 44]
# At 270 deg (bottom): x in [121, 135], y in [212, 224]
# At 180 deg (left): y in [121, 135], x in [32, 44]
# At 0 deg (right): y in [121, 135], x in [212, 224]
#
# Inside: Chiseled Roman V at exact 75.00 deg:
# Height = 100 (y from 78 to 178).
# At 75 deg: tan(75) = 2 + SQ3 ~= 3.73205.
# dx = 100 / 3.73205 = 26.79 ~= 26.8.
# Vertex at (128, 178).
# Left stem:
# Outer top: (128 - 26.8, 78) = (101.2, 78)
# Outer line: (101.2, 78) to (128, 178) [dy=100, dx=26.8 -> dy/dx = 3.7313 -> angle 74.99 deg!]
# Inner stem line: shifted by dx = 18 -> (101.2 + 18, 78) = (119.2, 78) to (128, 144.82)
# dy = 66.82, dx = 119.2 - 128 = -8.8 ? Wait, let's make the inner line parallel at 75 deg!
# Inner line: from (119.2, 78) to (128, 110.8) ? No, if parallel: dx = dy / 3.732.
# If inner vertex is at (128, 140), dy = 62 -> dx = 62 / 3.732 = 16.61.
# So inner top = (128 - 16.61, 78) = (111.39, 78).
# Then left stem width at top = 111.39 - 101.2 = 10.19.
#
# Let's construct the Roman V with exact, mathematically audited angles!
# Or even better: 60° geometry for the V inside the seal!
# If V is at 60 deg:
# Apex at (128, 176). Height = 96 (from y=80 to y=176).
# dx = 96 / SQ3 = 55.43.
# Outer top left: (128 - 55.43, 80) = (72.57, 80).
# Outer top right: (128 + 55.43, 80) = (183.43, 80).
# Left stem thickness (horizontal): 24 -> dx = 24.
# Inner top left: (72.57 + 24, 80) = (96.57, 80).
# Inner vertex at (128, 176 - 24*SQ3) = (128, 134.43).
# Right stem hairline (horizontal width): 10.
# Inner top right: (183.43 - 10, 80) = (173.43, 80).
# Right stem connects (183.43, 80) to (128, 176), and (173.43, 80) to (128, 158.68).
# Base connects (128, 176) to (128, 134.43).
# And top serifs: 0 deg horizontal bars.
# Plus two architectural circular rivets at (62, 128) and (194, 128) with radius 4.

# Let's write the 4 quadrants of the cardinal ring:
# Center (128, 128), r_out = 96, r_in = 84.
# Cardinal gap = 16px -> half-gap = 8px.
# At top (y around 32-44): gap x in [120, 136]
# At bottom: gap x in [120, 136]
# At left: gap y in [120, 136]
# At right: gap y in [120, 136]
# In polar coordinates:
# Gap angle: asin(8 / 96) ~= 4.78 deg.
# Top-Right arc goes from (90 - 4.78) = 85.22 deg to 4.78 deg.
# At 85.22 deg: x = 128 + 96*cos(85.22) = 128 + 8 = 136. y = 128 - 96*sin(85.22) = 128 - 95.67 = 32.33
# At 4.78 deg: x = 128 + 95.67 = 223.67. y = 128 - 8 = 120.
# Inner arc: r = 84.
# At 4.78 deg: x = 128 + 84*cos(4.78) = 128 + 83.71 = 211.71. y = 128 - 84*sin(4.78) = 128 - 7.0 = 121.
# At 85.22 deg: x = 128 + 7.0 = 135. y = 128 - 83.71 = 44.29.

svg_c_refined = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c">
  <title id="title-c">VANDAL // CLUB - Concept C: Heritage Cardinal Seal</title>
  <!-- Cardinal 4-Segment Frame (Pure Outlines) -->
  <g fill="#111111">
    <!-- Top-Right Quadrant -->
    <path d="M 136 32.33 A 96 96 0 0 1 223.67 120 L 211.71 120 A 84 84 0 0 0 136 44.29 Z" />
    <!-- Bottom-Right Quadrant -->
    <path d="M 223.67 136 A 96 96 0 0 1 136 223.67 L 136 211.71 A 84 84 0 0 0 211.71 136 Z" />
    <!-- Bottom-Left Quadrant -->
    <path d="M 120 223.67 A 96 96 0 0 1 32.33 136 L 44.29 136 A 84 84 0 0 0 120 211.71 Z" />
    <!-- Top-Left Quadrant -->
    <path d="M 32.33 120 A 96 96 0 0 1 120 32.33 L 120 44.29 A 84 84 0 0 0 44.29 120 Z" />
    
    <!-- Central Modern Roman V (Exact 60° Geometry) -->
    <!-- Left Bold Stem -->
    <polygon points="72.57,80 96.57,80 128,134.43 128,176" />
    <!-- Right Hairline Blade -->
    <polygon points="128,176 128,158.68 173.43,80 183.43,80" />
    <!-- Left Top Serif -->
    <polygon points="64,74 104,74 104,80 64,80" />
    <!-- Right Top Serif -->
    <polygon points="168,74 190,74 190,80 168,80" />
    
    <!-- Cardinal Precision Rivets -->
    <circle cx="58" cy="128" r="4.5" />
    <circle cx="198" cy="128" r="4.5" />
  </g>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "concept-c.svg"), "w", encoding="utf-8") as f:
    f.write(svg_c_refined)

print("Running svg_audit.py on refined concepts...")
audit_out = subprocess.run(
    f'python "{SCRIPT_DIR}/svg_audit.py" "{OUTPUT_DIR}/concept-a.svg" "{OUTPUT_DIR}/concept-b.svg" "{OUTPUT_DIR}/concept-c.svg"',
    shell=True, capture_output=True, text=True
)
print(audit_out.stdout + audit_out.stderr)

print("Rendering refined PNGs...")
render_out = subprocess.run(
    f'python "{SCRIPT_DIR}/render_png.py" "{OUTPUT_DIR}/concept-a.svg" "{OUTPUT_DIR}/concept-b.svg" "{OUTPUT_DIR}/concept-c.svg" --out-dir "{RENDERS_DIR}" --size 512',
    shell=True, capture_output=True, text=True
)
print(render_out.stdout + render_out.stderr)

