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

/* === VERIFICA === */
document.getElementById("verifica").addEventListener("click", () => {
    console.log("Qui ci vuole una fetch POST verso il server");
    console.log("Il server deve interrogare il BD con la query e facciamo il confronto tra tabelle, non tra query");
    console.log("Infatti si può ricevere la stessa tabella mediante query diverse")
})