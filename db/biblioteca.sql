-- === DATABASE === (rilanciabile: ricrea tutto da zero)
DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca;
USE biblioteca;

-- === UTENTE DEL GIOCO === (niente DROP/CREATE/ALTER: il giocatore non può distruggere le tabelle)
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'pass';
GRANT SELECT, INSERT, UPDATE, DELETE ON biblioteca.* TO 'user'@'localhost';

-- === GENERAZIONE TABELLE === --
CREATE TABLE autori (
    id_autore INT PRIMARY KEY,
    nome VARCHAR(50),
    cognome VARCHAR(50)
);

CREATE TABLE libri (
    id_libro INT PRIMARY KEY,
    titolo VARCHAR(100),
    anno INT,
    id_autore INT,
    FOREIGN KEY (id_autore) REFERENCES autori(id_autore)
);

CREATE TABLE utenti (
    id_utente INT PRIMARY KEY,
    nome VARCHAR(50)
);

CREATE TABLE prestiti (
    id_prestito INT PRIMARY KEY,
    id_libro INT,
    id_utente INT,
    data_prestito DATE,
    data_restituzione DATE,
    FOREIGN KEY (id_libro) REFERENCES libri(id_libro),
    FOREIGN KEY (id_utente) REFERENCES utenti(id_utente)
);

-- === POPOLAMENTO === --

INSERT INTO autori VALUES
(1, 'George', 'Orwell'),
(2, 'Italo', 'Calvino'),
(3, 'Umberto', 'Eco'),
(4, 'J.R.R.', 'Tolkien');

INSERT INTO libri VALUES
(1, '1984', 1949, 1),
(2, 'La fattoria degli animali', 1945, 1),
(3, 'Il barone rampante', 1957, 2),
(4, 'Le città invisibili', 1972, 2),
(5, 'Il nome della rosa', 1980, 3),
(6, 'Il Signore degli Anelli', 1954, 4),
(7, 'Lo Hobbit', 1937, 4);

INSERT INTO utenti VALUES
(1, 'Giocatore'),
(2, 'Anna'),
(3, 'Marco'),
(4, 'Sara');

INSERT INTO prestiti VALUES
(1, 1, 1, '2026-01-10', '2026-01-20'),
(2, 3, 1, '2026-02-05', NULL),
(3, 2, 2, '2026-02-10', '2026-02-18'),
(4, 5, 3, '2026-03-01', NULL),
(5, 6, 4, '2026-03-05', '2026-03-15'),
(6, 1, 3, '2026-04-01', NULL),
(7, 4, 2, '2026-04-10', NULL),
(8, 3, 4, '2026-05-01', '2026-05-12');
