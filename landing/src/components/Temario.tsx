import temario from '@/data/temario.json';

export default function Temario() {
  return (
    <section id="temario" className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <p className="kicker">El temario</p>
        <h2 className="h2 mt-6 max-w-3xl">
          {temario.length} lecciones. Una por día. Cada una termina con algo que puedes usar
          el lunes.
        </h2>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-navy-borde bg-navy-borde sm:grid-cols-2">
          {temario.map((l) => (
            <li
              key={l.numero}
              className={`bg-navy-claro p-6 ${
                // Con 17 lecciones la última queda sola en la rejilla de dos columnas.
                l.numero === temario.length && temario.length % 2 === 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-bold text-verde">
                  {String(l.numero).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gris">
                  {l.duracion} min
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug">{l.titulo}</h3>
              {l.entregable && (
                <span className="mt-3 inline-block border border-dorado px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-dorado">
                  Con entregable
                </span>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-gris">
          Más el Módulo 0 con las cuatro reglas de oro, la evaluación final de 8 entregables
          y el anexo con los {temario.length} prompts maestros y los {temario.length * 3} de
          seguimiento.
        </p>
      </div>
    </section>
  );
}
