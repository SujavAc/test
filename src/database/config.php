<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header('Access-Control-Allow-Headers: X-Requested-With');
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "test";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
?>