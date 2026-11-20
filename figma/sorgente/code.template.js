// Plugin Figma "Motta Natalè – template".
// Costruisce nel file aperto: stili di colore e di testo, i componenti (tessere, marchio, albero, stella)
// e un template modificabile per ogni formato della campagna.
// Generato da figma/sorgente/genera.py: non modificare code.js a mano, modifica questo file e rigenera.

const ASSETS = __ASSETS__;

const COLORI = {
  "verde-loggia": "#1A5548", "rosso": "#BD3128", "rosa": "#F3B2C1", "azzurro": "#86B6DE",
  "ocra": "#E8A63A", "verde-cupola": "#2E9C8E", "panna": "#F4ECDC", "inchiostro": "#2B2019",
  "bianco": "#FFFFFF", "biscotto": "#B8743E"
};

const MEZZA = 67.5, CASELLA = 135;
const avvisi = [];

// ---------- Font ----------
let FONT_DISPONIBILI = null;
const norm = s => s.toLowerCase().replace(/[\s-]/g, "");
async function font(family, style) {
  if (!FONT_DISPONIBILI) FONT_DISPONIBILI = await figma.listAvailableFontsAsync();
  let stessaFamiglia = FONT_DISPONIBILI.filter(f => f.fontName.family === family).map(f => f.fontName);
  if (!stessaFamiglia.length) stessaFamiglia = FONT_DISPONIBILI.filter(f => f.fontName.family.startsWith(family)).map(f => f.fontName);
  if (!stessaFamiglia.length && family === "Bodoni Moda 11pt") {
    if (!avvisi.some(x => x.startsWith("Bodoni Moda 11pt"))) avvisi.push("Bodoni Moda 11pt non installato: uso Bodoni Moda (linee sottili). Installa i font di design-system/font e riavvia il plugin");
    return font("Bodoni Moda", style);
  }
  let scelto = stessaFamiglia.find(f => norm(f.style) === norm(style));
  if (!scelto && stessaFamiglia.length) {
    const italic = /italic/i.test(style);
    const peso = s => (/black/i.test(s) ? 900 : /extrabold/i.test(norm(s)) ? 800 : /semibold/i.test(norm(s)) ? 600 : /bold/i.test(s) ? 700 : /medium/i.test(s) ? 500 : 400);
    const voluto = peso(style);
    const candidati = stessaFamiglia.filter(f => /italic/i.test(f.style) === italic);
    candidati.sort((a, b) => Math.abs(peso(a.style) - voluto) - Math.abs(peso(b.style) - voluto));
    scelto = candidati[0] || stessaFamiglia[0];
    avvisi.push(`${family} ${style} non trovato: uso ${scelto.style}`);
  }
  if (!scelto) {
    scelto = { family: "Inter", style: /italic/i.test(style) ? "Italic" : (/bold|black/i.test(style) ? "Bold" : "Regular") };
    avvisi.push(`${family} non disponibile: uso Inter`);
  }
  await figma.loadFontAsync(scelto);
  if (family.startsWith("Bodoni Moda")) { try { await figma.loadFontAsync({ family: scelto.family }); } catch (e) {} }
  return scelto;
}

// ---------- Stili ----------
const STILI_COLORE = {};
async function creaStiliColore() {
  const esistenti = await figma.getLocalPaintStylesAsync();
  for (const [nome, hex] of Object.entries(COLORI)) {
    const n = `Motta/${nome}`;
    let s = esistenti.find(x => x.name === n);
    if (!s) { s = figma.createPaintStyle(); s.name = n; }
    s.paints = [{ type: "SOLID", color: rgb(hex) }];
    STILI_COLORE[nome] = s;
  }
}
function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}
async function colora(nodo, colore) { await nodo.setFillStyleIdAsync(STILI_COLORE[colore].id); }

const DEF_TESTO = {
  "numero-arco":      ["Bodoni Moda 11pt", "Black", 700, 74, -3, "ORIGINAL"],
  "numero-programma": ["Bodoni Moda 11pt", "Black", 180, 80, -3, "ORIGINAL"],
  "numero-bottega":   ["Bodoni Moda 11pt", "Black", 190, 100, -3, "ORIGINAL"],
  "titolo-l":         ["Bodoni Moda 11pt", "ExtraBold", 104, 98, -1.5, "ORIGINAL"],
  "titolo-m":         ["Bodoni Moda 11pt", "ExtraBold", 76, 100, -1, "ORIGINAL"],
  "nome-evento":      ["Bodoni Moda 11pt", "ExtraBold", 58, 102, -1, "ORIGINAL"],
  "nome-casella":     ["Bodoni Moda 11pt", "ExtraBold", 34, 102, 0, "ORIGINAL"],
  "frase":            ["Bodoni Moda 11pt", "Medium Italic", 44, 115, 0, "ORIGINAL"],
  "info":             ["Archivo", "ExtraBold", 40, 120, 6, "UPPER"],
  "etichetta":        ["Archivo", "ExtraBold", 22, 100, 10, "UPPER"],
  "corpo":            ["Archivo", "Medium", 36, 135, 0, "ORIGINAL"],
  "nota":             ["Archivo", "SemiBold", 24, 130, 0, "ORIGINAL"]
};
// Bodoni Moda è un font variabile: la dimensione ottica 11 (asse opsz) dà le linee sottili robuste
// che reggono sul telefono. Figma per default userebbe la versione da titolo, troppo sottile.
const OPSZ_BODONI = 11;
let OPSZ_OK = false;
function conOpsz(fn) {
  return (OPSZ_OK && fn.family.startsWith("Bodoni Moda")) ? { family: fn.family, style: fn.style, variationSettings: { opsz: OPSZ_BODONI } } : fn;
}
const haOpsz = fn => !!(fn && fn.variationSettings && Math.round(fn.variationSettings.opsz) === OPSZ_BODONI);
let STILE_SENZA_OPSZ = false;   // se gli stili di testo non accettano l'asse, lo si applica a ogni testo

