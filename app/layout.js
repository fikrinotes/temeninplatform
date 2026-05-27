import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'Temen.in — Teman Belajar Mahasiswa Indonesia',
  description: 'Platform tools gratis untuk mahasiswa: kalkulator IPK, cek peluang cum laude, dan bank soal dari berbagai universitas di Indonesia.',
  keywords: 'kalkulator ipk, bank soal, cum laude, mahasiswa, temen.in',
  openGraph: {
    title: 'Temen.in — Teman Belajar Mahasiswa Indonesia',
    description: 'Tools gratis untuk mahasiswa: kalkulator IPK, cek cum laude, dan bank soal.',
    url: 'https://temenin.fikrinotes.com',
    siteName: 'Temen.in',
    images: [
      {
        url: '/logo-temenin.png',
        width: 1200,
        height: 630,
        alt: 'Temen.in Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temen.in — Teman Belajar Mahasiswa Indonesia',
    description: 'Tools gratis untuk mahasiswa: kalkulator IPK, cek cum laude, dan bank soal.',
    images: ['/logo-temenin.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body>
        <Navbar />
        <main style={{ paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
