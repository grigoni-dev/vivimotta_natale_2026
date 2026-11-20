"""Genera il marchio "Motta Natalè" in SVG, con il testo convertito in tracciati.

Uso:  python3 genera.py [cartella-di-uscita] [variante]
Richiede: pip install fonttools uharfbuzz
Varianti: "stella" (stella a sinistra di Natalè, accento nel colore della stella; è quella in uso),
          "accento-stella" (la stella prende il posto dell'accento), "semplice" (accento nel colore della parola).
"""
import os
import sys

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

QUI = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(QUI, "..", "font")
TONDO = os.path.join(FONT, "BodoniModa11pt-ExtraBold.ttf")
CORSIVO = os.path.join(FONT, "BodoniModa11pt-MediumItalic.ttf")

PANNA, OCRA, VERDE, ROSSO = "#F4ECDC", "#E8A63A", "#1A5548", "#BD3128"
# nome file: (Motta, Natalè, stella e accento)
VERSIONI = {
    "marchio-panna-ocra": (PANNA, OCRA, OCRA),  # su verde-loggia
    "marchio-panna": (PANNA, PANNA, PANNA),  # su rosso
    "marchio-verde": (VERDE, VERDE, ROSSO),  # su rosa, azzurro
    "marchio-verde-rosso": (VERDE, ROSSO, ROSSO),  # su panna
}

# Stella a quattro punte, la stessa di stella.svg, centrata in (0,0) con raggio 1.
def stella(cx, cy, r):
    p = lambda x, y: f"{cx + x * r:.2f} {cy + y * r:.2f}"
    k = 0.082  # quanto è stretta la vita della stella
    return (f"M{p(0,-1)} Q{p(k,-k)} {p(1,0)} Q{p(k,k)} {p(0,1)} "
            f"Q{p(-k,k)} {p(-1,0)} Q{p(-k,-k)} {p(0,-1)}Z")


class Riga:
    """Una parola composta con le crenature del font, scalata e messa sulla sua linea di base."""

    def __init__(self, file, testo, corpo, x, base):
        self.font = TTFont(file)
        self.gs = self.font.getGlyphSet()
        upem = self.font["head"].unitsPerEm
        self.s = corpo / upem
        self.x, self.base = x, base
        blob = hb.Blob.from_file_path(file)
        hbf = hb.Font(hb.Face(blob))
        buf = hb.Buffer()
        buf.add_str(testo)
        buf.guess_segment_properties()
        hb.shape(hbf, buf, {"kern": True, "liga": True})
        order = self.font.getGlyphOrder()
        self.glifi = []
        penna = 0
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            self.glifi.append((order[info.codepoint], penna + pos.x_offset))
            penna += pos.x_advance

    def _penna(self, pen, dx):
        return TransformPen(pen, (self.s, 0, 0, -self.s, self.x + dx * self.s, self.base))

    def disegna(self, pen, nome, dx):
        self.gs[nome].draw(self._penna(pen, dx))

    def tracciato(self, separa_accento=False):
        """Restituisce (parola, accento, scatola dell'accento). L'accento è separato solo se richiesto."""
        parola, accento = SVGPathPen(self.gs), SVGPathPen(self.gs)
        scatola = None
        glyf = self.font["glyf"]
        for nome, dx in self.glifi:
            g = glyf[nome]
            if separa_accento and g.isComposite() and len(g.components) == 2:
                base, segno = g.components
                self.disegna(parola, base.glyphName, dx + base.x)
                b = BoundsPen(self.gs)
                self.gs[segno.glyphName].draw(b)
                x0, y0, x1, y1 = b.bounds
                ox = dx + segno.x
                tp = TransformPen(accento, (self.s, 0, 0, -self.s, self.x + ox * self.s, self.base - segno.y * self.s))
                self.gs[segno.glyphName].draw(tp)
                scatola = (self.x + (ox + x0) * self.s, self.base - (y1 + segno.y) * self.s,
                           self.x + (ox + x1) * self.s, self.base - (y0 + segno.y) * self.s)
            else:
                self.disegna(parola, nome, dx)
        return parola.getCommands(), accento.getCommands(), scatola

    def limiti(self):
        b = BoundsPen(self.gs)
        for nome, dx in self.glifi:
            self.disegna(b, nome, dx)
        return b.bounds  # in coordinate font già trasformate (y verso il basso)


