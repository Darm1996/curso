'use client';

import { useEffect, useState } from 'react';
import { LIMITES } from '@/lib/validacion';

type Estado = 'inicial' | 'enviando' | 'listo' | 'error';

export default function Captura() {
  const [estado, setEstado] = useState<Estado>('inicial');
  const [mensaje, setMensaje] = useState('');
  const [origen, setOrigen] = useState('landing');

  // De dónde vino la persona, para medir qué canal trae suscriptores.
  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    const valor = parametros.get('origen') ?? parametros.get('utm_source');
    if (valor) setOrigen(valor.slice(0, LIMITES.origen));
  }, []);

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = new FormData(evento.currentTarget);

    setEstado('enviando');
    setMensaje('');

    try {
      const respuesta = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formulario.get('nombre'),
          email: formulario.get('email'),
          empresa: formulario.get('empresa'),
          origen,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setEstado('error');
        setMensaje(datos.error ?? 'No pudimos guardar tu correo. Intenta de nuevo.');
        return;
      }

      setEstado('listo');
      setMensaje(
        datos.repetido
          ? 'Ese correo ya estaba registrado. La secuencia sigue su curso.'
          : 'Listo. El primer correo te llega dentro de la próxima hora.',
      );
    } catch {
      setEstado('error');
      setMensaje('Falló la conexión. Revisa tu internet e intenta de nuevo.');
    }
  }

  return (
    <section id="quiero-entrar" className="border-b border-navy-borde">
      <div className="contenedor py-20">
        <div className="tarjeta border-l-4 border-l-verde sm:p-10">
          <p className="kicker">Empieza por acá</p>
          <h2 className="h2 mt-6 max-w-2xl">
            Llévate la biblioteca de prompts, gratis
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gris">
            Los {17} prompts maestros y los {51} de seguimiento del curso, organizados por
            tarea. Funciona solo, sin el curso. Te avisamos cuando abra la próxima cohorte.
          </p>

          {estado === 'listo' ? (
            <p
              role="status"
              className="mt-10 border-l-4 border-verde bg-navy px-6 py-5 text-base font-medium text-verde"
            >
              {mensaje}
            </p>
          ) : (
            <form onSubmit={enviar} className="mt-10 max-w-xl space-y-4" noValidate>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gris">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  maxLength={LIMITES.nombre}
                  autoComplete="name"
                  className="mt-2 w-full border border-navy-borde bg-navy px-4 py-3 text-white outline-none transition placeholder:text-gris/60 focus:border-verde"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gris">
                  Correo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={LIMITES.email}
                  autoComplete="email"
                  className="mt-2 w-full border border-navy-borde bg-navy px-4 py-3 text-white outline-none transition placeholder:text-gris/60 focus:border-verde"
                  placeholder="tucorreo@dominio.com"
                />
              </div>

              {/* Campo trampa para bots. Invisible y fuera del orden de tabulación. */}
              <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="empresa">No llenar</label>
                <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={estado === 'enviando'}
                className="w-full bg-verde px-8 py-4 text-base font-bold text-navy transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {estado === 'enviando' ? 'Enviando...' : 'Mándame la biblioteca'}
              </button>

              {estado === 'error' && (
                <p role="alert" className="text-sm font-medium text-dorado">
                  {mensaje}
                </p>
              )}

              <p className="pt-2 text-xs leading-relaxed text-gris">
                Usamos tu correo para enviarte la biblioteca y avisarte del curso. Nada más.
                Te puedes dar de baja cuando quieras.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
