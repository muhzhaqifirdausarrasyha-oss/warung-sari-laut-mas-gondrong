<?php

/* =================================
   KONEKSI DATABASE
================================= */

include "config/koneksi.php";


/* =================================
   CEK METHOD
================================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: menu.html");

    exit;

}


/* =================================
   AMBIL DATA DARI FORM
================================= */

$nama = trim($_POST["nama"] ?? "");

$catatan = trim($_POST["catatan"] ?? "");

$pesanan = trim($_POST["pesanan"] ?? "");

$via = $_POST["via"] ?? "whatsapp";


/* =================================
   VALIDASI
================================= */

if ($nama === "" || $pesanan === "") {

    echo "<h2>Pesanan belum lengkap.</h2>";

    echo "<p>Silakan kembali ke halaman menu dan lengkapi pesanan.</p>";

    echo '<a href="menu.html">Kembali ke Menu</a>';

    exit;

}


/* =================================
   SIMPAN KE DATABASE
================================= */

$sql = "INSERT INTO pesanan
        (nama, pesanan, catatan)
        VALUES (?, ?, ?)";


$stmt = mysqli_prepare($conn, $sql);


if (!$stmt) {

    die(
        "Query database gagal: " .
        mysqli_error($conn)
    );

}


mysqli_stmt_bind_param(
    $stmt,
    "sss",
    $nama,
    $pesanan,
    $catatan
);


if (!mysqli_stmt_execute($stmt)) {

    die(
        "Pesanan gagal disimpan: " .
        mysqli_stmt_error($stmt)
    );

}


mysqli_stmt_close($stmt);


/* =================================
   NOMOR WHATSAPP
================================= */

$nomorWA = "6281217267385";


/* =================================
   BUAT PESAN WHATSAPP
================================= */

$pesanWA =
    "Halo Mas Gondrong, saya mau pesan.\n\n";

$pesanWA .=
    "Nama: " . $nama . "\n\n";

$pesanWA .=
    "Pesanan:\n";

$pesanWA .=
    $pesanan . "\n";


if ($catatan !== "") {

    $pesanWA .=
        "\nCatatan:\n" .
        $catatan .
        "\n";

}


$pesanWA .=
    "\nTerima kasih.";


/* =================================
   REDIRECT KE WHATSAPP
================================= */

if ($via === "whatsapp") {

    $urlWhatsApp =
        "https://wa.me/" .
        $nomorWA .
        "?text=" .
        urlencode($pesanWA);


    header(
        "Location: " . $urlWhatsApp
    );

    exit;

}


/* =================================
   JIKA BUKAN WHATSAPP
================================= */

echo "<h2>Pesanan berhasil disimpan.</h2>";

echo "<p>Terima kasih, " .
     htmlspecialchars(
         $nama,
         ENT_QUOTES,
         "UTF-8"
     ) .
     ".</p>";

echo '<a href="menu.html">Kembali ke Menu</a>';

?>