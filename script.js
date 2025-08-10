document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita berada di halaman ujian
    if (document.querySelector('.ujian-main')) {
        initUjian();
    }
});

// ==========================================================
// BANK SOAL
// Data dari semua soal yang telah Anda berikan
// ==========================================================
const bankSoal = [
    {
        nomor: 1,
        topik: "Paket Sembako",
        jenis: "Pilihan Ganda",
        stimulus_gambar: "image_9a6d40.png",
        stimulus_teks: "Dalam rangka memperingati hari ulang tahun, sebuah perusahaan bermaksud membagikan paket sembako kepada sejumlah warga di sekitar perusahaan tersebut.",
        pertanyaan: "Perusahaan akan membagikan paket sembako kepada 40 warga di sekitar dengan jumlah barang setiap paket yang diterima masing-masing sama banyak. Namun, barang yang akan dibagikan ternyata masih kurang. Jika harus dibagi rata, barang yang harus dibeli lagi oleh perusahaan adalah...",
        pilihan: [
            "susu sebanyak 10 kaleng",
            "susu 10 kaleng dan minyak goreng 20 plastik",
            "mie instan 20 bungkus",
            "mie instan 30 bungkus dan susu 10 kaleng"
        ],
        kunciJawaban: "B" // Kunci: B. Dibutuhkan 10 susu (total jadi 280) & 20 minyak (total jadi 200) agar habis dibagi 40.
    },
    {
        nomor: 2,
        topik: "Paket Sembako",
        jenis: "Pilihan Ganda Kompleks",
        stimulus_gambar: "image_9a6d40.png",
        stimulus_teks: "Dalam rangka memperingati hari ulang tahun...",
        pertanyaan: "Berikut adalah beberapa pernyataan terkait pembagian paket sembako. Klik pada setiap pernyataan yang benar! Jawaban benar lebih dari satu.",
        pilihan: [
            "Jika setiap paket berisi ketiga jenis sembako, maka jumlah minimal susu yang dapat diberikan adalah 9 kaleng.",
            "Jika dalam satu paket tidak berisi minyak goreng, maka jumlah paket maksimal yang dapat diberikan adalah 30 paket.",
            "Jika dalam satu paket hanya terdiri dari mie instan dan minyak goreng, maka jumlah minimal mie instan dalam setiap paket tidak lebih dari 2 bungkus."
        ],
        kunciJawaban: [0, 1] // Kunci: Pernyataan 1 & 2 benar berdasarkan Faktor Persekutuan Terbesar (FPB) dari jumlah barang.
    },
    {
        nomor: 3,
        topik: "Bertani Buah Jeruk",
        jenis: "Tabel Benar/Salah",
        stimulus_gambar: "image_9a7baf.png",
        stimulus_teks: "Pak Dian memiliki dua kebun jeruk dengan luas masing-masing 1 ha. Setiap enam bulan sekali Pak Dian selalu memanen kebun jeruk miliknya...",
        pertanyaan: "Berdasarkan informasi mengenai usaha tani buah jeruk tersebut, Klik pada pilihan Benar atau Salah untuk setiap pernyataan berdasarkan isi teks!",
        pernyataan: [
            "Pupuk yang diperlukan untuk merawat satu pohon jeruk setiap satu bulan sekali adalah sekitar 1.6 x 10⁻²⁷ gram.",
            "Jumlah pohon jeruk yang dimiliki Pak Dian diperkirakan mencapai 300 pohon.",
            "Pada panen ke-2, satu kebun mampu menghasilkan jeruk sebanyak 200 kuintal."
        ],
        kunciJawaban: ["Salah", "Benar", "Salah"] // Kunci: Berdasarkan perhitungan data pada teks bacaan.
    },
    {
        nomor: 4,
        topik: "Bertani Buah Jeruk",
        jenis: "Isian Singkat",
        stimulus_gambar: "image_9a7baf.png",
        stimulus_teks: "Pak Dian memiliki dua kebun jeruk...",
        pertanyaan: "Berapa gram kah total pupuk yang sudah dihabiskan Pak Dian untuk kedua kebun jeruk miliknya?",
        kunciJawaban: "3000" // Kunci: Total pupuk 2 kebun selama 1 siklus panen (6 bulan) = (1/4 kg/kebun/bulan * 2 kebun * 6 bulan) = 3 kg = 3000 gram.
    },
    {
        nomor: 5,
        topik: "Tugas Praktikum Sekolah",
        jenis: "Pilihan Ganda Kompleks",
        stimulus_gambar: "image_9ace22.png",
        stimulus_teks: "Pada suatu hari Hanif diminta mengamati perkembangan pertumbuhan sebuah bakteri...",
        pertanyaan: "Selang 100 menit kemudian, Hanif mengamati penambahan jumlah bakteri dalam wadah pengamatan. Ada berapa banyak bakteri yang dilihat Hanif pada wadah tersebut? Klik pada setiap pilihan jawaban benar! Dan jawaban benar lebih dari satu!",
        pilihan: ["2³ Bakteri", "2⁴ Bakteri", "2⁵ Bakteri", "2⁶ Bakteri"],
        kunciJawaban: [1] // Kunci: Pada menit 90, jumlah bakteri menjadi 16 (2⁴). Bakteri belum membelah lagi hingga menit 120.
    }
];

