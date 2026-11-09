---
name: Motta a Natale 2026
description: Campagna Instagram in cui il giorno con un'attività è il protagonista, in una casella dal colore fisso che si apre ad arco
colors:
  verde-loggia: "#1a5548"
  rosso: "#bd3128"
  rosa: "#f3b2c1"
  azzurro: "#86b6de"
  ocra: "#e8a63a"
  verde-cupola: "#2e9c8e"
  panna: "#f4ecdc"
  inchiostro: "#2b2019"
  bianco: "#ffffff"
  biscotto: "#b8743e"
typography:
  numero-xl-storia:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "780px"
    fontWeight: 900
    lineHeight: 0.74
    letterSpacing: "-0.03em"
    fontVariation: '"opsz" 28'
  numero-xl:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "700px"
    fontWeight: 900
    lineHeight: 0.74
    letterSpacing: "-0.03em"
    fontVariation: '"opsz" 28'
  numero-bottega:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "190px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  numero-programma:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "180px"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.03em"
  numero-m:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "76px"
    fontWeight: 900
    lineHeight: 1
  titolo-copertina:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "160px"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  titolo-annuncio:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "130px"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  titolo-caccia:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "96px"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  titolo-l:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "104px"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  titolo-m:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "76px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
  nome-evento:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "58px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  nome-sponsor:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "58px"
    fontWeight: 800
    lineHeight: 1.02
  nome-sponsor-casella:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1.02
  frase-oggi:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "60px"
    fontWeight: 500
    lineHeight: 1.15
  frase:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.15
  info:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.06em"
  corpo:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: 1.35
  nota-programma:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.3
  nota:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
  etichetta:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  retto: "0px"
  arco: "999px"
spacing:
  mezza: "67.5px"
  casella-storia: "120px"
  casella: "135px"
  casella-logo: "216px"
  doppia: "270px"
components:
  casella-giorno:
    backgroundColor: "{colors.rosso}"
    textColor: "{colors.panna}"
    typography: "{typography.numero-programma}"
    rounded: "{rounded.retto}"
    size: "{spacing.doppia}"
  casella-giorno-chiara:
    backgroundColor: "{colors.ocra}"
    textColor: "{colors.verde-loggia}"
    typography: "{typography.numero-programma}"
    rounded: "{rounded.retto}"
    size: "{spacing.doppia}"
  arco-evento:
    backgroundColor: "{colors.rosso}"
    textColor: "{colors.panna}"
    typography: "{typography.numero-xl}"
    width: "810px"
    height: "675px"
  arco-storia:
    backgroundColor: "{colors.rosso}"
    textColor: "{colors.panna}"
    typography: "{typography.numero-xl-storia}"
    width: "840px"
    height: "720px"
  arco-albero:
    backgroundColor: "{colors.panna}"
    width: "810px"
    height: "675px"
  arco-bottega:
    backgroundColor: "{colors.panna}"
    width: "540px"
    height: "675px"
  casella-bottega:
    backgroundColor: "{colors.rosso}"
    textColor: "{colors.panna}"
    typography: "{typography.numero-bottega}"
    rounded: "{rounded.retto}"
    size: "{spacing.doppia}"
  fascia:
    backgroundColor: "{colors.verde-loggia}"
    textColor: "{colors.panna}"
    height: "{spacing.doppia}"
    padding: "44px 67.5px 0"
  timbro:
    rounded: "{rounded.retto}"
    size: "{spacing.casella}"
  marchio:
    width: "190px"
  marchio-storia:
    width: "260px"
  marchio-annuncio:
    width: "500px"
  marchio-caccia:
    width: "170px"
  casella-logo:
    backgroundColor: "{colors.bianco}"
    rounded: "{rounded.retto}"
    size: "{spacing.casella-logo}"
  casella-logo-nome:
    backgroundColor: "{colors.bianco}"
    textColor: "{colors.verde-loggia}"
    typography: "{typography.nome-sponsor-casella}"
    rounded: "{rounded.retto}"
    size: "{spacing.casella-logo}"
    padding: "0 18px"
  arco-offerto:
    backgroundColor: "{colors.panna}"
    width: "810px"
    height: "675px"
  firma-sponsor:
    textColor: "{colors.panna}"
    typography: "{typography.nome-sponsor}"
---

# Design System: Motta a Natale 2026

## Overview

**Creative North Star: "Il lunario della piazza"**

