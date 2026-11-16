<?php
    header("Content-Type: application/json");
    require_once __DIR__ . '/vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $dotenv->required(['APP_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_FILE']);

    # query mandata dal client (vuota se manca)
    $query = json_decode(file_get_contents("php://input"), true)["query"] ?? "";

    try {
        $con = new mysqli($_ENV["APP_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"], $_ENV["DB_FILE"]);
        $res = $con->query($query);
        # INSERT/UPDATE/DELETE restituiscono true, non una tabella
        echo json_encode($res === true ? ["ok" => true] : $res->fetch_all(MYSQLI_ASSOC));
    } catch (mysqli_sql_exception $e) {
        # connessione fallita, query sbagliata o vuota
        echo json_encode(["errore" => $e->getMessage()]);
    }
