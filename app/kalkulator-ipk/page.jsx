'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

// Generate unique id
const genId = () => Math.random().toString(36).slice(2, 9);

// Empty row template
const emptyRow = (id = null) => ({ id: id || genId(), mataKuliah: '', nilai: '', sks: '' });

// LS Keys
const LS_ROWS = 'temenin_ip_rows';
const LS_CUMLAUD = 'temenin_cumlaud';

export default function KalkulatorIPKPage() {
  // ===== FITUR 1: IP SEMESTER =====
  const [rows, setRows] = useState([emptyRow('row-1')]);
  const [ipResult, setIpResult] = useState(null);

  // Load rows from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_ROWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setRows(parsed);
      }
    } catch { }
  }, []);

  // Save rows to localStorage on change
  useEffect(() => {
    localStorage.setItem(LS_ROWS, JSON.stringify(rows));
  }, [rows]);

  const addRow = () => setRows(prev => [...prev, emptyRow()]);

  const removeRow = (id) => {
    if (rows.length === 1) return;
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const updateRow = (id, field, value) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const hitungIP = () => {
    let totalBobot = 0;
    let totalSks = 0;

    for (const row of rows) {
      const sks = parseFloat(row.sks);
      const nilai = parseFloat(row.nilai);
      if (!row.mataKuliah.trim() || isNaN(sks) || sks <= 0 || isNaN(nilai) || nilai < 0 || nilai > 4) continue;
      totalBobot += nilai * sks;
      totalSks += sks;
    }

    if (totalSks === 0) {
      setIpResult({ error: 'Mohon isi data mata kuliah, nilai, dan SKS dengan benar.' });
      return;
    }

    const ip = totalBobot / totalSks;
    setIpResult({ ip: ip.toFixed(2), totalSks });
  };

  const hapusDataIP = () => {
    setRows([emptyRow()]);
    setIpResult(null);
    localStorage.removeItem(LS_ROWS);
  };

  // ===== FITUR 2: CUM LAUDE =====
  const [cumLaud, setCumLaud] = useState({
    ipkSementara: '',
    semesterLewati: '',
    totalSks: '',
  });
  const [cumLaudResult, setCumLaudResult] = useState(null);

  // Load cum laude data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_CUMLAUD);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCumLaud(prev => ({ ...prev, ...parsed }));
      }
    } catch { }
  }, []);

  // Save cum laude data to localStorage
  useEffect(() => {
    localStorage.setItem(LS_CUMLAUD, JSON.stringify(cumLaud));
  }, [cumLaud]);

  const updateCumLaud = (field, value) => {
    setCumLaud(prev => ({ ...prev, [field]: value }));
  };

  const hitungCumLaud = () => {
    const ipk = parseFloat(cumLaud.ipkSementara);
    const semLewati = parseInt(cumLaud.semesterLewati, 10);

    if (isNaN(ipk) || isNaN(semLewati)) {
      setCumLaudResult({ error: 'Mohon isi semua field dengan benar.' });
      return;
    }
    if (ipk < 0 || ipk > 4) {
      setCumLaudResult({ error: 'IPK harus bernilai antara 0 dan 4.' });
      return;
    }
    if (semLewati < 1 || semLewati > 8) {
      setCumLaudResult({ error: 'Jumlah semester harus antara 1 dan 8.' });
      return;
    }
    if (semLewati >= 8) {
      // Already at or past semester 8
      if (ipk >= 3.5) {
        setCumLaudResult({ status: 'already_yes', ipk });
      } else {
        setCumLaudResult({ status: 'already_no', ipk });
      }
      return;
    }

    const sisaSemester = 8 - semLewati;
    // Formula: (3.5 * 8 - ipk * semLewati) / sisaSemester
    const targetTotal = 3.5 * 8;
    const sudahDapat = ipk * semLewati;
    const rataPerSem = (targetTotal - sudahDapat) / sisaSemester;

    if (rataPerSem > 4) {
      setCumLaudResult({ status: 'impossible', rataPerSem: rataPerSem.toFixed(2), sisaSemester });
    } else {
      setCumLaudResult({ status: 'possible', rataPerSem: rataPerSem.toFixed(2), sisaSemester });
    }
  };

  const hapusDataCumLaud = () => {
    setCumLaud({ ipkSementara: '', semesterLewati: '', totalSks: '' });
    setCumLaudResult(null);
    localStorage.removeItem(LS_CUMLAUD);
  };

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={`container ${styles.pageHeaderInner}`}>
          <h1 className={styles.pageTitle}>Kalkulator IPK</h1>
          <p className={styles.pageDesc}>
            Hitung IP semester ini dan cek peluang cum laudemu — semuanya dalam satu halaman.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>

          {/* ===========================
              FITUR 1: IP SEMESTER
              =========================== */}
          <section className={styles.calcSection} id="ip-semester">
            <div className={styles.sectionHead}>
              <div className={styles.sectionIcon} style={{ background: 'var(--primary-xlight)', color: 'var(--primary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Kalkulator IP Semester</h2>
                <p className={styles.sectionDesc}>Masukkan mata kuliah, nilai, dan SKS kamu</p>
              </div>
            </div>

            {/* Table Header */}
            <div className={styles.tableHeader}>
              <span className={styles.colMataKuliah}>Mata Kuliah</span>
              <span className={styles.colNilai}>Nilai</span>
              <span className={styles.colSks}>SKS</span>
              <span className={styles.colBobot}>Bobot</span>
              <span className={styles.colAction}></span>
            </div>

            {/* Rows */}
            <div className={styles.rowList}>
              {rows.map((row, index) => (
                <div key={row.id} className={styles.row} id={`row-${row.id}`}>
                  <div className={styles.rowNum}>{index + 1}</div>
                  <input
                    type="text"
                    className={`form-input ${styles.colMataKuliah}`}
                    placeholder="mis. Kalkulus II"
                    value={row.mataKuliah}
                    onChange={e => updateRow(row.id, 'mataKuliah', e.target.value)}
                    id={`mk-${row.id}`}
                  />
                  <input
                    type="number"
                    className={`form-input ${styles.colNilai}`}
                    placeholder="4.0"
                    min="0"
                    max="4"
                    step="0.01"
                    value={row.nilai}
                    onChange={e => updateRow(row.id, 'nilai', e.target.value)}
                    id={`nilai-${row.id}`}
                  />
                  <input
                    type="number"
                    className={`form-input ${styles.colSks}`}
                    placeholder="2"
                    min="1"
                    max="8"
                    value={row.sks}
                    onChange={e => updateRow(row.id, 'sks', e.target.value)}
                    id={`sks-${row.id}`}
                  />
                  <div className={`${styles.colBobot} ${styles.bobotDisplay}`}>
                    {row.nilai && row.sks && !isNaN(parseFloat(row.nilai)) && !isNaN(parseFloat(row.sks))
                      ? (parseFloat(row.nilai) * parseFloat(row.sks)).toFixed(1)
                      : '—'
                    }
                  </div>
                  <button
                    className={`btn btn-danger btn-sm ${styles.colAction}`}
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                    aria-label={`Hapus baris ${index + 1}`}
                    id={`hapus-row-${row.id}`}
                    title="Hapus baris"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Row Button */}
            <button
              className={styles.addRowBtn}
              onClick={addRow}
              id="tambah-mata-kuliah"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Tambah Mata Kuliah
            </button>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className="btn btn-primary"
                onClick={hitungIP}
                id="hitung-ip"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                Hitung IP Semester
              </button>
              <button
                className="btn btn-danger"
                onClick={hapusDataIP}
                id="hapus-data-ip"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                Hapus Data
              </button>
            </div>

            {/* IP Result */}
            {ipResult && (
              <div className={`result-box ${ipResult.error ? 'warning' : 'info'}`} id="ip-result">
                {ipResult.error ? (
                  <p style={{ fontWeight: 500 }}>{ipResult.error}</p>
                ) : (
                  <>
                    <p className="result-label">IP Semester Kamu</p>
                    <p className="result-value">{ipResult.ip}</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', opacity: 0.8 }}>
                      Total {ipResult.totalSks} SKS diambil semester ini
                    </p>
                    <p style={{ fontSize: '0.8125rem', marginTop: '0.5rem', opacity: 0.7 }}>
                      {ipResult.ip >= 3.7 ? '🌟 Luar biasa! Pertahankan terus!' :
                        ipResult.ip >= 3.3 ? '👍 Bagus! Terus tingkatkan!' :
                          ipResult.ip >= 3.0 ? '💪 Lumayan! Masih bisa lebih baik lagi.' :
                            '📚 Yuk semangat belajar lebih giat!'}
                    </p>
                  </>
                )}
              </div>
            )}
          </section>

          <hr className="divider" style={{ margin: '2.5rem 0' }} />

          {/* ===========================
              FITUR 2: CUM LAUDE
              =========================== */}
          <section className={styles.calcSection} id="cumlaud">
            <div className={styles.sectionHead}>
              <div className={styles.sectionIcon} style={{ background: '#FEF3C7', color: '#D97706' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Cek Peluang Cum Laude</h2>
                <p className={styles.sectionDesc}>Masukkan data IPK sementaramu untuk melihat peluangmu</p>
              </div>
            </div>

            {/* Info box */}
            <div className={styles.infoBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--primary)' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>
                Syarat cum laude: <strong>IPK ≥ 3.50</strong> dan lulus dalam maksimal <strong>8 semester (4 tahun)</strong>.
                Kalkulator ini menghitung IP rata-rata yang harus kamu capai per semester hingga semester 8.
              </p>
            </div>

            {/* Form */}
            <div className={styles.cumLaudForm}>
              <div className="form-group">
                <label className="form-label" htmlFor="ipk-sementara">
                  IPK Sementara
                  <span className={styles.fieldHint}> (rata-rata IPK yang sudah kamu capai)</span>
                </label>
                <input
                  id="ipk-sementara"
                  type="number"
                  className="form-input"
                  placeholder="mis. 3.45"
                  min="0"
                  max="4"
                  step="0.01"
                  value={cumLaud.ipkSementara}
                  onChange={e => updateCumLaud('ipkSementara', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="semester-lewati">
                  Semester yang Sudah Dilewati
                  <span className={styles.fieldHint}> (semester berapa sekarang)</span>
                </label>
                <select
                  id="semester-lewati"
                  className="form-select"
                  value={cumLaud.semesterLewati}
                  onChange={e => updateCumLaud('semesterLewati', e.target.value)}
                >
                  <option value="">-- Pilih Semester --</option>
                  {[1, 2, 3, 4, 5, 6, 7].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="total-sks">
                  Total SKS Sudah Diselesaikan
                  <span className={styles.fieldHint}> (opsional, untuk referensi)</span>
                </label>
                <input
                  id="total-sks"
                  type="number"
                  className="form-input"
                  placeholder="mis. 72"
                  min="0"
                  value={cumLaud.totalSks}
                  onChange={e => updateCumLaud('totalSks', e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className="btn btn-primary"
                onClick={hitungCumLaud}
                id="hitung-cumlaud"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Cek Peluang Cum Laude
              </button>
              <button
                className="btn btn-danger"
                onClick={hapusDataCumLaud}
                id="hapus-data-cumlaud"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                Hapus Data
              </button>
            </div>

            {/* Cum Laude Result */}
            {cumLaudResult && (
              <div
                className={`result-box ${cumLaudResult.error ? 'warning' :
                    cumLaudResult.status === 'possible' || cumLaudResult.status === 'already_yes' ? 'success' : 'error'
                  }`}
                id="cumlaud-result"
              >
                {cumLaudResult.error ? (
                  <p style={{ fontWeight: 500 }}>{cumLaudResult.error}</p>
                ) : cumLaudResult.status === 'already_yes' ? (
                  <>
                    <p className="result-label">Status Cum Laude</p>
                    <p className="result-value" style={{ fontSize: '1.75rem' }}>🎓 Selamat!</p>
                    <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>
                      IPK kamu {cumLaudResult.ipk} sudah memenuhi syarat cum laude! Semangat mempertahankannya!
                    </p>
                  </>
                ) : cumLaudResult.status === 'already_no' ? (
                  <>
                    <p className="result-label">Status Cum Laude</p>
                    <p style={{ marginTop: '0.35rem', fontWeight: 500 }}>
                      Sayangnya IPK akhirmu {cumLaudResult.ipk} berada di bawah syarat cum laude (3.50). Tetap semangat! 💪
                    </p>
                  </>
                ) : cumLaudResult.status === 'impossible' ? (
                  <>
                    <p className="result-label">Status Cum Laude</p>
                    <p style={{ marginTop: '0.35rem', fontWeight: 500 }}>
                      Sayangnya, untuk bisa cum laude kamu perlu IP rata-rata <strong>{cumLaudResult.rataPerSem}</strong>{' '}
                      per semester — yang tidak mungkin tercapai (di atas 4.0).
                      Tetap semangat! Performa terbaik tetap bernilai. 💪
                    </p>
                  </>
                ) : (
                  <>
                    <p className="result-label">🎯 Kamu masih berpeluang lulus Cum Laude!</p>
                    <p className="result-value">{cumLaudResult.rataPerSem}</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', fontWeight: 500 }}>
                      IP rata-rata per semester yang harus kamu raih
                    </p>
                    <p style={{ fontSize: '0.8375rem', marginTop: '0.5rem', opacity: 0.85 }}>
                      Jika kamu berhasil memperoleh IP sebesar <strong>{cumLaudResult.rataPerSem}</strong> per semester
                      selama <strong>{cumLaudResult.sisaSemester} semester ke depan</strong> hingga semester 8,
                      kamu bisa lulus dengan predikat Cum Laude! 🌟
                    </p>
                  </>
                )}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
