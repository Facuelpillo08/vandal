import math
import os
import subprocess

SCRIPT_DIR = r"C:\Users\facu\.gemini\config\skills\logo-design\scripts"
OUTPUT_DIR = r"e:\barbertatu\logo-concepts\final-kit"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_wordmark_paths(start_x, base_y=154, cap_h=56, stem_w=9):
    """
    Constructs clean architectural vector paths for 'VANDAL // CLUB'.
    Exact geometry, no live <text>.
    """
    paths = []
    x = start_x
    y_top = base_y - cap_h
    y_bot = base_y
    
    # Tracking gap between letters
    gap = 14
    
    # 1. 'V'
    vw = 46
    vx_mid = x + vw / 2
    # outer: (x, y_top) -> (vx_mid, y_bot) -> (x+vw, y_top)
    # inner: (x+stem_w*1.2, y_top) -> (vx_mid, y_bot - stem_w*1.8) -> (x+vw - stem_w*1.2, y_top)
    paths.append(f'''<polygon points="{x:.1f},{y_top:.1f} {x+stem_w*1.3:.1f},{y_top:.1f} {vx_mid:.1f},{y_bot - stem_w*1.6:.1f} {vx_mid:.1f},{y_bot:.1f}" fill="#111111" />''')
    paths.append(f'''<polygon points="{x+vw:.1f},{y_top:.1f} {x+vw - stem_w*1.3:.1f},{y_top:.1f} {vx_mid:.1f},{y_bot - stem_w*1.6:.1f} {vx_mid:.1f},{y_bot:.1f}" fill="#111111" />''')
    x += vw + gap
    
    # 2. 'A'
    aw = 46
    ax_mid = x + aw / 2
    paths.append(f'''<path fill="#111111" fill-rule="evenodd" d="
      M {ax_mid:.1f} {y_top:.1f}
      L {x+aw:.1f} {y_bot:.1f}
      L {x+aw - stem_w*1.3:.1f} {y_bot:.1f}
      L {ax_mid + 7.5:.1f} {y_bot - 24:.1f}
      L {ax_mid - 7.5:.1f} {y_bot - 24:.1f}
      L {x + stem_w*1.3:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {ax_mid:.1f} {y_top + 16:.1f}
      L {ax_mid + 6.0:.1f} {y_bot - 32:.1f}
      L {ax_mid - 6.0:.1f} {y_bot - 32:.1f}
      Z
    "/>''')
    x += aw + gap
    
    # 3. 'N'
    nw = 42
    paths.append(f'''<polygon points="{x:.1f},{y_top:.1f} {x+stem_w:.1f},{y_top:.1f} {x+stem_w:.1f},{y_bot:.1f} {x:.1f},{y_bot:.1f}" fill="#111111" />''')
    paths.append(f'''<polygon points="{x+nw-stem_w:.1f},{y_top:.1f} {x+nw:.1f},{y_top:.1f} {x+nw:.1f},{y_bot:.1f} {x+nw-stem_w:.1f},{y_bot:.1f}" fill="#111111" />''')
    paths.append(f'''<polygon points="{x+stem_w:.1f},{y_top:.1f} {x+stem_w+5:.1f},{y_top:.1f} {x+nw:.1f},{y_bot-10:.1f} {x+nw:.1f},{y_bot:.1f} {x+nw-5:.1f},{y_bot:.1f} {x+stem_w:.1f},{y_top+10:.1f}" fill="#111111" />''')
    x += nw + gap
    
    # 4. 'D'
    dw = 44
    paths.append(f'''<path fill="#111111" fill-rule="evenodd" d="
      M {x:.1f} {y_top:.1f}
      L {x+dw-18:.1f} {y_top:.1f}
      A 18 18 0 0 1 {x+dw:.1f} {y_top+18:.1f}
      L {x+dw:.1f} {y_bot-18:.1f}
      A 18 18 0 0 1 {x+dw-18:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {x+stem_w:.1f} {y_top+stem_w:.1f}
      L {x+dw-18:.1f} {y_top+stem_w:.1f}
      A 10 10 0 0 1 {x+dw-stem_w:.1f} {y_top+18:.1f}
      L {x+dw-stem_w:.1f} {y_bot-18:.1f}
      A 10 10 0 0 1 {x+dw-18:.1f} {y_bot-stem_w:.1f}
      L {x+stem_w:.1f} {y_bot-stem_w:.1f}
      Z
    "/>''')
    x += dw + gap
    
    # 5. 'A'
    paths.append(f'''<path fill="#111111" fill-rule="evenodd" d="
      M {x + aw/2:.1f} {y_top:.1f}
      L {x+aw:.1f} {y_bot:.1f}
      L {x+aw - stem_w*1.3:.1f} {y_bot:.1f}
      L {x + aw/2 + 7.5:.1f} {y_bot - 24:.1f}
      L {x + aw/2 - 7.5:.1f} {y_bot - 24:.1f}
      L {x + stem_w*1.3:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {x + aw/2:.1f} {y_top + 16:.1f}
      L {x + aw/2 + 6.0:.1f} {y_bot - 32:.1f}
      L {x + aw/2 - 6.0:.1f} {y_bot - 32:.1f}
      Z
    "/>''')
    x += aw + gap
    
    # 6. 'L'
    lw = 36
    paths.append(f'''<polygon points="{x:.1f},{y_top:.1f} {x+stem_w:.1f},{y_top:.1f} {x+stem_w:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot:.1f} {x:.1f},{y_bot:.1f}" fill="#111111" />''')
    x += lw + gap + 10
    
    # 7. Signature '//' (Copper accent or Noir)
    slash_w = 7.0
    slash_gap = 9.0
    slash_dx = 18.0
    paths.append(f'''<polygon points="{x+slash_dx:.1f},{y_top-2:.1f} {x+slash_dx+slash_w:.1f},{y_top-2:.1f} {x+slash_w:.1f},{y_bot+2:.1f} {x:.1f},{y_bot+2:.1f}" fill="#D48C46" />''')
    x += slash_w + slash_gap
    paths.append(f'''<polygon points="{x+slash_dx:.1f},{y_top-2:.1f} {x+slash_dx+slash_w:.1f},{y_top-2:.1f} {x+slash_w:.1f},{y_bot+2:.1f} {x:.1f},{y_bot+2:.1f}" fill="#D48C46" />''')
    x += slash_dx + slash_w + gap + 14
    
    # 8. 'C'
    cw = 42
    paths.append(f'''<path fill="#111111" fill-rule="evenodd" d="
      M {x+cw:.1f} {y_top+14:.1f}
      L {x+cw-stem_w:.1f} {y_top+14:.1f}
      A 16 16 0 0 0 {x+cw-20:.1f} {y_top+stem_w:.1f}
      L {x+18:.1f} {y_top+stem_w:.1f}
      A 18 18 0 0 0 {x+stem_w:.1f} {y_top+18:.1f}
      L {x+stem_w:.1f} {y_bot-18:.1f}
      A 18 18 0 0 0 {x+18:.1f} {y_bot-stem_w:.1f}
      L {x+cw-20:.1f} {y_bot-stem_w:.1f}
      A 16 16 0 0 0 {x+cw-stem_w:.1f} {y_bot-14:.1f}
      L {x+cw:.1f} {y_bot-14:.1f}
      A 24 24 0 0 1 {x+cw-20:.1f} {y_bot:.1f}
      L {x+18:.1f} {y_bot:.1f}
      A 24 24 0 0 1 {x:.1f} {y_bot-24:.1f}
      L {x:.1f} {y_top+24:.1f}
      A 24 24 0 0 1 {x+18:.1f} {y_top:.1f}
      L {x+cw-20:.1f} {y_top:.1f}
      A 24 24 0 0 1 {x+cw:.1f} {y_top+14:.1f}
      Z
    "/>''')
    x += cw + gap
    
    # 9. 'L'
    paths.append(f'''<polygon points="{x:.1f},{y_top:.1f} {x+stem_w:.1f},{y_top:.1f} {x+stem_w:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot-stem_w:.1f} {x+lw:.1f},{y_bot:.1f} {x:.1f},{y_bot:.1f}" fill="#111111" />''')
    x += lw + gap
    
    # 10. 'U'
    uw = 42
    paths.append(f'''<path fill="#111111" fill-rule="evenodd" d="
      M {x:.1f} {y_top:.1f}
      L {x+stem_w:.1f} {y_top:.1f}
      L {x+stem_w:.1f} {y_bot-18:.1f}
      A 12 12 0 0 0 {x+uw/2:.1f} {y_bot-stem_w:.1f}
      A 12 12 0 0 0 {x+uw-stem_w:.1f} {y_bot-18:.1f}
      L {x+uw-stem_w:.1f} {y_top:.1f}
      L {x+uw:.1f} {y_top:.1f}
      L {x+uw:.1f} {y_bot-18:.1f}
      A 20 20 0 0 1 {x+uw/2:.1f} {y_bot:.1f}
      A 20 20 0 0 1 {x:.1f} {y_bot-18:.1f}
      Z
    "/>''')
    x += uw + gap
    
    # 11. 'B'
    bw = 42
    paths.append(f'''<path fill="#111111" fill-rule="evenodd" d="
      M {x:.1f} {y_top:.1f}
      L {x+bw-14:.1f} {y_top:.1f}
      A 14 14 0 0 1 {x+bw:.1f} {y_top+14:.1f}
      A 12 12 0 0 1 {x+bw-8:.1f} {y_top+26:.1f}
      A 14 14 0 0 1 {x+bw:.1f} {y_bot-14:.1f}
      L {x+bw:.1f} {y_bot-14:.1f}
      A 14 14 0 0 1 {x+bw-14:.1f} {y_bot:.1f}
      L {x:.1f} {y_bot:.1f}
      Z
      M {x+stem_w:.1f} {y_top+stem_w:.1f}
      L {x+bw-14:.1f} {y_top+stem_w:.1f}
      A 6 6 0 0 1 {x+bw-stem_w:.1f} {y_top+14:.1f}
      A 6 6 0 0 1 {x+bw-14:.1f} {y_top+24:.1f}
      L {x+stem_w:.1f} {y_top+24:.1f}
      Z
      M {x+stem_w:.1f} {y_top+30:.1f}
      L {x+bw-14:.1f} {y_top+30:.1f}
      A 6 6 0 0 1 {x+bw-stem_w:.1f} {y_bot-14:.1f}
      A 6 6 0 0 1 {x+bw-14:.1f} {y_bot-stem_w:.1f}
      L {x+stem_w:.1f} {y_bot-stem_w:.1f}
      Z
    "/>''')
    x += bw
    
    return "".join(paths), x

