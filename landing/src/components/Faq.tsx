import Revelar from './Revelar';

const PREGUNTAS = [
  {
    p: '¿Necesito pagar Claude para hacer el curso?',
    r: 'Puedes seguir el curso completo con una cuenta gratuita. Vas a chocar con límites de uso en las lecciones más largas, sobre todo cuando pegues estados financieros completos o lotes de facturas. Un plan de pago levanta esos límites y habilita funciones adicionales. La disponibilidad y el precio los verificas en la página oficial de Anthropic, porque cambian.',
  },
  {
    p: '¿Esto reemplaza al contador?',
    r: 'No, y el curso está construido sobre esa premisa. Las diecisiete lecciones tienen una sección obligatoria de verificación profesional, porque tú firmas y tu responsabilidad no se transfiere a ninguna herramienta. Lo que se automatiza es el trabajo mecánico: limpiar archivos, calcular, redactar borradores, ordenar procesos. El criterio, la verificación y la firma siguen siendo tuyos.',
  },
  {
    p: '¿Sirve si no sé nada de inteligencia artificial?',
    r: 'Está escrito exactamente para eso. El curso asume nivel técnico contable alto y nivel de inteligencia artificial cero. No hay que instalar nada ni programar. Cada lección trae el prompt completo, listo para copiar, con las variables entre corchetes que tú reemplazas.',
  },
  {
    p: '¿El curso me da la normativa vigente?',
    r: 'Trae un anexo de datos normativos con fecha de corte, donde cada dato lleva su Gaceta Oficial, su providencia o su artículo: retenciones de IVA e ISLR, sustraendo, Unidad Tributaria, artículos 142, 122, 131, 192 y 105 de la LOTTT, IGTF, la contribución de pensiones y el BA VEN-NIF N° 2. Pero eso es un punto de partida, no una garantía. La normativa venezolana cambia por Gaceta y a veces con efecto retroactivo, así que los datos más volátiles van marcados para que confirmes vigencia. Lo que el curso enseña de fondo es el flujo correcto: la norma la buscas en la fuente oficial y la pegas dentro del prompt, porque un modelo de lenguaje no es fuente normativa.',
  },
  {
    p: '¿Puedo usarlo con datos reales de mis clientes?',
    r: 'Con criterio. La lección 14 trata ese punto de frente: antes de conectar el correo o subir archivos de clientes, defines por escrito qué información se procesa, cuál se anonimiza y cuál no sale de tu equipo. El secreto profesional del contador público aplica igual cuando la herramienta es nueva.',
  },
  {
    p: '¿Cuánto tiempo toma de verdad?',
    r: 'Quince minutos de lectura y ejercicio por lección, diecisiete días seguidos. Los ocho entregables de la evaluación final toman más, porque se hacen sobre trabajo real tuyo. Esa parte es la que convierte el curso en horas facturables y no en un certificado más.',
  },
  {
    p: '¿Qué me llevo al terminar?',
    r: 'El PDF completo del curso, la biblioteca con los diecisiete prompts maestros y los cincuenta y uno de seguimiento, ocho entregables hechos sobre tu propio trabajo y el certificado.',
  },
];

export default function Faq() {
  return (
    <section id="preguntas" className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <Revelar>
          <p className="kicker">Preguntas frecuentes</p>
          <h2 className="h2 mt-6">Lo que todo el mundo pregunta</h2>
        </Revelar>

        {/* Sin acordeón: las respuestas están a la vista. Quien busca una
            objeción concreta no debería tener que ir abriendo pestañas. */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PREGUNTAS.map(({ p, r }, i) => (
            <Revelar key={p} retraso={i * 70}>
              <article className="flota h-full rounded-lg border border-navy-borde bg-navy-claro p-6">
                <h3 className="flex gap-3 text-lg font-bold leading-snug">
                  <span aria-hidden className="text-verde">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {p}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gris">{r}</p>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
