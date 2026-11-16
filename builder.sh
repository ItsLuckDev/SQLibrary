#!/usr/bin/env bash
# Installa il necessario, prepara MariaDB e avvia il sito nel browser.
# Uso: ./builder.sh   (Ctrl+C per fermare il sito)
set -euo pipefail
cd "$(dirname "$0")"

PORTA=8000
URL="http://localhost:$PORTA"

# === 1. PACCHETTI ===
# shortcut: solo le famiglie pacman/apt/dnf/zypper, aggiungerne altre se servono
if command -v pacman >/dev/null; then
    sudo pacman -S --needed --noconfirm php mariadb composer
elif command -v apt-get >/dev/null; then
    sudo apt-get update
    sudo apt-get install -y php-cli php-mysql mariadb-server composer
elif command -v dnf >/dev/null; then
    sudo dnf install -y php-cli php-mysqlnd mariadb-server composer
elif command -v zypper >/dev/null; then
    sudo zypper --non-interactive install php8 php8-mysql mariadb php-composer2
else
    echo "Distro non supportata: installa a mano php (con mysqli), mariadb e composer" >&2
    exit 1
fi

# === 2. ESTENSIONE MYSQLI ===
# su Arch è installata ma commentata nel php.ini
if ! php -m | grep -qi '^mysqli$'; then
    sudo sed -i 's/^;extension=mysqli/extension=mysqli/' "$(php -r 'echo php_ini_loaded_file();')"
fi
php -m | grep -qi '^mysqli$' || { echo "Estensione mysqli non attiva, abilitala nel php.ini" >&2; exit 1; }

# === 3. MARIADB ===
# shortcut: richiede systemd, per distro senza (Alpine, Void…) va avviato a mano
command -v systemctl >/dev/null || { echo "Serve systemd per avviare MariaDB" >&2; exit 1; }

# su Arch la cartella dati va inizializzata a mano la prima volta
if ! sudo test -d /var/lib/mysql/mysql; then
    sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
fi
sudo systemctl enable --now mariadb

# === 4. DATABASE ===
# carica il dump solo se il DB non esiste, così i dati non si azzerano a ogni avvio
if ! sudo mariadb -e "USE biblioteca" 2>/dev/null; then
    sudo mariadb < db/biblioteca.sql
fi

# === 5. CONFIGURAZIONE E DIPENDENZE PHP ===
# credenziali uguali a quelle create dal dump
[ -f .env ] || printf 'APP_HOST=localhost\nDB_USER=user\nDB_PASSWORD=pass\nDB_FILE=biblioteca\n' > .env
[ -d vendor ] || composer install

# === 6. AVVIO SITO ===
php -S "127.0.0.1:$PORTA" &
PHP_PID=$!
trap 'kill $PHP_PID 2>/dev/null || true' EXIT

# aspetta che il server risponda (esce se PHP muore, es. porta occupata)
until (exec 3<>"/dev/tcp/127.0.0.1/$PORTA") 2>/dev/null; do
    kill -0 "$PHP_PID" 2>/dev/null || { echo "PHP non è partito: porta $PORTA occupata?" >&2; exit 1; }
    sleep 0.2
done

xdg-open "$URL" >/dev/null 2>&1 || echo "Apri $URL nel browser"
echo "Sito avviato su $URL (Ctrl+C per fermarlo)"
wait "$PHP_PID"