# Test wordmark width
sample_paths, end_x = generate_wordmark_paths(start_x=0)
wordmark_width = end_x
print(f"Wordmark generated. Total width: {wordmark_width:.1f} px")

# -------------------------------------------------------------
# 3. HORIZONTAL LOCKUP: vandal-horizontal.svg (960 x 256)
# -------------------------------------------------------------
# Symbol on left: placed at x=48, scaled to 160x160 (from y=48 to y=208).
# Scale factor = 160 / 256 = 0.625.
# Divider hairline: x = 250, from y=58 to y=198 (copper #D48C46 or #333)
# Wordmark on right: starts at x = 285.
# Wordmark width is ~580 px.
# 285 + 580 = 865 -> perfect on 960 canvas! (Margins: left 48, right 95).

symbol_inline = '''
  <g id="symbol" transform="translate(48, 48) scale(0.625)">
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
'''

wordmark_paths, _ = generate_wordmark_paths(start_x=285, base_y=142, cap_h=52, stem_w=8.5)

# Secondary editorial baseline: "ESTD. 2026 // BUENOS AIRES" (geometric micro-caps)
# We can add a delicate hairline divider:
divider_path = '''<line x1="248" y1="64" x2="248" y2="192" stroke="#D48C46" stroke-width="2" opacity="0.6" />'''

