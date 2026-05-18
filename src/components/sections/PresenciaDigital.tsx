import { Check, ArrowRight } from "lucide-react";
import { PRESENCIA_DIGITAL } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "./_atoms";

const renderCelda = (valor: boolean | string, esResaltado?: boolean) => {
  if (esResaltado) {
    return <span className="text-ink text-sm font-semibold">{valor}</span>;
  }
  if (valor === true) {
    return <Check className="h-5 w-5 text-accent inline" />;
  }
  if (valor === false) {
    return <span className="text-ink-3">—</span>;
  }
  return <span className="text-ink text-sm">{valor}</span>;
};

export const PresenciaDigital = () => (
  <Section alt id="presencia-digital">
    <SectionHeader
      n="04"
      eyebrow="La base · Presencia Digital"
      title={
        <>
          Tu base digital en <span className="text-accent">3 niveles.</span>
        </>
      }
      lead="Página web profesional + tu ficha de Google + empleados digitales que cuidan tu presencia. Setup único de $1.500.000 + mensualidad fija. Compromiso mes a mes."
    />

    {/* Vista escritorio: tabla */}
    <div className="hidden md:block overflow-x-auto rounded-sm border border-line">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-bg border-b border-line">
            <th className="p-4 text-[13px] font-mono text-ink-3 uppercase tracking-wider w-[320px]">
              Lo que incluye
            </th>
            {PRESENCIA_DIGITAL.niveles.map((n) => (
              <th
                key={n.id}
                className={`p-4 text-center align-top ${n.destacado ? "bg-accent/10" : ""}`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{n.emoji}</span>
                  <span className="font-semibold text-ink text-base">Nivel {n.nombre}</span>
                  <span className="font-mono text-accent text-lg font-semibold">{n.precio}</span>
                  {n.destacado && (
                    <span className="mt-1 text-[10px] font-mono text-accent border border-accent px-2 py-0.5 tracking-wider">
                      EL MÁS ELEGIDO
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRESENCIA_DIGITAL.filas.map((fila, idx) => (
            <tr
              key={fila.feature}
              className={`border-b border-line ${
                fila.esResaltado ? "bg-bg-2/60" : idx % 2 === 0 ? "bg-bg-2/40" : "bg-bg"
              }`}
            >
              <td
                className={`p-3 text-sm ${fila.esResaltado ? "font-semibold text-ink" : "text-ink-2"}`}
              >
                {fila.feature}
              </td>
              <td className="p-3 text-center">{renderCelda(fila.basico, fila.esResaltado)}</td>
              <td className="p-3 text-center bg-accent/5">
                {renderCelda(fila.intermedio, fila.esResaltado)}
              </td>
              <td className="p-3 text-center">{renderCelda(fila.profesional, fila.esResaltado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Vista móvil: tarjetas apiladas */}
    <div className="md:hidden flex flex-col gap-5">
      {PRESENCIA_DIGITAL.niveles.map((n) => (
        <div
          key={n.id}
          className={`p-5 border rounded-sm ${n.destacado ? "border-accent bg-accent/10" : "border-line bg-bg-2"}`}
        >
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl">{n.emoji}</span>
            <h3 className="font-semibold text-ink text-lg">Nivel {n.nombre}</h3>
            {n.destacado && (
              <span className="ml-auto text-[10px] font-mono text-accent border border-accent px-2 py-0.5 tracking-wider">
                ⭐ TOP
              </span>
            )}
          </div>
          <div className="font-mono text-accent text-2xl font-semibold mb-4">{n.precio}</div>
          <ul className="flex flex-col gap-1.5 text-sm">
            {PRESENCIA_DIGITAL.filas.map((fila) => {
              const valor = fila[n.id];
              if (valor === false) return null;
              return (
                <li key={fila.feature} className="flex items-start gap-2 text-ink-2">
                  {valor === true ? (
                    <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  ) : (
                    <span className="text-accent font-mono shrink-0">·</span>
                  )}
                  <span className={fila.esResaltado ? "font-semibold text-ink" : ""}>
                    {fila.feature}
                    {valor !== true && <span className="text-ink ml-1">{String(valor)}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-8 p-5 border border-line rounded-sm bg-bg-2/40 text-center">
      <p className="text-sm text-ink-2 mb-3">
        <span className="font-semibold text-ink">¿Quieres más empleados digitales?</span> Puedes
        agregar agentes sueltos a cualquier nivel — ve la sección{" "}
        <a href="#empleados-digitales" className="text-accent hover:underline">
          Empleados Digitales
        </a>
        .
      </p>
      <Button asChild>
        <a href="#score">
          Empieza con tu Score gratis <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </div>
  </Section>
);
