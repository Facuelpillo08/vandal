import math
import os
import subprocess

SCRIPT_DIR = r"C:\Users\facu\.gemini\config\skills\logo-design\scripts"
OUTPUT_DIR = r"e:\barbertatu\logo-concepts\final-kit"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SQ3 = math.sqrt(3)

# -------------------------------------------------------------
# 1. FINAL MASTER SYMBOL: vandal-symbol.svg (256x256)
# -------------------------------------------------------------
vandal_symbol_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="vandal-symbol-title">
  <title id="vandal-symbol-title">VANDAL // CLUB - Master Symbol</title>
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

with open(os.path.join(OUTPUT_DIR, "vandal-symbol.svg"), "w", encoding="utf-8") as f:
    f.write(vandal_symbol_svg)

# -------------------------------------------------------------
# 2. SMALL-SIZE CUT: vandal-symbol-small.svg (16px/32px)
# -------------------------------------------------------------
vandal_symbol_small_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="vandal-small-title">
  <title id="vandal-small-title">VANDAL // CLUB - Small Size Symbol (16-32px)</title>
  <path fill="#111111" fill-rule="evenodd" d="
    M 38 56
    L 86 56
    L 128 128.7
    L 170 56
    L 218 56
    L 128 212
    Z
    M 184 56
    L 200 56
    L 145 151.27
    L 129 151.27
    Z
  "/>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "vandal-symbol-small.svg"), "w", encoding="utf-8") as f:
    f.write(vandal_symbol_small_svg)

