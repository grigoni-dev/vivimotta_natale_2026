# CaroselloGiorno

Il carosello di un giorno di programma: si pubblica qualche giorno prima e dice cosa succede quel giorno. Ha preso il posto del post evento. La mattina stessa resta la storia del giorno come promemoria. Esempio sul 12 dicembre in `pagine/CaroselloGiorno.html`.

Le pagine sono generate da `pagine/carosello-giorno.js`, lo stesso codice del Push Day (`componente-CaroselloPushDay.md`). Per un giorno nuovo basta scrivere i dati nella pagina: numero, colore del giorno, fondo, tessere, testi e attività.

## Regole

- **Fondo:** `verde-loggia`, oppure `rosso` quando il colore del giorno è `verde-loggia`. Il fondo non è mai il colore del giorno.
- **In alto:** una fascia di tessere da 135px a y 200, spostata di mezza casella. Ogni pagina taglia una tessera a metà e la pagina dopo la completa, così scorrendo la fascia continua.
  - Nella fascia nessuna tessera ha il fondo del post e non ci sono due fondi uguali vicini.
  - Il Push Day ha il filo di lampadine al posto della fascia.
- **Copertina:**
  - il numero nell'arco del colore fisso del giorno (6 caselle per 560px), in Bodoni Moda 900 da 640px, o da 520px se il numero ha due cifre;
  - sotto, il titolo (il giorno o il nome dell'evento; si può ridurre, per esempio a 96px, per tenerlo su una riga);
  - una `frase` `ocra` e la riga `info` con il luogo e l'ora;
  - in basso a destra, "Scorri per vedere cosa c'è →".
- **Una pagina per attività:**
  - la casella del giorno in alto a destra;
  - l'ora in grande ("ore 17.00");
  - il titolo dell'attività;
  - una riga di descrizione, oppure un elenco;
  - il luogo nel piede, insieme a "Scorri →" (nell'ultima pagina `#mottanatale`).
- **Due attività alla stessa ora o vicine** (per esempio l'accensione e i canti) stanno nella stessa pagina.
- **Giorni con una sola attività:** basta la copertina più una pagina.
