const ES = [
  'Contadores públicos con cartera de clientes que quieren dejar de regalar horas.',
  'Asistentes contables que hacen el trabajo mecánico y quieren pasar al criterio.',
  'Administradores de PYME que llevan sus propios números y no tienen equipo.',
  'Gente con nivel técnico contable alto y nivel de inteligencia artificial cero.',
];

const NO_ES = [
  'Quien busca que la herramienta firme por él. Acá firmas tú, siempre.',
  'Quien espera que el curso le entregue la normativa vigente al día. Esa la verificas en fuente oficial.',
  'Quien no puede apartar quince minutos diarios durante tres semanas.',
  'Quien trabaja fuera de Venezuela. Todo el curso está construido sobre nuestro marco normativo.',
];

export default function ParaQuien() {
  return (
    <section className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <p className="kicker">Antes de comprar</p>
        <h2 className="h2 mt-6">Para quién es y para quién no</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="tarjeta border-l-4 border-l-verde">
            <h3 className="text-lg font-bold text-verde">Es para ti si</h3>
            <ul className="mt-6 space-y-4">
              {ES.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-gris">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-verde" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="tarjeta border-l-4 border-l-dorado">
            <h3 className="text-lg font-bold text-dorado">No es para ti si</h3>
            <ul className="mt-6 space-y-4">
              {NO_ES.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-gris">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-dorado" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
