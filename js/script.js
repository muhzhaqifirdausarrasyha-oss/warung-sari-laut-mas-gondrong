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
   DOKUMENTASI & KONTAK HERO
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
   PESAN VIA WHATSAPP
================================= */

$(document).ready(function () {

    let keranjang = [];

    const nomorWA = "6281217267385";


    /* ==============================
       TAMBAHKAN TOMBOL PESAN
    ============================== */

    $(".menu-card").each(function () {

        let card = $(this);

        let nama = card.find("h3").text().trim();
        let harga = card.find("p").text().trim();

        card.find(".p-6").append(`
            <button
                class="order-button mt-4 w-full
                       bg-orange-500 text-black
                       py-3 rounded-xl
                       font-black
                       hover:bg-orange-400
                       hover:-translate-y-1
                       transition"
                data-name="${nama}"
                data-price="${harga}">
                
                🛒 Pesan

            </button>
        `);

    });


    /* ==============================
       TAMBAHAN
    ============================== */

    $("#menuList section").each(function () {

        $(this).find(".grid > div").each(function () {

            let card = $(this);

            let nama = card.find("h3").text().trim();
            let harga = card.find("p").text().trim();

            if (nama && harga) {

                card.append(`
                    <button
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

    });


    /* ==============================
       MINUMAN
    ============================== */

    $(".grid.lg\\:grid-cols-2 .flex").each(function () {

        let item = $(this);

        let nama = item.find("span").text().trim();
        let harga = item.find("strong").text().trim();

        if (nama && harga) {

            item.append(`
                <button
                    class="order-button ml-3
                           bg-orange-500 text-black
                           px-3 py-1 rounded-lg
                           font-bold text-sm
                           hover:bg-orange-400
                           transition"
                    data-name="${nama}"
                    data-price="${harga}">

                    🛒

                </button>
            `);

        }

    });


    /* ==============================
       KLIK PESAN
    ============================== */

    $(document).on("click", ".order-button", function () {

        let nama = $(this).data("name");
        let harga = $(this).data("price");

        let jumlah = prompt(
            "Mau pesan berapa " + nama + "?",
            "1"
        );

        if (!jumlah || jumlah <= 0) {
            return;
        }

        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: parseInt(jumlah)
        });

        updateKeranjang();

    });


    /* ==============================
       TAMPILKAN KERANJANG
    ============================== */

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
                        onclick="hapusPesanan(${index})"
                        class="text-red-500 font-bold">

                        ✕

                    </button>

                </div>
            `;

        });


        $("#orderList").html(daftar);

        $("#orderModal").removeClass("hidden");

    }


    /* ==============================
       HAPUS PESANAN
    ============================== */

    window.hapusPesanan = function (index) {

        keranjang.splice(index, 1);

        updateKeranjang();

    };


    /* ==============================
       TUTUP MODAL
    ============================== */

    $(document).on("click", "#closeOrder", function () {

        $("#orderModal").addClass("hidden");

    });


    /* ==============================
       KIRIM KE WHATSAPP
    ============================== */

    $(document).on("click", "#sendWhatsApp", function () {

        if (keranjang.length === 0) {

            alert("Belum ada menu yang dipilih.");

            return;

        }


        let namaPelanggan = $("#customerName").val().trim();
        let catatan = $("#customerNote").val().trim();


        if (!namaPelanggan) {

            alert("Silakan masukkan nama terlebih dahulu.");

            return;

        }


        let pesan = "Halo Mas Gondrong, saya mau pesan.%0A%0A";

        pesan += "Nama: " + namaPelanggan + "%0A%0A";

        pesan += "Pesanan:%0A";


        keranjang.forEach(function (item, index) {

            pesan +=
                (index + 1) +
                ". " +
                item.nama +
                " × " +
                item.jumlah +
                "%0A";

        });


        if (catatan) {

            pesan +=
                "%0ACatatan:%0A" +
                catatan +
                "%0A";

        }


        pesan += "%0ATerima kasih.";


        let url =
            "https://wa.me/" +
            nomorWA +
            "?text=" +
            pesan;


        window.open(url, "_blank");

    });

});