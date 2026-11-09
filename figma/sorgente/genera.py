"""Genera figma/plugin/code.js inserendo nel plugin i file SVG del design system.
Uso, dalla cartella del progetto:  python3 figma/sorgente/genera.py
"""
import json, re, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
pulisci = lambda s: re.sub(r"<title>.*?</title>", "", s.strip())
assets = {
    "tessere": {p.stem: pulisci(p.read_text()) for p in sorted((R / "design-system/tessere").glob("*.svg"))},
    "marchio": {p.stem.replace("marchio-", ""): pulisci(p.read_text()) for p in sorted((R / "design-system/marchio").glob("marchio-*.svg"))},
    "albero": pulisci((R / "design-system/illustrazioni/albero.svg").read_text()),
    "stella": pulisci((R / "design-system/marchio/stella.svg").read_text()),
}
tpl = (R / "figma/sorgente/code.template.js").read_text()
(R / "figma/plugin/code.js").write_text(tpl.replace("__ASSETS__", json.dumps(assets, ensure_ascii=False)))
print("code.js:", len(assets["tessere"]), "tessere,", len(assets["marchio"]), "marchi")
