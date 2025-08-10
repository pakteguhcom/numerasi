document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita berada di halaman ujian
    if (document.getElementById('ujian-main')) {
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
        stimulus_teks: "Dalam rangka memperingati hari ulang tahun...",
        pertanyaan: "Perusahaan akan membagikan paket sembako kepada 40 warga...",
        pilihan: [
            "susu sebanyak 10 kaleng",
            "susu 10 kaleng dan minyak goreng 20 plastik",
            "mie instan 20 bungkus",
            "mie instan 30 bungkus dan susu 10 kaleng"
        ],
        kunciJawaban: "" // <-- PENTING: ISI KUNCI JAWABAN DI SINI (misal: "C")
    },
    {
        nomor: 2,
        topik: "Paket Sembako",
        jenis: "Pilihan Ganda Kompleks",
        stimulus_gambar: "image_9a6d40.png",
        stimulus_teks: "Dalam rangka memperingati hari ulang tahun...",
        pertanyaan: "Berikut adalah beberapa pernyataan terkait... Klik pada setiap pernyataan yang benar!",
        pilihan: [
            "Jika setiap paket berisi ketiga jenis sembako...",
            "Jika dalam satu paket tidak berisi minyak goreng...",
            "Jika dalam satu paket hanya terdiri dari mie instan dan minyak goreng..."
        ],
        kunciJawaban: [] // <-- PENTING: ISI KUNCI JAWABAN DI SINI (misal: [0, 2] untuk pilihan 1 dan 3)
    },
    {
        nomor: 3,
        topik: "Bertani Buah Jeruk",
        jenis: "Tabel Benar/Salah",
        stimulus_gambar: "image_9a7baf.png",
        stimulus_teks: "Pak Dian memiliki dua kebun jeruk...",
        pertanyaan: "Berdasarkan informasi mengenai usaha tani... Klik pada pilihan Benar atau Salah...",
        pernyataan: [
            "Pupuk yang diperlukan untuk merawat satu pohon...",
            "Jumlah pohon jeruk yang dimiliki Pak Dian...",
            "Pada panen ke-2, satu kebun mampu menghasilkan..."
        ],
        kunciJawaban: [] // <-- PENTING: ISI KUNCI JAWABAN (misal: ["Salah", "Benar", "Salah"])
    },
    {
        nomor: 4,
        topik: "Bertani Buah Jeruk",
        jenis: "Isian Singkat",
        stimulus_gambar: "image_9a7baf.png",
        stimulus_teks: "Pak Dian memiliki dua kebun jeruk...",
        pertanyaan: "Berapa gram kah total pupuk yang sudah dihabiskan Pak Dian...",
        kunciJawaban: "" // <-- PENTING: ISI KUNCI JAWABAN (misal: "150000")
    },
    {
        nomor: 5,
        topik: "Tugas Praktikum Sekolah",
        jenis: "Pilihan Ganda Kompleks",
        stimulus_gambar: "image_9ace22.png",
        stimulus_teks: "Pada suatu hari Hanif diminta mengamati...",
        pertanyaan: "Selang 100 menit kemudian, Hanif mengamati...",
        pilihan: ["2³ Bakteri", "2⁴ Bakteri", "2⁵ Bakteri", "2⁶ Bakteri"],
        kunciJawaban: [] // <-- PENTING: ISI KUNCI JAWABAN DI SINI
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
    setInterval(() => {
        waktu--;
        const menit = Math.floor(waktu / 60);
        const detik = waktu % 60;
        timerDisplay.textContent = `${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
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
    if (soal.stimulus_gambar) stimulusPanel.innerHTML += `<img src="https://i.ibb.co/L5k6bFv/image-9a6d40.png" alt="Stimulus Gambar">`; // Placeholder, ganti dengan path gambar yg benar
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
                    <label for="pilihan${i}">${p}</label>
                </div>
            `).join('');
            questionPanel.innerHTML += pgKompleksHTML;
            break;

        case "Tabel Benar/Salah":
            let bsHTML = `<table class="bs-table"><tr><th>Pernyataan</th><th>Benar</th><th>Salah</th></tr>`;
            bsHTML += soal.pernyataan.map((p, i) => `
                <tr>
                    <td>${p}</td>
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
