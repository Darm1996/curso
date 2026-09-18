'use client';

import { useState } from 'react';
import temario from '@/data/temario.json';
import Revelar from './Revelar';

const dosDigitos = (n: number) => String(n).padStart(2, '0');

export default function Temario() {
  const [activa, setActiva] = useState(temario[0].numero);
  const leccion = temario.find((l) => l.numero === activa) ?? temario[0];

  return (
    <section id="temario" className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <Revelar>
          <p className="kicker">El temario</p>
          <h2 className="h2 mt-6 max-w-3xl">
            {temario.length} lecciones. Una por día. Toca cualquiera para ver qué resuelve.
          </h2>
        </Revelar>

        <Revelar retraso={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,24rem)_1fr]">
            {/* Lista de lecciones */}
            <ol className="max-h-[32rem] space-y-1 overflow-y-auto pr-1 lg:max-h-[34rem]">
              {temario.map((l) => {
                const seleccionada = l.numero === activa;
                return (
                  <li key={l.numero}>
                    <button
                      type="button"
                      onClick={() => setActiva(l.numero)}
                      aria-current={seleccionada}
                      className={`w-full rounded-lg border px-4 py-3 text-left transition duration-300 ${
                        seleccionada
                          ? 'border-verde bg-navy-claro'
                          : 'border-transparent bg-navy-claro/40 hover:border-navy-borde hover:bg-navy-claro'
                      }`}
                    >
                      <span className="flex items-baseline gap-3">
                        <span
                          className={`text-sm font-bold transition-colors ${
                            seleccionada ? 'text-verde' : 'text-gris'
                          }`}
                        >
                          {dosDigitos(l.numero)}
                        </span>
                        <span className="flex-1 text-sm font-medium leading-snug">{l.titulo}</span>
                        <span className="text-xs font-bold text-gris">{l.duracion}′</span>
                      </span>

                      {/* En teléfono el detalle se abre aquí mismo. */}
                      {seleccionada && (
                        <span className="mt-3 block text-sm leading-relaxed text-gris lg:hidden">
                          {l.resumen}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Panel de detalle, solo en pantallas grandes */}
            <div className="hidden lg:block">
              <article
                key={leccion.numero}
                className="entra h-full rounded-lg border border-navy-borde bg-navy-claro p-8"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-6xl font-bold leading-none text-verde">
                    {dosDigitos(leccion.numero)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="border border-dorado px-3 py-1 text-xs font-bold text-dorado">
                      {leccion.duracion} min
                    </span>
                    {leccion.entregable && (
                      <span className="border border-verde px-3 py-1 text-xs font-bold text-verde">
                        Con entregable
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-6 text-3xl font-bold leading-tight tracking-tight">
                  {leccion.titulo}
                </h3>

                <p className="mt-6 text-base leading-relaxed text-gris">{leccion.resumen}</p>

                <p className="mt-8 border-t border-navy-borde pt-6 text-sm text-gris">
                  Lección {leccion.numero} de {temario.length}
                </p>
              </article>
            </div>
          </div>
        </Revelar>

        <Revelar retraso={200}>
          <p className="mt-8 text-sm text-gris">
            Más el Módulo 0 con las cuatro reglas de oro, la evaluación final de 8 entregables y el
            anexo con los {temario.length} prompts maestros y los {temario.length * 3} de
            seguimiento.
          </p>
        </Revelar>
      </div>
    </section>
  );
}
