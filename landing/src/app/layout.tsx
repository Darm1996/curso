import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--fuente-grotesk',
  display: 'swap',
});

const TITULO = 'Certificado Contave — Claude para Contadores';
const DESCRIPCION =
  'Curso de 17 lecciones, 15 minutos al día, para que un contador venezolano use inteligencia artificial en su trabajo diario. Con SENIAT, bolívares, divisas e inflación adentro.';

const SITIO = process.env.NEXT_PUBLIC_SITIO_URL;

export const metadata: Metadata = {
  ...(SITIO ? { metadataBase: new URL(SITIO) } : {}),
  title: TITULO,
  description: DESCRIPCION,
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    type: 'website',
    locale: 'es_VE',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-VE" className={grotesk.variable}>
      <body className="bg-navy bg-cuadricula">{children}</body>
    </html>
  );
}
