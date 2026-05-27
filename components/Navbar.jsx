'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/kalkulator-ipk', label: 'Kalkulator IPK' },
    { href: '/bank-soal', label: 'Bank Soal' },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>

        {/* Bookmark logo box — indented from left, teal, sharp bottom */}
        <Link href="/" className={styles.logoBox} aria-label="Temen.in Beranda">
          <Image
            src="/logo-temenin.png"
            alt="Temen.in Logo"
            width={80}
            height={80}
            className={styles.logoImg}
            priority
          />
        </Link>

        {/* Nav links — NO pipe dividers, generous spacing via padding */}
        <nav className={styles.nav} aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Push CTA to right */}
        <div className={styles.spacer} />

        {/* Orange pill CTA — no glow */}
        <Link
          href="/kalkulator-ipk"
          className={`btn btn-orange ${styles.ctaBtn}`}
          id="nav-cta"
        >
          Mulai Sekarang
        </Link>

        {/* Hamburger (mobile) */}
        <button
          id="menu-toggle"
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kalkulator-ipk"
            className={`btn btn-orange ${styles.mobileCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Mulai Sekarang
          </Link>
        </div>
      )}
    </header>
  );
}
