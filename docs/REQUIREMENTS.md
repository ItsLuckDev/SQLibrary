# Requirements – SQL Library Game

## 1. Obiettivo del progetto
Lo scopo del progetto è realizzare un piccolo videogioco educativo rivolto a **studenti di quarta e quinta superiore**, con l'obiettivo di insegnare le basi del linguaggio SQL e delle interazioni con un database relazionale.

Il gioco permetterà agli studenti di esercitarsi nella scrittura di query SQL attraverso richieste espresse in linguaggio naturale, introducendo gradualmente operazioni di complessità crescente.

## 2. Descrizione del gioco
Il gioco è ambientato in una biblioteca gestita da un'anziana bibliotecaria pasticciona, poco esperta di tecnologia. 

Durante la partita, diversi clienti si presenteranno al bancone della biblioteca richiedendo libri con determinate caratteristiche.
Il giocatore dovrà quindi aiutare la bibliotecaria **traducendo le richieste dei clienti in query SQL**, utilizzando un terminale collegato al database della biblioteca.

La bibliotecaria potrà fornire **suggerimenti** e mettere a disposizione un **manuale SQL** consultabile durante la partita.

## 3. Funzionalità principali
### 3.1 Gestione dei clienti
- I clienti si presenteranno al bancone uno alla volta.
- Ogni cliente esprimerà una richiesta in linguaggio naturale attraverso un fumetto.
- Le richieste avranno difficoltà crescente.
- Ogni cliente potrà reagire positivamente o negativamente in base al risultato ottenuto.

### 3.2 Terminale SQL
- Il giocatore avrà a disposizione un terminale in cui scrivere query SQL.
- Le query saranno eseguite sul database della biblioteca.
- Il risultato della query verrà visualizzato sotto forma di tabella.
- Il giocatore potrà verificare i risultati prima di consegnarli al cliente.

### 3.3 Verifica delle richieste
- Il sistema confronterà il risultato della query con l'insieme di libri atteso.
- Non sarà necessario scrivere una query identica a quella prevista dal gioco: saranno accettate tutte le query che producono il risultato corretto.
- In caso di errore, il cliente manifesterà la propria insoddisfazione.
- Dopo un numero massimo di tentativi errati (1-2, da definire), il cliente abbandonerà la biblioteca.

### 3.4 Sistema di punteggio
- Il giocatore guadagnerà punti soddisfacendo correttamente le richieste.
- Il giocatore perderà punti quando un cliente abbandonerà la biblioteca insoddisfatto.
- Il punteggio potrà dipendere dalla difficoltà della richiesta e dal numero di tentativi utilizzati.

### 3.5 Sistema di aiuti
- La bibliotecaria potrà fornire suggerimenti, talvolta volutamente ambigui.
- Il giocatore potrà consultare un manuale SQL integrato nel gioco.
- Il manuale conterrà spiegazioni ed esempi delle principali istruzioni SQL.

### 3.6 Progressione didattica
Le richieste saranno organizzate per difficoltà, introducendo progressivamente i principali concetti SQL:
1. **Livello base:** `SELECT`, `FROM`, `WHERE`.  
2. **Livello intermedio:** `ORDER BY`, `DISTINCT`, `LIKE`, `AND`, `OR`.
3. **Livello avanzato:** `JOIN`, `GROUP BY`, `HAVING`, funzioni di aggregazione.
4. **Livello finale:** sottoquery e combinazioni delle operazioni precedenti.

## 4. Database
Il database rappresenterà il catalogo della biblioteca e conterrà informazioni relative a libri, autori, generi ed eventualmente prestiti.

Il database dovrà:
- Contenere un insieme di dati predefinito.   
- Essere interrogabile attraverso le query del giocatore.
- Presentare più tabelle collegate tra loro per consentire esercizi con `JOIN`.
- Impedire al giocatore di modificare o eliminare accidentalmente i dati.

## 5. Architettura del progetto
L'applicazione sarà realizzata utilizzando **Electron**, in modo da distribuire il gioco come applicazione desktop.

Il progetto comprenderà tre componenti principali:
- **Frontend (Web App):** gestione dell'interfaccia grafica, dei dialoghi, del terminale SQL e delle interazioni con il giocatore.
- **Backend (Server locale):** gestione della logica di gioco, esecuzione e verifica delle query, gestione dei clienti e del punteggio.
- **DBMS:** memorizzazione e interrogazione del catalogo della biblioteca.

Tutti e tre i componenti saranno inclusi nel progetto Electron, permettendo l'esecuzione del gioco in locale senza richiedere un server remoto.

## 6. Requisiti non funzionali
- **Usabilità:** l'interfaccia dovrà essere semplice e comprensibile anche per studenti senza esperienza con SQL.
- **Portabilità:** il gioco dovrà poter essere eseguito come applicazione desktop sui sistemi operativi supportati da Electron.
- **Funzionamento offline:** il gioco non dovrà richiedere una connessione Internet.
- **Sicurezza:** le query inserite dal giocatore dovranno essere eseguite in un ambiente controllato, impedendo modifiche indesiderate al database.
- **Feedback:** il giocatore dovrà ricevere messaggi chiari in caso di errori SQL o risultati non corretti.