<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "warung_mas_gondrong";

$conn = mysqli_connect(
    $host,
    $user,
    $password,
    $database
);

if (!$conn) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}

?>