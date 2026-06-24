// awal script program.html
// Dibungkus dalam kondisi untuk memastikan elemen ada sebelum dijalankan
(function() {
    const container = document.getElementById("program-cards-container");
    
    // Hanya jalankan jika elemen program ada (di halaman program.html)
    if (!container) return;

    // Array isi card program
    const programs = [
        {
            id: "PROGRAM 01",
            title: "Harmony System",
            category: "bisnis-operasional",
            image: "assets/img/harmony_system.webp",
            description: "Sistem operasional untuk mengidentifikasi and mengatasi 6 masalah mendasar organisasi langsung dari akar penyebabnya, bukan sekadar memperbaiki gejala, agar masalah hilang secara permanen.",
            bullets: [
                "Audit efisiensi operasional menyeluruh",
                "Standardisasi prosedur kerja (SOP)",
                "Pemetaan KPI berbasis hasil"
            ]
        },
        {
            id: "PROGRAM 02",
            title: "Program CSR Berbasis Literasi",
            category: "sosial-literasi",
            image: "assets/img/csr_literasi.webp",
            description: "Wujudkan tanggung jawab sosial perusahaan melalui program pendidikan dan literasi yang terstruktur, berdampak, dan dapat dipertanggungjawabkan kepada pemangku kepentingan.",
            bullets: [
                "Perancangan program CSR pendidikan yang terukur",
                "Pelatihan literasi untuk komunitas sasaran",
                "Monitoring & evaluasi dampak program CSR",
                "Pelaporan dampak sosial yang transparan"
            ]
        },
        {
            id: "PROGRAM 03",
            title: "Communication for Team",
            category: "komunikasi-sales",
            image: "assets/img/communication_team.webp",
            description: "Pelatihan komunikasi efektif yang dirancang untuk membangun sinergi tim, mengurangi miskomunikasi, dan menciptakan lingkungan kerja yang kolaboratif dan produktif.",
            bullets: [
                "Meningkatkan kualitas komunikasi tim",
                "Membangun kepercayaan dan keterbukaan antar anggota",
                "Mengelola konflik dengan pendekatan komunikasi konstruktif",
                "Menciptakan budaya kerja yang harmonis dan produktif"
            ]
        },
        {
            id: "PROGRAM 04",
            title: "Communication for Sales",
            category: "komunikasi-sales",
            image: "assets/img/communication_sales.webp",
            description: "Tingkatkan performa tim penjualan melalui teknik komunikasi persuasif yang membangun kepercayaan dan mempercepat proses closing.",
            bullets: [
                "Menguasai teknik komunikasi persuasif dan storytelling",
                "Meningkatkan kemampuan membangun kepercayaan klien",
                "Mengatasi keberatan dengan komunikasi yang tepat",
                "Meningkatkan conversion rate dan angka keberhasilan"
            ]
        }
    ];

    let selectedCategory = "all";
    let searchQuery = "";

    const filterBtns = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("search-program");

    function renderPrograms() {
        // filter program di tiap pilihannya
        const filtered = programs.filter(prog => {
            const matchesCategory = selectedCategory === "all" || prog.category === selectedCategory;
            const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prog.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // jika program yang dicari tidak ada
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5" style="width: 100% !important; flex: 0 0 100% !important;">
                    <div class="text-muted">
                        <i class="bi bi-search" style="font-size: 48px; display: block; margin-bottom: 16px;"></i>
                        <h5>Program tidak ditemukan</h5>
                        <p>Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(prog => {
            const bulletsHTML = prog.bullets.map(bullet => `
                <li class="card-bullet-item">
                    <i class="bi bi-check-circle"></i>
                    <span>${bullet}</span>
                </li>
            `).join('');

            return `
                <div class="col" data-aos="fade-up" data-aos-duration="800">
                    <div class="program-card">
                        <div class="card-img-wrapper">
                            <span class="card-badge">${prog.id}</span>
                            <img src="${prog.image}" alt="${prog.title}" width="400" height="220" loading="lazy">
                        </div>
                        <h3 class="card-title">${prog.title}</h3>
                        <p class="card-desc">${prog.description}</p>
                        <ul class="card-bullets">
                            ${bulletsHTML}
                        </ul>
                        <a href="#" class="card-btn">
                            Lihat Detail <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        if (window.AOS) {
            window.AOS.refresh();
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedCategory = btn.getAttribute("data-category");
            renderPrograms();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderPrograms();
        });
    }

    renderPrograms();
})();
// akhir script program.html

// awal script formulir-pendaftaran.html
(function () {
    const form = document.getElementById('registrationForm');
    
    // hanya jalankan jika elemen formulir ada (di halaman formulir-pendaftaran.html)
    if (!form) {
        console.log('Formulir tidak ditemukan, script formulir tidak dijalankan');
        return;
    }

    console.log('Script formulir-pendaftaran dimuat dengan sukses');

    const totalSteps = 4;
    let currentStep = 1;

    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnSubmit = document.getElementById('btn-submit');

            function goToStep(step) {
                document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
                document.getElementById('step-' + step).classList.add('active');

                document.querySelectorAll('.stepper-item').forEach(item => {
                    const s = parseInt(item.dataset.step);
                    item.classList.remove('active', 'completed');
                    if (s === step) item.classList.add('active');
                    else if (s < step) item.classList.add('completed');
                });

                for (let i = 1; i < totalSteps; i++) {
                    const line = document.getElementById('line-' + i + '-' + (i + 1));
                    if (line) {
                        line.classList.toggle('completed', i < step);
                    }
                }

                // Toggle tombol sebelumnya 
                btnPrev.classList.toggle('d-none', step === 1);

                // Toggle tombol selanjutnya / submit
                if (step === totalSteps) {
                    btnNext.classList.add('d-none');
                    btnSubmit.classList.remove('d-none');
                    populateReview();
                } else {
                    btnNext.classList.remove('d-none');
                    btnSubmit.classList.add('d-none');
                }

                currentStep = step;
            }

            function validateStep(step) {
                const stepEl = document.getElementById('step-' + step);
                const inputs = stepEl.querySelectorAll('input[required]:not([type="radio"]), select[required], textarea[required]');
                let valid = true;

                inputs.forEach(input => {
                    let isValidInput = true;
                    if (!input.value.trim() || (input.tagName === 'SELECT' && input.value === '')) {
                        isValidInput = false;
                    }

                    // validasi email yang harus memakai @ dan domain
                    if (input.type === 'email' && input.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            isValidInput = false;
                        }
                    }

                    if (!isValidInput) {
                        input.classList.add('is-invalid');
                        valid = false;
                    } else {
                        input.classList.remove('is-invalid');
                    }
                });

                const radioNames = new Set();
                stepEl.querySelectorAll('input[type="radio"][required]').forEach(r => radioNames.add(r.name));

                radioNames.forEach(name => {
                    const checked = stepEl.querySelector('input[name="' + name + '"]:checked');
                    if (!checked) {
                        valid = false;
                        const firstRadio = stepEl.querySelector('input[name="' + name + '"]');
                        if (firstRadio && firstRadio.closest('.question-card')) {
                            firstRadio.closest('.question-card').style.borderColor = '#ef4444';
                        }
                    } else {
                        const checkedRadio = stepEl.querySelector('input[name="' + name + '"]:checked');
                        if (checkedRadio && checkedRadio.closest('.question-card')) {
                            checkedRadio.closest('.question-card').style.borderColor = '#e8ecf1';
                        }
                    }
                });

                return valid;
            }
            function populateReview() {
                const getValue = (id) => {
                    const el = document.getElementById(id);
                    if (!el) return '-';
                    if (el.tagName === 'SELECT') {
                        return el.selectedIndex > 0 ? el.options[el.selectedIndex].text : '-';
                    }
                    return el.value || '-';
                };

                const metode = document.querySelector('input[name="metodeSesi"]:checked');

                const sections = [
                    {
                        title: 'Data Diri',
                        items: [
                            ['Nama Lengkap', getValue('namaLengkap')],
                            ['Nama Perusahaan', getValue('namaPerusahaan')],
                            ['No. WhatsApp', '+62 ' + getValue('noWhatsapp')],
                            ['Email', getValue('emailUtama')]
                        ]
                    },
                    {
                        title: 'Bisnis',
                        items: [
                            ['Industri/Bidang', getValue('industriBisnis')],
                            ['Omset/Bulan', document.querySelector('input[name="omsetBisnis"]:checked')?.value || '-'],
                            ['Q1: Pelanggan Beli Kembali', document.querySelector('input[name="q1"]:checked')?.value || '-'],
                            ['Q2: Keuntungan Operasional', document.querySelector('input[name="q2"]:checked')?.value || '-'],
                            ['Q3: Deskripsi Pelanggan', document.querySelector('input[name="q3"]:checked')?.value || '-'],
                            ['Q4: Proses Penjualan', document.querySelector('input[name="q4"]:checked')?.value || '-'],
                            ['Q5: Pendapatan & Kas', document.querySelector('input[name="q5"]:checked')?.value || '-'],
                            ['Q6: Operasional Harian', document.querySelector('input[name="q6"]:checked')?.value || '-']
                        ]
                    },
                    {
                        title: 'Jadwal',
                        items: [
                            ['Tanggal', getValue('tanggalKonsultasi')],
                            ['Waktu', getValue('waktuKonsultasi')],
                            ['Metode', metode ? (metode.value === 'online' ? '<i class="bi bi-laptop"></i> Online' : '<i class="bi bi-building"></i> Offline') : '-'],
                            ['Pertanyaan/Topik', getValue('pertanyaan')]
                        ]
                    }
                ];

                let html = '';
                sections.forEach(section => {
                    html += '<div class="review-section">';
                    html += '<h3 class="review-section-title">' + section.title + '</h3>';
                    section.items.forEach(([label, value]) => {
                        html += '<div class="review-row">';
                        html += '<span class="review-label">' + label + '</span>';
                        html += '<span class="review-value">' + value + '</span>';
                        html += '</div>';
                    });
                    html += '</div>';
                });

                document.getElementById('review-summary').innerHTML = html;
            }
            btnNext.addEventListener('click', () => {
                if (validateStep(currentStep)) {
                    goToStep(currentStep + 1);
                }
            });

            btnPrev.addEventListener('click', () => {
                if (currentStep > 1) goToStep(currentStep - 1);
            });

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                // jika user menekan Enter di input sebelum step terakhir, arahkan ke step berikutnya
                if (currentStep < totalSteps) {
                    if (validateStep(currentStep)) {
                        goToStep(currentStep + 1);
                    }
                    return;
                }

                // validasi step terakhir
                if (validateStep(currentStep)) {
                    const cardBody = document.querySelector('.form-card-body');
                    cardBody.innerHTML = `
                        <div class="text-center py-5">
                            <div class="success-icon mb-3 text-success"><i class="bi bi-check-circle-fill"></i></div>
                             <h3 class="fw-bold mb-2">Pendaftaran Berhasil!</h3>
                            <p class="text-muted">Terima kasih! Tim kami akan menghubungi Anda melalui WhatsApp/Email untuk konfirmasi jadwal sesi konsultasi.</p>
                            <a href="index.html" class="btn btn-primary btn-hubungi mt-3">Kembali ke Beranda</a>
                        </div>
                    `;
                }
            });

            form.addEventListener('input', (e) => {
                if (e.target.classList.contains('is-invalid')) {
                    e.target.classList.remove('is-invalid');
                }
            });
            form.addEventListener('change', (e) => {
                if (e.target.type === 'radio' && e.target.closest('.question-card')) {
                    e.target.closest('.question-card').style.borderColor = '#e8ecf1';
                }
            });

            // auto-format WhatsApp number (hanya angka setelah +62)
            const waInput = document.getElementById('noWhatsapp');
            waInput.addEventListener('input', function (e) {
                // hapus semua karakter non-digit
                let val = this.value.replace(/\D/g, '');

                // mengabaikan user jika mengetik +62 atau 0
                if (val.startsWith('62')) {
                    val = val.substring(2);
                } else if (val.startsWith('0')) {
                    val = val.substring(1);
                }

                // Format: nomor wa
                let formatted = '';
                if (val.length > 0) {
                    formatted += val.substring(0, 3);
                }
                if (val.length > 3) {
                    formatted += '-' + val.substring(3, 7);
                }
                if (val.length > 7) {
                    formatted += '-' + val.substring(7, 12);
                }

                this.value = formatted;
            });

            const dateInput = document.getElementById('tanggalKonsultasi');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }
        })();
// akhir script file formulir-pendaftaran.html