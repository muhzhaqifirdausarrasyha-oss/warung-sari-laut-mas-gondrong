$(document).ready(function () {

    /* =================================
       MOBILE MENU
    ================================= */

    $("#menuButton").click(function () {
        $("#mobileMenu").stop(true, true).slideToggle(250);
    });

    $("#mobileMenu a").click(function () {
        $("#mobileMenu").stop(true, true).slideUp(200);
    });


    /* =================================
       NAVBAR
    ================================= */

    function checkNavbar() {

        if ($(window).scrollTop() > 30) {
            $("nav").addClass("shadow-lg");
        } else {
            $("nav").removeClass("shadow-lg");
        }

    }

    checkNavbar();
    $(window).on("scroll", checkNavbar);


    /* =================================
       HERO MENU
    ================================= */

    if ($(".menu-hero-content").length) {

        setTimeout(function () {
            $(".menu-hero-content").addClass("show");
        }, 150);

    }


    /* =================================
       HERO INDEX
    ================================= */

    if ($("#heroText").length) {

        setTimeout(function () {

            $("#heroText").addClass("show");
            $(".hero-image").addClass("show");

        }, 150);

    }


    /* =================================
       FEATURE CARD
    ================================= */

    function showFeatureCards() {

        $(".feature-card").each(function (index) {

            let cardTop = $(this).offset().top;

            let screenBottom =
                $(window).scrollTop() + $(window).height();

            if (screenBottom > cardTop + 80) {

                let card = $(this);

                setTimeout(function () {
                    card.addClass("show");
                }, index * 150);

            }

        });

    }


    if ($(".feature-card").length) {

        showFeatureCards();
        $(window).on("scroll", showFeatureCards);

    }


    /* =================================
       TOMBOL DAFTAR MENU
    ================================= */

    $(".menu-scroll-button").click(function (event) {

        event.preventDefault();

        let target = $(this).attr("href");

        if ($(target).length) {

            $("html, body").animate({
                scrollTop: $(target).offset().top - 70
            }, 700);

        }

    });


    /* =================================
       ANIMASI SELURUH MENU
    ================================= */

    if (
        $(".menu-card").length ||
        $(".extra-card").length ||
        $(".drink-card").length
    ) {

        $("body").addClass("menu-animation");


        /* =================================
           JUDUL MENU
        ================================= */

        let menuList = $("#menuList");

        if (menuList.length) {

            menuList.children().first()
                .addClass("menu-title-animation");

            setTimeout(function () {

                menuList.children().first()
                    .addClass("show");

            }, 150);

        }


        /* =================================
           JUDUL SECTION
        ================================= */

        $("#menuList h2, #menuList h3").each(function () {

            if (
                !$(this).closest(".menu-card").length &&
                !$(this).closest(".extra-card").length &&
                !$(this).closest(".drink-card").length
            ) {

                $(this).addClass("menu-title-animation");

            }

        });


        const titleObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        $(entry.target).addClass("show");
                    }

                });

            },
            {
                threshold: 0.2
            }
        );


        $(".menu-title-animation").each(function () {
            titleObserver.observe(this);
        });


        /* =================================
           CARD MENU
        ================================= */

        const menuObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        let card = $(entry.target);

                        let index =
                            card.parent().children().index(card);

                        let delay = (index % 3) * 120;

                        setTimeout(function () {
                            card.addClass("reveal");
                        }, delay);

                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        $(".menu-card, .extra-card, .drink-card").each(function () {
            menuObserver.observe(this);
        });

    }


    /* =================================
       INFORMASI / KONTAK HERO
    ================================= */

    if ($(".page-hero-content").length) {

        setTimeout(function () {
            $(".page-hero-content").addClass("show");
        }, 150);

    }


    /* =================================
       DOKUMENTASI
    ================================= */

    if ($(".documentation-card").length) {

        const documentationObserver =
            new IntersectionObserver(function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        $(entry.target).addClass("show");
                    }

                });

            }, {
                threshold: 0.15
            });


        $(".documentation-card").each(function () {
            documentationObserver.observe(this);
        });

    }


    /* =================================
       KONTAK
    ================================= */

    if ($(".contact-card, .contact-form").length) {

        const contactObserver =
            new IntersectionObserver(function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        $(entry.target).addClass("show");
                    }

                });

            }, {
                threshold: 0.15
            });


        $(".contact-card, .contact-form").each(function () {
            contactObserver.observe(this);
        });

    }


    /* =================================
       RESPONSIVE
    ================================= */

    $(window).resize(function () {

        if ($(window).width() >= 768) {
            $("#mobileMenu").hide();
        }

    });

});


/* =================================
   PESANAN
================================= */

