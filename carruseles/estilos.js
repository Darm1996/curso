'use strict';

/** Hoja de estilo de las láminas. 1080x1350 con margen de seguridad de 80px. */
module.exports = `
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  width: 1080px; height: 1350px; overflow: hidden;
  font-family: "Space Grotesk", sans-serif;
  background-color: #0B1120;
  background-image:
    repeating-linear-gradient(0deg, rgba(148,163,184,0.09) 0 1px, transparent 1px 90px),
    repeating-linear-gradient(90deg, rgba(148,163,184,0.09) 0 1px, transparent 1px 90px);
  color: #FFFFFF;
  -webkit-font-smoothing: antialiased;
}

.lamina {
  width: 1080px; height: 1350px; padding: 80px;
  display: flex; flex-direction: column;
}

/* ---- cabecera y pie comunes ---- */
.tope { display: flex; justify-content: space-between; align-items: flex-start; }
.badge {
  border: 2px solid #00E68A; color: #00E68A;
  font-size: 20px; font-weight: 700; letter-spacing: 0.24em;
  padding: 12px 20px; text-transform: uppercase; white-space: nowrap;
}
.leccion-tag {
  font-size: 20px; font-weight: 700; letter-spacing: 0.24em;
  color: #94A3B8; text-transform: uppercase; padding-top: 14px;
}
.fondo { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; }
.arroba { font-size: 26px; font-weight: 700; color: #94A3B8; letter-spacing: 0.04em; }
.contador { font-size: 22px; font-weight: 700; color: #F6B101; letter-spacing: 0.1em; }

/* ---- centro ---- */
.centro { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; }
.kicker {
  font-size: 24px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase;
  color: #00E68A; margin-bottom: 36px;
}
.kicker.oro { color: #F6B101; }
.texto { font-size: 52px; line-height: 1.34; font-weight: 500; letter-spacing: -0.01em; }
.texto.chico { font-size: 46px; }
.destacado { color: #00E68A; }
.destacado-oro { color: #F6B101; }

/* ---- lámina 1, portada ---- */
.numero { font-size: 200px; font-weight: 700; color: #00E68A; line-height: 0.9; letter-spacing: -0.04em; }
.titulo { font-size: 84px; font-weight: 700; line-height: 1.06; letter-spacing: -0.025em; margin-top: 24px; }
.pill {
  display: inline-block; border: 2px solid #F6B101; color: #F6B101;
  font-size: 26px; font-weight: 700; padding: 10px 22px; margin-top: 40px;
}

/* ---- lámina 4, el prompt ---- */
.prompt {
  background: rgba(148,163,184,0.10);
  border-left: 8px solid #00E68A;
  padding: 44px 44px;
  font-family: "DejaVu Sans Mono", monospace;
  font-size: 34px; line-height: 1.5; white-space: pre-wrap;
  color: #FFFFFF;
}

/* ---- lámina 5, el caso ---- */
.empresa { font-size: 46px; font-weight: 700; color: #F6B101; margin-bottom: 46px; }
.fila { display: flex; justify-content: space-between; align-items: baseline;
        border-bottom: 1px solid rgba(148,163,184,0.25); padding: 22px 0; }
.fila .k { font-size: 34px; color: #94A3B8; font-weight: 500; }
.fila .v { font-size: 44px; color: #FFFFFF; font-weight: 700; }
.remate { font-size: 42px; font-weight: 700; color: #00E68A; margin-top: 48px; line-height: 1.28; }

/* ---- lámina 7, cierre ---- */
.cierre-frase { font-size: 62px; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
.cierre-regla { width: 120px; height: 6px; background: #00E68A; margin: 48px 0; }
.cierre-dato { font-size: 34px; color: #94A3B8; line-height: 1.5; }
.cierre-arroba { font-size: 76px; font-weight: 700; color: #F6B101; margin-top: 56px; letter-spacing: -0.02em; }
`;
