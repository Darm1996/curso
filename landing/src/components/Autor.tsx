export default function Autor() {
  return (
    <section className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <p className="kicker">Quién lo escribió</p>
        <h2 className="h2 mt-6">Daniele Rivalta</h2>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-gris">
          <p>
            Contador Público. Más de diez años trabajando materia fiscal y financiera en
            Venezuela. Tax Manager.
          </p>
          <p>
            Este curso salió del trabajo diario, no de un temario de academia. Cada lección
            arranca de un problema que se repite en los escritorios contables de acá: el
            cierre que no sale a tiempo, la retención que se calcula mal, el informe que el
            cliente no lee, la liquidación que termina en reclamo.
          </p>
          <p>
            Escribo en <span className="font-bold text-white">@contave</span> sobre
            contabilidad y finanzas con inteligencia artificial, enfocado cien por ciento en
            Venezuela.
          </p>
        </div>
      </div>
    </section>
  );
}
