"""Draws the decorative atlas map used on the home page.

Run:  python3 scripts/make-map.py   (writes public/images/atlas-map.svg)
A printed-atlas style plate: contour lines around a few hills, a graticule
with edge ticks, a blue trail with five stops (one per stage of the
guide), and a compass. Colours match src/styles.css.
"""
import math, random

W, H = 1200, 620
random.seed(11)
PAPER, CONTOUR, FILL, INK, RED = "#EFE8DA", "#7A7064", "#E4DCCB", "#1E2328", "#3A6690"

def smooth_closed(pts):
    n = len(pts)
    d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f}"
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
    return d + "Z"

def hill(cx, cy, rings, base, step, stretch=1.0, tilt=0.0):
    ph = [random.uniform(0, 6.28) for _ in range(3)]
    out = []
    for k in range(rings):
        r0 = base + k * step
        pts = []
        for i in range(56):
            t = 2 * math.pi * i / 56
            wob = 1 + 0.11 * math.sin(2 * t + ph[0]) + 0.06 * math.sin(3 * t + ph[1] + k * 0.3) + 0.03 * math.sin(6 * t + ph[2])
            x, y = r0 * wob * math.cos(t) * stretch, r0 * wob * math.sin(t)
            pts.append((cx + x * math.cos(tilt) - y * math.sin(tilt), cy + x * math.sin(tilt) + y * math.cos(tilt)))
        out.append((k, smooth_closed(pts)))
    return out

contours = []
for args in [(260, 170, 9, 16, 24, 1.4, -0.2), (700, 470, 10, 14, 24, 1.5, 0.25),
             (1010, 120, 7, 14, 23, 1.3, 0.1), (1080, 520, 6, 12, 24, 1.2, -0.4), (120, 560, 5, 12, 24, 1.3, 0.0)]:
    for k, d in hill(*args):
        fill = FILL if k == 0 else "none"
        width = 1.5 if k % 5 == 0 else 0.9
        contours.append(f'<path d="{d}" fill="{fill}" stroke="{CONTOUR}" stroke-opacity="{0.62 - 0.03 * k:.2f}" stroke-width="{width}"/>')

# Graticule and edge ticks, like a printed plate.
grat = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>' for x in range(150, W, 150)) + \
       "".join(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>' for y in range(155, H, 155))
ticks = "".join(f'<line x1="{x}" y1="10" x2="{x}" y2="{16 if x % 150 else 22}"/><line x1="{x}" y1="{H - 10}" x2="{x}" y2="{H - (16 if x % 150 else 22)}"/>' for x in range(30, W, 30))
labels = "".join(f'<text x="{x}" y="36" text-anchor="middle">{chr(64 + i)}</text>' for i, x in enumerate(range(150, W, 150), 1))

# The trail: five stops across the top and right of the plate.
stops = [(690, 95), (800, 215), (905, 120), (1000, 270), (1120, 175)]
route = f"M{stops[0][0]},{stops[0][1]}"
for (x0, y0), (x1, y1) in zip(stops, stops[1:]):
    mx = (x0 + x1) / 2
    route += f" C{mx},{y0} {mx},{y1} {x1},{y1}"
marks = ""
for i, (x, y) in enumerate(stops):
    last = i == len(stops) - 1
    marks += (f'<circle cx="{x}" cy="{y}" r="14" fill="{RED if last else PAPER}" stroke="{RED}" stroke-width="2.5"/>'
              f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-family="IBM Plex Mono, Menlo, monospace" font-size="13" font-weight="600" fill="{PAPER if last else RED}">{i + 1}</text>')

compass = f'''<g transform="translate(1100 420)" fill="none" stroke="{INK}" stroke-width="1.2">
<circle r="34" stroke-opacity="0.45"/><line x1="-46" y1="0" x2="46" y2="0" stroke-opacity="0.35"/><line x1="0" y1="-46" x2="0" y2="46" stroke-opacity="0.35"/>
<path d="M0,-42 L8,0 L0,42 L-8,0 Z" fill="{PAPER}"/><path d="M0,-42 L8,0 L-8,0 Z" fill="{INK}"/>
<text y="-52" text-anchor="middle" font-family="IBM Plex Mono, Menlo, monospace" font-size="13" fill="{INK}" stroke="none">N</text></g>'''

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<rect width="{W}" height="{H}" fill="{PAPER}"/>
<g stroke="{INK}" stroke-opacity="0.10" stroke-width="1">{grat}</g>
{"".join(contours)}
<path d="{route}" fill="none" stroke="{PAPER}" stroke-width="10" stroke-linecap="round"/>
<path d="{route}" fill="none" stroke="{RED}" stroke-width="3" stroke-linecap="round" stroke-dasharray="10 7"/>
{marks}
{compass}
<g stroke="{INK}" stroke-width="1">{ticks}</g>
<g font-family="IBM Plex Mono, Menlo, monospace" font-size="12" fill="{INK}" fill-opacity="0.7">{labels}</g>
<rect x="6" y="6" width="{W - 12}" height="{H - 12}" fill="none" stroke="{INK}" stroke-width="1"/>
<rect x="1" y="1" width="{W - 2}" height="{H - 2}" fill="none" stroke="{INK}" stroke-width="2"/>
</svg>
'''
open("public/images/atlas-map.svg", "w").write(svg)
print("wrote public/images/atlas-map.svg", len(svg), "bytes")
