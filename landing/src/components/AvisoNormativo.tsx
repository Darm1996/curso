import Revelar from './Revelar';

export default function AvisoNormativo() {
  return (
    <section className="border-b border-navy-borde">
      <div className="contenedor py-16">
        <Revelar>
        <div className="border-l-4 border-dorado bg-navy-claro p-6 sm:p-8">
          <p className="kicker-oro">Aviso importante</p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gris">
            Este curso es material formativo. No constituye asesoría contable, fiscal,
            laboral ni legal, y no sustituye el juicio profesional del contador público.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gris">
            Toda referencia normativa incluida debe verificarse en la fuente oficial vigente:
            Gaceta Oficial, portal del SENIAT, la ordenanza de cada municipio, los portales
            de los entes parafiscales y los pronunciamientos de la Federación de Colegios de
            Contadores Públicos de Venezuela. Los porcentajes de retención, el valor de la
            Unidad Tributaria, las fechas de vencimiento y los días mínimos legales cambian.
            El material marca con <span className="font-bold text-dorado">[VERIFICAR]</span>{' '}
            cada punto donde esa confirmación es obligatoria.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gris">
            Las herramientas de inteligencia artificial pueden producir información
            incorrecta con apariencia de certeza. La responsabilidad profesional de todo
            informe, cálculo o declaración corresponde a quien lo suscribe.
          </p>
        </div>
        </Revelar>
      </div>
    </section>
  );
}