const STILI_TESTO = {};
async function creaStiliTesto() {
  try {
    const assi = figma.getFontFamilyVariationAxes ? await Promise.resolve(figma.getFontFamilyVariationAxes("Bodoni Moda")) : null;
    const tag = a => (typeof a === "string" ? a : (a && (a.tag || a.axisTag)));
    OPSZ_OK = Array.isArray(assi) && assi.some(a => tag(a) === "opsz");
  } catch (e) { OPSZ_OK = false; }
  if (!OPSZ_OK) avvisi.push("Bodoni Moda: asse della dimensione ottica non disponibile, impostalo a mano (Type details → Variable → Optical size = 11)");
  const esistenti = await figma.getLocalTextStylesAsync();
  for (const [nome, [fam, sty, size, lh, ls, tc]] of Object.entries(DEF_TESTO)) {
    const fn = await font(fam, sty);
    const n = `Motta/${nome}`;
    let s = esistenti.find(x => x.name === n);
    if (!s) { s = figma.createTextStyle(); s.name = n; }
    s.fontName = fn;
    if (OPSZ_OK && fn.family.startsWith("Bodoni Moda")) {
      try { s.fontName = conOpsz(fn); } catch (e) { /* versione di Figma che non lo accetta sugli stili */ }
      if (!haOpsz(s.fontName)) STILE_SENZA_OPSZ = true;
    }
    s.fontSize = size;
    s.lineHeight = { unit: "PERCENT", value: lh };
    s.letterSpacing = { unit: "PERCENT", value: ls };
    s.textCase = tc;
    STILI_TESTO[nome] = s;
  }
}

// ---------- Mattoni ----------
function cornice(nome, w, h) {
  const f = figma.createFrame(); f.name = nome; f.resize(w, h); f.clipsContent = true; return f;
}
async function riquadro(padre, nome, x, y, w, h, colore) {
  const r = figma.createRectangle(); r.name = nome; r.resize(w, h); r.x = x; r.y = y;
  await colora(r, colore); padre.appendChild(r); return r;
}
// Arco: cornice con i due angoli alti a metà larghezza, base dritta, contenuto ritagliato.
async function arco(padre, nome, x, y, w, h, colore) {
  const a = figma.createFrame(); a.name = nome; a.resize(w, h); a.x = x; a.y = y;
  a.topLeftRadius = a.topRightRadius = w / 2; a.bottomLeftRadius = a.bottomRightRadius = 0;
  a.clipsContent = true; await colora(a, colore); padre.appendChild(a); return a;
}
async function testo(padre, nome, contenuto, stile, colore, x, y, w, opz = {}) {
  const t = figma.createText(); t.name = nome;
  await t.setTextStyleIdAsync(STILI_TESTO[stile].id);
  t.characters = contenuto;
  if (STILE_SENZA_OPSZ && OPSZ_OK && t.fontName && t.fontName.family && t.fontName.family.startsWith("Bodoni Moda")) {
    try { t.fontName = conOpsz(t.fontName); } catch (e) {}
  }
  if (opz.size) t.fontSize = opz.size;
  if (opz.lh) t.lineHeight = { unit: "PERCENT", value: opz.lh };
  if (opz.ls !== undefined) t.letterSpacing = { unit: "PERCENT", value: opz.ls };
  if (opz.align) t.textAlignHorizontal = opz.align;
  if (w) { t.textAutoResize = "HEIGHT"; t.resize(w, t.height); } else { t.textAutoResize = "WIDTH_AND_HEIGHT"; }
  t.x = x; t.y = y;
  await colora(t, colore); padre.appendChild(t); return t;
}
function istanza(padre, comp, x, y, larghezza, nome) {
  const i = comp.createInstance(); if (nome) i.name = nome;
  if (larghezza) i.rescale(larghezza / i.width);
  i.x = x; i.y = y; padre.appendChild(i); return i;
}
async function segnaposto(padre, etichetta, larghezzaTesto) {
  // Testo guida dentro i riquadri delle foto; si cancella quando si mette la foto.
  const t = await testo(padre, "Indicazione foto (da cancellare)", etichetta, "etichetta", "verde-loggia", 0, 0, larghezzaTesto, { align: "CENTER" });
  t.x = (padre.width - t.width) / 2; t.y = (padre.height - t.height) / 2 + (padre.topLeftRadius ? padre.width / 8 : 0);
  return t;
}
// Pila verticale: mette ogni testo sotto il precedente con lo spazio indicato.
function impila(nodi, y0, spazi) {
  let y = y0; nodi.forEach((n, i) => { n.y = y; y += n.height + (spazi[i] || 0); });
}

// ---------- Componenti ----------
const C = {};
async function creaComponenti(pagina) {
  let x = 0, y = 0;
  const titolo = async (s, yy) => { await testo(pagina, "Sezione", s, "titolo-m", "verde-loggia", 0, yy, null); };
  await titolo("Tessere", 0); y = 120;
  for (const [nome, svg] of Object.entries(ASSETS.tessere)) {
    const n = figma.createNodeFromSvg(svg); n.rescale(CASELLA / n.width);
    const c = figma.createComponentFromNode(n); c.name = `Tessera/${nome}`; c.x = x; c.y = y;
    pagina.appendChild(c); C[`tessera-${nome}`] = c;
    x += CASELLA + 40; if (x > 8 * (CASELLA + 40)) { x = 0; y += CASELLA + 60; }
  }
  y += CASELLA + 120; await titolo("Marchio", y); y += 120; x = 0;
  for (const [nome, svg] of Object.entries(ASSETS.marchio)) {
    const n = figma.createNodeFromSvg(svg); n.rescale(400 / n.width);
    const c = figma.createComponentFromNode(n); c.name = `Marchio/${nome}`; c.x = x; c.y = y;
    pagina.appendChild(c); C[`marchio-${nome}`] = c;
    const sfondo = { "panna-ocra": "verde-loggia", "panna": "rosso", "verde": "rosa", "verde-rosso": "panna" }[nome.replace("riga-", "")];
    const r = await riquadro(pagina, `Fondo per marchio ${nome}`, x - 20, y - 20, 440, c.height + 40, sfondo);
    pagina.insertChild(pagina.children.indexOf(c), r);
    x += 500; if (x >= 2000) { x = 0; y += 260; }
  }
  y += 300; await titolo("Albero e stella", y); y += 120;
  const alb = figma.createNodeFromSvg(ASSETS.albero); alb.rescale(560 / alb.width);
  C.albero = figma.createComponentFromNode(alb); C.albero.name = "Albero"; C.albero.x = 0; C.albero.y = y; pagina.appendChild(C.albero);
  const st = figma.createNodeFromSvg(ASSETS.stella); st.rescale(200 / st.width);
  C.stella = figma.createComponentFromNode(st); C.stella.name = "Stella"; C.stella.x = 700; C.stella.y = y; pagina.appendChild(C.stella);
  y += 700; await titolo("Illustrazioni", y); y += 120; x = 0;
  for (const [nome, svg] of Object.entries(ASSETS.illustrazioni)) {
    const n = figma.createNodeFromSvg(svg); n.rescale(300 / n.width);
    const c = figma.createComponentFromNode(n); c.name = `Illustrazione/${nome}`; c.x = x; c.y = y;
    pagina.appendChild(c); C[nome] = c; x += 400;
  }
}