Il giorno è il protagonista. Solo i giorni con un'attività hanno una casella: un quadrato a spigolo vivo nel colore fisso di quel giorno, con il numero in Bodoni nerissimo come su un lunario appeso in cucina. I giorni senza attività non compaiono: niente calendario completo, niente caselle vuote. Nel programma le caselle si mettono in fila, tre per pagina; nel post e nella storia dell'evento la casella si apre come un'arcata dei portici, e il numero riempie la finestra e ne sfonda la base.

Il mondo è piatto e geometrico, a colori pieni, senza profondità. La città entra con parsimonia: una sola tessera per post, come un timbro nell'angolo, e l'albero piatto dentro l'arco dell'annuncio. I simboli sono due: la stella a quattro punte firma tutte le grafiche di Natale (nel marchio, in cima all'albero, nel timbro d'angolo), Zenzerino resta la mascotte delle vetrine. Le griglie di tessere restano alla caccia a Zenzerino, alla copertina delle botteghe e al post sponsor, dove le tessere regalo, pallina e bastoncino si alternano ai loghi.

La densità è bassa: un arco o una fila di caselle, un titolo concreto, una riga di data e luogo. Le grafiche si eseguono in Canva: ogni regola qui sotto si ottiene con rettangoli, cerchi, SVG caricati e due famiglie Google Fonts.

**Key Characteristics:**
- Una casella solo per i giorni con un'attività, nel colore fisso del giorno.
- Un passo unico di casella (135px nei post, 120px nelle storie, 270px per la casella doppia) governa margini, blocchi, archi e tessere; unica eccezione la casella logo da 216px degli sponsor.
- Fondi pieni nei quattro colori di fondo; panna vive solo dentro archi, segnaposto foto e testi sui fondi scuri.
- Al massimo una finestra ad arco per post, a semicerchio pieno sopra e base dritta.
- Tessere con parsimonia: al massimo una per post, come timbro da 135px in basso a destra, di norma la stellina; fanno eccezione la caccia, la copertina delle botteghe e il post sponsor.
- La stella a quattro punte è il simbolo di tutte le grafiche di Natale; Zenzerino è la mascotte delle vetrine.
- Bodoni Moda per numeri, titoli e frase; Archivo maiuscolo per le informazioni pratiche.
- Nessuna ombra, sfumatura o texture: solo superfici piatte accostate.
- Il marchio "Motta a Natale", con la stella al posto della "a", firma le grafiche della campagna al posto del logo istituzionale, sempre su un fondo pieno.

## Colors

Una tavolozza da lunario di paese, presa dal logo e dai materiali del centro: verde scuro, rosso, rosa e azzurro pieni come fondi, ocra e verde acqua come colori di casella e tessera, panna come carta dentro l'arco.

### Primary
- **Verde Loggia** (`verde-loggia`): il fondo di riferimento (post evento, storia, post sponsor, offerto da, copertina botteghe, caccia) e la fascia bassa delle pagine bottega; sopra porta testi panna e la riga info in ocra. Su rosa, ocra e panna diventa il colore di numeri e titoli; è anche un colore di giorno.
- **Rosso Duomo** (`rosso`): fondo dell'annuncio, colore fisso del 5 dicembre negli esempi (arco e casella del programma), casella del numero della bottega.

### Secondary
- **Rosa Confetto** (`rosa`): fondo del programma; titoli e nomi degli eventi in verde-loggia, mese e note in inchiostro.
- **Azzurro Livenza** (`azzurro`): fondo della scheda bottega e colore di giorno; testo corrente in inchiostro, verde-loggia solo per titoli grandi.

### Tertiary
- **Ocra della Torre** (`ocra`): colore di giorno e di tessere; colore della riga info sul verde-loggia; colore della stella da sola (`marchio/stella.svg`), della stella in cima all'albero e di stella e "Natale" nel marchio sul verde-loggia. Mai fondo pieno di un post.
- **Verde Cupola** (`verde-cupola`): il verde acqua del logo; colore di giorno e fondo della tessera cupola, con testi in inchiostro.
- **Biscotto** (`biscotto`): riservato a Zenzerino quando compare a colori.

