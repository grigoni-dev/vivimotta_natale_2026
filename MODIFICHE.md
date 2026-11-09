# Modifiche al design system — novembre 2026

Il cliente trovava tipografia e testi banali, "da AI". Il sistema precedente funzionava, ma assomigliava a qualsiasi campagna natalizia: titolo serif su fondo panna, tessere attorno. Questa revisione dà alla campagna un'idea sola che la rende riconoscibile e ne ricava tipografia, testi e impaginazione.

Restano invariati: il mosaico di tessere geometriche, gli archi dei portici, i colori del logo, le 16 tessere SVG, Zenzerino in secondo piano, i formati Instagram, i font disponibili in Canva.

## 1. L'idea: il mosaico diventa il calendario

**Cosa:** dal 5 dicembre al 6 gennaio ci sono 33 giorni. Ogni giorno è una casella quadrata con il suo numero, sullo stesso passo delle tessere. L'annuncio mostra tutto il calendario, il programma un mese vero a 7 colonne, il post evento la settimana accanto al giorno aperto nell'arco, la storia "oggi è il 5".

**Perché:** prima il mosaico era decorazione. Ora porta un'informazione (che giorno è, cosa c'è in settimana) e dà alla campagna una forma che nessun altro comune ha. Scorrendo il profilo, il calendario si riempie. L'idea è stata scelta tra più direzioni nella pagina di scelta.

