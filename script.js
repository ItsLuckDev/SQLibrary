/* === COLORI TERMINALE === */
const input = document.getElementById("input");
const code = document.getElementById("highlight");
const pre = code.parentElement;

// Tiene allineato lo scroll dei due livelli
input.addEventListener("scroll", () => {
  pre.scrollTop = input.scrollTop;
  pre.scrollLeft = input.scrollLeft;
});

input.addEventListener("input", () => {
  let testo = input.value;
  if (testo.endsWith("\n")) testo += " "; // evita che l'ultima riga vuota sparisca
  code.innerHTML = hljs.highlight(testo, { language: "sql" }).value;
});


/* === SUGGERIMENTO === */
const hintBtn = document.getElementById("hintBtn");
hintBtn.addEventListener("click", async () => {
  hintBtn.style.display = "none";
  const hint = document.getElementById("hint");
  hint.textContent = "Inserire qui il suggerimento per il livello"; //da cambiare con il suggerimento restituito dal DB
  hint.style.display = "block";
})

/* === CLIENTE RANDOM === */
let avatarClienti = [];
for (let i = 1; i <= 13; i++) avatarClienti.push(`img/customers/Cliente${i}.png`);

const avatar = document.getElementById("customer");
avatar.src = avatarClienti[Math.floor(Math.random() * avatarClienti.length)];

/* === ESEGUI === */
document.getElementById("esegui").addEventListener("click", async () => {
  const tabella = document.querySelector("table");
  tabella.replaceChildren(); // svuota il risultato precedente
  if (!input.value) return; // terminale vuoto: tabella vuota, niente richiesta al server

  const resp = await fetch("server.php", {
    method: "POST",
    body: JSON.stringify({ query: input.value.toLowerCase() })
  });

  const { colonne, righe, errore } = await resp.json();

  // {errore: ...} oppure {ok: true}: non è una tabella
  if (!righe) { tabella.insertRow().insertCell().textContent = errore ?? "Query eseguita"; return; }
  if (righe.length === 0) { tabella.insertRow().insertCell().textContent = "Nessun risultato"; return; }

  // intestazione
  const intestazione = tabella.createTHead().insertRow();
  colonne.forEach(c => intestazione.appendChild(document.createElement("th")).textContent = c);

  // righe della tabella (array di valori, nello stesso ordine di colonne)
  righe.forEach(riga => {
    const tr = tabella.insertRow(); // finisce in un <tbody> creato in automatico
    riga.forEach(v => tr.insertCell().textContent = v);
  });
});


/* === INFOBOX (tabella risultante)=== */
const infoBox = document.getElementById("infoBox");
const tabellaInfo = document.getElementById("tabellaInfo");
const schemaFrame = document.getElementById("schemaFrame");
const manualeFrame = document.getElementById("manualeFrame");

document.getElementById("outputTable").addEventListener("click", () => {
  const preview = document.querySelector("#outputTable table");
  if (!preview.rows.length) return; // niente da mostrare prima di "Esegui"
  infoBox.querySelector(".resTable").innerHTML = preview.innerHTML;
  tabellaInfo.hidden = false;
  schemaFrame.hidden = true;
  manualeFrame.hidden = true;
  infoBox.showModal();
});

// BZ: lo schema DB si apre nella stessa infoBox, al posto della tabella
document.getElementById("schemaBtn").addEventListener("click", () => {
  tabellaInfo.hidden = true;
  schemaFrame.hidden = false;
  manualeFrame.hidden = true;
  infoBox.showModal();
});
/* === MANUALE SQL === */
document.getElementById("manualeBtn").addEventListener("click", () => {
  tabellaInfo.hidden = true;
  schemaFrame.hidden = true;
  manualeFrame.hidden = false;
  infoBox.showModal();
});