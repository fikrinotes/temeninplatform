import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* =====================================================
          HERO SECTION
          Dark charcoal split layout.
          NO vertical center line (removed per user request).
          Left: headline — "Temen.in" bold, tagline normal weight.
          Right: teal blob + gambar1.svg illustration.
          ===================================================== */}
      <section className={styles.hero} aria-label="Hero">

        {/* ===== LEFT HALF ===== */}
        <div className={styles.heroLeft}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {/* "Temen.in –" — BOLD (font-weight: 800) */}
              <span className={styles.heroLine1}>Temen.in –</span>

              {/* Tagline — normal weight (font-weight: 400) */}
              <span className={styles.heroLine2}>
                Dapat{' '}
                <span className={styles.highlight}>Teman,</span>
              </span>

              <span className={styles.heroLine3}>
                Dapat{' '}
                <span className={styles.highlight}>Ilmu</span>
              </span>
            </h1>

            <div className={styles.heroCtas}>
              <Link
                href="/kalkulator-ipk"
                className="btn btn-orange btn-lg"
                id="hero-cta-kalkulator"
              >
                Hitung IPK Sekarang
              </Link>
              <Link
                href="/bank-soal"
                className={`btn btn-lg ${styles.heroBtnOutline}`}
                id="hero-cta-banksoal"
              >
                Lihat Bank Soal
              </Link>
            </div>
          </div>
        </div>

        {/* ===== RIGHT HALF ===== */}
        <div className={styles.heroRight}>
          <div className={styles.blobContainer}>
            {/* Organic teal blob */}
            <div className={styles.blob} />
            {/* gambar1.svg illustration */}
            <div className={styles.illustrationWrap}>
              {/* Use regular img for SVG (no optimization needed) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gambar1.svg"
                alt="Mahasiswa belajar bersama"
                className={styles.illustration}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT SECTION — Apa Itu temen.in?
          Mint background. NO vertical center line.
          Staggered cards: white (left), teal (right), dark (left).
          Underline below title: teal #00ADB5.
          ===================================================== */}
      <section className={styles.about} id="tentang" aria-label="Tentang Temen.in">

        <div className="container">

          {/* Header */}
          <div className={styles.aboutHeader}>
            <h2 className={styles.aboutTitle}>Apa Itu temen.in?</h2>
            {/* Underline — teal #00ADB5 per user request */}
            <div className={styles.aboutUnderline} />
            <p className={styles.aboutDesc}>
              <strong>Temen.in</strong> adalah platform digital yang dibangun untuk mendukung aktivitas akademik mahasiswa — mulai dari{' '}
              <span className={styles.peachMark}>Kelas Tutorial, Kalkulator IPK,
                hingga bank soal!</span>{' '}
            </p>
          </div>

          {/* Staggered card stack */}
          <div className={styles.cardStack}>

            {/* Card 1 — White, LEFT */}
            <div className={`${styles.featureCard} ${styles.cardWhite} ${styles.cardLeft}`}>
              <span className={styles.cardIcon}>⏱️</span>
              <div>
                <h3 className={styles.cardTitle}>Akses yang Cepat dan Mudah</h3>
                <p className={styles.cardDesc}>
                  Temen.in menyediakan akses yang mudah untuk tools akademikmu.
                  Kamu bisa langsung hitung IPK tanpa perlu daftar, hanya dalam beberapa detik!
                </p>
              </div>
            </div>

            {/* Card 2 — Teal, RIGHT */}
            <div className={`${styles.featureCard} ${styles.cardTeal} ${styles.cardRight}`}>
              <span className={styles.cardIcon}>💸</span>
              <div>
                <h3 className={`${styles.cardTitle} ${styles.lightText}`}>100% Gratis Selamanya</h3>
                <p className={`${styles.cardDesc} ${styles.lightDescText}`}>
                  Butuh tools belajar tapi khawatir berbayar? di temen.in,
                  kamu bisa mengakses semua fitur dengan harga yang lebih murah dari secangkir kopi —
                  alias <strong>gratis sepenuhnya!</strong>. Satu-satunya hal yang perlu kamu bayar adalah kelas tutor untuk materi kuliah.
                </p>
              </div>
            </div>

            {/* Card 3 — Dark, LEFT */}
            <div className={`${styles.featureCard} ${styles.cardDark} ${styles.cardLeft}`}>
              <span className={styles.cardIcon}>📚</span>
              <div>
                <h3 className={`${styles.cardTitle} ${styles.lightText}`}>Bank Soal Terkurasi</h3>
                <p className={`${styles.cardDesc} ${styles.lightDescText}`}>
                  Khawatir materinya ga relevan dengan perkuliahanmu? ga lagi!
                  di temen.in, bank soalnya dikontribusikan oleh kakak-kakak
                  yang telah mengambil mata kuliah yang sama, jadi sangat relevan!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA STRIP — cream background
          ===================================================== */}
      <section className={styles.ctaStrip} aria-label="Kontribusi Bank Soal">
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Butuh Kelas Tutor Materi Kuliah? </h2>
            <p className={styles.ctaDesc}>
              Hubungi kami jika kamu membutuhkan kelas tutor untuk materi perkuliahanmu, tersedia secara privat ataupun berkelompok.
            </p>
          </div>
          <a
            href="https://www.instagram.com/temeninplatform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            id="cta-kontribusi"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
