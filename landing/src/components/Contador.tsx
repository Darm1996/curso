'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cuenta desde cero hasta el número, cuando entra en pantalla.
 *
 * Si el visitante pidió menos movimiento, muestra el número final de una vez.
 */
export default function Contador({
  hasta,
  sufijo = '',
  duracion = 1100,
}: {
  hasta: number;
  sufijo?: string;
  duracion?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(hasta);
  const [arrancado, setArrancado] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo || arrancado) return;

    const quietos = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (quietos || typeof IntersectionObserver === 'undefined') return;

    const observador = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observador.disconnect();
      setArrancado(true);

      const inicio = performance.now();
      const paso = (ahora: number) => {
        const avance = Math.min((ahora - inicio) / duracion, 1);
        // Desacelera al final, se siente menos mecánico.
        const suave = 1 - (1 - avance) ** 3;
        setValor(Math.round(hasta * suave));
        if (avance < 1) requestAnimationFrame(paso);
      };
      setValor(0);
      requestAnimationFrame(paso);
    }, { threshold: 0.5 });

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [hasta, duracion, arrancado]);

  return (
    <span ref={ref}>
      {valor}
      {sufijo}
    </span>
  );
}