vandal_horizontal_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 256" width="960" height="256" role="img" aria-labelledby="vandal-h-title">
  <title id="vandal-h-title">VANDAL // CLUB - Horizontal Lockup</title>
  {symbol_inline}
  {divider_path}
  <g id="wordmark">
    {wordmark_paths}
  </g>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "vandal-horizontal.svg"), "w", encoding="utf-8") as f:
    f.write(vandal_horizontal_svg)

# -------------------------------------------------------------
# 4. STACKED LOCKUP: vandal-stacked.svg (512 x 512)
# -------------------------------------------------------------
# Symbol centered on top: size 200x200 (x in [156, 356], y in [50, 250]).
# Scale = 200/256 = 0.78125.
# Wordmark centered below: width ~420, scaled down:
# Start x = (512 - 380) / 2 = 66, base_y = 370, cap_h = 36, stem_w = 6.
stacked_wm_paths, wm_len = generate_wordmark_paths(start_x=0, base_y=370, cap_h=36, stem_w=6)
stacked_x_start = (512 - (wm_len)) / 2
stacked_wm_paths, _ = generate_wordmark_paths(start_x=stacked_x_start, base_y=370, cap_h=36, stem_w=6)

vandal_stacked_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-labelledby="vandal-s-title">
  <title id="vandal-s-title">VANDAL // CLUB - Stacked Lockup</title>
  <g id="symbol" transform="translate(156, 50) scale(0.78125)">
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
  <line x1="186" y1="290" x2="326" y2="290" stroke="#D48C46" stroke-width="2" opacity="0.6" />
  <g id="wordmark">
    {stacked_wm_paths}
  </g>
</svg>'''

with open(os.path.join(OUTPUT_DIR, "vandal-stacked.svg"), "w", encoding="utf-8") as f:
    f.write(vandal_stacked_svg)

print("Created horizontal and stacked lockups. Running svg_audit.py...")
audit_out = subprocess.run(
    f'python "{SCRIPT_DIR}/svg_audit.py" "{OUTPUT_DIR}/vandal-symbol.svg" "{OUTPUT_DIR}/vandal-symbol-small.svg" "{OUTPUT_DIR}/vandal-horizontal.svg" "{OUTPUT_DIR}/vandal-stacked.svg"',
    shell=True, capture_output=True, text=True
)
print(audit_out.stdout + audit_out.stderr)
