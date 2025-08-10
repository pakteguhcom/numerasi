// Menunggu semua elemen HTML dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // === BAGIAN DATA (DATABASE SEMENTARA) ===
    const mockUser = {
        username: 'P130100230',
        password: '123456',
        nik: 'P130100230',
        nama: 'Peserta 01',
        ujian: 'Literasi - SMP/MTs/PAKET B',
        token: 'ABCDE'
    };

    const questions = [
        // Teks 1: Putri Lopian
        {
            stimulus: `<h3>Putri Lopian (Kisah dari Tapanuli Tengah)</h3><p>Liburan semester ini, Riga berlibur ke rumah Kakek di Sibolga, Sumatera Utara. Kakek senang sekali bercerita. Begitu banyak legenda yang Kakek ceritakan padanya. Kali ini, Kakek bercerita tentang Putri Lopian, seorang penyayang binatang yang memiliki banyak sahabat hewan...</p><p>[...teks lengkap Putri Lopian...]</p>`,
            questionText: '1. Siapa sahabat Putri Lopian yang mendatangi dan menarik-narik kainnya?',
            instruction: 'Pilihlah jawaban yang benar dengan memberi tanda centang (√)! Jawaban benar lebih dari satu.',
            type: 'checkbox',
            options: ['Kelinci', 'Rusa', 'Kura-kura', 'Ikan'],
            answer: ['Kelinci', 'Rusa']
        },
        {
            stimulus: `<h3>Putri Lopian (Kisah dari Tapanuli Tengah)</h3><p>Liburan semester ini, Riga berlibur ke rumah Kakek di Sibolga, Sumatera Utara. Kakek senang sekali bercerita. Begitu banyak legenda yang Kakek ceritakan padanya. Kali ini, Kakek bercerita tentang Putri Lopian, seorang penyayang binatang yang memiliki banyak sahabat hewan...</p><p>[...teks lengkap Putri Lopian...]</p>`,
            questionText: '2. Apa yang dilakukan kura-kura dan Putri Lopian setelah gempa besar terjadi?',
            type: 'radio',
            options: [
                'Kura-kura menarik Putri Lopian untuk menjauhi pantai.',
                'Kura-kura dan Putri Lopian bergegas berlari menuju ke hutan.',
                'Putri Lopian mengajak kura-kura berlari ke laut mencari orang tuanya.',
                'Putri Lopian berpegangan pada tempurung kura-kura.'
            ],
            answer: 'Putri Lopian berpegangan pada tempurung kura-kura.'
        },
        // ... (Tambahkan soal 3 dan 4 dengan cara yang sama)
        // Teks 2: Mengikat Warna
        {
            stimulus: `<h3>Mengikat Warna</h3><p>Yogyakarta memiliki banyak kampung batik. Salah satu kampung batik yang unik terletak di Karangkajen. Kerajinan tangan ini dikerjakan kelompok ibu rumah tangga yang tergabung dalam Badan Usaha Milik Masyarakat (BUMMas)...</p><p>[...teks lengkap Mengikat Warna...]</p>`,
            questionText: '5. Manakah dari pernyataan berikut yang menjelaskan keberhasilan kampung kerajinan batik?',
            type: 'radio',
            options: [
                'Kerajinan ecoprint sangat bagus karena menggunakan bahan impor.',
                'Kerajinan batik ecoprint memiliki keistimewaan dibanding teknik lain.',
                'Butuh modal yang sangat besar untuk membuat kerajinan ecoprint.',
                'Kerajinan batik biasanya menghasilkan limbah, termasuk ecoprint.'
            ],
            answer: 'Kerajinan batik ecoprint memiliki keistimewaan dibanding teknik lain.'
        },
        {
            stimulus: `<h3>Mengikat Warna</h3><p>Yogyakarta memiliki banyak kampung batik. Salah satu kampung batik yang unik terletak di Karangkajen. Kerajinan tangan ini dikerjakan kelompok ibu rumah tangga yang tergabung dalam Badan Usaha Milik Masyarakat (BUMMas)...</p><p>[...teks lengkap Mengikat Warna...]</p>`,
            questionText: '6. Pernyataan berikut menjelaskan tentang keunggulan-keunggulan batik ecoprint dibanding batik cap atau cetak pada umumnya.',
            instruction: 'Klik pilihan Benar atau Salah untuk setiap pernyataan sesuai isi teks!',
            type: 'true-false',
            statements: [
                'Bahan membatik ecoprint menggunakan bahan alami sehingga ramah lingkungan dibanding bahan batik cap yang menghasilkan limbah tekstil.',
                'Desain pada batik ecoprint yang tidak massal menjadikannya eksklusif dibanding desain batik cap yang mudah dijumpai.',
                'Proses pembuatan batik ecoprint tidak membutuhkan keterampilan khusus dibanding batik cap yang rumit proses pembuatannya.'
            ],
            answer: ['Benar', 'Salah', 'Benar']
        }
        // ... (Tambahkan sisa soal 7 dan 8 dengan cara yang sama)
    ];

    let currentQuestionIndex = 0;
    let userAnswers = [];

    // === BAGIAN SELEKSI ELEMEN DOM ===
    const pages = document.querySelectorAll('.page');
    const headerLeft = document.getElementById('header-left');
    const headerRight = document.getElementById('header-right');

    const loginBtn = document.getElementById('login-btn');
    const submitDataBtn = document.getElementById('submit-data-btn');
    const startTestBtn = document.getElementById('start-test-btn');
    
    const stimulusPanel = document.getElementById('stimulus-panel');
    const questionPanel = document.getElementById('question-panel');
    const resultText = document.getElementById('result-text');

    // === BAGIAN FUNGSI ===

    // Fungsi untuk berpindah halaman
    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(pageId).style.display = 'flex';
    }

    // Fungsi untuk menampilkan pertanyaan
    function renderQuestion(index) {
        const q = questions[index];
        stimulusPanel.innerHTML = q.stimulus;
        
        let questionHTML = `<h3>${q.questionText}</h3>`;
        if (q.instruction) {
            questionHTML += `<p><small>${q.instruction}</small></p>`;
        }

        if (q.type === 'radio' || q.type === 'checkbox') {
            q.options.forEach(opt => {
                questionHTML += `
                    <label style="display: block; margin-bottom: 10px;">
                        <input type="${q.type}" name="option" value="${opt}"> ${opt}
                    </label>`;
            });
        } else if (q.type === 'true-false') {
            questionHTML += `<table class="statement-table"><thead><tr><th>Pernyataan</th><th>Benar</th><th>Salah</th></tr></thead><tbody>`;
            q.statements.forEach((stmt, i) => {
                questionHTML += `
                    <tr>
                        <td class="statement-text">${stmt}</td>
                        <td><input type="radio" name="statement_${i}" value="Benar"></td>
                        <td><input type="radio" name="statement_${i}" value="Salah"></td>
                    </tr>`;
            });
            questionHTML += `</tbody></table>`;
        }

        questionHTML += `<div class="question-nav"><button id="next-btn">Selanjutnya</button></div>`;
        questionPanel.innerHTML = questionHTML;

        document.getElementById('next-btn').addEventListener('click', handleNextQuestion);
        headerLeft.innerHTML = `<b>Soal Nomor ${index + 1} dari ${questions.length}</b>`;
    }

    // Fungsi untuk menyimpan jawaban dan lanjut ke soal berikutnya
    function handleNextQuestion() {
        // Logika untuk menyimpan jawaban (disimpan di userAnswers)
        // ...

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion(currentQuestionIndex);
        } else {
            // Tes selesai
            const correctAnswers = questions.filter((q, i) => {
                // Logika pengecekan jawaban yang benar
                return true; // placeholder
            }).length;
            resultText.textContent = `Anda menjawab ${correctAnswers} dari ${questions.length} soal dengan benar.`;
            showPage('result-page');
            headerLeft.innerHTML = '<b>PUSMENDIK - SIMULASI ANBK</b>';
            headerRight.innerHTML = '';
        }
    }
    
    // === BAGIAN EVENT LISTENERS ===
    
    loginBtn.addEventListener('click', () => {
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user === mockUser.username && pass === mockUser.password) {
            document.getElementById('data-nik').textContent = mockUser.nik;
            document.getElementById('data-nama').textContent = mockUser.nama;
            document.getElementById('data-ujian').textContent = mockUser.ujian;
            headerRight.innerHTML = `Token: <b>${mockUser.token}</b>`;
            showPage('confirm-data-page');
        } else {
            alert('Username atau Password salah!');
        }
    });

    submitDataBtn.addEventListener('click', () => {
        const token = document.getElementById('token-input').value;
        if (token.toUpperCase() === mockUser.token) {
            showPage('confirm-test-page');
        } else {
            alert('Token tidak valid!');
        }
    });

    startTestBtn.addEventListener('click', () => {
        let timeLeft = 3600; // 60 menit
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // Logika auto-finish
            }
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            headerRight.innerHTML = `Sisa Waktu: <b>${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</b>`;
            timeLeft--;
        }, 1000);

        showPage('test-page');
        renderQuestion(currentQuestionIndex);
    });

    // Inisialisasi: Tampilkan halaman login saat pertama kali dibuka
    showPage('login-page');
});