# -------------------------------------------------------------
# TYPOGRAPHY GENERATOR (Pure vector geometry)
# -------------------------------------------------------------
def build_wordmark(start_x, base_y, cap_h, stem_w, fill_text="#111111", fill_slash="#D48C46"):
    scale = cap_h / 56.0
    paths = []
    x = start_x
    y_top = base_y - cap_h
    y_bot = base_y
    gap = 12 * scale
    
    # V
    vw = 44 * scale
    vx_mid = x + vw / 2
    paths.append(f'<polygon points="{x:.1f},{y_top:.1f} {x+stem_w*1.3:.1f},{y_top:.1f} {vx_mid:.1f},{y_bot - stem_w*1.6:.1f} {vx_mid:.1f},{y_bot:.1f}" fill="{fill_text}" />')
    paths.append(f'<polygon points="{x+vw:.1f},{y_top:.1f} {x+vw - stem_w*1.3:.1f},{y_top:.1f} {vx_mid:.1f},{y_bot - stem_w*1.6:.1f} {vx_mid:.1f},{y_bot:.1f}" fill="{fill_text}" />')
    x += vw + gap
    
    # A
    aw = 44 * scale
    ax_mid = x + aw / 2
    paths.append(f'''<path fill="{fill_text}" fill-rule="evenodd" d="
      M {ax_mid:.1f} {y_top:.1f}
      L {x+aw:.1f} {y_bot:.1f}
      L {x+aw - stem_w*1.3:.1f} {y_bot:.1f}
      L {ax_mid + 7.5*scale:.1f} {y_bot - 24*scale:.1f}
      L {ax_mid - 7.5*scale:.1f} {y_bot - 24*scale:.1f}
      L {x + stem_w*1.3:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {ax_mid:.1f} {y_top + 16*scale:.1f}
      L {ax_mid + 6.0*scale:.1f} {y_bot - 32*scale:.1f}
      L {ax_mid - 6.0*scale:.1f} {y_bot - 32*scale:.1f}
      Z
    "/>''')
    x += aw + gap
    
    # N
    nw = 40 * scale
    paths.append(f'<polygon points="{x:.1f},{y_top:.1f} {x+stem_w:.1f},{y_top:.1f} {x+stem_w:.1f},{y_bot:.1f} {x:.1f},{y_bot:.1f}" fill="{fill_text}" />')
    paths.append(f'<polygon points="{x+nw-stem_w:.1f},{y_top:.1f} {x+nw:.1f},{y_top:.1f} {x+nw:.1f},{y_bot:.1f} {x+nw-stem_w:.1f},{y_bot:.1f}" fill="{fill_text}" />')
    paths.append(f'<polygon points="{x+stem_w:.1f},{y_top:.1f} {x+stem_w+5*scale:.1f},{y_top:.1f} {x+nw:.1f},{y_bot-10*scale:.1f} {x+nw:.1f},{y_bot:.1f} {x+nw-5*scale:.1f},{y_bot:.1f} {x+stem_w:.1f},{y_top+10*scale:.1f}" fill="{fill_text}" />')
    x += nw + gap
    
    # D
    dw = 42 * scale
    paths.append(f'''<path fill="{fill_text}" fill-rule="evenodd" d="
      M {x:.1f} {y_top:.1f}
      L {x+dw-18*scale:.1f} {y_top:.1f}
      A {18*scale:.1f} {18*scale:.1f} 0 0 1 {x+dw:.1f} {y_top+18*scale:.1f}
      L {x+dw:.1f} {y_bot-18*scale:.1f}
      A {18*scale:.1f} {18*scale:.1f} 0 0 1 {x+dw-18*scale:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {x+stem_w:.1f} {y_top+stem_w:.1f}
      L {x+dw-18*scale:.1f} {y_top+stem_w:.1f}
      A {10*scale:.1f} {10*scale:.1f} 0 0 1 {x+dw-stem_w:.1f} {y_top+18*scale:.1f}
      L {x+dw-stem_w:.1f} {y_bot-18*scale:.1f}
      A {10*scale:.1f} {10*scale:.1f} 0 0 1 {x+dw-18*scale:.1f} {y_bot-stem_w:.1f}
      L {x+stem_w:.1f} {y_bot-stem_w:.1f}
      Z
    "/>''')
    x += dw + gap
    
    # A
    paths.append(f'''<path fill="{fill_text}" fill-rule="evenodd" d="
      M {x + aw/2:.1f} {y_top:.1f}
      L {x+aw:.1f} {y_bot:.1f}
      L {x+aw - stem_w*1.3:.1f} {y_bot:.1f}
      L {x + aw/2 + 7.5*scale:.1f} {y_bot - 24*scale:.1f}
      L {x + aw/2 - 7.5*scale:.1f} {y_bot - 24*scale:.1f}
      L {x + stem_w*1.3:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {x + aw/2:.1f} {y_top + 16*scale:.1f}
      L {x + aw/2 + 6.0*scale:.1f} {y_bot - 32*scale:.1f}
      L {x + aw/2 - 6.0*scale:.1f} {y_bot - 32*scale:.1f}
      Z
    "/>''')
    x += aw + gap
    
    # L
    lw = 34 * scale
    paths.append(f'<polygon points="{x:.1f},{y_top:.1f} {x+stem_w:.1f},{y_top:.1f} {x+stem_w:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot:.1f} {x:.1f},{y_bot:.1f}" fill="{fill_text}" />')
    x += lw + gap + 10 * scale
    
    # // Signature
    slash_w = 6.5 * scale
    slash_gap = 8.0 * scale
    slash_dx = 16.0 * scale
    paths.append(f'<polygon points="{x+slash_dx:.1f},{y_top-2*scale:.1f} {x+slash_dx+slash_w:.1f},{y_top-2*scale:.1f} {x+slash_w:.1f},{y_bot+2*scale:.1f} {x:.1f},{y_bot+2*scale:.1f}" fill="{fill_slash}" />')
    x += slash_w + slash_gap
    paths.append(f'<polygon points="{x+slash_dx:.1f},{y_top-2*scale:.1f} {x+slash_dx+slash_w:.1f},{y_top-2*scale:.1f} {x+slash_w:.1f},{y_bot+2*scale:.1f} {x:.1f},{y_bot+2*scale:.1f}" fill="{fill_slash}" />')
    x += slash_dx + slash_w + gap + 12 * scale
    
    # C
    cw = 40 * scale
    paths.append(f'''<path fill="{fill_text}" fill-rule="evenodd" d="
      M {x+cw:.1f} {y_top+14*scale:.1f}
      L {x+cw-stem_w:.1f} {y_top+14*scale:.1f}
      A {16*scale:.1f} {16*scale:.1f} 0 0 0 {x+cw-20*scale:.1f} {y_top+stem_w:.1f}
      L {x+18*scale:.1f} {y_top+stem_w:.1f}
      A {18*scale:.1f} {18*scale:.1f} 0 0 0 {x+stem_w:.1f} {y_top+18*scale:.1f}
      L {x+stem_w:.1f} {y_bot-18*scale:.1f}
      A {18*scale:.1f} {18*scale:.1f} 0 0 0 {x+18*scale:.1f} {y_bot-stem_w:.1f}
      L {x+cw-20*scale:.1f} {y_bot-stem_w:.1f}
      A {16*scale:.1f} {16*scale:.1f} 0 0 0 {x+cw-stem_w:.1f} {y_bot-14*scale:.1f}
      L {x+cw:.1f} {y_bot-14*scale:.1f}
      A {24*scale:.1f} {24*scale:.1f} 0 0 1 {x+cw-20*scale:.1f} {y_bot:.1f}
      L {x+18*scale:.1f} {y_bot:.1f}
      A {24*scale:.1f} {24*scale:.1f} 0 0 1 {x:.1f} {y_bot-24*scale:.1f}
      L {x:.1f} {y_top+24*scale:.1f}
      A {24*scale:.1f} {24*scale:.1f} 0 0 1 {x+18*scale:.1f} {y_top:.1f}
      L {x+cw-20*scale:.1f} {y_top:.1f}
      A {24*scale:.1f} {24*scale:.1f} 0 0 1 {x+cw:.1f} {y_top+14*scale:.1f}
      Z
    "/>''')
    x += cw + gap
    
    # L
    paths.append(f'<polygon points="{x:.1f},{y_top:.1f} {x+stem_w:.1f},{y_top:.1f} {x+stem_w:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot:.1f} {x:.1f},{y_bot:.1f}" fill="{fill_text}" />')
    x += lw + gap
    
    # U
    uw = 40 * scale
    paths.append(f'''<path fill="{fill_text}" fill-rule="evenodd" d="
      M {x:.1f} {y_top:.1f}
      L {x+stem_w:.1f} {y_top:.1f}
      L {x+stem_w:.1f} {y_bot-18*scale:.1f}
      A {12*scale:.1f} {12*scale:.1f} 0 0 0 {x+uw/2:.1f} {y_bot-stem_w:.1f}
      A {12*scale:.1f} {12*scale:.1f} 0 0 0 {x+uw-stem_w:.1f} {y_bot-18*scale:.1f}
      L {x+uw-stem_w:.1f} {y_top:.1f}
      L {x+uw:.1f} {y_top:.1f}
      L {x+uw:.1f} {y_bot-18*scale:.1f}
      A {20*scale:.1f} {20*scale:.1f} 0 0 1 {x+uw/2:.1f} {y_bot:.1f}
      A {20*scale:.1f} {20*scale:.1f} 0 0 1 {x:.1f} {y_bot-18*scale:.1f}
      Z
    "/>''')
    x += uw + gap
    
    # B
    bw = 40 * scale
    paths.append(f'''<path fill="{fill_text}" fill-rule="evenodd" d="
      M {x:.1f} {y_top:.1f}
      L {x+bw-14*scale:.1f} {y_top:.1f}
      A {14*scale:.1f} {14*scale:.1f} 0 0 1 {x+bw:.1f} {y_top+14*scale:.1f}
      A {12*scale:.1f} {12*scale:.1f} 0 0 1 {x+bw-8*scale:.1f} {y_top+26*scale:.1f}
      A {14*scale:.1f} {14*scale:.1f} 0 0 1 {x+bw:.1f} {y_bot-14*scale:.1f}
      L {x+bw:.1f} {y_bot-14*scale:.1f}
      A {14*scale:.1f} {14*scale:.1f} 0 0 1 {x+bw-14*scale:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {x+stem_w:.1f} {y_top+stem_w:.1f}
      L {x+bw-14*scale:.1f} {y_top+stem_w:.1f}
      A {6*scale:.1f} {6*scale:.1f} 0 0 1 {x+bw-stem_w:.1f} {y_top+14*scale:.1f}
      A {6*scale:.1f} {6*scale:.1f} 0 0 1 {x+bw-14*scale:.1f} {y_top+24*scale:.1f}
      L {x+stem_w:.1f} {y_top+24*scale:.1f}
      Z
      M {x+stem_w:.1f} {y_top+30*scale:.1f}
      L {x+bw-14*scale:.1f} {y_top+30*scale:.1f}
      A {6*scale:.1f} {6*scale:.1f} 0 0 1 {x+bw-stem_w:.1f} {y_bot-14*scale:.1f}
      A {6*scale:.1f} {6*scale:.1f} 0 0 1 {x+bw-14*scale:.1f} {y_bot-stem_w:.1f}
      L {x+stem_w:.1f} {y_bot-stem_w:.1f}
      Z
    "/>''')
    x += bw
    return "".join(paths), x - start_x