def componi(variante):
    motta = Riga(TONDO, "Motta", 120, 0, 92)
    natale = Riga(CORSIVO, "Natalè", 132, 60, 214)
    parola, accento, sc = natale.tracciato(separa_accento=True)
    xh = natale.font["OS/2"].sxHeight * natale.s
    pezzi = {"motta": motta.tracciato()[0], "natale": parola}
    if variante == "accento-stella":
        cx, cy = (sc[0] + sc[2]) / 2, (sc[1] + sc[3]) / 2
        pezzi["stella"] = stella(cx, cy - 4, 22)
    else:
        pezzi["stella"] = stella(24, natale.base - xh / 2, 22)
        if variante == "stella":
            pezzi["stella"] += " " + accento
        else:
            pezzi["natale"] += " " + accento
    # scatola complessiva con un margine di 2
    x0, y0, x1, y1 = motta.limiti()
    a0, b0, a1, b1 = natale.limiti()
    ys = [y0, y1, b0, b1, sc[1] - 26]  # 26: spazio per la stella al posto dell'accento
    xs = [x0, x1, a0, a1] + ([] if variante == "accento-stella" else [2])
    vb = (min(xs) - 2, min(ys) - 2, max(xs) + 2, max(ys) + 2)
    return pezzi, vb


def componi_riga():
    """Versione su una riga, "Motta ✦ Natalè", per i formati larghi e bassi (locandina)."""
    motta = Riga(TONDO, "Motta", 120, 0, 100)
    x0, y0, x1, y1 = motta.limiti()
    r = 22
    cx = x1 + 18 + r
    natale = Riga(CORSIVO, "Natalè", 132, cx + r + 6, 100)
    parola, accento, _ = natale.tracciato(separa_accento=True)
    xh = natale.font["OS/2"].sxHeight * natale.s
    pezzi = {"motta": motta.tracciato()[0], "natale": parola,
             "stella": stella(cx, natale.base - xh / 2, r) + " " + accento}
    a0, b0, a1, b1 = natale.limiti()
    vb = (min(x0, a0) - 2, min(y0, b0) - 2, max(x1, a1) + 2, max(y1, b1) + 2)
    return pezzi, vb


def svg(pezzi, vb, colori):
    x0, y0, x1, y1 = vb
    w, h = x1 - x0, y1 - y0
    c_motta, c_natale, c_stella = colori
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.1f} {y0:.1f} {w:.1f} {h:.1f}" '
            f'width="{w * 4:.0f}" height="{h * 4:.0f}"><title>Motta Natalè</title>'
            f'<path d="{pezzi["motta"]}" fill="{c_motta}"/>'
            f'<path d="{pezzi["natale"]}" fill="{c_natale}"/>'
            f'<path d="{pezzi["stella"]}" fill="{c_stella}"/></svg>')


if __name__ == "__main__":
    uscita = sys.argv[1] if len(sys.argv) > 1 else QUI
    variante = sys.argv[2] if len(sys.argv) > 2 else "stella"
    pezzi, vb = componi(variante)
    for nome, colori in VERSIONI.items():
        with open(os.path.join(uscita, nome + ".svg"), "w") as f:
            f.write(svg(pezzi, vb, colori))
    print("viewBox", [round(v, 1) for v in vb])
    pezzi, vb = componi_riga()
    for nome, colori in VERSIONI.items():
        with open(os.path.join(uscita, nome.replace("marchio-", "marchio-riga-") + ".svg"), "w") as f:
            f.write(svg(pezzi, vb, colori))
    print("viewBox riga", [round(v, 1) for v in vb])
