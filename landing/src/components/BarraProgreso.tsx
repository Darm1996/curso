'use client';

import { useEffect, useState } from 'react';

/** Barra fina arriba que marca cuánto llevas leído de la página. */
export default function BarraProgreso() {
  const [avance, setAvance] = useState(0);

  useEffect(() => {
    const calcular = () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      setAvance(alto > 0 ? (window.scrollY / alto) * 100 : 0);
    };
    calcular();
    window.addEventListener('scroll', calcular, { passive: true });
    window.addEventListener('resize', calcular);
    return () => {
      window.removeEventListener('scroll', calcular);
      window.removeEventListener('resize', calcular);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent" aria-hidden>
      <div
        className="h-full bg-verde transition-[width] duration-150 ease-out"
        style={{ width: `${avance}%` }}
      />
    </div>
  );
}