// ---------- Template ----------
const POST = [1080, 1350], STORIA = [1080, 1920];
const marchioPost = (f, variante) => istanza(f, C[`marchio-${variante}`], MEZZA, 54, 230, "Marchio");
const tessera = (f, nome, x, y, lato = CASELLA) => istanza(f, C[`tessera-${nome}`], x, y, lato, `Tessera ${nome}`);

async function annuncio() {
  const [w, h] = POST; const f = cornice("Annuncio · 1080×1350", w, h); await colora(f, "panna");
  // Fasce di tessere sopra e sotto: mai due fondi uguali accanto, mai tessere a fondo panna.
  ["stella", "portici", "pallina", "cupola", "regalo", "campanile", "stellina", "onda"].forEach((n, i) => tessera(f, n, i * CASELLA, 0));
  ["campana", "fiocco", "pois", "cupola", "candela", "bastoncino", "regalo", "stella"].forEach((n, i) => tessera(f, n, i * CASELLA, h - CASELLA));
  istanza(f, C["marchio-verde-rosso"], MEZZA, 178, 945, "Marchio (titolo)");
  // L'albero grande in un arco rosa di 3 × 3,5 caselle appoggiato alla fascia in basso; accanto date, cosa succede, linea, hashtag.
  const yB = h - CASELLA - 3.5 * CASELLA, hB = 3.5 * CASELLA;
  const a = await arco(f, "Arco", MEZZA, yB, 3 * CASELLA, hB, "rosa");
  const alb = istanza(a, C.albero, 0, 0, 350, "Albero"); alb.x = (a.width - alb.width) / 2; alb.y = a.height - alb.height + 2;
  const x = MEZZA + 3 * CASELLA + 44, lw = 945 - 3 * CASELLA - 44;
  const d1 = await testo(f, "Date", "dal 5 dicembre\nal 6 gennaio", "titolo-m", "verde-loggia", x, yB, lw, { size: 62, lh: 102 });
  // "dal" e "al" in corsivo rosso, come la frase.
  for (const [i, j] of [[0, 3], [15, 17]]) {
    await d1.setRangeTextStyleIdAsync(i, j, STILI_TESTO["frase"].id);
    d1.setRangeFontSize(i, j, 62); d1.setRangeLineHeight(i, j, { unit: "PERCENT", value: 102 });
    await d1.setRangeFillStyleIdAsync(i, j, STILI_COLORE["rosso"].id);
  }
  const d2 = await testo(f, "Cosa succede", "Musica, spettacoli, mercatini e intrattenimento per tutta la famiglia.", "frase", "inchiostro", x, 0, lw, { size: 40, lh: 118 });
  const d4 = await testo(f, "Hashtag", "#mottanatale", "info", "rosso", x, 0, lw, { size: 32, ls: 2 }); d4.textCase = "ORIGINAL";
  d4.y = yB + hB - 40 - d4.height;
  const d3 = await riquadro(f, "Linea", x, d4.y - 18 - 3, lw, 3, "verde-loggia");
  d2.y = d1.y + d1.height + (d3.y - d1.y - d1.height - d2.height) / 2;
  return f;
}

const EVENTI = [
  [[5, "sab", "rosso", "panna", "Push Day: si accendono le luci", "Dalle 15.00 in Piazza Luzzatti · Alle 17.00 si accendono l'albero e le luminarie"],
   [6, "dom", "ocra", "verde-loggia", "San Nicolò con la parrocchia", "[ora] · [luogo]"],
   [8, "mar", "verde-cupola", "inchiostro", "Mercatino dell'antiquariato e albero della Madonna", "[ora] · Con il mercatino dei bambini, a cura della Pro Loco"]],
  [[12, "sab", "verde-loggia", "panna", "Concerto dell'Orchestra dei Fiati della Livenza", "[ora] · Sotto la Loggia, con Babbo Natale"],
   [13, "dom", "azzurro", "inchiostro", "Christmas Gravel Ride", "[ora] · Con Zero 5 Bike Team"],
   [19, "sab", "ocra", "verde-loggia", "Festa dell'asilo con Babbo Natale", "[ora] · Animazione e concerto di Natale del gruppo TAM"]],
  [[20, "dom", "verde-cupola", "inchiostro", "Mercatino dell'hobbistica e mercato natalizio", "[ora] · Della Pro Loco, giochi in legno, concerto di Evoluzione Musica"],
   [23, "mer", "ocra", "verde-loggia", "Letture danzanti", "Ore 18.00 in piazza · Prenotazione obbligatoria"],
   [24, "gio", "rosso", "panna", "Il pomeriggio della Pro Loco", "[ora] · [luogo]"]],
  [[26, "sab", "verde-loggia", "panna", "Smaltiamo il panettone", "Ore 9.30, parcheggio CIMIC · Corsa e camminata con Atletica Mottense"],
   [5, "mar", "azzurro", "inchiostro", "Pan e Vin", "[ora] · A cura del CAI Motta"],
   [6, "mer", "ocra", "verde-loggia", "Elfifania", "[ora] · Con il rinfresco della Pro Loco"]]
];
async function programma(pagina, eventi, piede, mese = "dicembre") {
  const [w, h] = POST; const f = cornice(`Programma ${pagina} · 1080×1350`, w, h); await colora(f, "rosa");
  marchioPost(f, "verde");
  await testo(f, "Titolo", "Il programma", "titolo-l", "verde-loggia", MEZZA, 205, null);
  await testo(f, "Mese", mese, "frase", "inchiostro", MEZZA, 315, null);
  for (let i = 0; i < eventi.length; i++) {
    const [n, g, fondo, inchiostro, titolo, nota] = eventi[i]; const y = 405 + i * 270;
    const riga = figma.createFrame(); riga.name = `Giorno ${n}`; riga.resize(w, 270); riga.x = 0; riga.y = y; riga.fills = []; f.appendChild(riga);
    const cas = figma.createFrame(); cas.name = `Casella del giorno ${n}`; cas.resize(270, 270); await colora(cas, fondo); riga.appendChild(cas);
    await testo(cas, "Giorno della settimana", g, "etichetta", inchiostro, 0, 41, 270, { align: "CENTER" });
    await testo(cas, "Numero", String(n), "numero-programma", inchiostro, 0, 85, 270, { align: "CENTER" });
    const t = await testo(riga, "Attività", titolo, "nome-evento", "verde-loggia", 314, 0, 698);
    const no = await testo(riga, "Ora e luogo", nota, "nota", "inchiostro", 314, 0, 698, { size: 28 });
    const alto = t.height + 14 + no.height; impila([t, no], (270 - alto) / 2, [14]);
  }
  await testo(f, "Piede", piede, "nota", "verde-loggia", MEZZA, h - 52 - 31, null);
  return f;
}


