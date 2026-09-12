const BLOQUES = [
  {
    titulo: 'El problema no es el que crees',
    parrafos: [
      'La pregunta que todo el mundo hace es si la inteligencia artificial va a reemplazar al contador. Esa es la pregunta equivocada, y por eso tranquiliza.',
      'La herramienta no firma. No responde ante el SENIAT. No asume responsabilidad profesional. El problema real es otro y es más incómodo: no compites contra la herramienta, compites contra el colega que ya la está usando.',
    ],
  },
  {
    titulo: 'La cuenta que hay que hacer',
    parrafos: [
      'Dos contadores con la misma cartera y la misma formación. Uno arma el análisis financiero de un cliente en media mañana. El otro lo arma en quince minutos y dedica el resto a conversar con el dueño sobre lo que encontró.',
      'A los seis meses no tienen la misma capacidad instalada. Y cuando el cliente compara, no compara tecnología. Compara quién le respondió primero y quién le explicó mejor.',
    ],
  },
  {
    titulo: 'Por qué acá pesa más',
    parrafos: [
      'El contador venezolano carga un peso extra. Contabilidad en dos monedas, reexpresión por inflación, tres capas de cumplimiento que no se hablan entre ellas y normativa que cambia por Gaceta sin aviso.',
      'Todo eso consume horas mecánicas, no criterio profesional. Y justo ese trabajo es el que se automatiza bien. Tenemos más que ganar que casi cualquiera, y somos de los que menos ha empezado.',
    ],
  },
  {
    titulo: 'Por qué intensivo y no un diplomado',
    parrafos: [
      'Cuarenta horas de video las empieza mucha gente y las acaba casi nadie. Compiten contra el cierre, contra la declaración y contra el cliente que llama.',
      'Diecisiete días de quince minutos sí caben. Y hay una razón de fondo: quince minutos alcanzan para resolver una tarea real, no para entender una teoría. La velocidad no es un truco de venta. Es lo que hace que el curso se termine.',
    ],
  },
];

export default function PorQueAhora() {
  return (
    <section id="por-que" className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <p className="kicker-oro">Por qué ahora</p>
        <h2 className="h2 mt-6 max-w-3xl">
          Quedarse quieto también es una decisión, y tiene precio.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-navy-borde bg-navy-borde sm:grid-cols-2">
          {BLOQUES.map((b) => (
            <article key={b.titulo} className="bg-navy-claro p-6 sm:p-8">
              <h3 className="text-lg font-bold leading-snug text-verde">{b.titulo}</h3>
              {b.parrafos.map((p) => (
                <p key={p} className="mt-4 text-sm leading-relaxed text-gris">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-gris">
          La curva de aprendizaje se paga una sola vez. Cada mes que pasa la pagas igual,
          pero con menos ventaja.
        </p>
      </div>
    </section>
  );
}
