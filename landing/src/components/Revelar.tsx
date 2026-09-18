'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Envuelve un bloque y lo hace aparecer cuando entra en pantalla.
 *
 * Se revela una sola vez: volver a subir no lo esconde otra vez, que marea.
 * Si el navegador no soporta IntersectionObserver, el contenido se muestra
 * de una vez en vez de quedarse invisible.
 */
export default function Revelar({
  children,
  retraso = 0,
  className = '',
}: {
  children: React.ReactNode;
  /** Milisegundos de espera, para escalonar varios elementos seguidos. */
  retraso?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Red de seguridad: si el observador no dispara por lo que sea, el bloque
    // se muestra igual. Una animación que no ocurre es un detalle; contenido
    // que se queda invisible es la página rota.
    const seguro = setTimeout(() => setVisible(true), 1500);

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          clearTimeout(seguro);
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observador.observe(nodo);
    return () => {
      clearTimeout(seguro);
      observador.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`revelar ${visible ? 'visible' : ''} ${className}`}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