// ---------- Carosello del giorno (Push Day e altri giorni) ----------
// Copertina con il numero nell'arco, poi una pagina per attività. In alto un elemento che continua da una pagina all'altra:
// il filo di lampadine (Push Day) o una fascia di tessere spostata di mezza casella.
function filoLampadine(i, N) {
  const PASSO = 540, Y0 = 196, FRECCIA = 92, ord = ["rosso", "ocra", "rosa", "azzurro", "verde-cupola", "panna"];
  const yFilo = x => { const t = (x % PASSO) / PASSO; return Y0 + FRECCIA * 4 * t * (1 - t); };
  const dx = -i * 1080; let filo = `M${dx} ${Y0}`, l = "", k = 0;
  for (let x = 0; x < 1080 * N; x += PASSO) filo += ` Q${x + PASSO / 2 + dx} ${Y0 + 2 * FRECCIA} ${x + PASSO + dx} ${Y0}`;
  for (let x = 37; x < 1080 * N; x += 74, k++) {
    const px = x + dx; if (px < -40 || px > 1120) continue;
    const y = yFilo(x), c = COLORI[ord[k % ord.length]];
    l += `<g transform="translate(${px} ${y})"><rect x="-8" y="0" width="16" height="16" rx="2" fill="${COLORI.panna}"/>` +
      `<path d="M0 14 C16 14 22 31 22 44 C22 60 11 71 0 71 C-11 71 -22 60 -22 44 C-22 31 -16 14 0 14Z" fill="${c}"/>` +
      `<ellipse cx="-7" cy="34" rx="4" ry="8" fill="${COLORI.panna}" fill-opacity=".55"/></g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="420" viewBox="0 0 1080 420"><path d="${filo}" fill="none" stroke="${COLORI.panna}" stroke-opacity=".7" stroke-width="3"/>${l}</svg>`;
}

async function caroselloGiorno(g) {
  const [w, h] = POST, N = g.attivita.length + 1, out = [];
  const alto = (f, i) => {
    if (g.lampadine) {
      const n = figma.createNodeFromSvg(filoLampadine(i, N)); n.name = "Filo di lampadine (continua nella pagina dopo)"; f.appendChild(n); n.x = 0; n.y = 0;
    } else {
      const fa = figma.createFrame(); fa.name = "Fascia di tessere (continua nella pagina dopo)"; fa.resize(w, CASELLA); fa.y = 200; fa.fills = []; fa.clipsContent = true; f.appendChild(fa);
      for (let k = 0; k * CASELLA - 67.5 - i * w < w; k++) {
        const x = k * CASELLA - 67.5 - i * w;
        if (x > -CASELLA) tessera(fa, g.tessere[k % g.tessere.length], x, 0);
      }
    }
  };
  // copertina
  const c = cornice(`${g.nome} · copertina · 1080×1350`, w, h); await colora(c, g.fondo);
  const a = await arco(c, "Arco del giorno (colore fisso del giorno)", CASELLA, 360, 810, 560, g.colore);
  const corpoNum = String(g.numero).length > 1 ? 520 : 640;
  const num = await testo(a, "Numero del giorno", String(g.numero), "numero-arco", g.inchiostro, 0, 0, 810, { align: "CENTER", size: corpoNum });
  num.y = 560 - num.height + corpoNum * 0.034;
  alto(c, 0);
  marchioPost(c, "panna-ocra");
  const t1 = await testo(c, "Titolo", g.titolo, "titolo-l", "panna", MEZZA, 0, 945, { size: g.corpoTitolo || 112 });
  const t2 = await testo(c, "Frase", g.frase, "frase", "ocra", MEZZA, 0, 945);
  const t3 = await testo(c, "Giorno, luogo e ora", g.info, "info", "panna", MEZZA, 0, 945, { size: 30 });
  impila([t1, t2, t3], 952, [6, 26]);
  const inv = await testo(c, "Invito", g.invito, "nota", "panna", 0, 0, null, { size: 28 }); inv.x = w - MEZZA - inv.width; inv.y = h - 60 - inv.height;
  out.push(c);
  // una pagina per attività
  for (const [i, m] of g.attivita.entries()) {
    const f = cornice(`${g.nome} · ${i + 2} di ${N} · 1080×1350`, w, h); await colora(f, g.fondo);
    alto(f, i + 1);
    marchioPost(f, "panna-ocra");
    const gi = figma.createFrame(); gi.name = "Casella del giorno"; gi.resize(CASELLA, CASELLA); gi.x = w - MEZZA - CASELLA; gi.y = 54; await colora(gi, g.colore); f.appendChild(gi);
    const sg = await testo(gi, "Giorno", g.sigla, "etichetta", g.inchiostro, 0, 22, CASELLA, { align: "CENTER" });
    const ng = await testo(gi, "Numero", String(g.numero), "numero-programma", g.inchiostro, 0, 0, CASELLA, { align: "CENTER", size: 76 }); ng.y = sg.y + sg.height + 4;
    // ora: "ore" in corsivo ocra, poi l'ora in grande sulla stessa linea di base
    const pre = await testo(f, "Ore", m.pre, "frase", "ocra", MEZZA, 0, null, { size: 60 });
    const ora = await testo(f, "Ora", m.ora, "numero-arco", "panna", MEZZA + pre.width + 22, 0, null, { size: m.parole ? 150 : 230, lh: 100 });
    if (m.parole) ora.fontName = await font("Bodoni Moda 11pt", "ExtraBold Italic");
    const blocco = [];
    blocco.push(await testo(f, "Titolo dell'attività", m.titolo, "titolo-l", "panna", MEZZA, 0, 945));
    if (m.frase) blocco.push(await testo(f, "Frase", m.frase, "frase", "ocra", MEZZA, 0, 945));
    if (m.corpo) blocco.push(await testo(f, "Descrizione", m.corpo, "corpo", "panna", MEZZA, 0, 880, { size: 40 }));
    if (m.elenco) for (const e of m.elenco) {
      const r = await testo(f, "Voce dell'elenco", e, "corpo", "panna", MEZZA + 34, 0, 911, { size: 34, lh: 125 });
      r.setPluginData("voce", "1"); blocco.push(r);
    }
    // blocco centrato tra l'elemento in alto (y 380) e il piede (h - 140)
    const spazi = blocco.map((n, k) => (k === 0 ? 0 : (n.getPluginData("voce") ? (blocco[k - 1].getPluginData("voce") ? 12 : 22) : n.name === "Descrizione" ? 24 : 10)));
    const altoOra = ora.height, altoTesto = blocco.reduce((s, n, k) => s + n.height + spazi[k], 0);
    let y = 380 + (h - 140 - 380 - altoOra - 44 - altoTesto) / 2;
    ora.y = y; pre.y = y + ora.height * (m.parole ? 0.62 : 0.6) - pre.height * 0.7; y += altoOra + 44;
    for (const [k, n] of blocco.entries()) {
      y += spazi[k]; n.y = y;
      if (n.getPluginData("voce")) { const st = istanza(f, C.stella, MEZZA, y + 12, 22, "Stellina"); }
      y += n.height;
    }
    await testo(f, "Luogo", m.luogo || g.luogo, "info", "ocra", MEZZA, h - 60 - 36, null, { size: 30 });
    const sc = await testo(f, "Scorri", i < g.attivita.length - 1 ? "Scorri →" : "#mottanatale", "nota", "panna", 0, 0, null, { size: 28 });
    sc.x = w - MEZZA - sc.width; sc.y = h - 60 - sc.height;
    out.push(f);
  }
  return out;
}

const PUSH_DAY = {
  nome: "Push Day", numero: 5, sigla: "sab", colore: "rosso", inchiostro: "panna", fondo: "verde-loggia", lampadine: true,
  titolo: "Push Day", frase: "si accendono le luci di Motta", info: "Sabato 5 dicembre · Piazza Luzzatti · dalle 15.00",
  invito: "Scorri per scoprire il programma →", luogo: "Piazza Luzzatti",
  attivita: [
    { pre: "dalle", ora: "15.00", titolo: "Il pomeriggio dei bambini", elenco: ["Laboratorio creativo \"La borsetta di Natale\" con l'elfo", "Palloncini sagomati", "Arriva Pan di Zenzero con le caramelle", "Foto ricordo e letterine per Babbo Natale", "Baby dance natalizia con l'elfo"] },
    { pre: "ore", ora: "17.00", titolo: "Si accendono le luci", corpo: "I bambini accendono insieme l'albero di Natale e tutte le luminarie di Motta. Poi cantano i bambini dell'asilo." },
    { pre: "ore", ora: "17.30", titolo: "Unbrassed Band", frase: "@unbrassedband", corpo: "Musica dal vivo in piazza per chiudere il pomeriggio." },
    { pre: "per", ora: "tutta la sera", parole: true, titolo: "Si pattina gratis", frase: "speciale inaugurazione", corpo: "La pista di pattinaggio è aperta e gratuita per tutta la serata." },
  ],
};
const GIORNO_12 = {
  nome: "Il giorno (12 dicembre)", numero: 12, sigla: "sab", colore: "verde-loggia", inchiostro: "panna", fondo: "rosso",
  tessere: ["stella", "portici", "abete", "onda", "regalo", "cupola", "fiocco", "candela", "campanile", "corona", "bastoncino", "stellina"],
  titolo: "Sabato 12 dicembre", corpoTitolo: 96, frase: "cosa succede in centro", info: "Sotto la Loggia · dalle [ora]",
  invito: "Scorri per vedere cosa c'è →", luogo: "Sotto la Loggia",
  attivita: [
    { pre: "ore", ora: "[ora]", titolo: "Concerto dell'Orchestra dei Fiati della Livenza", corpo: "[Una riga sul concerto: cosa suonano, quanto dura.]" },
    { pre: "ore", ora: "[ora]", titolo: "Arriva Babbo Natale", corpo: "[Una riga su cosa succede: foto, letterine, caramelle.]" },
  ],
};

// ---------- Pista di pattinaggio ----------
async function pista() {
  const [w, h] = POST; const f = cornice("Pista di pattinaggio · 1080×1350", w, h); await colora(f, "verde-loggia");
  marchioPost(f, "panna-ocra");
  const a = await arco(f, "Arco del ghiaccio", CASELLA, 230, 810, 470, "azzurro");
  const scie = figma.createNodeFromSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="810" height="470" viewBox="0 0 810 470" fill="none" stroke="${COLORI.panna}" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"><path d="M90 380 C180 300 330 300 400 360 C470 420 620 420 720 330"/><path d="M120 430 C240 360 360 380 430 420 C520 470 640 440 740 400"/><path d="M260 250 C320 210 420 210 470 250 C520 290 600 290 650 250"/></svg>`);
  scie.name = "Scie sul ghiaccio"; a.appendChild(scie); scie.x = 0; scie.y = 0;
  const pt = istanza(a, C.pattino, 0, 0, 430, "Pattino"); pt.x = (810 - pt.width) / 2; pt.y = 470 - pt.height - 6;
  const t1 = await testo(f, "Titolo", "La pista di pattinaggio", "titolo-l", "panna", MEZZA, 740, 945);
  await testo(f, "Periodo", "dal 5 dicembre al 6 gennaio, in centro", "frase", "ocra", MEZZA, t1.y + t1.height + 10, 945);
  await riquadro(f, "Linea", MEZZA, 1040, 945, 3, "panna");
  for (const [k, [et, val]] of [["Dove", "[luogo]"], ["Orari", "[orari]"], ["Ingresso", "[prezzo]"]].entries()) {
    const x = MEZZA + k * (945 + 28) / 3;
    const e = await testo(f, `Etichetta ${et}`, et, "etichetta", "ocra", x, 1065, 297);
    await testo(f, et, val, "titolo-m", "panna", x, e.y + e.height + 10, 297, { size: 40, lh: 105 });
  }
  const n = await testo(f, "Serata speciale", "Sabato 5 dicembre si pattina gratis per tutta la sera.", "nota", "panna", MEZZA, 0, 945, { size: 28 });
  n.setRangeFontName(0, 17, await font("Archivo", "ExtraBold")); await n.setRangeFillStyleIdAsync(0, 17, STILI_COLORE["ocra"].id);
  n.y = h - 56 - n.height;
  return f;
}

// ---------- Smaltiamo il panettone (post e storia) ----------
// Stessa impaginazione della locandina A3 (pagine/Locandina-Panettone.html), misure in mm convertite in px:
// la larghezza del foglio (303 mm) diventa 1080 px. dy sposta il contenuto come nella pagina (#post -6 mm, #story +52 mm).
async function panettone(storia) {
  const [w, h] = storia ? STORIA : POST, K = 1080 / 303 * 1.0, dy = storia ? 52 : -6;
  const mm = v => v * K, Y = v => (v + dy) * K;
  const f = cornice(`Smaltiamo il panettone · ${storia ? "storia 1080×1920" : "post 1080×1350"}`, w, h); await colora(f, "panna");
  const T = 30.3 * K;
  ["stella", "onda", "portici", "pallina", "cupola", "stellina", "campanile", "regalo", "pois", "fiocco"].forEach((n, i) => tessera(f, n, i * T, 0, T));
  if (storia) ["campana", "bastoncino", "candela", "cupola", "regalo", "stella", "onda", "pois", "fiocco", "portici"].forEach((n, i) => tessera(f, n, i * T, h - T, T));
  const chi = await testo(f, "Chi", "Atletica Mottense · una corsa da gustare insieme", "etichetta", "verde-loggia", 0, Y(40), w, { align: "CENTER", size: mm(5.2), ls: 16 });
  await chi.setRangeFillStyleIdAsync(18, 19, STILI_COLORE["rosso"].id);
  const su = await testo(f, "Titolo (prima riga)", "Smaltiamo", "titolo-l", "verde-loggia", mm(18), Y(49), null, { size: mm(50), lh: 92, ls: -2 });
  const giu = await testo(f, "Titolo (seconda riga)", "il panettone", "frase", "rosso", mm(18 + 16 + 18), su.y + su.height + mm(1), null, { size: mm(42), lh: 92, ls: -1 });
  istanza(f, C.stella, mm(18 + 16), giu.y + giu.height / 2 - mm(4), mm(13), "Stella");
  await testo(f, "Frase", "Dopo il pranzo di Natale, una mattinata di corsa e compagnia.", "frase", "inchiostro", mm(18), Y(142), w - 2 * mm(18), { align: "CENTER", size: mm(9) });
  // data: il 26 nell'arco verde, accanto giorno e ora
  const xa = mm(52);
  const a = await arco(f, "Arco del 26", xa, Y(162), mm(64), mm(60), "verde-loggia");
  const n26 = await testo(a, "Numero", "26", "numero-arco", "panna", 0, 0, mm(64), { align: "CENTER", size: mm(48) }); n26.y = mm(60) - n26.height + mm(1.6);
  const q1 = await testo(f, "Giorno", "Sabato\n26 dicembre", "titolo-l", "verde-loggia", xa + mm(73), 0, null, { size: mm(17), lh: 100, ls: -1 });
  const q2 = await testo(f, "Ora", "Partenza ore 9.30", "info", "rosso", xa + mm(73), 0, null, { size: mm(9) });
  const q3 = await testo(f, "Prima", "Arriva qualche minuto prima per conoscere il gruppo.", "nota", "inchiostro", xa + mm(73), 0, null, { size: mm(4.6) });
  impila([q1, q2, q3], Y(162) + mm(60) - mm(2) - (q1.height + mm(3.5) + q2.height + mm(2) + q3.height), [mm(3.5), mm(2)]);
  const bo = figma.createEllipse(); bo.name = "Bollino"; bo.resize(mm(40), mm(40)); bo.x = w - mm(16) - mm(40); bo.y = Y(162); await colora(bo, "rosso"); f.appendChild(bo);
  const b1 = await testo(f, "Gratis", "Gratis", "titolo-m", "panna", bo.x, 0, mm(40), { align: "CENTER", size: mm(12) });
  const b2 = await testo(f, "Senza iscrizione", "senza\niscrizione", "etichetta", "panna", bo.x, 0, mm(40), { align: "CENTER", size: mm(3.2) });
  impila([b1, b2], bo.y + (mm(40) - b1.height - b2.height - mm(1.2)) / 2, [mm(1.2)]);
  const gb = figma.group([bo, b1, b2], f); gb.name = "Bollino gratis"; gb.rotation = 8; // inclinato come nella locandina
  // illustrazioni e strada
  istanza(f, C.panettone, mm(24), Y(235), mm(62), "Panettone");
  istanza(f, C["corridore-verde"], mm(148), Y(236), mm(44), "Corridore verde");
  istanza(f, C["corridore-rosso"], mm(218), Y(233), mm(44), "Corridore rosso");
  await riquadro(f, "Strada", 0, Y(292), w, mm(17), "ocra");
  const sr = await testo(f, "Strada (testo)", "Corsa e camminata, anche Nordic Walking · non competitiva", "etichetta", "inchiostro", 0, 0, w, { align: "CENTER", size: mm(5.2), ls: 12 });
  sr.y = Y(292) + (mm(17) - sr.height) / 2;
  // tre colonne
  const col = (w - 2 * mm(18)) / 3;
  const fatti = [["Partenza e arrivo", "Parcheggio CIMIC", "Riviera Scarpa\nMotta di Livenza (TV)"],
    ["Il percorso", "5 km", "sul Giro del Paeseo, da ripetere quante volte vuoi. C'è anche chi fa 7 o 10 km."],
    ["E alla fine…", "Si ripristina!", "Brulè e tè caldi, spritz, panettone e patatine."]];
  for (const [k, [et, ti, de]] of fatti.entries()) {
    const x = mm(18) + k * col;
    const e = await testo(f, `Etichetta ${k + 1}`, et, "etichetta", "rosso", x, Y(318), col, { align: "CENTER", size: mm(4.2), ls: 14 });
    const t = await testo(f, `Titolo ${k + 1}`, ti, "titolo-m", "verde-loggia", x + mm(4), 0, col - mm(8), { align: "CENTER", size: mm(10.5) });
    const d = await testo(f, `Dettaglio ${k + 1}`, de, "nota", "inchiostro", x + mm(4), 0, col - mm(8), { align: "CENTER", size: mm(4.4) });
    impila([e, t, d], Y(318), [mm(2.6), mm(2)]);
    if (k) await riquadro(f, `Separatore ${k}`, x, Y(318), mm(0.7), mm(40), "verde-loggia");
  }
  const pr = await testo(f, "Prudenza", "Prudenza: metà percorso è su strada aperta al traffico, senza marciapiedi.\nTieni la sinistra e rispetta il Codice della strada.", "nota", "inchiostro", mm(18), Y(364), w - 2 * mm(18), { align: "CENTER", size: mm(4.2) });
  pr.setRangeFontName(0, 9, await font("Archivo", "ExtraBold")); await pr.setRangeFillStyleIdAsync(0, 9, STILI_COLORE["rosso"].id);
  return f;
}

async function storia() {
  const [w, h] = STORIA; const f = cornice("Storia · 1080×1920", w, h); await colora(f, "verde-loggia");
  istanza(f, C["marchio-panna-ocra"], 405, 240, 270, "Marchio");
  await testo(f, "Oggi", "oggi è il", "frase", "panna", 0, 406, w, { align: "CENTER", size: 60 });
  const a = await arco(f, "Arco del giorno (colore fisso del giorno)", 120, 480, 840, 720, "rosso");
  const num = await testo(a, "Numero del giorno", "5", "numero-arco", "panna", 0, 0, 840, { align: "CENTER", size: 780 });
  num.y = 720 - num.height + 28;
  const t1 = await testo(f, "Titolo", "Luci accese,\npista aperta", "titolo-l", "panna", 120, 0, 840);
  const t2 = await testo(f, "Descrizione", "Musica, pattinaggio gratuito, Babbo Natale e il presepe.", "corpo", "panna", 120, 0, 840);
  const t3 = await testo(f, "Data e luogo", "Sabato 5 dicembre · [luogo]", "info", "ocra", 120, 0, 840);
  impila([t1, t2, t3], 1236, [16, 18]);
  return f;
}

async function botteghe() {
  const [w, h] = POST; const out = [];
  const c = cornice("Botteghe – copertina · 1080×1350", w, h); await colora(c, "verde-loggia");
  marchioPost(c, "panna-ocra");
  await testo(c, "Titolo", "Le botteghe\ndi Motta", "titolo-l", "panna", MEZZA, 210, null, { size: 160, lh: 90, ls: -2 });
  await testo(c, "Frase", "Chi c'è dietro le vetrine del centro, una bottega alla volta.", "frase", "panna", MEZZA, 560, 800);
  await testo(c, "Invito", "Scorri per conoscerle →", "nota", "panna", MEZZA, 720, null);
  const righe = [["regalo", "righe", "portici", "stellina", "onda", "pallina", "abete", "cupola"],
                 ["caramella", "campanile", "candela", "corona", "stella", "portici", "pois", "fiocco"]];
  righe.forEach((r, ri) => r.forEach((n, ci) => tessera(c, n, ci * CASELLA, 1080 + ri * CASELLA)));
  out.push(c);

  const s = cornice("Botteghe – scheda 01 · 1080×1350", w, h); await colora(s, "azzurro");
  marchioPost(s, "verde");
  await testo(s, "Nome del negozio", "Nome del negozio", "titolo-l", "verde-loggia", MEZZA, 198, 810);
  const foto = await arco(s, "Foto della vetrina (Fill → Image)", CASELLA, 432, 540, 648, "panna");
  await segnaposto(foto, "Foto della vetrina\nverticale, luce naturale", 420);
  const n1 = figma.createFrame(); n1.name = "Numero della bottega"; n1.resize(270, 270); n1.x = 675; n1.y = 432; await colora(n1, "rosso"); s.appendChild(n1);
  const nt = await testo(n1, "Numero", "01", "numero-bottega", "panna", 0, 0, 270, { align: "CENTER" }); nt.y = (270 - nt.height) / 2;
  await testo(s, "Indirizzo e profilo", "Via Esempio 1\n@profiloinstagram", "nota", "inchiostro", 705, 737, 340);
  await riquadro(s, "Fascia", 0, 1080, w, 270, "verde-loggia");
  await testo(s, "Cosa si trova", "Una riga sul negozio, scritta da chi ci lavora: cosa si trova, da quanto c'è, chi lo porta avanti.", "corpo", "panna", MEZZA, 1124, 900);
  out.push(s);

  const a = cornice("Botteghe – articolo 01 · 1080×1350", w, h); await colora(a, "panna");
  const fa = figma.createFrame(); fa.name = "Foto dell'articolo (Fill → Image)"; fa.resize(1080, 1080); await colora(fa, "panna"); a.appendChild(fa);
  await segnaposto(fa, "Foto dell'articolo in evidenza\nquadrata, a tutta pagina", 600);
  await riquadro(a, "Fascia", 0, 1080, w, 270, "verde-loggia");
  const ta = await testo(a, "Nome dell'articolo", "Nome dell'articolo", "titolo-m", "panna", MEZZA, 0, 702);
  const ia = await testo(a, "Idea regalo", "L'idea regalo di Nome del negozio", "info", "ocra", MEZZA, 0, 702);
  impila([ta, ia], 1124, [16]);
  const n2 = figma.createFrame(); n2.name = "Numero della bottega"; n2.resize(270, 270); n2.x = 810; n2.y = 1080; await colora(n2, "rosso"); a.appendChild(n2);
  const nt2 = await testo(n2, "Numero", "01", "numero-bottega", "panna", 0, 0, 270, { align: "CENTER" }); nt2.y = (270 - nt2.height) / 2;
  out.push(a);
  return out;
}

async function casellaLogo(padre, x, y, nome, lato = 216) {
  const area70 = Math.round(lato * 0.7);
  const cl = figma.createFrame(); cl.name = nome ? "Nome al posto del logo" : "Logo sponsor (sostituisci)"; cl.resize(lato, lato); cl.x = x; cl.y = y;
  await colora(cl, "bianco"); padre.appendChild(cl);
  if (nome) {
    const t = await testo(cl, "Nome", nome, "nome-casella", "verde-loggia", 18, 0, lato - 36, { align: "CENTER" }); t.y = (lato - t.height) / 2;
  } else {
    const area = figma.createRectangle(); area.name = `Area logo, max 70% (${area70}px): metti qui il logo`; area.resize(area70, area70); area.x = area.y = (lato - area70) / 2;
    area.fills = []; area.strokeWeight = 2; area.strokes = [{ type: "SOLID", color: rgb("#2B2019"), opacity: 0.3 }]; area.dashPattern = [6, 6]; cl.appendChild(area);
    const t = await testo(cl, "Indicazione (da cancellare)", "logo", "etichetta", "inchiostro", 0, 0, lato, { align: "CENTER", size: 16 }); t.y = (lato - t.height) / 2;
  }
  return cl;
}
async function sponsor() {
  const [w, h] = POST; const f = cornice("Sponsor · 1080×1350", w, h); await colora(f, "verde-loggia");
  marchioPost(f, "panna-ocra");
  await testo(f, "Titolo", "Il Natale in centro\nlo firmano loro", "titolo-l", "panna", MEZZA, 205, null);
  await testo(f, "Testo", "Queste attività sostengono il Natale nel centro di Motta. Grazie.", "corpo", "panna", MEZZA, 425, 880);
  const g = figma.createFrame(); g.name = "Scacchiera 5×3 (216px)"; g.resize(1080, 648); g.x = 0; g.y = h - 648; g.fills = []; f.appendChild(g);
  const tt = ["regalo", "pallina", "regalo", "bastoncino", "bastoncino", "pallina", "regalo", "pallina"]; let ti = 0, li = 0;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
    if ((r + c) % 2 === 0) tessera(g, tt[ti++], c * 216, r * 216, 216);
    else { li++; await casellaLogo(g, c * 216, r * 216, li === 4 ? "Nome attività" : null); }
  }
  return f;
}