### Neutral
- **Panna Sportello** (`panna`): dentro l'arco dell'annuncio e della scheda bottega, segnaposto della foto, testi sui fondi scuri, figura chiara di tessere e palline dell'albero.
- **Inchiostro** (`inchiostro`): testo corrente su rosa, azzurro e verde-cupola.
- **Bianco Logo** (`bianco`): solo dietro ai loghi, in una casella quadrata: i loghi degli sponsor (casella logo da 216px nel post sponsor e nella firma dell'offerto da) e, dove serve, il logo istituzionale. Mai fondo pieno di un post, mai dietro al marchio della campagna.

### Named Rules
**The Panna Inside Rule.** La panna non è mai un fondo pieno di post: sta dentro archi e segnaposto foto, o è il colore del testo sui fondi scuri.

**The Colore del Giorno Rule.** Ogni giorno con un'attività riceve un colore tra rosso, ocra, verde-loggia, azzurro, verde-cupola e rosa e lo tiene in tutta la campagna: casella del programma, arco del post, arco della storia. Due giorni vicini nel programma non hanno lo stesso colore, e il fondo del post non è mai il colore del giorno che ospita.

**The Fondo a Rotazione Rule.** I fondi dei post ruotano tra verde-loggia, rosso, rosa e azzurro; due post consecutivi non condividono il fondo.

## Typography

**Display Font:** Bodoni Moda (con Bodoni 72, Didot, serif)
**Body Font:** Archivo (con Helvetica Neue, Arial, sans-serif)

**Character:** Il bodoniano ad alto contrasto del logo, portato al nero 900, dà ai numeri il peso di un lunario; Archivo pesante e maiuscolo fa la parte del cartello pratico, quando e dove.

### Hierarchy
- **Numero XL storia** (900, 780px, interlinea 0.74, -0.03em, dimensione ottica 28): il giorno dentro l'arco della storia; esce dalla base dell'arco di circa 28px.
- **Numero XL** (900, 700px, 0.74, -0.03em, dimensione ottica 28): il giorno dentro l'arco del post evento; esce dalla base di circa 24px.
- **Numero bottega** (900, 190px, -0.03em): il numero d'ordine (`01`, `02`) nella casella rossa della scheda e dell'articolo.
- **Numero programma** (900, 180px, 0.8, -0.03em): il giorno nella casella da 270px del programma, sotto l'etichetta del giorno della settimana.
- **Numero M** (900, 76px): il numero in una casella da 135px.
- **Titolo copertina** (800, 160px, 0.9, -0.02em): "Le botteghe di Motta" sulla copertina del carosello.
- **Titolo annuncio** (800, 130px, 0.92, -0.02em): il titolo d'auguri, nella struttura dell'annuncio. Nell'annuncio il titolo è il marchio, non testo composto.
- **Titolo caccia** (800, 96px): "Dov'è Zenzerino?", su una riga sotto la griglia.
- **Titolo L** (800, 104px, 0.98, -0.015em): il titolo di post evento, storia, programma, post sponsor e scheda bottega; in tondo, iniziale maiuscola, massimo due righe.
- **Titolo M** (800, 76px, -0.01em): il nome dell'articolo nella fascia della pagina articolo; il nome dell'installazione sotto l'arco dell'offerto da, massimo due righe.
- **Nome evento** (800, 58px, 1.02, -0.01em): il nome dell'attività accanto alla casella nel programma, massimo tre righe.
- **Nome sponsor** (800, 58px, 1.02): il nome dello sponsor nella firma dell'offerto da, in panna; stessa misura del nome evento.
- **Nome sponsor casella** (800, 34px, 1.02): il nome che sostituisce un logo illeggibile nella casella bianca del post sponsor, in verde-loggia, centrato.
- **Frase oggi** (500 corsivo, 60px, 1.15): "oggi è il" centrato sopra l'arco della storia.
- **Frase** (500 corsivo, 44px, 1.15): payoff dell'annuncio, nome del mese nel programma, sottotitolo della copertina, "offerta da" in ocra nella firma dello sponsor.
- **Info** (800, 40px, 0.06em, maiuscolo): la riga di data e luogo sotto il titolo, per esteso; le date in fondo all'annuncio; "L'idea regalo di [negozio]" in ocra nella fascia dell'articolo.
- **Corpo** (500, 36px, 1.35): descrizioni di massimo due righe.
- **Nota programma** (600, 26px, 1.3): ora e luogo sotto il nome dell'evento nel programma.
- **Nota** (600, 24px, 1.3): hashtag, indirizzi, invito a scorrere.
- **Etichetta** (800, 22px, 0.1em, maiuscolo): giorno della settimana dentro la casella del giorno.

### Named Rules
**The Titolo Apre Rule.** Il titolo apre il post da solo: niente occhielli, rubriche o nome della campagna scritto sopra di lui. Il marchio nell'angolo e la casella dicono già chi parla.

**The Pesi Espliciti Rule.** In Canva Bodoni Moda va scelto con lo spessore dichiarato (Black per i numeri, ExtraBold per titoli e nomi); un sostituto bodoniano vale per tutta la campagna, mai per un solo post.

## Layout

Tutto si misura sulla casella. Il post 1080×1350 è una griglia di 8×10 caselle da 135px; la storia 1080×1920 è 9×16 caselle da 120px. I testi rientrano di mezza casella (67,5px) dal bordo; blocchi, fasce e archi iniziano e finiscono su multipli della casella. La casella doppia (270px) è la misura della casella del programma, della casella della bottega e della fascia bassa dei caroselli. L'unica misura fuori passo è la casella logo da 216px: cinque in larghezza riempiono i 1080px, più piccole i loghi non si leggono.

Ogni formato ha una sola struttura: l'arco in alto (6×5 caselle da x 135 a 945, y 135 a 810) con titolo, corpo e info sotto (annuncio, evento) o con il nome dell'installazione e la firma dello sponsor (offerto da); l'arco 7×6 da 120px (x 120–960, y 480–1200) con "oggi è il" sopra (storia); tre righe da 270px con la casella a filo del bordo sinistro e il nome dell'evento accanto a 44px (programma, da y 405); titolo e corpo in alto e, nella metà bassa, la scacchiera di 5×3 caselle da 216px a tutta larghezza e a filo del fondo (post sponsor); la griglia 8×8 di tessere (caccia).

Il marchio sta in alto a sinistra nei post e nei caroselli, a (67,5; 20) e largo 190px; nelle storie in alto al centro, largo 260px, a 240px dal bordo; nell'annuncio è il titolo stesso, largo 500px; nella caccia a Zenzerino in basso a destra, largo 170px. Le pagine con la foto a tutta pagina non hanno il marchio. Nelle storie i primi 240px e la parte bassa restano liberi per l'interfaccia di Instagram e lo sticker. Nei caroselli ogni pagina ripete passo e posizioni: marchio in alto a sinistra, titolo da 67,5px a sinistra e 175px dall'alto (180px il titolo della copertina botteghe), fascia bassa di 270px.

**The Passo Unico Rule.** Se un blocco, un arco o una casella non inizia e non finisce su un multiplo di casella o di mezza casella, è fuori sistema. L'unica eccezione è la casella logo da 216px degli sponsor.

**The Pagina Ferma Rule.** Nei caroselli marchio, titolo e fascia stanno nelle stesse posizioni su ogni pagina, così scorrendo non saltano.

## Elevation & Depth

Il sistema è piatto. Non ci sono ombre portate, sfumature né texture: la profondità si legge solo dalla sovrapposizione di superfici piene (il numero che sfonda la base dell'arco, l'albero appoggiato alla base). Non ci sono filetti né contorni attorno a caselle, loghi e archi: le caselle logo bianche si accostano alle tessere a filo. L'ombra attorno alle anteprime in `pagine/` appartiene alla cornice di presentazione a 50%, e il tratteggio dei segnaposto "logo" segna solo dove va il logo: nessuno dei due si pubblica.

**The Superficie Piena Rule.** Ogni area è un solo colore pieno; nessun elemento galleggia sopra un altro con un'ombra.

## Shapes

Due sole forme. Il quadrato a spigolo vivo (raggio 0) per caselle, tessere, caselle logo, foto e fasce. L'arco dei portici: rettangolo con il lato superiore a semicerchio di raggio pari a metà della larghezza e la base dritta. Le misure degli archi sono multipli del passo: 6×5 caselle nel post evento, nell'annuncio e nell'offerto da, 7×6 caselle da 120px nella storia, 4×5 nella scheda bottega. Le figure delle tessere e dell'albero usano lo stesso vocabolario: rettangoli, triangoli, semicerchi, archetti, cerchi pieni, capsule, tratti a spessore costante (le due onde della Livenza, il bastoncino a strisce, gli anelli del fiocco del regalo) e la stella a quattro punte a lati concavi.

**The Un Arco Rule.** Al massimo un arco per post. L'arco contiene il numero del giorno nel suo colore fisso, oppure l'albero su panna, oppure una foto (la vetrina, l'installazione offerta); mai due di queste cose, mai due archi.

## Components

### Casella del giorno
Il quadrato del giorno con un'attività, a tinta piena nel colore fisso del giorno.
- **Nel programma:** 270px a filo del bordo sinistro; etichetta del giorno della settimana sopra, numero programma sotto, centrati in colonna.
- **Testo:** panna su rosso e verde-loggia; verde-loggia su ocra e rosa; inchiostro su azzurro e verde-cupola.
- **Aperta:** nel post e nella storia dell'evento la casella diventa l'arco (vedi sotto).

### Arco aperto
La firma della campagna. Fondo nel colore fisso del giorno, numero panna allineato in basso che esce dalla base con un margine negativo di 24px (post) o 28px (storia). Nel post evento sopra l'arco c'è solo il marchio in alto a sinistra; nella storia "oggi è il" in frase oggi sta centrato sopra l'arco.

### Arco dell'albero
Nell'annuncio e negli auguri l'arco è panna e contiene l'albero (`illustrazioni/albero.svg`, 560px di larghezza) appoggiato alla base: abete verde-loggia a tre piani, in cima la stella a quattro punte in ocra, sei palline rosso, ocra e panna. È l'unica illustrazione grande della campagna.

### Riga del programma
Tre righe da 270px per pagina, in ordine di data: casella del giorno a sinistra, a destra il nome evento in verde-loggia e sotto la nota programma in inchiostro con ora e luogo. In fondo, in nota, "Scorri per le altre date →" o l'hashtag sull'ultima pagina.

### Pagine bottega
- **Copertina:** fondo verde-loggia, titolo copertina panna su due righe, sotto la frase e "Scorri per conoscerle →" in nota; in fondo due righe di 8 tessere da 135px a filo del bordo.
- **Scheda:** fondo azzurro, nome del negozio in titolo L verde-loggia, foto della vetrina in un arco panna di 4×5 caselle, a destra la casella bottega rossa da 270px con il numero, indirizzo e profilo in nota sotto; nella fascia una riga in corpo scritta dal negozio, senza etichette sopra.
- **Articolo:** foto quadrata a tutta larghezza (1080×1080), nessun arco e nessun marchio; nella fascia il nome dell'articolo in titolo M panna e sotto "L'idea regalo di [negozio]" in info ocra; la casella bottega in basso a destra.
- **Fascia:** verde-loggia, alta 270px, testi panna rientrati di mezza casella.

### Post sponsor
Il ringraziamento agli sponsor del Natale: post singoli, uno ogni 7 sponsor, non un carosello. Fondo verde-loggia, marchio panna-ocra, in alto il titolo L panna ("Il Natale in centro lo firmano loro") e una riga in corpo ("Queste attività sostengono il Natale nel centro di Motta. Grazie."). Il nome interno dell'adesione degli sponsor non compare mai nei testi pubblicati.
- **Scacchiera:** nella metà bassa 15 caselle da 216px (5×3), a tutta larghezza e a filo del fondo, alternate a scacchiera.
- **Caselle logo:** 7, bianco, con il logo dello sponsor centrato e al massimo il 70% della casella (151px), senza ritocchi né contorni.
- **Tessere:** 8, agli angoli e in mezzo: regalo, pallina, bastoncino, mai due uguali accostate. Il bastoncino (fondo verde-loggia) mai nella riga in alto, che tocca il fondo verde-loggia.
- **Logo illeggibile:** al suo posto, nella casella bianca, il nome in nome sponsor casella verde-loggia.
- **Ultimo post:** se gli sponsor non sono multipli di 7, le caselle logo vuote diventano altre tessere della stessa serie.

### Offerto da
Un post verde-loggia per ogni installazione offerta da un solo sponsor. Marchio panna-ocra, poi l'arco di 6×5 caselle con la foto dell'installazione (verticale, luce naturale, senza filtri), sotto il nome dell'installazione in titolo M panna.
- **Firma dello sponsor:** in fondo, una casella logo bianca da 216px con il logo (al massimo il 70%), accanto "offerta da" in frase ocra e il nome in nome sponsor panna.
- **Logo illeggibile:** la casella bianca si toglie e resta il nome.

### Timbro
L'unica tessera del post: 135px nell'angolo in basso a destra, a filo dei bordi. Di norma è la `stellina` (stella rossa su rosa), simbolo della campagna, come nel post evento. Le 18 tessere SVG (`tessere/`) hanno fondo e figura fissi e si caricano così come sono; quattro sono di Motta: portici, cupola (la Loggia), campanile (il Duomo), onda (la Livenza: due onde parallele verde-loggia su azzurro, da bordo a bordo).

### I due simboli
- **La stella a quattro punte:** il simbolo di tutte le grafiche di Natale. Sta nel marchio (al posto della "a"), in cima all'albero e nel timbro d'angolo. Da sola è `marchio/stella.svg`, in ocra.
- **Zenzerino:** la mascotte delle vetrine. Protagonista solo nella caccia, dove è nascosto tra le tessere; altrove una tessera tra le altre.

### Marchio
La firma della campagna, su due righe: "Motta" in Bodoni Moda 800, sotto la stella a quattro punte seguita da "Natale" in 500 corsivo. La stella prende il posto della "a": si legge "Motta a Natale". Testo già in tracciati (`marchio/`), si carica così come è; l'immagine del profilo Instagram è `marchio/profilo-motta-a-natale.png`.
- **Versioni:** quattro, una per fondo. `panna-ocra` sul verde-loggia ("Motta" panna, stella e "Natale" ocra); `panna` sul rosso (tutto panna); `verde` sul rosa e sull'azzurro ("Motta" e "Natale" verde-loggia, stella rosso); `verde-rosso` sulla panna ("Motta" verde-loggia, stella e "Natale" rosso).
- **Posizione:** in alto a sinistra a (67,5; 20), largo 190px, nei post e nei caroselli; in alto al centro, largo 260px, a 240px dal bordo nelle storie; nell'annuncio è il titolo, largo 500px; nella caccia a Zenzerino in basso a destra, largo 170px. Nessun marchio sulle pagine con la foto a tutta pagina.
- **Limiti:** sempre su un fondo pieno, mai sopra una foto; almeno 150px di larghezza su un post da 1080; non si ricompone, non si deforma, non si ricolora fuori dalle quattro versioni.
- **Il nome in parole:** dove il nome è scritto per esteso si scrive sempre "Motta a Natale", con la "a"; la stella al posto della "a" esiste solo nel marchio.

**The Marchio su Pieno Rule.** Il marchio vive solo su un fondo pieno e nella versione di quel fondo; dove c'è una foto, il marchio non c'è.

## Do's and Don'ts

### Do:
- **Do** dare una casella solo ai giorni con un'attività, nel loro colore fisso, e tenerlo in ogni post in cui compaiono.
- **Do** misurare tutto sulla casella: 135px nei post, 120px nelle storie, 270px per la casella doppia, testi a 67,5px dal bordo; 216px solo per le caselle logo degli sponsor.
- **Do** usare al massimo una tessera per post, come timbro da 135px in basso a destra; griglie di tessere solo nella caccia a Zenzerino, nelle due righe della copertina botteghe e nella scacchiera del post sponsor.
- **Do** scrivere nella riga info il luogo preciso dal programma, per esteso e in maiuscolo.
- **Do** firmare ogni grafica con il marchio nella versione del suo fondo, nella stessa posizione per formato: in alto a sinistra largo 190px nei post, in alto al centro largo 260px nelle storie; fanno eccezione l'annuncio (il marchio è il titolo), la caccia (in basso a destra, 170px) e le pagine con la foto a tutta pagina (nessun marchio).

### Don't:
- **Don't** disegnare il calendario completo né caselle per i giorni senza attività.
- **Don't** usare panna o bianco come fondo pieno di un post; il bianco sta solo dietro ai loghi.
- **Don't** mettere più di un arco per post, né arrotondare gli spigoli delle caselle.
- **Don't** usare ombre portate, sfumature, texture o illustrazioni realistiche.
- **Don't** mettere scritte sopra al titolo: occhielli, rubriche o il nome della campagna in testo composto.
- **Don't** mettere il marchio sopra una foto, sotto i 150px di larghezza su un post da 1080 o in colori fuori dalle quattro versioni; non ricomporlo e non deformarlo.
- **Don't** sostituire la "a" con la stella fuori dal marchio: nei testi composti il nome è "Motta a Natale".
- **Don't** accostare due tessere uguali o con lo stesso fondo.
- **Don't** usare Zenzerino in più di un post su tre o più di una volta per post, fuori dalla caccia.
