# CaroselloPushDay

Il carosello del 5 dicembre, il giorno in cui si accendono l'albero e le luminarie. Cinque pagine 1080×1350: la copertina e una pagina per ogni momento del pomeriggio. È generato da `pagine/carosello-giorno.js`, come il carosello degli altri giorni (`componente-CaroselloGiorno.md`). Esempio in `pagine/CaroselloPushDay.html`.

## Il filo di lampadine

È l'elemento che lega le pagine.
- Un unico filo attraversa tutto il carosello: è disegnato una volta, largo quanto tutte le pagine (5 × 1080px), e ogni pagina ne mostra il suo pezzo. Scorrendo, il filo continua.
- Festoni di 540px appesi a y 196, con una freccia di 92px.
- Lampadine ogni 74px, dritte verso il basso: portalampada `panna`, bulbo a goccia, riflesso `panna`.
- Colori del bulbo in quest'ordine: `rosso`, `ocra`, `rosa`, `azzurro`, `verde-cupola`, `panna`.
- Il filo è `panna` al 70%, spesso 3px.

## Copertina

- Fondo `verde-loggia`, marchio `panna-ocra` in alto a sinistra.
- Il 5 in Bodoni Moda 900 da 640px `panna`, dentro un arco `rosso` (il colore fisso del 5) di 6 caselle per 560px (x 135–945, y 360–920). Il filo passa sopra l'arco.
- Sotto, "Push Day" in `titolo-l` da 112px, "si accendono le luci di Motta" in `frase` `ocra`, poi la riga `info` "Sabato 5 dicembre · Piazza Luzzatti · dalle 15.00".
- In basso a destra, "Scorri per scoprire il programma →".

## Pagine interne

- Stesso fondo, marchio e filo della copertina.
- In alto a destra la casella del giorno: `rosso`, 135px, "SAB" e "5".
- Un blocco centrato tra il filo e il piede:
  - l'ora: "dalle" o "ore" in corsivo `ocra` da 60px, poi l'ora in Bodoni Moda 900 da 230px `panna`;
  - quando l'ora è un'espressione ("per tutta la sera"), è in corsivo 800 da 150px;
  - il titolo in `titolo-l`, una `frase` `ocra` facoltativa e il `corpo` da 40px, oppure un elenco con le stelline `ocra`.
- Piede: "Piazza Luzzatti" in `info` `ocra` a sinistra, "Scorri →" a destra. Nell'ultima pagina c'è `#mottanatale` al posto di "Scorri".

## Le pagine

1. Dalle 15.00, il pomeriggio dei bambini. Elenco: laboratorio "La borsetta di Natale", palloncini, Pan di Zenzero con le caramelle, foto e letterine, baby dance.
2. Ore 17.00, si accendono le luci: "I bambini accendono insieme l'albero di Natale e tutte le luminarie di Motta. Poi cantano i bambini dell'asilo."
3. Ore 17.30, Unbrassed Band (@unbrassedband).
4. Per tutta la sera, si pattina gratis (speciale inaugurazione).

Per scelta del cliente non si nominano l'agenzia Treseizero né il "detonatore".