async function offertoDa() {
  // Come l'articolo in evidenza delle botteghe: foto quadrata, fascia verde, logo dello sponsor su bianco nell'angolo. Niente marchio sulla foto.
  const [w, h] = POST; const f = cornice("Offerto da · 1080×1350", w, h); await colora(f, "panna");
  const fo = figma.createFrame(); fo.name = "Foto dell'installazione (Fill → Image)"; fo.resize(1080, 1080); await colora(fo, "panna"); f.appendChild(fo);
  await segnaposto(fo, "Foto dell'installazione\nquadrata, a tutta pagina", 600);
  await riquadro(f, "Fascia", 0, 1080, w, 270, "verde-loggia");
  const t = await testo(f, "Nome dell'installazione", "Nome dell'installazione", "titolo-m", "panna", MEZZA, 0, 702, { size: 64 });
  const o = await testo(f, "Offerta da", "Offerta da Nome dello sponsor", "info", "ocra", MEZZA, 0, 702, { size: 32 });
  impila([t, o], 1080 + (270 - t.height - 14 - o.height) / 2, [14]);
  await casellaLogo(f, 810, 1080, null, 270);
  return f;
}

async function caccia() {
  const [w, h] = POST; const f = cornice("Caccia a Zenzerino · 1080×1350", w, h); await colora(f, "verde-loggia");
  const fondo = { abete: "p", caramella: "p", corona: "p", righe: "p", stella: "v", bastoncino: "v", fiocco: "v", portici: "o", regalo: "o", onda: "a", candela: "r", stellina: "r", pois: "R", pallina: "R", campana: "R" };
  const nomi = Object.keys(fondo); let seme = 11; const caso = () => (seme = (seme * 48271) % 2147483647) / 2147483647;
  const Z = 37, celle = []; const bg = n => (n === "zenzerino" ? "r" : fondo[n]);
  for (let i = 0; i < 64; i++) {
    if (i === Z) { celle.push("zenzerino"); continue; }
    const vicini = [i % 8 ? celle[i - 1] : null, i >= 8 ? celle[i - 8] : null].filter(Boolean); let n;
    do { n = nomi[Math.floor(caso() * nomi.length)]; } while (vicini.some(v => v === n || bg(v) === bg(n)) || (i === Z + 1 && bg(n) === "r") || (i === Z + 8 && bg(n) === "r"));
    celle.push(n);
  }
  const g = figma.createFrame(); g.name = "Griglia 8×8 (sposta Zenzerino ogni volta)"; g.resize(1080, 1080); g.fills = []; f.appendChild(g);
  celle.forEach((n, i) => tessera(g, n, (i % 8) * CASELLA, Math.floor(i / 8) * CASELLA));
  const t1 = await testo(f, "Titolo", "Dov'è Zenzerino?", "titolo-l", "panna", MEZZA, 1110, null, { size: 96 });
  await testo(f, "Testo", "Trovalo qui sopra, poi cercalo nelle vetrine delle botteghe di Motta.", "corpo", "panna", MEZZA, t1.y + t1.height + 12, 740);
  const m = istanza(f, C["marchio-panna-ocra"], 0, 0, 205, "Marchio"); m.x = w - MEZZA - 205; m.y = h - 40 - m.height;
  return f;
}

