// Carosello del giorno: copertina con il numero nell'arco, poi una pagina per attività con l'ora in grande.
// Lo usano CaroselloPushDay.html (filo di lampadine) e CaroselloGiorno.html (fascia di tessere).
// Un unico elemento in alto attraversa tutte le pagine: scorrendo, continua da una pagina all'altra.
function caroselloGiorno(g) {
  const N = g.attivita.length + 1, LARGO = 1080 * N;

  // Filo di lampadine (Push Day): festoni da 540px tra punti a y 196, lampadine ogni 74px che pendono dritte.
  function lampadine() {
    const PASSO = 540, Y0 = 196, FRECCIA = 92;
    const COLORI = ["--rosso", "--ocra", "--rosa", "--azzurro", "--verde-cupola", "--panna"];
    const yFilo = x => { const t = (x % PASSO) / PASSO; return Y0 + FRECCIA * 4 * t * (1 - t); };
    let filo = `M0 ${Y0}`, l = "", k = 0;
    for (let x = 0; x < LARGO; x += PASSO) filo += ` Q${x + PASSO / 2} ${Y0 + 2 * FRECCIA} ${x + PASSO} ${Y0}`;
    for (let x = 37; x < LARGO; x += 74, k++) {
      const y = yFilo(x), c = `var(${COLORI[k % COLORI.length]})`;
      // portalampada panna, bulbo a goccia nel colore, riflesso panna: la lampadina è accesa
      l += `<g transform="translate(${x} ${y})">
        <rect x="-8" y="0" width="16" height="16" rx="2" fill="var(--panna)"/>
        <path d="M0 14 C16 14 22 31 22 44 C22 60 11 71 0 71 C-11 71 -22 60 -22 44 C-22 31 -16 14 0 14Z" fill="${c}"/>
        <ellipse cx="-7" cy="34" rx="4" ry="8" fill="var(--panna)" opacity=".55"/></g>`;
    }
    return i => `<svg class="abs filo" viewBox="${i * 1080} 0 1080 420" aria-hidden="true">
      <path d="${filo}" fill="none" stroke="var(--panna)" stroke-width="3" opacity=".7"/>${l}</svg>`;
  }

  // Fascia di tessere (gli altri giorni): una riga da 135px a y 200, spostata di mezza casella
  // così ogni pagina taglia una tessera a metà e la pagina dopo la completa.
  function fascia() {
    const n = Math.ceil(LARGO / 135) + 1;
    const celle = Array.from({ length: n }, (_, k) => g.tessere[k % g.tessere.length]);
    const riga = celle.map((t, k) => `<div class="casella" style="left:${k * 135 - 67.5}px"><img src="../design-system/tessere/${t}.svg" alt=""></div>`).join("");
    return i => `<div class="abs fascia-continua" aria-hidden="true"><div style="left:${-i * 1080}px">${riga}</div></div>`;
  }

  const alto = g.lampadine ? lampadine() : fascia();
  const marchio = `<img class="abs marchio" src="../design-system/marchio/marchio-panna-ocra.svg" alt="Motta Natalè">`;
  const stella = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0Q11 9 20 10Q11 11 10 20Q9 11 0 10Q9 9 10 0Z" fill="var(--ocra)"/></svg>`;
  const stile = `background:var(${g.fondo})`;

  const copertina = `
<div class="cornice"><div class="post cg" style="${stile}">
  ${marchio}
  <div class="abs arco finestra" style="background:var(${g.colore})"><div class="numero-xl" style="color:var(${g.inchiostro})${String(g.numero).length > 1 ? ";font-size:520px;margin-bottom:-18px" : ""}">${g.numero}</div></div>
  ${alto(0)}
  <div class="abs cop">
    <h1 class="titolo-l"${g.corpoTitolo ? ` style="font-size:${g.corpoTitolo}px"` : ""}>${g.titolo}</h1>
    <p class="frase">${g.frase}</p>
    <p class="info">${g.info}</p>
  </div>
  <div class="abs piede"><span></span><span class="nota">${g.invito}</span></div>
</div></div>`;

  const interne = g.attivita.map((m, i) => `
<div class="cornice"><div class="post cg" style="${stile}">
  ${marchio}
  <div class="abs casella giorno" style="background:var(${g.colore});color:var(${g.inchiostro})"><span class="m">${g.sigla}</span><span class="n">${g.numero}</span></div>
  ${alto(i + 1)}
  <div class="abs blocco">
    <p class="ora${m.parole ? " parole" : ""}"><em>${m.pre}</em><b>${m.ora}</b></p>
    <div class="testo">
      <h2 class="titolo-l">${m.titolo}</h2>
      ${m.frase ? `<p class="frase">${m.frase}</p>` : ""}
      ${m.corpo ? `<p class="corpo">${m.corpo}</p>` : ""}
      ${m.elenco ? `<ul class="elenco">${m.elenco.map(e => `<li>${stella}<span>${e}</span></li>`).join("")}</ul>` : ""}
    </div>
  </div>
  <div class="abs piede"><span class="info">${m.luogo || g.luogo}</span><span class="nota">${i < g.attivita.length - 1 ? "Scorri →" : "#mottanatale"}</span></div>
</div></div>`).join("");

  document.getElementById("pagine").innerHTML = copertina + interne + `<p class="didascalia">${g.didascalia}</p>`;
}
