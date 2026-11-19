[LUCA - 19/11/26]: I clienti vengono mostrati randomicamente.
Agggiunto il suggerimento della bibliotecaria (al momento è un placeholder che andrà gestito server-side).
Spostato il bottone di esecuzione da "Verifica" ad "Esegui" (prima se premevi esegui non succedeva niente).
Recupero dei dati dal server in formato JSON e conversione al formato opportuno per essere intabellati (DA RIVEDERE: i dati vengono forniti in maniera errata).

[LUCA e LORENZO - 16/11/26]: abbiamo sistemato il server e implementato un db, adesso esegue correttamente le query e restituisce in formato JSON il risultato dell'interrogazione. Lato JS non facciamo più una distinzione tra fetch post e fetch get ma leggiamo direttamente la response della POST. Il prossimo passo è quello di formattare correttamente l'output in modo da mostrare una tabella corretta. In HTML ho già messo il div che conterrà il risultato.

[LUCA - 12/11/26]: ho implementato la fetch che manda la query al server. Al momento non succede nulla di ché, semplicemente la query viene mandata al server e questi la rimbalza alla pagina che stampa la query mediante `console.log`.
Ho fatto così in modo da controllare se la query viene passata con efficienza al server.

Prossimo passo: lavorare lato server per implementare i confonti tra userQuery e query corretta.


[LUCA - 11/11/26]: ho cominciato a creare il client del gioco. 
Ho aggiunto un bottone verifica che manderà la query scritta nel terminale al server ma ancora non fa nulla.
Il terminale è una textarea trasparente in cui il giocatore scrive le query in trasparente, poi JS, sfruttando la libreria importata (vedi head HTML) scrive tutto sul `<pre><code>....</code></pre>` formattato come codice SQL.
In questo modo l'utente ha l'impressione di star scrivendo su un vero terminale quando in realtà ciò che ha scritto lui è letteralmente sovrapposto a del codice formattato da JS.

