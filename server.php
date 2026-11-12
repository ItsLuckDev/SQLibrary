<?php
    $dati = json_decode(file_get_contents("php://input"), true);
    $query = $dati["query"] ?? "";
    
    echo $query . "\n";
?>
