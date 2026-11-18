"""Draws the decorative atlas map used on the home page.

Run:  python3 scripts/make-map.py   (writes public/images/atlas-map.svg)
Contour lines are concentric wobbly loops around a few "hills"; a dotted
route with five stops (one per stage of the guide) crosses the map.
"""
import math, random

W, H = 800, 640
random.seed(7)
INK, ACCENT, PATH = "#2F6F64", "#2F6F64", "#245A51"

def smooth_closed(pts):
    # Catmull-Rom spline through points, as cubic Bezier segments.
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
        for i in range(48):
            t = 2 * math.pi * i / 48
            wob = 1 + 0.10 * math.sin(2 * t + ph[0]) + 0.06 * math.sin(3 * t + ph[1] + k * 0.25) + 0.035 * math.sin(5 * t + ph[2])
            x, y = r0 * wob * math.cos(t) * stretch, r0 * wob * math.sin(t)
            xr = x * math.cos(tilt) - y * math.sin(tilt)
            yr = x * math.sin(tilt) + y * math.cos(tilt)
            pts.append((cx + xr, cy + yr))
        out.append((k, smooth_closed(pts)))
    return out

hills = [
    hill(210, 190, 9, 18, 26, 1.25, -0.3),
    hill(610, 450, 8, 16, 27, 1.15, 0.4),
    hill(640, 110, 5, 14, 24, 1.3, 0.1),
    hill(150, 560, 5, 14, 25, 1.4, -0.1),
]

contours = []
for rings in hills:
    total = len(rings)
    for k, d in rings:
        op = 0.55 - 0.035 * k
        width = 1.6 if k % 4 == 0 else 1.1
        fill = ' fill="#DCEBE6"' if k == 0 else ' fill="none"'
        contours.append(f'<path d="{d}"{fill} stroke="{INK}" stroke-opacity="{op:.2f}" stroke-width="{width}"/>')

# Route through five stops, left-bottom to right-top.
stops = [(110, 410), (300, 330), (420, 470), (560, 270), (700, 300)]
route = f"M{stops[0][0]},{stops[0][1]}"
for (x0, y0), (x1, y1) in zip(stops, stops[1:]):
    mx = (x0 + x1) / 2
    route += f" C{mx},{y0} {mx},{y1} {x1},{y1}"

markers = []
for i, (x, y) in enumerate(stops):
    last = i == len(stops) - 1
    markers.append(
        f'<circle cx="{x}" cy="{y}" r="{13 if last else 11}" fill="{ACCENT if last else "#FFFFFF"}" stroke="{PATH}" stroke-width="3"/>'
        f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="{"#FFFFFF" if last else PATH}">{i + 1}</text>'
    )

compass = f'''<g transform="translate(730 560)" stroke="{PATH}" stroke-width="1.5" fill="none">
<circle r="30" stroke-opacity="0.5"/><circle r="22" stroke-opacity="0.3"/>
<path d="M0,-38 L7,0 L0,38 L-7,0 Z" fill="#FFFFFF"/><path d="M0,-38 L7,0 L-7,0 Z" fill="{PATH}"/>
<text y="-44" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="{PATH}" stroke="none">N</text></g>'''

grid = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>' for x in range(100, W, 100)) + \
       "".join(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>' for y in range(100, H, 100))

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs><clipPath id="c"><rect width="{W}" height="{H}" rx="24"/></clipPath></defs>
<g clip-path="url(#c)">
<rect width="{W}" height="{H}" fill="#EEF4F1"/>
<g stroke="{INK}" stroke-opacity="0.08" stroke-width="1">{grid}</g>
{"".join(contours)}
<path d="{route}" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round" stroke-opacity="0.8"/>
<path d="{route}" fill="none" stroke="{PATH}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="0.5 10"/>
{"".join(markers)}
{compass}
</g>
<rect x="1" y="1" width="{W - 2}" height="{H - 2}" rx="23" fill="none" stroke="#DDE2DF" stroke-width="2"/>
</svg>
'''
open("public/images/atlas-map.svg", "w").write(svg)
print("wrote public/images/atlas-map.svg", len(svg), "bytes")
