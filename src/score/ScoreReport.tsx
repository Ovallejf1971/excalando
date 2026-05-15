import { motion } from "framer-motion";
import { MessageCircle, Download, Mail, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ScoreAnswers, ScoreReport, FrenteScore } from "./types";

const barColor = (v: number) => (v < 40 ? "bg-danger" : v < 60 ? "bg-warn" : "bg-success");
const prioColor = (p: string) =>
  p === "Alta" ? "text-danger" : p === "Media" ? "text-warn" : p === "Quick-win" ? "text-accent" : "text-success";
const rangoColor = (r: ScoreReport["rango"]) =>
  r === "Crítico" ? "text-danger" : r === "Por mejorar" ? "text-warn" : r === "Aceptable" ? "text-accent" : "text-success";

export const ScoreReportView = ({
  report,
  answers,
  onReset,
}: { report: ScoreReport; answers: ScoreAnswers; onReset: () => void }) => {
  const sendEmail = () => {
    // TODO: integrar con backend → enviar PDF al email del lead
    alert(`(Demo) Reporte enviado a ${answers.email ?? "tu email"}.`);
  };
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify({ answers, report }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `score-digital-${(answers.empresa || "excalando").replace(/\W+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-line-2 rounded-md bg-bg-2 overflow-hidden shadow-card">
      {/* Header */}
      <div className="px-5 sm:px-8 md:px-10 pt-7 sm:pt-9 pb-7 border-b border-line bg-gradient-to-br from-accent/[0.06] to-transparent">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-ink-3 mb-2 truncate">TU SCORE DIGITAL · {answers.empresa || answers.nombre || "—"}</div>
        <div className="grid md:grid-cols-[auto_1fr] gap-7 md:gap-12 items-end">
          <div>
            <div className="flex items-baseline gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-[96px] sm:text-[120px] md:text-[160px] font-semibold text-ink leading-none tracking-[-0.06em] tabular-nums"
              >
                {report.total}
              </motion.div>
              <div className="font-mono text-2xl sm:text-3xl text-ink-3">/100</div>
            </div>
            <div className={`mt-2 text-lg font-semibold ${rangoColor(report.rango)}`}>{report.rango}</div>
          </div>
          <div className="flex flex-col gap-2.5">
            {report.frentes.map((f) => (
              <FrenteRow key={f.key} f={f} />
            ))}
          </div>
        </div>
      </div>

      {/* Acciones priorizadas */}
      <div className="px-5 sm:px-8 md:px-10 py-8 sm:py-9 border-b border-line">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-ink-3 mb-4">PLAN PRIORIZADO · TOP {report.acciones.length}</div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6 text-balance">
          Tus próximas acciones, en orden de impacto.
        </h3>
        <div className="flex flex-col">
          {report.acciones.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="border-b border-line py-4 sm:py-5 grid grid-cols-[28px_1fr_auto] sm:grid-cols-[40px_1fr_auto] gap-3 sm:gap-4 items-center"
            >
              <span className="font-mono text-accent text-xs sm:text-sm">[{String(i + 1).padStart(2, "0")}]</span>
              <div className="min-w-0">
                <div className="text-sm sm:text-base text-ink font-medium text-pretty">{a.titulo}</div>
                <div className="text-[10px] sm:text-xs text-ink-3 mt-1 font-mono tracking-wider">
                  FRENTE: {a.frente.toUpperCase()} · ESFUERZO: {a.esfuerzo.toUpperCase()}
                </div>
              </div>
              <div className="font-mono text-success text-xs sm:text-sm whitespace-nowrap">+{a.impacto} pts</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 sm:px-8 md:px-10 py-8 sm:py-9 bg-gradient-to-br from-accent/[0.08] to-transparent">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-7 md:gap-8 items-center">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink tracking-tight mb-3 text-balance">
              ¿Listo para ejecutar este plan?
            </h3>
            <p className="text-ink-2 leading-relaxed">
              Agenda 30 minutos con nosotros. Te explicamos cómo abordar las primeras 3 acciones, cuánto costaría y en cuánto tiempo verías resultados. Sin compromiso.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Button size="lg" asChild>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "573164728441"}?text=${encodeURIComponent(
                  `Hola, vengo del Score Digital. Mi puntaje fue ${report.total}/100 (${report.rango}) y quiero conversar sobre los próximos pasos.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> Hablemos por WhatsApp
              </a>
            </Button>
            <Button size="md" variant="outline" onClick={sendEmail}>
              <Mail className="h-4 w-4" /> Enviarme el reporte por email
            </Button>
            <div className="flex gap-2 mt-1">
              <Button size="sm" variant="ghost" onClick={downloadJson}>
                <Download className="h-3.5 w-3.5" /> Descargar JSON
              </Button>
              <Button size="sm" variant="ghost" onClick={onReset}>
                <RotateCcw className="h-3.5 w-3.5" /> Volver a empezar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FrenteRow = ({ f }: { f: FrenteScore }) => (
  <div className="grid grid-cols-[100px_1fr_50px_70px] sm:grid-cols-[140px_1fr_60px_90px] gap-2 sm:gap-3 items-center font-mono text-[11px] sm:text-[12px]">
    <div className="text-ink-2 truncate">{f.label}</div>
    <div className="h-1.5 bg-line rounded overflow-hidden">
      <motion.div
        className={`h-full ${barColor(f.score)}`}
        initial={{ width: 0 }}
        animate={{ width: `${f.score}%` }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </div>
    <div className="text-ink text-right">{f.score}/100</div>
    <div className={`${prioColor(f.prioridad)} text-[9px] sm:text-[10px] text-right tracking-wider`}>
      {f.prioridad.toUpperCase()}
    </div>
  </div>
);
