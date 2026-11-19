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
const avatarClienti = [
  "img/customers/Cleinte2.png",
  "img/customers/Cleinte3.png",
  "img/customers/Cliente1.png",
  "img/customers/Cliente4.png"
]

const avatar = document.getElementById("customer");
avatar.src = avatarClienti[Math.floor(Math.random() * avatarClienti.length)];


/* === ESEGUI === */
document.getElementById("esegui").addEventListener("click", async () => {
  const resp = await fetch("server.php", {
    method: "POST",
    body: JSON.stringify({ query: input.value })
  });

  const righe = await resp.json();
  const tabella = document.getElementById("resTable");
  tabella.replaceChildren(); // svuota il risultato precedente

  // {errore: ...} oppure {ok: true}: non è una tabella
  if (!Array.isArray(righe)) { tabella.insertRow().insertCell().textContent = righe.errore ?? "Query eseguita"; return; }
  if (righe.length === 0) { tabella.insertRow().insertCell().textContent = "Nessun risultato"; return; }

  // intestazione
  const chiavi = Object.keys(righe[0]); // es. ["Titolo", "Autore", "Anno"]
  const intestazione = tabella.createTHead().insertRow();
  chiavi.forEach(k => intestazione.appendChild(document.createElement("th")).textContent = k);

  // righe della tabella
  righe.forEach(riga => {
    const tr = tabella.insertRow(); // finisce in un <tbody> creato in automatico
    chiavi.forEach(k => tr.insertCell().textContent = riga[k]);
  });
});
