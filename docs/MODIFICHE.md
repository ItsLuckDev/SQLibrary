[LUCA - 12/11/26]: ho implementato la fetch che manda la query al server. Al momento non succede nulla di ché, semplicemente la query viene mandata al server e questi la rimbalza alla pagina che stampa la query mediante `console.log`.
Ho fatto così in modo da controllare se la query viene passata con efficienza al server.

Prossimo passo: lavorare lato server per implementare i confonti tra userQuery e query corretta.


[LUCA - 11/11/26]: ho cominciato a creare il client del gioco. 
Ho aggiunto un bottone verifica che manderà la query scritta nel terminale al server ma ancora non fa nulla.
Il terminale è una textarea trasparente in cui il giocatore scrive le query in trasparente, poi JS, sfruttando la libreria importata (vedi head HTML) scrive tutto sul `<pre><code>....</code></pre>` formattato come codice SQL.
In questo modo l'utente ha l'impressione di star scrivendo su un vero terminale quando in realtà ciò che ha scritto lui è letteralmente sovrapposto a del codice formattato da JS.