// ---------- Avvio ----------
async function main() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await creaStiliColore();
  await creaStiliTesto();

  const pComp = figma.createPage(); pComp.name = "Motta Natalè · Componenti";
  await figma.setCurrentPageAsync(pComp);
  await creaComponenti(pComp);

  const pTpl = figma.createPage(); pTpl.name = "Motta Natalè · Template";
  await figma.setCurrentPageAsync(pTpl);
  const cornici = [];
  cornici.push(await annuncio());
  cornici.push(await programma("1 di 4", EVENTI[0], "Scorri per le altre date →"));
  cornici.push(await programma("2 di 4", EVENTI[1], "Scorri per le altre date →"));
  cornici.push(await programma("3 di 4", EVENTI[2], "Scorri per le altre date →"));
  cornici.push(await programma("4 di 4", EVENTI[3], "#mottanatale", "dicembre e gennaio"));
  for (const p of await caroselloGiorno(PUSH_DAY)) cornici.push(p);
  for (const p of await caroselloGiorno(GIORNO_12)) cornici.push(p);
  cornici.push(await storia());
  cornici.push(await pista());
  for (const b of await botteghe()) cornici.push(b);
  cornici.push(await sponsor());
  cornici.push(await offertoDa());
  cornici.push(await caccia());
  cornici.push(await panettone(false));
  cornici.push(await panettone(true));

  let x = 0;
  for (const c of cornici) { pTpl.appendChild(c); c.x = x; c.y = 0; x += c.width + 120; }
  figma.viewport.scrollAndZoomIntoView(cornici);
  if (STILE_SENZA_OPSZ) avvisi.push("Dimensione ottica 11 applicata a ogni testo Bodoni (gli stili di testo di questa versione di Figma non la salvano)");
  figma.notify(`Motta Natalè: ${cornici.length} template creati` + (avvisi.length ? ` · ${avvisi.length} avvisi sui font` : ""), { timeout: 6000 });
  if (avvisi.length) console.warn(avvisi.join("\n"));
}

main().then(() => figma.closePlugin()).catch(e => { console.error(e); figma.closePlugin("Errore: " + (e && e.message ? e.message : e)); });