$(document).ready(function () {

    let keranjang = [];

    let siapKirim = false;


    /* =================================
       TOMBOL PESAN TAMBAHAN
    ================================= */

    $("#menuList section").each(function () {

        let section = $(this);

        let judul =
            section.find("h2").first().text().trim();


        if (judul === "Tambahan") {

            section.find(".grid > div").each(function () {

                let card = $(this);

                let nama =
                    card.find("h3").first().text().trim();

                let harga =
                    card.find("p").first().text().trim();


                if (
                    nama &&
                    harga &&
                    card.find(".order-button").length === 0
                ) {

                    card.append(`

                        <button
                            type="button"
                            class="order-button mt-4 w-full
                                   bg-orange-500 text-black
                                   py-2 rounded-lg
                                   font-black
                                   hover:bg-orange-400
                                   transition"
                            data-name="${nama}"
                            data-price="${harga}">

                            🛒 Pesan

                        </button>

                    `);

                }

            });

        }

    });


    /* =================================
       TOMBOL PESAN MINUMAN
    ================================= */

    $("#menuList section").each(function () {

        let section = $(this);

        let judul =
            section.find("h2").first().text().trim();


        if (judul.includes("Minuman")) {

            section
                .find(".flex.justify-between")
                .each(function () {

                    let item = $(this);

                    let nama =
                        item.find("span").first().text().trim();

                    let harga =
                        item.find("strong").first().text().trim();


                    if (
                        nama &&
                        harga &&
                        item.find(".order-button").length === 0
                    ) {

                        item.append(`

                            <button
                                type="button"
                                class="order-button
                                       ml-3 shrink-0
                                       bg-orange-500 text-black
                                       px-3 py-1 rounded-lg
                                       font-black text-sm
                                       hover:bg-orange-400
                                       transition"
                                data-name="${nama}"
                                data-price="${harga}">

                                🛒 Pesan

                            </button>

                        `);

                    }

                });

        }

    });


    /* =================================
       TOMBOL PESAN
    ================================= */

    $(document).on("click", ".order-button", function () {

        let nama =
            $(this).data("name");

        let harga =
            $(this).data("price");


        let jumlah = prompt(
            "Mau pesan berapa " + nama + "?",
            "1"
        );


        if (
            !jumlah ||
            isNaN(jumlah) ||
            jumlah <= 0
        ) {

            return;

        }


        keranjang.push({

            nama: nama,

            harga: harga,

            jumlah: parseInt(jumlah)

        });


        updateKeranjang();

    });


    /* =================================
       TAMPILKAN KERANJANG
    ================================= */

    function updateKeranjang() {

        let daftar = "";


        keranjang.forEach(function (item, index) {

            daftar += `

                <div class="flex justify-between
                            items-center
                            border-b border-zinc-800
                            py-3">

                    <div>

                        <p class="font-bold">

                            ${item.nama}

                        </p>


                        <p class="text-orange-500">

                            ${item.jumlah} × ${item.harga}

                        </p>

                    </div>


                    <button
                        type="button"
                        onclick="hapusPesanan(${index})"
                        class="text-red-500 font-bold
                               hover:text-red-400">

                        ✕

                    </button>

                </div>

            `;

        });


        $("#orderList").html(daftar);


        /* =================================
           TOMBOL TAMBAH PESANAN
        ================================= */

        if ($("#addMoreOrder").length === 0) {

            $("#orderForm").before(`

                <button
                    type="button"
                    id="addMoreOrder"
                    class="w-full mt-5
                           border border-orange-500
                           text-orange-500
                           py-3 rounded-xl
                           font-black
                           hover:bg-orange-500
                           hover:text-black
                           transition">

                    ➕ Tambah Pesanan

                </button>

            `);

        }


        $("#orderModal").removeClass("hidden");

    }


    /* =================================
       TAMBAH PESANAN LAGI
    ================================= */

    $(document).on("click", "#addMoreOrder", function () {

        $("#orderModal").addClass("hidden");

    });


    /* =================================
       HAPUS PESANAN
    ================================= */

    window.hapusPesanan = function (index) {

        keranjang.splice(index, 1);

        updateKeranjang();

    };


    /* =================================
       TUTUP MODAL
    ================================= */

    $(document).on("click", "#closeOrder", function () {

        $("#orderModal").addClass("hidden");

    });


    /* =================================
       KIRIM FORM KE PHP
    ================================= */

    $(document).on("submit", "#orderForm", function (e) {

        /* =================================
           JIKA SUDAH DIKONFIRMASI
        ================================= */

        if (siapKirim) {
            return;
        }


        e.preventDefault();


        /* =================================
           CEK KERANJANG
        ================================= */

        if (keranjang.length === 0) {

            alert("Silakan pilih menu terlebih dahulu.");

            return;

        }


        /* =================================
           CEK NAMA
        ================================= */

        let namaPelanggan =
            $("#customerName").val().trim();


        if (!namaPelanggan) {

            alert("Silakan masukkan nama terlebih dahulu.");

            return;

        }


        /* =================================
           AMBIL CATATAN
        ================================= */

        let catatan =
            $("#customerNote").val().trim();


        /* =================================
           SUSUN PESANAN
        ================================= */

        let daftarPesanan = "";


        keranjang.forEach(function (item, index) {

            daftarPesanan +=

                (index + 1) +
                ". " +
                item.nama +
                " × " +
                item.jumlah +
                " - " +
                item.harga +
                "\n";

        });


        /* =================================
           SIMPAN KE INPUT HIDDEN
        ================================= */

        $("#orderData").val(daftarPesanan);


        /* =================================
           BUAT MODAL KONFIRMASI
        ================================= */

        if ($("#confirmOrderModal").length === 0) {

            $("body").append(`

                <div id="confirmOrderModal"
                     class="hidden fixed inset-0 z-[200]
                            bg-black/80
                            flex items-center justify-center
                            px-4">

                    <div class="w-full max-w-lg
                                bg-zinc-950
                                border border-orange-500
                                rounded-2xl
                                p-6
                                shadow-2xl">

                        <!-- HEADER -->

                        <div class="flex justify-between
                                    items-center">

                            <h2 class="text-2xl
                                       font-black
                                       text-orange-500">

                                🧾 Konfirmasi Pesanan

                            </h2>

                        </div>


                        <!-- NAMA -->

                        <div class="mt-5">

                            <p class="text-sm
                                      text-zinc-400
                                      font-bold">

                                Nama

                            </p>


                            <p id="confirmName"
                               class="mt-1
                                      font-bold
                                      text-white">

                            </p>

                        </div>


                        <!-- PESANAN -->

                        <div class="mt-5">

                            <p class="text-sm
                                      text-zinc-400
                                      font-bold">

                                Pesanan

                            </p>


                            <div id="confirmList"
                                 class="mt-2
                                        max-h-48
                                        overflow-y-auto
                                        border
                                        border-zinc-800
                                        rounded-xl
                                        p-3">

                            </div>

                        </div>


                        <!-- CATATAN -->

                        <div class="mt-5">

                            <p class="text-sm
                                      text-zinc-400
                                      font-bold">

                                Catatan

                            </p>


                            <p id="confirmNote"
                               class="mt-1
                                      text-white">

                            </p>

                        </div>


                        <!-- TOMBOL -->

                        <div class="grid
                                    grid-cols-2
                                    gap-3
                                    mt-6">

                            <button
                                type="button"
                                id="backToOrder"
                                class="border
                                       border-zinc-700
                                       text-white
                                       py-3
                                       rounded-xl
                                       font-black
                                       hover:bg-zinc-800
                                       transition">

                                ← Kembali

                            </button>


                            <button
                                type="button"
                                id="continueWhatsApp"
                                class="bg-orange-500
                                       text-black
                                       py-3
                                       rounded-xl
                                       font-black
                                       hover:bg-orange-400
                                       transition">

                                📱 Lanjut ke WhatsApp

                            </button>

                        </div>

                    </div>

                </div>

            `);

        }


        /* =================================
           ISI DATA KONFIRMASI
        ================================= */

        $("#confirmName")
            .text(namaPelanggan);


        let daftarKonfirmasi = "";


        keranjang.forEach(function (item, index) {

            daftarKonfirmasi += `

                <div class="py-3
                            border-b
                            border-zinc-800">

                    <p class="font-bold">

                        ${index + 1}.
                        ${item.nama}

                    </p>


                    <p class="text-orange-500">

                        ${item.jumlah}
                        ×
                        ${item.harga}

                    </p>

                </div>

            `;

        });


        $("#confirmList")
            .html(daftarKonfirmasi);


        $("#confirmNote")
            .text(
                catatan || "Tidak ada catatan."
            );


        /* =================================
           TUTUP MODAL PESANAN
        ================================= */

        $("#orderModal")
            .addClass("hidden");


        /* =================================
           TAMPILKAN KONFIRMASI
        ================================= */

        $("#confirmOrderModal")
            .removeClass("hidden");

    });


    /* =================================
       KEMBALI KE PESANAN
    ================================= */

    $(document).on(
        "click",
        "#backToOrder",
        function () {

            $("#confirmOrderModal")
                .addClass("hidden");


            $("#orderModal")
                .removeClass("hidden");

        }
    );


    /* =================================
       LANJUT KE WHATSAPP
    ================================= */

    $(document).on(
        "click",
        "#continueWhatsApp",
        function () {

            /* =================================
               TANDAI SUDAH DIKONFIRMASI
            ================================= */

            siapKirim = true;


            /* =================================
               SUSUN ULANG PESANAN
            ================================= */

            let daftarPesanan = "";


            keranjang.forEach(function (item, index) {

                daftarPesanan +=

                    (index + 1) +
                    ". " +
                    item.nama +
                    " × " +
                    item.jumlah +
                    " - " +
                    item.harga +
                    "\n";

            });


            /* =================================
               MASUKKAN KE INPUT HIDDEN
            ================================= */

            $("#orderData")
                .val(daftarPesanan);


            /* =================================
               PASTIKAN VIA WHATSAPP
            ================================= */

            if ($("input[name='via']").length === 0) {

                $("#orderForm").append(`

                    <input
                        type="hidden"
                        name="via"
                        value="whatsapp">

                `);

            }


            /* =================================
               KIRIM KE PHP
            ================================= */

            document
                .getElementById("orderForm")
                .submit();

        }
    );

});