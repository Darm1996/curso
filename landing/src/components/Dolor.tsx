import Revelar from './Revelar';

const TAREAS = [
  { tarea: 'Cerrar el mes', hoy: '9 días hábiles', detalle: 'cuatro de ellos persiguiendo información que otro departamento no entregó' },
  { tarea: 'Analizar los estados de un cliente', hoy: 'media mañana', detalle: 'armando fórmulas en una hoja que arrastras año tras año' },
  { tarea: 'Armar el reporte mensual en Excel', hoy: '6 horas', detalle: 'cuatro limpiando un archivo que el sistema exporta mal' },
  { tarea: 'Conciliar los bancos', hoy: '2 días', detalle: 'para encontrar las veinte partidas que importan entre ciento ochenta' },
  { tarea: 'Calcular las retenciones de la quincena', hoy: 'día y medio', detalle: 'y las de personas naturales igual salen mal por el sustraendo' },
  { tarea: 'Responder una consulta fiscal', hoy: 'un mensaje de WhatsApp', detalle: 'que no se cobra, no se archiva y no te protege de nada' },
];

export default function Dolor() {
  return (
    <section className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <Revelar>
          <p className="kicker-oro">El problema</p>
          <h2 className="h2 mt-6 max-w-3xl">
            El trabajo mecánico se está comiendo las horas que deberías cobrar como criterio
            profesional.
          </h2>
        </Revelar>

        <ul className="mt-12 divide-y divide-navy-borde border-y border-navy-borde">
          {TAREAS.map((t, i) => (
            <li
              key={t.tarea}
              className="flex flex-col gap-2 py-6 transition-colors duration-300 hover:bg-navy-claro/40 sm:flex-row sm:items-baseline sm:gap-8"
              style={{ animation: `entrar 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both` }}>
              <span className="w-full font-medium sm:w-72 sm:shrink-0">{t.tarea}</span>
              <span className="font-bold text-dorado sm:w-44 sm:shrink-0">{t.hoy}</span>
              <span className="text-sm leading-relaxed text-gris">{t.detalle}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-gris">
          Los tiempos son los de los casos que verás en el curso, tomados de la práctica de
          escritorios contables venezolanos. El tuyo será distinto. El patrón, casi seguro
          que no.
        </p>
      </div>
    </section>
  );
}
