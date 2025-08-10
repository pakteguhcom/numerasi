// Menunggu semua elemen HTML dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // === BAGIAN DATA (DATABASE SEMENTARA) ===
    const mockUser = {
        username: 'P0211016400018',
        password: '654449*',
        nik: 'P0211016400018',
        nama: 'Peserta 01',
        gender: 'Laki-Laki', // Data baru
        ujian: 'Literasi - SMP/MTs/PAKET B',
        token: 'ZFKHGF' // Token sesuai gambar
    };
    
    // Teks Stimulus untuk digunakan berulang kali
    const stimulusPutriLopian = `<h3>Putri Lopian (Kisah dari Tapanuli Tengah)</h3>
<p>Liburan semester ini, Riga berlibur ke rumah Kakek di Sibolga, Sumatera Utara. Kakek senang sekali bercerita. Begitu banyak legenda yang Kakek ceritakan padanya. Kali ini, Kakek bercerita tentang Putri Lopian, seorang penyayang binatang yang memiliki banyak sahabat hewan.</p>
<p>Setiap sore, Putri Lopian memanggil para sahabatnya dari balik pagar halaman istana yang berbatasan dengan hutan, lalu memberi mereka makan.</p>
<p>Sahabatnya yang paling dekat adalah kura-kura, yang selalu mengikutinya. Namun, si kura-kura pemalu. Jika ada orang lain, si kura-kura akan bersembunyi, berpura-pura jadi batu.</p>
<p>Suatu pagi, ketika dia sedang menemui teman-temannya di tepi hutan, gempa besar terjadi. Suasana kacau balau, penghuni istana berlarian keluar. Orang tuanya tidak ada! Kelinci dan rusa mendatanginya, menarik-narik kainnya agar dia ikut mereka ke arah hutan, menjauhi pantai.</p>
<p>Sementara itu, orang-orang malah berlarian ke laut sambil membawa keranjang, berteriak, "Ikan! Banyak ikan di pantai!"</p>
<p>Tiba-tiba saja gelombang dahsyat datang dari arah laut. Semua tersapu! Putri Lopian juga. Di mana-mana hanya ada air!</p>
<p>Sebongkah batu muncul di dekatnya. Ternyata itu si kura-kura. Putri Lopian berpegangan ke tempurung sahabatnya. Kura-kura membawanya berenang ke dataran tinggi, dan hewan lain membantu menariknya.</p>
<p>Akhirnya dia selamat! Sayang sekali, Putri Lopian tidak dapat menemukan orang tuanya. Namun, sahabat-sahabatnya menjadi pelipur lara. Hingga dewasa, dia masih menyayangi hewan-hewan itu.</p>`;

    const stimulusMengikatWarna = `<h3>Mengikat Warna</h3>
<p>Yogyakarta memiliki banyak kampung batik. Salah satu kampung batik yang unik terletak di Karangkajen. Kerajinan tangan ini dikerjakan kelompok ibu rumah tangga yang tergabung dalam Badan Usaha Milik Masyarakat (BUMMas). Produk yang dihasilkan diberi sebuah merek yang menunjukkan ciri khas bagaimana kerajinan tangan itu dibuat. Kini hasil produksi kelompok ibu rumah tangga itu telah menembus pasar ekspor ke Malaysia, Singapura, dan Australia.</p>
<p>Keistimewaan pengerjaan kerajinan tangan tersebut adalah ecoprint. Teknik ini memanfaatkan berbagai dedaunan, bunga, dan ranting-ranting pohon yang disebarkan begitu saja secara acak atau ditata rapi di atas kain. Bahan-bahan itu digunakan untuk menggantikan cap atau cetak layaknya batik pada umumnya.</p>
<p>Setelah proses penataan, kain digulung dan direbus beberapa waktu hingga saat dibuka kembali sudah terbentuk gambar daun, bunga, dan ranting. Selanjutnya kain diangin-anginkan dan difiksasi dengan air tawas agar warna lebih awet.</p>
<p>Keunggulan ecoprint ini banyak sekali, di antaranya adalah desain yang tidak massal sehingga menjadikannya eksklusif. Teknik ini dapat diterapkan pada media selain kain, yang penting adalah media dapat menyerap warna alami daun dan bunga. Ecoprint juga mendukung gerakan menyelamatkan bumi karena bahan alami yang digunakannya. Selain itu jenis kerajinan tangan ini menjadi salah satu alternatif mengurangi limbah kimia dari pabrik tekstil.</p>
<p>Belum banyak yang mengambil segmen ini karena prosesnya yang rumit dan membutuhkan ketelatenan, sehingga masih terbuka sebagai peluang bisnis. Perhitungan modalnya pun tidak begitu tinggi, sehingga dapat diterapkan di kalangan ekonomi bawah.</p>
<p>Kelompok perajin Karangkajen ini menggunakan teknik ecoprint yang menonjolkan karakteristik dan pemberdayaan berbasis potensi lokal. Dukungan masyarakat dan pemerintah daerah telah mendongkrak omset per bulannya mencapai puluhan hingga ratusan juta rupiah.</p>
<p>Selain memproduksi kain ecoprint dan aneka kerajinan tangan berbahan kain, kelompok perajin ini juga memanfaatkan potensi kampungnya menjadi destinasi wisata. Para wisatawan dapat melihat langsung proses produksi ecoprint sambil berbelanja produk unik yang harganya berkisar puluhan hingga ratusan ribu rupiah.</p>
<p>Program ecoprint yang dimulai tahun 2017 ini telah memberdayakan para ibu rumah tangga untuk melakukan kegiatan positif dan memiliki penghasilan.</p>
<p><small>Tawas : Kristal garam transparan yang larut dalam air, disebut aluminium kalium sulfat.</small></p>`;

    const questions = [
        {stimulus: stimulusPutriLopian, questionText: '1. Siapa sahabat Putri Lopian yang mendatangi dan menarik-narik kainnya?', instruction: 'Pilihlah jawaban yang benar dengan memberi tanda centang (√)! Jawaban benar lebih dari satu.', type: 'checkbox', options: ['Kelinci', 'Rusa', 'Kura-kura', 'Ikan'], answer: ['Kelinci', 'Rusa']},
        {stimulus: stimulusPutriLopian, questionText: '2. Apa yang dilakukan kura-kura dan Putri Lopian setelah gempa besar terjadi?', type: 'radio', options: ['Kura-kura menarik Putri Lopian untuk menjauhi pantai.', 'Kura-kura dan Putri Lopian bergegas berlari menuju ke hutan.', 'Putri Lopian mengajak kura-kura berlari ke laut mencari orang tuanya.', 'Putri Lopian berpegangan pada tempurung kura-kura.'], answer: 'Putri Lopian berpegangan pada tempurung kura-kura.'},
        {stimulus: stimulusPutriLopian, questionText: '3. Berdasarkan gambar dan isi cerita tersebut, apa yang membuat Putri Lopian selamat dari gelombang dahsyat?', type: 'radio', options: ['Kepandaian Putri Lopian berenang karena istananya dekat pantai.', 'Persahabatan Putri Lopian dengan binatang yang selalu mengikutinya.', 'Kekuatan yang dimiliki oleh Putri Lopian yang didapat dari teman-temannya.', 'Dataran tinggi sebagai tujuan Putri Lopian untuk menghindari gelombang.'], answer: 'Persahabatan Putri Lopian dengan binatang yang selalu mengikutinya.'},
        {stimulus: stimulusPutriLopian, questionText: '4. Bagaimana sifat kura-kura beserta alasan yang sesuai berdasarkan cerita tersebut?', instruction: 'Pilihlah jawaban yang benar dengan memberi tanda centang (√)! Jawaban benar lebih dari satu.', type: 'checkbox', options: ['Pemalu karena bila ada orang lain datang dia akan bersembunyi.', 'Penolong karena menyelamatkan Putri Lopian dan membawanya ke dataran tinggi.', 'Penyayang karena hingga dewasa dia masih menyayangi hewan-hewan lain.', 'Peduli karena mengajak Putri Lopian untuk menjauhi pantai setelah terjadi gempa'], answer: ['Pemalu karena bila ada orang lain datang dia akan bersembunyi.', 'Penolong karena menyelamatkan Putri Lopian dan membawanya ke dataran tinggi.']},
        {stimulus: stimulusMengikatWarna, questionText: '5. Manakah dari pernyataan berikut yang menjelaskan keberhasilan kampung kerajinan batik?', type: 'radio', options: ['Kerajinan ecoprint sangat bagus karena menggunakan bahan impor.', 'Kerajinan batik ecoprint memiliki keistimewaan dibanding teknik lain.', 'Butuh modal yang sangat besar untuk membuat kerajinan ecoprint.', 'Kerajinan batik biasanya menghasilkan limbah, termasuk ecoprint.'], answer: 'Kerajinan batik ecoprint memiliki keistimewaan dibanding teknik lain.'},
        {stimulus: stimulusMengikatWarna, questionText: '6. Pernyataan berikut menjelaskan tentang keunggulan-keunggulan batik ecoprint dibanding batik cap atau cetak pada umumnya.', instruction: 'Klik pilihan Benar atau Salah untuk setiap pernyataan sesuai isi teks!', type: 'true-false', statements: ['A. Bahan membatik ecoprint menggunakan bahan alami sehingga ramah lingkungan dibanding bahan batik cap yang menghasilkan limbah tekstil.', 'B. Desain pada batik ecoprint yang tidak massal menjadikannya eksklusif dibanding desain batik cap yang mudah dijumpai.', 'C. Proses pembuatan batik ecoprint tidak membutuhkan keterampilan khusus dibanding batik cap yang rumit proses pembuatannya.'], answer: ['Benar', 'Salah', 'Benar']},
        {stimulus: stimulusMengikatWarna, questionText: '7. Mengapa teknik kerajinan batik ecoprint bagus untuk memberdayakan ibu rumah tangga?', instruction: 'Pilihlah jawaban yang benar dengan memberi tanda centang (√)! Jawaban benar lebih dari satu.', type: 'checkbox', options: ['Ibu rumah tangga memiliki keahlian berbicara sehingga sangat cocok di bagian penjualan.', 'Pengerjaan batik ecoprint butuh keterampilan yang dapat dikerjakan oleh ibu rumah tangga.', 'Hasil dari kegiatan membatik ecoprint dapat digunakan sebagai tambahan pemasukan keluarga.', 'Batik dengan teknik ecoprint butuh tenaga besar yang sesuai dengan tenaga ibu rumah tangga.'], answer: ['Pengerjaan batik ecoprint butuh keterampilan yang dapat dikerjakan oleh ibu rumah tangga.', 'Hasil dari kegiatan membatik ecoprint dapat digunakan sebagai tambahan pemasukan keluarga.']},
        {stimulus: stimulusMengikatWarna, questionText: '8. Setelah membaca teks tersebut, apa yang dapat kamu refleksikan berdasarkan isinya?', instruction: 'Klik pilihan Benar atau Salah untuk setiap pernyataan sesuai isi teks!', type: 'true-false', statements: ['A. Teks mampu membuka wawasan tentang seluk beluk batik ecoprint.', 'B. Teks memberikan informasi mengenai peluang usaha dengan membatik ecoprint.', 'C. Teks memberikan semangat untuk menjaga kesehatan diri saat membatik ecoprint.'], answer: ['Benar', 'Benar', 'Salah']}
    ];

    let currentQuestionIndex = 0;
    let userAnswers = [];
    let timerInterval;

    const pages = document.querySelectorAll('.page');
    const headerLeft = document.getElementById('header-left');
    const headerRight = document.getElementById('header-right');
    const loginBtn = document.getElementById('login-btn');
    const submitDataBtn = document.getElementById('submit-data-btn');
    const startTestBtn = document.getElementById('start-test-btn');
    const stimulusPanel = document.getElementById('stimulus-panel');
    const questionPanel = document.getElementById('question-panel');
    const resultText = document.getElementById('result-text');

    // === FUNGSI BARU UNTUK TANGGAL LAHIR ===
    function populateDateDropdowns() {
        const daySelect = document.getElementById('confirm-day');
        const monthSelect = document.getElementById('confirm-month');
        const yearSelect = document.getElementById('confirm-year');
        
        for (let i = 1; i <= 31; i++) daySelect.innerHTML += `<option value="${i}">${i}</option>`;
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        months.forEach((m, i) => monthSelect.innerHTML += `<option value="${i+1}">${m}</option>`);
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 100; i--) yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    function showPage(pageId) {
        pages.forEach(page => page.style.display = 'none');
        document.getElementById(pageId).style.display = 'flex';
    }

    function renderQuestion(index) {
        const q = questions[index];
        stimulusPanel.innerHTML = q.stimulus;
        let questionHTML = `<h3>${q.questionText}</h3>`;
        if (q.instruction) questionHTML += `<p><small>${q.instruction}</small></p>`;

        if (q.type === 'radio' || q.type === 'checkbox') {
            q.options.forEach(opt => {
                questionHTML += `<label style="display: block; margin-bottom: 10px; text-align:left;"><input type="${q.type}" name="option" value="${opt}"> ${opt}</label>`;
            });
        } else if (q.type === 'true-false') {
            questionHTML += `<table class="statement-table"><thead><tr><th>Pernyataan</th><th>Benar</th><th>Salah</th></tr></thead><tbody>`;
            q.statements.forEach((stmt, i) => {
                questionHTML += `<tr><td class="statement-text">${stmt}</td><td><input type="radio" name="statement_${i}" value="Benar"></td><td><input type="radio" name="statement_${i}" value="Salah"></td></tr>`;
            });
            questionHTML += `</tbody></table>`;
        }

        const buttonText = (index === questions.length - 1) ? 'Selesai' : 'Selanjutnya';
        questionHTML += `<div class="question-nav"><button id="next-btn">${buttonText}</button></div>`;
        questionPanel.innerHTML = questionHTML;

        document.getElementById('next-btn').addEventListener('click', handleNextQuestion);
        headerLeft.innerHTML = `<b>Soal Nomor ${index + 1} dari ${questions.length}</b>`;
    }
    
    function saveAnswer() {
        const q = questions[currentQuestionIndex];
        let answer;
        if (q.type === 'radio') {
            const selected = document.querySelector('input[name="option"]:checked');
            answer = selected ? selected.value : null;
        } else if (q.type === 'checkbox') {
            answer = [];
            document.querySelectorAll('input[name="option"]:checked').forEach(el => answer.push(el.value));
        } else if (q.type === 'true-false') {
            answer = [];
            q.statements.forEach((_, i) => {
                const selected = document.querySelector(`input[name="statement_${i}"]:checked`);
                answer.push(selected ? selected.value : null);
            });
        }
        userAnswers[currentQuestionIndex] = answer;
    }

    function calculateScore() {
        let score = 0;
        questions.forEach((q, i) => {
            const userAnswer = userAnswers[i];
            const correctAnswer = q.answer;
            let isCorrect = false;

            if (q.type === 'radio') {
                if (userAnswer === correctAnswer) isCorrect = true;
            } else if (q.type === 'checkbox') {
                if (userAnswer && userAnswer.length === correctAnswer.length && userAnswer.every(val => correctAnswer.includes(val))) {
                    isCorrect = true;
                }
            } else if (q.type === 'true-false') {
                if (userAnswer && userAnswer.length === correctAnswer.length && userAnswer.every((val, index) => val === correctAnswer[index])) {
                    isCorrect = true;
                }
            }
            if (isCorrect) score++;
        });
        return score;
    }

    function handleNextQuestion() {
        saveAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion(currentQuestionIndex);
        } else {
            clearInterval(timerInterval);
            const finalScore = calculateScore();
            resultText.textContent = `Anda menjawab ${finalScore} dari ${questions.length} soal dengan benar.`;
            showPage('result-page');
            headerLeft.innerHTML = '<b>PUSMENDIK - SIMULASI ANBK</b>';
            headerRight.innerHTML = '';
        }
    }

    // === EVENT LISTENERS (DIPERBARUI) ===
    loginBtn.addEventListener('click', () => {
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        if (user === mockUser.username && pass === mockUser.password) {
            document.getElementById('data-nik').textContent = mockUser.nik;
            document.getElementById('data-nama-display').textContent = mockUser.nama;
            document.getElementById('data-gender').textContent = mockUser.gender;
            document.getElementById('data-ujian').textContent = mockUser.ujian;
            const tokenButton = `<button style="padding: 5px 10px; cursor:default;">Refresh</button>`;
            headerRight.innerHTML = `Token: <b>${mockUser.token}</b> &nbsp; ${tokenButton}`;
            showPage('confirm-data-page');
        } else {
            alert('Username atau Password salah!');
        }
    });

    submitDataBtn.addEventListener('click', () => {
        const inputNama = document.getElementById('confirm-nama').value;
        const inputDay = document.getElementById('confirm-day').value;
        const inputMonth = document.getElementById('confirm-month').value;
        const inputYear = document.getElementById('confirm-year').value;
        const inputToken = document.getElementById('token-input').value;

        if (!inputNama || !inputDay || !inputMonth || !inputYear) {
            alert('Nama dan Tanggal Lahir harus diisi!');
            return;
        }

        if (inputToken.toUpperCase() === mockUser.token) {
            showPage('confirm-test-page');
        } else {
            alert('Token tidak valid!');
        }
    });

    startTestBtn.addEventListener('click', () => {
        let timeLeft = 3600;
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleNextQuestion();
            }
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            headerRight.innerHTML = `Sisa Waktu: <b>${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</b>`;
            timeLeft--;
        }, 1000);

        showPage('test-page');
        renderQuestion(currentQuestionIndex);
    });

    // Inisialisasi
    populateDateDropdowns();
    showPage('login-page');
});
