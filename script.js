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
document.getElementById("verifica").addEventListener("click", async () => {
  
  // manda al server la query dell'utente
  const resp = await fetch("server.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      query: input.value
    })
  });
  
  console.log(await resp.text()); //contiene la query dopo essere passata dal server
})
