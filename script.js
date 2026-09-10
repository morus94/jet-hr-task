// aliquote e scaglioni - se cambia la normativa si aggiornano solo questi
const ALIQUOTA_INPS = 0.0919;

const SCAGLIONI_IRPEF = [
  { limite: 28000, aliquota: 0.23 },
  { limite: 50000, aliquota: 0.33 },
  { limite: Infinity, aliquota: 0.43 }
];

const SCAGLIONI_ADD_REGIONALE = [
  { limite: 15000, aliquota: 0.0123 },
  { limite: 28000, aliquota: 0.0158 },
  { limite: 50000, aliquota: 0.0172 },
  { limite: Infinity, aliquota: 0.0173 }
];

const ALIQUOTA_ADD_COMUNALE = 0.008;
const SOGLIA_ESENZIONE_COMUNALE = 23000;

// detrazione lavoro dipendente (art. 13 TUIR): 1955€ fino a 15k, poi scende
// linearmente fino a 1910€ a 28k, poi fino a 0 a 50k
const DETR_LIMITE_BASSO = 15000;
const DETR_IMPORTO_BASSO = 1955;
const DETR_LIMITE_MEDIO = 28000;
const DETR_BASE = 1910;
const DETR_EXTRA = 1190;
const DETR_LIMITE_ALTO = 50000;

// ulteriore detrazione (L. 207/2024): 1000€ fissi tra 20k e 32k, poi scende a 0 a 40k
const ULT_DETR_MIN = 20000;
const ULT_DETR_FASCIA_FISSA = 32000;
const ULT_DETR_MAX = 40000;
const ULT_DETR_IMPORTO = 1000;

function calcolaScaglioni(imponibile, scaglioni) {
  let imposta = 0;
  let soglia = 0;
  for (const s of scaglioni) {
    if (imponibile <= soglia) break;
    imposta += (Math.min(imponibile, s.limite) - soglia) * s.aliquota;
    soglia = s.limite;
  }
  return imposta;
}

function calcolaDetrazione(reddito) {
  if (reddito <= DETR_LIMITE_BASSO) return DETR_IMPORTO_BASSO;
  if (reddito <= DETR_LIMITE_MEDIO) {
    return DETR_BASE + DETR_EXTRA * (DETR_LIMITE_MEDIO - reddito) / (DETR_LIMITE_MEDIO - DETR_LIMITE_BASSO);
  }
  if (reddito <= DETR_LIMITE_ALTO) {
    return DETR_BASE * (DETR_LIMITE_ALTO - reddito) / (DETR_LIMITE_ALTO - DETR_LIMITE_MEDIO);
  }
  return 0;
}

function calcolaUlterioreDetrazione(reddito) {
  if (reddito <= ULT_DETR_MIN) return 0;
  if (reddito <= ULT_DETR_FASCIA_FISSA) return ULT_DETR_IMPORTO;
  if (reddito <= ULT_DETR_MAX) {
    return ULT_DETR_IMPORTO * (ULT_DETR_MAX - reddito) / (ULT_DETR_MAX - ULT_DETR_FASCIA_FISSA);
  }
  return 0;
}

function formattaEuro(valore) {
  return valore.toLocaleString('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

function calcola() {
  const ral = parseFloat(document.getElementById('ral').value);
  if (!ral || ral <= 0) {
    alert('Inserisci una RAL valida');
    return;
  }
  const numeroMensilita = parseInt(document.getElementById('mensilita').value, 10);

  const contributiInps = ral * ALIQUOTA_INPS;
  const imponibileIrpef = ral - contributiInps;

  const irpefLorda = calcolaScaglioni(imponibileIrpef, SCAGLIONI_IRPEF);
  const detrazione = calcolaDetrazione(imponibileIrpef);
  const ulterioreDetrazione = calcolaUlterioreDetrazione(imponibileIrpef);
  const irpefNetta = Math.max(0, irpefLorda - detrazione - ulterioreDetrazione);

  const addizionaleRegionale = calcolaScaglioni(imponibileIrpef, SCAGLIONI_ADD_REGIONALE);
  const addizionaleComunale = imponibileIrpef > SOGLIA_ESENZIONE_COMUNALE
    ? imponibileIrpef * ALIQUOTA_ADD_COMUNALE
    : 0;

  const totaleTasse = irpefNetta + addizionaleRegionale + addizionaleComunale;
  const totaleTrattenute = contributiInps + totaleTasse;

  const nettoAnnuo = ral - totaleTrattenute;
  const nettoMensile = nettoAnnuo / numeroMensilita;

  document.getElementById('out-ral').textContent = formattaEuro(ral);
  document.getElementById('out-inps').textContent = formattaEuro(contributiInps);
  document.getElementById('out-imponibile').textContent = formattaEuro(imponibileIrpef);
  document.getElementById('out-irpef-lorda').textContent = formattaEuro(irpefLorda);
  document.getElementById('out-detrazione').textContent = formattaEuro(detrazione);
  document.getElementById('out-ulteriore-detrazione').textContent = formattaEuro(ulterioreDetrazione);
  document.getElementById('out-irpef-netta').textContent = formattaEuro(irpefNetta);
  document.getElementById('out-add-reg').textContent = formattaEuro(addizionaleRegionale);
  document.getElementById('out-add-com').textContent = formattaEuro(addizionaleComunale);
  document.getElementById('out-totale-trattenute').textContent = formattaEuro(totaleTrattenute);
  document.getElementById('out-netto-annuo').textContent = formattaEuro(nettoAnnuo);
  document.getElementById('out-netto-mensile').textContent = formattaEuro(nettoMensile);
  document.getElementById('out-mensilita').textContent = numeroMensilita;

  document.getElementById('risultati').style.display = 'block';
}
