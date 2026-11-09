# Template Figma di Motta a Natale

Il plugin in `plugin/` costruisce dentro un file Figma tutto il necessario per produrre i post della campagna. Funziona con il piano gratuito di Figma.

## Cosa crea

- **Stili di colore** `Motta/verde-loggia`, `Motta/rosso`, … : i dieci colori del sistema.
- **Stili di testo** `Motta/titolo-l`, `Motta/frase`, `Motta/info`, … : Bodoni Moda e Archivo con le misure giuste.
- **Pagina "Motta a Natale · Componenti":**
  - le 18 tessere;
  - le quattro versioni del marchio;
  - l'albero;
  - la stella.
- **Pagina "Motta a Natale · Template":** 13 post a misura reale, con testi modificabili e livelli con il nome di cosa contengono:
  - Annuncio;
  - Programma (4 pagine);
  - Evento;
  - Storia;
  - Botteghe: copertina, scheda e articolo;
  - Sponsor;
  - Offerto da;
  - Caccia a Zenzerino.

## Come si avvia (una volta sola)

I plugin "in sviluppo" funzionano solo nell'**app desktop di Figma**, non dal browser.

1. Scarica l'app desktop da figma.com/downloads e accedi.
2. Crea un nuovo file di design, per esempio "Motta a Natale 2026".
3. Dal menu: **Plugins → Development → Import plugin from manifest…** e scegli il file `figma/plugin/manifest.json` di questo progetto.
4. Avvia il plugin: **Plugins → Development → Motta a Natale – template**.

In qualche secondo compaiono le due pagine. Se manca un font, in basso compare un avviso e il plugin usa un sostituto. Bodoni Moda e Archivo sono su Google Fonts e Figma li ha già.

**Bodoni Moda robusto: installa prima i font.** Il Bodoni Moda di Figma (da Google Fonts) ha solo l'asse del peso e disegna sempre la versione da titolo, con linee troppo sottili. Per questo il plugin usa **Bodoni Moda 11pt**, una versione fissata alla dimensione ottica robusta, che va installata sul computer:
1. apri la cartella `design-system/font/`;
2. fai doppio clic su ogni file `.ttf` e scegli **Installa**;
3. chiudi e riapri Figma, poi avvia il plugin.

Se il plugin non trova Bodoni Moda 11pt, usa il Bodoni Moda di Figma e te lo segnala con un avviso. Gli stili di testo `Motta/…` già creati si aggiornano al nuovo font, e con loro i template già fatti.

Il plugin si avvia **una volta per file**: ogni avvio aggiunge due pagine nuove. Gli stili, invece, vengono aggiornati e non duplicati.

## Come si fa un post nuovo

1. Nella pagina Template, **duplica** il template del formato che ti serve (seleziona la cornice, poi Cmd+D) e trascinalo da parte.
2. **Testi:** fai doppio clic e scrivi. Gli stili restano agganciati.
3. **Numero e colore del giorno:** cambia il numero nell'arco. Per il colore, seleziona la cornice "Arco del giorno" e scegli lo stile di colore fisso di quel giorno (vedi `design-system/design-system.md`).
4. **Foto** (vetrina, articolo, installazione): seleziona la cornice "Foto … (Fill → Image)", poi nel pannello Fill clicca il campione di colore, passa a **Image** e carica la foto. Cancella il livello "Indicazione foto (da cancellare)".
5. **Loghi degli sponsor:** trascina il logo nella casella bianca, entro il riquadro tratteggiato (al massimo il 70% della casella), poi cancella il riquadro e la scritta "logo".
6. **Marchio:** è un'istanza del componente. Per cambiarne la versione (per esempio su un fondo rosso) usa lo scambio di istanza nel pannello a destra e scegli `Marchio/panna`.
7. **Caccia a Zenzerino:** sposta la tessera Zenzerino in un punto diverso a ogni post, scambiandola con un'altra tessera.

## Esportare per Instagram

Seleziona la cornice del post. In basso a destra, in **Export**, scegli **PNG**, **1x**, poi **Export**. Le cornici sono già a 1080×1350 (post) e 1080×1920 (storie).

## Se si cambia il design system

I file SVG di tessere, marchio e albero sono incorporati nel plugin. Se cambiano, rigenera il plugin dalla cartella del progetto:

```
python3 figma/sorgente/genera.py
```

Poi avvialo in un file nuovo. Per cambiare l'impaginazione si modifica `figma/sorgente/code.template.js`, non `plugin/code.js`, che viene riscritto dallo script.
