import Link from 'next/link';
import styles from './SoalCard.module.css';

const categoryColors = {
  'Wajib': 'tag-blue',
  'Pilihan': 'tag-purple',
};

export default function SoalCard({ soal }) {
  const { judul, universitas, mataKuliah, kategori, tahun, semester, jurusan, linkSoal, kontributor, kunciJawaban } = soal;

  const judulLower = judul.toLowerCase();
  const isUTS = judulLower.includes('uts') || judulLower.includes('tengah');
  const isUAS = judulLower.includes('uas') || judulLower.includes('akhir');
  const jenisUjian = isUTS ? 'UTS' : isUAS ? 'UAS' : 'Ujian';

  return (
    <article className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.tags}>
          <span className="tag tag-dark" style={{ background: isUTS ? '#e0f2fe' : '#f3e8ff', color: isUTS ? '#0369a1' : '#7e22ce' }}>
            {jenisUjian}
          </span>
          <span className={`tag ${categoryColors[kategori] || 'tag-dark'}`}>
            {kategori}
          </span>
          <span className="tag tag-dark">
            {semester} {tahun}
          </span>
        </div>
        <h3 className={styles.title}>{judul}</h3>
      </div>

      {/* Meta */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>{universitas}</span>
        </div>
        <div className={styles.metaItem}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
          <span>{mataKuliah}</span>
        </div>
        <div className={styles.metaItem}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>{jurusan}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.contributor}>
          Thanks to <strong>{kontributor.nama}</strong>{' '}
          <a
            href={`https://instagram.com/${kontributor.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igLink}
            id={`ig-${soal.id}`}
          >
            {kontributor.instagram}
          </a>
        </p>
        <div className={styles.actions}>
          {kunciJawaban ? (
            <a
              href={kunciJawaban}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline btn-sm ${styles.kunciBtn}`}
              id={`kunci-soal-${soal.id}`}
            >
              Kunci
            </a>
          ) : (
            <button
              disabled
              className={`btn btn-outline btn-sm ${styles.kunciBtn}`}
              id={`kunci-soal-${soal.id}`}
            >
              Kunci
            </button>
          )}
          <a
            href={linkSoal}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary btn-sm ${styles.lihatBtn}`}
            id={`lihat-soal-${soal.id}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Lihat
          </a>
        </div>
      </div>
    </article>
  );
}
