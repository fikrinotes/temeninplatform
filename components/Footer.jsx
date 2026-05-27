import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Left: Brand */}
        <div className={styles.brand}>
          {/* Logo box — teal rectangle, sharp corners (NO border-radius) */}
          <div className={styles.logoBox}>
            <Image
              src="/logo-temenin.png"
              alt="Temen.in Logo"
              width={80}
              height={80}
              className={styles.logoImg}
            />
            {/* "Temen.in" text in dark charcoal #393E46 on teal background */}
            <span className={styles.logoText}>Temen.in</span>
          </div>

          {/* Italic tagline */}
          <p className={styles.tagline}>
            Dapat teman, dapat ilmu
          </p>
        </div>

        {/* Right: Links */}
        <div className={styles.links}>
          {/* Column 1 */}
          <div className={styles.linkCol}>
            <Link href="/" className={styles.link}>Beranda</Link>
            <Link href="/kalkulator-ipk" className={styles.link}>Kalkulator IPK</Link>
            <Link href="/bank-soal" className={styles.link}>Bank Soal</Link>
          </div>

          {/* Column 2 */}
          <div className={styles.linkCol}>
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Kontribusi Soal
            </a>
            <a
              href="https://www.instagram.com/temeninplatform"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Partner dengan Kami
            </a>
            <a href="https://www.instagram.com/temeninplatform" className={styles.link}>Kontak</a>
          </div>

          {/* Instagram */}
          <div className={styles.social}>
            <a
              href="https://www.instagram.com/temeninplatform"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igLink}
              id="footer-instagram"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @temeninplatform
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <p suppressHydrationWarning>© temen.in, {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
