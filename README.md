## Assunzioni e semplificazioni

Essendo un prototipo pensato per il caso standard indicato, ho fatto alcune semplificazioni:

* **Contratto**: dipendente a tempo indeterminato, quindi aliquota contributiva INPS
  standard al 9,19%.
* **Residenza**: Comune di Milano, Regione Lombardia.
* **Situazione personale**: nessun familiare a carico, nessuna spesa detraibile,
  nessuna agevolazione fiscale specifica.
* **TFR**: escluso dal calcolo, perché è retribuzione differita accantonata a parte
  e non entra nel netto mensile o annuo percepito.
* **Fringe benefit e bonus**: non inclusi.


## Come arriva dalla RAL al netto

**1. Contributi INPS**
Si parte togliendo dalla RAL i contributi a carico del dipendente, il 9,19%. Quello
che resta è l'imponibile su cui si calcolano poi le tasse (IRPEF e addizionali), non
la RAL intera.

**2. IRPEF lorda**
Si applicano le tre aliquote nazionali sull'imponibile: 23% fino a 28.000€, 33% da
28.000€ a 50.000€, 43% oltre. È una tassazione a scaglioni, quindi solo la parte di
reddito che rientra in ogni fascia viene tassata con quell'aliquota, non tutto il
reddito con l'aliquota più alta raggiunta.

**3. Detrazione lavoro dipendente**
Dalla IRPEF lorda si toglie una detrazione che dipende dal reddito: più alta per i
redditi bassi, decresce man mano che il reddito sale, fino ad azzerarsi a 50.000€.

**4. Ulteriore detrazione**
Per i redditi tra 20.000€ e 40.000€ c'è un'altra detrazione aggiuntiva (1.000€ fissi
fino a 32.000€, poi decrescente), introdotta dalla legge di bilancio 2025.

Sottraendo entrambe le detrazioni dalla IRPEF lorda si ottiene la IRPEF netta.

**5. Addizionali locali**
Sullo stesso imponibile si calcolano anche l'addizionale regionale (Lombardia, a
scaglioni tra 1,23% e 1,73%) e quella comunale (Milano, 0,8%, con esenzione sotto i
23.000€ di imponibile).

**6. Totali**
Sommando contributi INPS, IRPEF netta e le due addizionali si ottiene il totale
trattenuto. La RAL meno questo totale è il netto annuo. Il netto mensile è il netto
annuo diviso per il numero di mensilità scelto (12, 13 o 14).
