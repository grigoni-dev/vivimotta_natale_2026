# Locandina

La locandina di stampa della campagna, formato **A3+** (329×483 mm). Contiene tutte le informazioni: è quella che si appende nei negozi e in bacheca.

## Foglio
- File di stampa: **335×489 mm**, cioè 3 mm di abbondanza per lato. Le fasce di tessere arrivano al bordo del foglio e vengono rifilate.
- Margine di sicurezza: 20 mm dal taglio per tutti i testi.
- Casella delle fasce: 41,875 mm (8 nella larghezza del foglio con abbondanza). Le caselle del programma sono da 30 mm.
- Esempio: `pagine/Locandina.html`. PDF di stampa: `stampa/Locandina-A3plus.pdf` (da rigenerare quando cambiano i testi, vedi sotto).

## Dall'alto
1. Fascia di 8 tessere a filo del bordo superiore.
2. Il marchio `verde-rosso` largo 140 mm, la `frase` (8 mm), la riga `info` in `rosso` con le date e il luogo.
3. "Il programma" in Bodoni 800 (12 mm) con "dicembre e gennaio" in corsivo, sopra una linea.
4. Tutti i 12 giorni del programma, in due colonne in ordine di data: sei per colonna, con "gennaio" in corsivo prima del 5 gennaio. Ogni giorno: la casella da 30 mm nel suo colore fisso (giorno della settimana e numero), il nome dell'attività in Bodoni 800 (5,6 mm), poi ora e dettagli in `nota` (3,7 mm). Quello che è in attesa di conferma è segnato "(da confermare)" in `rosso`, come la prenotazione obbligatoria. I dati sono in un elenco in fondo a `pagine/Locandina.html`.
5. "Per tutto il periodo": le attività che durano tutta la campagna (pista, caccia a Zenzerino, albero e luci), ognuna con una tessera da 22 mm.
6. I promotori, con i loghi su bianco: Vivi Motta, Comune, Ascom, Fondazione Giacomini. A destra @vivimotta e l'hashtag.
7. Fascia di 8 tessere a filo del bordo inferiore.

## Colori e stampa
- Il PDF è in RGB: la tipografia lo converte in CMYK. Chiedi una prova colore, soprattutto per `ocra`, `azzurro` e `verde-cupola`.
- I loghi dei promotori servono in vettoriale (PDF o SVG): il PNG di Vivi Motta (667px) basta solo per la prova.

## Rigenerare il PDF
Con Google Chrome, dalla cartella del progetto:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --virtual-time-budget=6000 --no-pdf-header-footer --print-to-pdf=stampa/Locandina-A3plus.pdf "file://$PWD/pagine/Locandina.html"
```

Oppure apri `pagine/Locandina.html` in Chrome, Stampa → Salva come PDF, margini "Nessuno", "Grafica di sfondo" attiva.
