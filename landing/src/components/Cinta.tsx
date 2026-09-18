import temario from '@/data/temario.json';

/**
 * Cinta con los títulos de las 17 lecciones desplazándose sin fin.
 *
 * El contenido va duplicado para que el bucle no tenga costura. Es
 * decorativo, así que el duplicado se oculta a los lectores de pantalla.
 */
export default function Cinta() {
  const titulos = temario.map((l) => l.titulo);

  const tira = (oculto: boolean) => (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={oculto || undefined}>
      {titulos.map((t) => (
        <li key={t} className="flex shrink-0 items-center gap-8 text-sm font-medium text-gris">
          <span className="whitespace-nowrap">{t}</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-verde" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="border-b border-navy-borde bg-navy-claro/40 py-4">
      <div className="cinta flex overflow-hidden">
        <div className="cinta-pista flex">
          {tira(false)}
          {tira(true)}
        </div>
      </div>
    </div>
  );
}
