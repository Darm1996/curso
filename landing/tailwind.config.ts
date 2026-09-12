import type { Config } from 'tailwindcss';

/** Identidad Contave: navy, verde, dorado y gris, igual que el PDF y los carruseles. */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1120', claro: '#141D31', borde: '#1E2A42' },
        verde: '#00E68A',
        dorado: '#F6B101',
        gris: '#94A3B8',
      },
      fontFamily: {
        sans: ['var(--fuente-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        cuadricula:
          'repeating-linear-gradient(0deg, rgba(148,163,184,0.07) 0 1px, transparent 1px 56px), repeating-linear-gradient(90deg, rgba(148,163,184,0.07) 0 1px, transparent 1px 56px)',
      },
      maxWidth: { contenido: '68rem' },
    },
  },
  plugins: [],
};

export default config;