// Variabel global untuk ujian
let soalAktif = 0;
let jawabanPeserta = new Array(bankSoal.length).fill(null);

function initUjian() {
    // Tampilkan soal pertama
    tampilkanSoal(soalAktif);

    // Event listener untuk tombol navigasi
    document.getElementById('btnBerikutnya').addEventListener('click', () => {
        if (soalAktif < bankSoal.length - 1) {
            soalAktif++;
            tampilkanSoal(soalAktif);
        } else {
            alert("Ujian Selesai!"); // Placeholder untuk halaman nilai
        }
    });

    document.getElementById('btnSebelumnya').addEventListener('click', () => {
        if (soalAktif > 0) {
            soalAktif--;
            tampilkanSoal(soalAktif);
        }
    });
    
    // Inisialisasi Timer
    let waktu = 60 * 60; // 60 menit
    const timerDisplay = document.getElementById('timer');
    const timerInterval = setInterval(() => {
        waktu--;
        const menit = Math.floor(waktu / 60);
        const detik = waktu % 60;
        timerDisplay.textContent = `${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
        if (waktu <= 0) {
            clearInterval(timerInterval);
            alert("Waktu Habis!");
        }
    }, 1000);
}

function tampilkanSoal(index) {
    const soal = bankSoal[index];
    const stimulusPanel = document.getElementById('stimulusPanel');
    const questionPanel = document.getElementById('questionPanel');

    // Update nomor soal
    document.getElementById('nomorSoalDisplay').textContent = `Soal nomor ${soal.nomor}`;

    // Reset panel
    stimulusPanel.innerHTML = '';
    questionPanel.innerHTML = '';

    // Tampilkan stimulus
    if (soal.topik) stimulusPanel.innerHTML += `<h4>${soal.topik}</h4>`;
    // Menggunakan placeholder gambar yang sama untuk semua soal untuk kemudahan demo
    if (soal.stimulus_gambar) stimulusPanel.innerHTML += `<img src="https://i.ibb.co/L5k6bFv/image-9a6d40.png" alt="Stimulus Gambar">`;
    if (soal.stimulus_teks) stimulusPanel.innerHTML += `<p>${soal.stimulus_teks}</p>`;

    // Tampilkan Pertanyaan dan Pilihan Jawaban berdasarkan jenis soal
    questionPanel.innerHTML += `<p>${soal.pertanyaan}</p>`;

    switch (soal.jenis) {
        case "Pilihan Ganda":
            const pilihanHTML = soal.pilihan.map((p, i) => `
                <div class="pilihan-ganda-item">
                    <input type="radio" id="pilihan${i}" name="jawaban" value="${String.fromCharCode(65 + i)}">
                    <label for="pilihan${i}">${String.fromCharCode(65 + i)}. ${p}</label>
                </div>
            `).join('');
            questionPanel.innerHTML += pilihanHTML;
            break;

        case "Pilihan Ganda Kompleks":
            const pgKompleksHTML = soal.pilihan.map((p, i) => `
                <div class="pg-kompleks-item">
                    <input type="checkbox" id="pilihan${i}" name="jawaban" value="${i}">
                    <label for="pilihan${i}">${p.replace(/\^(\d+)/g, '<sup>$1</sup>')}</label>
                </div>
            `).join('');
            questionPanel.innerHTML += pgKompleksHTML;
            break;

        case "Tabel Benar/Salah":
            let bsHTML = `<table class="bs-table"><tr><th>Pernyataan</th><th>Benar</th><th>Salah</th></tr>`;
            bsHTML += soal.pernyataan.map((p, i) => `
                <tr>
                    <td>${p.replace(/\^(\S+)/g, '<sup>$1</sup>')}</td>
                    <td><input type="radio" name="bs${i}" value="Benar"></td>
                    <td><input type="radio" name="bs${i}" value="Salah"></td>
                </tr>
            `).join('');
            bsHTML += `</table>`;
            questionPanel.innerHTML += bsHTML;
            break;

        case "Isian Singkat":
            questionPanel.innerHTML += `<textarea class="isian-jawaban" placeholder="Ketikkan jawaban Anda di sini..."></textarea>`;
            break;
    }
}
