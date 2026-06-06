'use client';

import { useState, useMemo } from 'react';
import bankSoalRaw from '@/data/bankSoal.json';

const bankSoalData = bankSoalRaw.map((soal, index) => ({
  id: soal.id || index + 1,
  ...soal,
  kunciJawaban: soal.kunciJawaban || ''
}));

const tahunList = [...new Set(bankSoalData.map(d => d.tahun).filter(Boolean))].sort((a, b) => parseInt(b) - parseInt(a));
import SoalCard from '@/components/SoalCard';
import styles from './page.module.css';

export default function BankSoalPage() {
  const [search, setSearch] = useState('');
  const [filterTipe, setFilterTipe] = useState('Semua');
  const [filterTahun, setFilterTahun] = useState('Semua');

  const filtered = useMemo(() => {
    const getExamTypeScore = (soal) => {
      const judulLower = (soal.judul || '').toLowerCase();
      if (judulLower.includes('uas') || judulLower.includes('akhir')) return 2;
      if (judulLower.includes('uts') || judulLower.includes('tengah')) return 1;
      return 0;
    };

    return bankSoalData
      .filter(soal => {
        const matchSearch = !search ||
          soal.judul.toLowerCase().includes(search.toLowerCase()) ||
          soal.mataKuliah.toLowerCase().includes(search.toLowerCase()) ||
          soal.universitas.toLowerCase().includes(search.toLowerCase());
        const matchTipe = filterTipe === 'Semua' ||
          (filterTipe === 'UTS' && soal.judul.toLowerCase().includes('uts')) ||
          (filterTipe === 'UAS' && soal.judul.toLowerCase().includes('uas'));
        const matchTahun = filterTahun === 'Semua' || soal.tahun === filterTahun;
        return matchSearch && matchTipe && matchTahun;
      })
      .sort((a, b) => {
        const yearA = parseInt(a.tahun) || 0;
        const yearB = parseInt(b.tahun) || 0;
        if (yearB !== yearA) {
          return yearB - yearA; // Newest year first
        }
        const scoreA = getExamTypeScore(a);
        const scoreB = getExamTypeScore(b);
        return scoreB - scoreA; // UAS above UTS
      });
  }, [search, filterTipe, filterTahun]);

  const resetFilters = () => {
    setSearch('');
    setFilterTipe('Semua');
    setFilterTahun('Semua');
  };

  return (
    <div className={styles.page}>

      {/* ===== HERO / KONTRIBUSI SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Bank Soal Ujian
            </h1>
            <p className={styles.heroDesc}>
              Kumpulan soal ujian dari berbagai universitas di Indonesia.
              Dikurasi dan dikontribusikan oleh sesama mahasiswa.
            </p>
          </div>

          <div className={styles.heroCtaBox}>
            <div className={styles.heroCtaIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h3 className={styles.heroCtaTitle}>Punya soal ujian?</h3>
            <p className={styles.heroCtaDesc}>
              Bantu ribuan mahasiswa lain dengan berbagi soal ujianmu.
              Upload mudah lewat Google Form kami.
            </p>
            <a
              href="https://forms.gle/wBKWh6PhT8j2zc6s9"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.heroCtaBtn}`}
              id="kontribusi-soal-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Kontribusi Soal
            </a>
          </div>
        </div>
      </section>

      {/* ===== FILTER & SEARCH ===== */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterInner}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className={`form-input ${styles.searchInput}`}
                placeholder="Cari soal, mata kuliah, atau universitas..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="search-soal"
              />
              {search && (
                <button className={styles.searchClear} onClick={() => setSearch('')} aria-label="Clear search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filters */}
            <div className={styles.filters}>


              <select
                className={`form-select ${styles.filterSelect}`}
                value={filterTipe}
                onChange={e => setFilterTipe(e.target.value)}
                id="filter-tipe"
              >
                <option value="Semua">Semua Tipe (UTS/UAS)</option>
                <option value="UTS">UTS</option>
                <option value="UAS">UAS</option>
              </select>

              <select
                className={`form-select ${styles.filterSelect}`}
                value={filterTahun}
                onChange={e => setFilterTahun(e.target.value)}
                id="filter-tahun"
              >
                <option value="Semua">Semua Tahun</option>
                {tahunList.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {(search || filterTipe !== 'Semua' || filterTahun !== 'Semua') && (
                <button className="btn btn-outline btn-sm" onClick={resetFilters} id="reset-filter">
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          <p className={styles.resultCount}>
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{bankSoalData.length}</strong> soal
          </p>
        </div>
      </div>

      {/* ===== CARD GRID ===== */}
      <section className={`section ${styles.gridSection}`}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((soal, i) => (
                <div key={soal.id} className={styles.gridItem} style={{ animationDelay: `${i * 0.07}s` }}>
                  <SoalCard soal={soal} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3>Soal tidak ditemukan</h3>
              <p>Coba ubah kata kunci atau filter pencarian kamu.</p>
              <button className="btn btn-primary btn-sm" onClick={resetFilters} id="empty-reset">
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