- Nuovo componente **casella**, con cinque stati: spenta (fuori campagna), chiusa (senza evento o non ancora raccontata), con evento, oggi (fondo panna), aperta (l'arco del post del giorno).
- Ogni giorno con evento ha un **colore fisso** in tutti i post: negli esempi il 5 è rosso, il 6 ocra, il 12 verde-loggia, il 13 azzurro e il 20 verde-cupola. Il colore del giorno non coincide mai con il fondo del post.
- La **finestra ad arco** è la casella del giorno che si apre. Contiene il numero, enorme, che esce dal fondo dell'arco come da una porta dei portici. Ha sempre il raggio pari a metà della larghezza e inizia e finisce sulla griglia.
- **La pianta del centro**: nell'annuncio il calendario sta tra la piazza (riga in alto: portici, Loggia, Duomo) e la Livenza (riga in basso: onde e ponte).
- **Tre nuove tessere di Motta**, disegnate a partire dagli edifici del logo: `cupola` (la Loggia), `campanile` (il Duomo) e `ponte` (sulla Livenza). Ora le tessere sono 19, cinque delle quali parlano di Motta.

## 2. Tipografia

| Prima | Dopo | Perché |
|---|---|---|
| DM Serif Display per i titoli | **Bodoni Moda** 800 per i titoli, 900 per i numeri, 500 corsivo per la frase | DM Serif Display è uno dei caratteri più usati di default; da qui l'effetto "già visto". Bodoni Moda è dello stesso genere del lettering "VIVI MOTTA" nel logo (bodoniano ad alto contrasto): campagna e logo parlano con la stessa voce. In nero 900 i numeri ricordano i calendari e i lunari. |
| Archivo 900 per le date (`SAB 5`) | Date come **numeri in Bodoni** dentro le caselle; Archivo 800 maiuscolo solo per la riga "quando e dove" | Il giorno è il protagonista del sistema, quindi ha il carattere più espressivo. |
| Etichetta sopra il titolo ("VIVI MOTTA A NATALE", "Rubrica · …") | Eliminata | Era un riempitivo: il logo nella casella dice già chi parla e il titolo apre il post da solo. |
| `titolo-xl/l/m/s`, `payoff`, `data` | `numero-xl/m/s`, `titolo-l/m`, `frase`, `info`, `etichetta`, `corpo`, `nota` | Gli stili seguono i nuovi ruoli. Valori in `design-system/tokens.json`. |

**Da verificare in Canva:** Bodoni Moda è su Google Fonts, ma non ho potuto controllare il menu font di Canva. Cercalo per nome. Se manca, usa un altro bodoniano gratuito (per esempio Libre Bodoni) e tienilo per tutta la campagna.

## 3. Testi

Regola nuova: il titolo dice **i fatti** dell'evento, non uno slogan sul Natale. Se una frase andrebbe bene per qualunque paese, va riscritta con qualcosa di Motta. In `design-system.md` c'è l'elenco delle parole da evitare.

| Dove | Prima | Dopo |
|---|---|---|
| Post evento / storia | Si accende il Natale | Luci accese, pista aperta |
| Riga data e luogo | Sab 5 dic · In centro | SABATO 5 DICEMBRE · [luogo]: sempre il nome preciso dal programma |
| Storia | OGGI | oggi è il **5** |
| Annuncio | Il programma completo arriva a breve | 33 giorni in centro · Il programma giorno per giorno nei prossimi post |
| Programma | Il programma — DICEMBRE | Dal 5 al 20 dicembre |
| Botteghe, copertina | Questo Natale regala vicino. | Chi c'è dietro le vetrine del centro, una bottega alla volta. |
| Sponsor | Grazie a chi accende il Natale | Il Natale in centro lo firmano loro |
| Caccia | Cercalo nelle vetrine delle botteghe di Motta. | Trovalo qui sopra, poi cercalo nelle vetrine delle botteghe di Motta. |

Gli eventi del programma, i loro nomi e le date sono rimasti quelli degli esempi precedenti. Ho solo riscritto in modo più diretto quello del 5 dicembre.

## 4. Colori

- I fondi ruotano tra `verde-loggia`, `rosso`, `rosa` e `azzurro`. **`panna` non è più un fondo pieno**: vive dentro caselle, archi e riquadri. Il fondo crema con titolo serif è proprio la combinazione che faceva sembrare la campagna generica.
- `azzurro` diventa fondo, per la scheda bottega: un colore del logo in più nel feed.
- `verde-cupola`, il verde acqua del logo, prima quasi assente, ora colora caselle con evento e la tessera `cupola`.
- Testo piccolo su `ocra` e `azzurro`: sempre `inchiostro` per il contrasto.

## 5. Impaginazione

- **Tutto sul passo della casella:** i post sono una griglia 8×10 di caselle da 135px, le storie 9×16 da 120px. Margini dei testi a mezza casella (67,5px).
- **Logo** sempre in una casella bianca, in alto a destra nei post e in alto al centro nelle storie, sotto la fascia dell'interfaccia di Instagram.
- **Caccia a Zenzerino:** la griglia passa da 4×4 a 8×8 tessere, disposte in modo irregolare (mai due uguali o con lo stesso fondo vicine). Così cercare è un gioco vero.
- **Sponsor:** per ogni attività una casella bianca per il logo (che arriverà dagli sponsor) e tre caselle col nome, sfalsate riga per riga. 12 attività per pagina.
- **Botteghe:** copertina e scheda con logo, titolo e fascia bassa nelle stesse posizioni, così scorrendo il carosello non salta.
- **Storie:** logo a 240px dal bordo, fuori dalla fascia dell'interfaccia di Instagram.
- **Leggibilità sul telefono:** riga data e luogo da 30 a 40px, descrizioni da 30 a 36px.

## File cambiati

- `design-system/design-system.md`: riscritto attorno all'idea del calendario. Nuove regole su testi, caselle, arco e tipografia.
- `design-system/componente-*.md`: tutte le schede aggiornate.
- `design-system/tokens.json`, `design-system/tokens.css`: nuovi stili tipografici, passo `casella` e `casella-storia`, usi dei colori.
- `pagine/*.html`: tutti gli esempi rifatti; nuovo `pagine/campagna.css` con l'impaginazione comune.
- `design-system/tessere/`: le 16 tessere esistenti sono invariate; nuove `cupola.svg`, `campanile.svg`, `ponte.svg`.

## Da fare con il cliente

- Verificare Bodoni Moda nel menu font di Canva.
- La seconda pagina del programma (21 dicembre – 6 gennaio): stessa struttura, eventi ancora da ricevere.
- Testi segnaposto da sostituire: nomi e indirizzi delle botteghe, nomi degli sponsor, foto delle vetrine.
- Assegnare a ogni giorno con evento il suo colore fisso e tenerlo in tutti i post.
- Sostituire "[luogo]" con i luoghi precisi del programma.
- Far vedere al cliente le tre nuove tessere di Motta: sono una mia interpretazione degli edifici del logo.

---

# Seconda revisione — dopo il feedback del cliente

Tipografia e colori restano invariati. Le modifiche richieste e come le ho applicate:

1. **Ponte tolto** dal catalogo e da tutte le pagine (il file `tessere/ponte.svg` è eliminato). **Simboli con parsimonia**: al massimo una tessera per post, come timbro nell'angolo in basso a destra; restano piene solo la caccia a Zenzerino e la copertina delle botteghe. Annuncio, storia e pagine con le foto non hanno tessere.
2. **Niente calendario completo**: le caselle esistono solo per i giorni con un'attività. Tolto "33 giorni in centro" (e i conteggi in generale, ora tra le cose da evitare). Spariti gli stati "spenta", "chiusa" e "oggi": resta la casella del giorno, nel suo colore fisso, che nel post dell'evento si apre ad arco.
3. **Annuncio** rifatto: fondo rosso, arco panna con l'**albero di Natale** al centro (nuova illustrazione `design-system/illustrazioni/albero.svg`), nome, frase e date. Nient'altro.
4. **Programma**: solo i giorni con un'attività, tre per pagina. La casella del giorno è grande (270px, numero da 180px) e il nome dell'attività è in Bodoni da 58px, con ora e luogo sotto. Titolo e logo nelle stesse posizioni su ogni pagina; si scorre per le altre date.
5. **Post evento**: tolta la settimana con gli altri giorni. L'arco con il numero è centrato, sotto titolo, descrizione e riga data/luogo; una sola tessera come timbro.
6. **Storia del giorno**: serve come promemoria la mattina dell'evento. Le storie restano 24 ore, arrivano a chi segue il profilo e possono avere lo sticker con il link o la posizione, che i post non hanno. L'ho semplificata (niente striscia della settimana) e lasciato libera la parte bassa per lo sticker. Se non vi serve, si può togliere dal piano senza toccare il resto.
7. **Botteghe**: copertina unica, poi per ogni bottega **scheda** (vetrina nell'arco, numero, indirizzo, "Cosa trovi") e **articolo in evidenza** (foto quadrata a tutta pagina, "L'idea regalo", nome dell'articolo, stesso numero della scheda), e si ricomincia. Fino a 9 botteghe per carosello (Instagram ammette 20 pagine).
8. **Sponsor**: solo i nomi, niente loghi (arrivano in qualità troppo diverse). Due colonne in Bodoni, 12 nomi per pagina, separati da una linea sottile.

File toccati: `design-system/design-system.md` (riscritto), tutte le schede `componente-*.md`, `tokens.json`, `pagine/campagna.css`, tutte le pagine tranne la caccia e l'indice; nuovo `design-system/illustrazioni/albero.svg`; eliminato `design-system/tessere/ponte.svg`.

---

# Terza revisione — il marchio di campagna

Il logo istituzionale (PNG a bassa risoluzione, fondo bianco, disegno a schizzo) non si adattava al nuovo sistema. Il cliente ha scelto di **non toccare il logo dell'associazione** e di creare un **marchio dedicato alla campagna** (strada C), tra tre proposte in Bodoni Moda (`pagine/ProposteMarchio.html`). Scelta: la **firma con le stelle**.

- **Il marchio:** "Vivi Motta" in Bodoni Moda ExtraBold, "a Natale" sotto in corsivo; i puntini delle due i diventano le stelle a quattro punte della campagna.
- **I file:** `design-system/marchio/`, in SVG con il testo già convertito in tracciati, quindi non serve avere il font installato. Quattro versioni, una per fondo: `panna-ocra` (verde-loggia), `panna` (rosso), `verde` (rosa, azzurro), `verde-rosso` (panna).
- **Dove sta:**
  - in tutti i post e i caroselli, in alto a sinistra, largo 260px;
  - nelle storie, in alto al centro;
  - nell'annuncio è il titolo, in grande.
  - Sulle pagine con la foto a tutta pagina (articolo in evidenza) non c'è.
- **Logo istituzionale:** tolto da tutte le grafiche della campagna. Resta per l'uso di tutto l'anno.
- **Impaginazione:** i titoli di programma, botteghe e sponsor sono scesi di 25px per lasciare spazio al marchio.
- **Documenti aggiornati:** `PRODUCT.md`, `design-system.md` (nuova sezione "Il marchio") e le schede dei componenti.

---

# Quarta revisione — il nome: Motta a Natale

Dopo un breve confronto sul nome (`pagine/ProposteNome.html`), il cliente ha scelto **Motta a Natale**. Il marchio è composto su due righe: "Motta" sopra, "✦ Natale" sotto in corsivo, con la stella a quattro punte al posto della "a".

- **Nome e hashtag:** la campagna si chiama **Motta a Natale**, hashtag `#MottaANatale` (prima `#ViviMottaANatale`). Vivi Motta resta l'associazione che la promuove e firma nelle didascalie. Dove il nome è scritto per esteso si scrive sempre con la "a": la stella c'è solo nel marchio.
- **Marchio:** i file in `design-system/marchio/` sono rifatti con lo stesso sistema (testo in tracciati, quattro versioni per fondo). Si aggiungono `stella.svg` (la stella da sola) e `profilo-motta-a-natale.png` (immagine del profilo Instagram, 1080×1080, che resta dentro il ritaglio circolare).
- **Misure del marchio:** 190px in alto a sinistra nei post, 260px nelle storie, 500px come titolo dell'annuncio, 170px nella caccia a Zenzerino.
- **Due simboli:** la **stella** è il simbolo di tutte le grafiche di Natale (marchio, cima dell'albero, timbro d'angolo: ora la `stellina` anche nel carosello sponsor). **Zenzerino** è la mascotte delle vetrine.
- **File aggiornati:**
  - `PRODUCT.md`: nome, simboli, marchio;
  - `design-system.md`: le sezioni "Il marchio" e "I due simboli";
  - le schede dei componenti e i token;
  - tutte le pagine.

---

# Quinta revisione — sponsor

- **Sponsor:** il carosello di soli nomi diventa una serie di **post singoli** (`PostSponsor`). Ognuno ha 15 caselle da 216px a scacchiera: 7 loghi su caselle bianche alternati a 8 tessere di Motta (portici, cupola, onda, campanile).
  - Con 7 loghi per post ognuno è circondato da caselle grafiche e non tocca il bordo: si legge meglio che con 8.
  - Al posto delle stelle ci sono le tessere di Motta, su richiesta del cliente: il ringraziamento lega gli sponsor al paese.
  - Se un logo non è leggibile, al suo posto il nome in Bodoni.
  - Il numero di post dipende da quanti sono gli sponsor (uno ogni 7).
  - Le caselle da 216px sono l'unica eccezione al passo da 135px.
- **Offerto da:** finora era solo una riga nelle regole, ora è un post vero (`PostOffertoDa`): la foto dell'installazione nell'arco, il nome di ciò che è stato offerto, la firma dello sponsor con il logo su bianco.
- **File eliminati:** `pagine/CaroselloSponsor.html` e `design-system/componente-CaroselloSponsor.md`. Al loro posto `PostSponsor` e `PostOffertoDa`, con le rispettive schede.

- **Aggiornamento:** su richiesta del cliente, le caselle grafiche del post sponsor sono le tessere `regalo`, `pallina` e `bastoncino` al posto delle tessere di Motta.
- **Aggiornamento:** il "Christmas Kit" non si nomina più nei testi pubblicati. Il post sponsor dice "Queste attività sostengono il Natale nel centro di Motta. Grazie." La regola è in `design-system.md` (tono) e in `PRODUCT.md`.
- **Aggiornamento:** la tessera `onda` ora ha due onde parallele invece di tre (`design-system/tessere/onda.svg`).

---

# Template per Figma

Le grafiche si producono in **Figma** (piano gratuito) invece che in Canva.
- **Plugin:** in `figma/plugin/` c'è un plugin "in sviluppo" che, avviato in un file Figma, crea:
  - gli stili di colore e di testo `Motta/…`;
  - una pagina di componenti (tessere, marchio, albero, stella);
  - 11 template modificabili, uno per formato.
- **Istruzioni:** in `figma/LEGGIMI.md`.
- **Aggiornamento:** il plugin incorpora i file SVG del design system; se cambiano, si rigenera con `python3 figma/sorgente/genera.py`.
- **Riferimenti:** `PRODUCT.md`, `design-system.md`, `DESIGN.md`, le schede e i LEGGIMI ora parlano di Figma al posto di Canva.

- **Bodoni Moda robusto:** in Figma Bodoni Moda usava la versione da titolo, con linee sottili troppo fini sul telefono. Ora è impostato sempre sulla **dimensione ottica 11** (asse `opsz`): negli stili di testo del plugin, nelle pagine di esempio (`pagine/campagna.css`) e nei token. Il confronto con le alternative valutate (Libre Bodoni, Gloock, Chonburi, Young Serif) è in `pagine/ProposteCarattere.html`.
- **Bodoni Moda 11pt per Figma:** verificato col collegamento a Figma che il Bodoni Moda di Figma ha solo l'asse del peso, quindi la dimensione ottica 11 veniva ignorata. In `design-system/font/` ci sono ora cinque file **Bodoni Moda 11pt**, ricavati dal font originale fissando la dimensione ottica a 11 (licenza OFL, con il nome cambiato come richiesto). Vanno installati sul computer; il plugin li usa per tutti gli stili Bodoni.

---

# Sesta revisione — annuncio e locandina

- **Annuncio:** era troppo scarno. Ora fa da locandina, sul modello delle reference (`reference/image.png`, `reference/stile-1.png`): dice chi lo promuove ("Vivi Motta presenta"), cosa succede, quando e dove. Due proposte in `pagine/PostAnnuncio.html`:
  - **A**, fondo `panna` con una fascia di tessere sopra e una sotto, il marchio grande, il blocco con le caselle del 5 dicembre e del 6 gennaio, cosa succede e dove trovare il programma;
  - **B**, fondo `verde-loggia` con l'albero nell'arco tra due colonne di tessere alternate, il marchio, la frase e le date.
- **Locandina A3+:** nuovo formato di stampa (329×483 mm, file da 335×489 con 3 mm di abbondanza) con tutti i giorni di attività, le attività di tutto il periodo, i promotori e i contatti. Esempio in `pagine/Locandina.html`, PDF in `stampa/Locandina-A3plus.pdf`, regole in `design-system/componente-Locandina.md`.
- **Tessere:** l'annuncio e la locandina sono le copertine della campagna e possono avere le fasce di tessere. Nuova regola: mai una tessera con lo stesso fondo del post.

- **Annuncio, scelta la proposta A**, con queste modifiche:
  - le date scritte per esteso, "Dal 5 dicembre al 6 gennaio", accanto alle caselle;
  - "attività" aggiunta all'elenco di cosa succede;
  - tolti "Vivi Motta presenta" e "Il programma su @vivimotta" (il post è già sulla pagina);
  - aggiunto l'albero, appoggiato sulla fascia in basso.
  La proposta B è stata tolta. Il template Figma dell'annuncio è aggiornato allo stesso disegno.
- **Hashtag ufficiale:** `#mottanatale` (prima `#MottaANatale`), in tutte le pagine, le regole e i template Figma.
- **Programma completo** (ricevuto il 10 novembre): 12 giorni, dal 5 dicembre al 6 gennaio. Ai sei giorni degli esempi si aggiungono 8, 19, 24 e 26 dicembre, 5 e 6 gennaio; il 23 ha l'orario (18.00 in piazza) e la prenotazione obbligatoria.
  - Colori fissi dei giorni nuovi: 8 verde-cupola, 19 ocra, 24 rosso, 26 verde-loggia, 5 gennaio azzurro, 6 gennaio ocra.
  - **Locandina:** tutti i 12 giorni in due colonne con caselle da 30 mm; marchio più piccolo; tolto "Vivi Motta presenta" come nell'annuncio; l'8 e il concerto del 19 segnati "da confermare".
  - **Carosello del programma:** quattro pagine (tre giorni per pagina; l'ultima ha il 26 dicembre e i due giorni di gennaio, con "dicembre e gennaio" al posto del mese), nelle pagine di esempio e nel plugin Figma.
- **Annuncio, versione definitiva:** dopo tre nuove proposte (le date in fila, il titolo grande, l'albero grande) è stata scelta quella con il **titolo grande**: il marchio largo 900px, come nella reference, e al posto dei numeri 5 e 6 l'**albero** in un arco `rosa` da 2×2 caselle accanto alle informazioni (provato anche Zenzerino, poi scartato). Nella fascia in basso `zenzerino` è sostituito da `candela`.
- **Tessera `cupola` ridisegnata** sulla facciata vera del Santuario della Madonna dei Miracoli: una sola sagoma stilizzata con la parte centrale ad arco più alta, i due quarti di cerchio ai lati e il rosone tondo, sopra il portico a tre archi. Prima era una cupola generica attribuita alla Loggia. Il file e il nome restano `cupola.svg`; sono aggiornati il plugin Figma e il PDF della locandina.