# -------------------------------------------------------------
# 3. HORIZONTAL LOCKUP: vandal-horizontal.svg (960 x 256)
# -------------------------------------------------------------
h_paths, h_w = build_wordmark(start_x=280, base_y=154, cap_h=52, stem_w=8.5)

vandal_horizontal_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 256" width="960" height="256" role="img" aria-labelledby="vandal-h-title">
  <title id="vandal-h-title">VANDAL // CLUB - Horizontal Lockup</title>
  <g id="symbol" transform="translate(52, 48) scale(0.625)">
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
  </g>
  <rect x="246" y="60" width="2" height="136" fill="#D48C46" opacity="0.65" />
  <g id="wordmark">
    {h_paths}
  </g>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "vandal-horizontal.svg"), "w", encoding="utf-8") as f:
    f.write(vandal_horizontal_svg)

# -------------------------------------------------------------
# 4. STACKED LOCKUP: vandal-stacked.svg (512 x 512)
# -------------------------------------------------------------
# Symbol centered at top: 180x180 (x in [166, 346], y in [52, 232])
# Scale = 180 / 256 = 0.703125
# Wordmark width target ~380 px -> cap_h = 34, stem_w = 5.5
s_paths_dummy, s_w = build_wordmark(start_x=0, base_y=370, cap_h=34, stem_w=5.5)
s_start_x = (512 - s_w) / 2
s_paths, _ = build_wordmark(start_x=s_start_x, base_y=370, cap_h=34, stem_w=5.5)

vandal_stacked_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-labelledby="vandal-s-title">
  <title id="vandal-s-title">VANDAL // CLUB - Stacked Lockup</title>
  <g id="symbol" transform="translate(166, 52) scale(0.703125)">
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
  </g>
  <rect x="206" y="278" width="100" height="2" fill="#D48C46" opacity="0.65" />
  <g id="wordmark">
    {s_paths}
  </g>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "vandal-stacked.svg"), "w", encoding="utf-8") as f:
    f.write(vandal_stacked_svg)

print("All masters written. Running svg_audit.py...")
audit_out = subprocess.run(
    f'python "{SCRIPT_DIR}/svg_audit.py" "{OUTPUT_DIR}/vandal-symbol.svg" "{OUTPUT_DIR}/vandal-symbol-small.svg" "{OUTPUT_DIR}/vandal-horizontal.svg" "{OUTPUT_DIR}/vandal-stacked.svg"',
    shell=True, capture_output=True, text=True
)
print(audit_out.stdout + audit_out.stderr)

