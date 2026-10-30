import math
import os

os.makedirs("e:/barbertatu/logo-concepts", exist_ok=True)

# -------------------------------------------------------------
# CONCEPT A: THE SURGICAL V // CUT (Letterform / Monogram)
# -------------------------------------------------------------
# Angle = 60 degrees.
# Tan(60) = sqrt(3) ~= 1.7320508
# Sin(60) = sqrt(3)/2 ~= 0.8660254
# Cos(60) = 0.5
# Canvas: 256 x 256. Center: (128, 128).
# Apex at bottom: (128, 212).
# Height = 160 -> Top at y = 52.
# dx = 160 / sqrt(3) = 92.376
# Outer left: (128 - 92.38, 52) = (35.62, 52)
# Outer right: (128 + 92.38, 52) = (220.38, 52)
# Left arm thickness (perpendicular) = 32 -> horizontal dx = 32 / sin(60) = 36.95
# Inner left top: (35.62 + 36.95, 52) = (72.57, 52)
# Inner vertex at (128, 212 - 36.95 * sqrt(3)) = (128, 148)
#
# On the right arm, we create the signature '//' double-slash cut.
# Right arm has width 36.95.
# Inner bar: dx = 13.5
# Gap: dx = 10.0
# Outer bar: dx = 13.45
# The gap channel extends from y = 52 down to y = 158 at a 60 deg angle.

svg_a = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a">
  <title id="title-a">VANDAL // CLUB - Concept A: Surgical V-Cut</title>
  <!-- Monolithic Left Wing & Solid Apex Base -->
  <path fill="#111111" fill-rule="evenodd" d="
    M 35.62 52
    L 72.57 52
    L 128 148
    L 141.5 124.62
    L 141.5 52
    L 155.0 52
    L 155.0 135
    L 128 181.76
    L 128 212
    Z
    M 165 52
    L 178.45 52
    L 178.45 140
    L 165 140
    Z
  "/>
</svg>"""

# Wait, let's make the paths for Concept A even more refined and visually striking!
# Let's write a python generator that creates pure, mathematically verified paths.

