import temario from '@/data/temario.json';

export default function Hero() {
  const minutos = temario.reduce((a, l) => a + l.duracion, 0);

  return (
    <header className="border-b border-navy-borde">
      <div className="contenedor py-20 sm:py-28">
        <span className="inline-block border-2 border-verde px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-verde">
          Certificado Claude
        </span>

        <h1 className="mt-10 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          Claude para
          <br />
          <span className="text-verde">Contadores</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gris sm:text-xl">
          El curso de inteligencia artificial aplicada a la práctica contable venezolana.
          Hecho con SENIAT, bolívares, divisas e inflación adentro. Sin teoría de manual
          gringo traducido.
        </p>

        <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-navy-borde pt-8">
          <div>
            <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gris">Lecciones</dt>
            <dd className="text-3xl font-bold text-dorado">{temario.length}</dd>
          </div>
          <div>
            <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gris">Por día</dt>
            <dd className="text-3xl font-bold text-dorado">15 min</dd>
          </div>
          <div>
            <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gris">Entregables</dt>
            <dd className="text-3xl font-bold text-dorado">8</dd>
          </div>
          <div>
            <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gris">En total</dt>
            <dd className="text-3xl font-bold text-dorado">{Math.round(minutos / 60)} h</dd>
          </div>
        </dl>

        <a
          href="#quiero-entrar"
          className="mt-12 inline-block bg-verde px-8 py-4 text-base font-bold text-navy transition hover:bg-white"
        >
          Quiero la biblioteca de prompts
        </a>
        <p className="mt-4 text-sm text-gris">
          Te la mandamos gratis y te avisamos cuando abra la próxima cohorte.
        </p>
      </div>
    </header>
  );
}
