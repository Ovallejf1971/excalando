import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { STEPS, type FieldDef } from "./questions";
import type { ScoreAnswers, ScoreReport } from "./types";
import { calcScore } from "./scoring";
import { ScoreReportView } from "./ScoreReport";

const STORAGE_KEY = "picard-ia.score.answers";

export const ScoreWizard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ScoreAnswers>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  });
  const [report, setReport] = useState<ScoreReport | null>(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); } catch {}
  }, [answers]);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const set = (k: keyof ScoreAnswers, v: any) => setAnswers((a) => ({ ...a, [k]: v }));

  const stepValid = (() => {
    if (current.id !== "contacto") return true;
    return Boolean(answers.nombre && answers.email);
  })();

  const submit = async () => {
    const r = calcScore(answers);
    setReport(r);

    const webhookUrl = import.meta.env.VITE_SCORE_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuestas: answers, reporte: r }),
        keepalive: true,
      });
    } catch (err) {
      console.error("[score] webhook failed:", err);
    }
  };

  const reset = () => {
    setReport(null);
    setStep(0);
    setAnswers({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  if (report) return <ScoreReportView report={report} answers={answers} onReset={reset} />;

  return (
    <div className="border border-line-2 rounded-md bg-bg-2 overflow-hidden shadow-card">
      {/* Progress bar */}
      <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-line">
        <div className="flex items-center justify-between mb-3 font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-ink-3 gap-3">
          <span>PASO {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</span>
          <span className="text-accent">{current.id.toUpperCase()}</span>
        </div>
        <div className="h-1 bg-line rounded-sm overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="p-5 sm:p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2 text-balance">{current.title}</h3>
            <p className="text-ink-2 mb-7 sm:mb-8 max-w-xl text-pretty">{current.subtitle}</p>
            <div className="flex flex-col gap-6">
              {current.fields.map((f) => (
                <Field key={String(f.key)} field={f} value={(answers as any)[f.key]} onChange={(v) => set(f.key, v)} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-5 sm:px-8 pb-6 sm:pb-7 pt-2 gap-3">
        <Button variant="ghost" size="md" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ArrowLeft className="h-4 w-4" /> Atrás
        </Button>
        {!isLast ? (
          <Button size="md" onClick={() => setStep((s) => s + 1)}>
            Siguiente <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="md" onClick={submit} disabled={!stepValid}>
            <span className="hidden sm:inline">Calcular mi Score</span>
            <span className="sm:hidden">Calcular</span>
            <Sparkles className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

const Field = ({ field, value, onChange }: { field: FieldDef; value: any; onChange: (v: any) => void }) => {
  if (field.kind === "select") {
    return (
      <label className="block">
        <div className="text-sm font-medium text-ink mb-2">{field.label}</div>
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/[0.04] border border-line-2 rounded-sm px-4 h-12 text-ink focus:border-accent focus:outline-none"
        >
          <option value="" disabled>Selecciona…</option>
          {field.options.map((o) => (<option key={o.value} value={o.value} className="bg-bg-2">{o.label}</option>))}
        </select>
      </label>
    );
  }
  if (field.kind === "radio") {
    return (
      <div>
        <div className="text-sm font-medium text-ink mb-3">{field.label}</div>
        <div className="flex flex-wrap gap-2">
          {field.options.map((o) => {
            const active = value === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => onChange(o.value)}
                className={cn(
                  "px-4 h-10 border rounded-sm text-sm transition-colors",
                  active ? "border-accent bg-accent/10 text-ink" : "border-line-2 text-ink-2 hover:border-line-2 hover:text-ink",
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  if (field.kind === "yesno") {
    return (
      <div>
        <div className="text-sm font-medium text-ink mb-1">{field.label}</div>
        {field.help ? <div className="text-xs text-ink-3 mb-2.5">{field.help}</div> : null}
        <div className="flex gap-2">
          {[
            { v: true, l: "Sí" },
            { v: false, l: "No" },
          ].map((opt) => {
            const active = value === opt.v;
            return (
              <button
                key={String(opt.v)}
                type="button"
                onClick={() => onChange(opt.v)}
                className={cn(
                  "flex-1 max-w-[140px] h-11 border rounded-sm text-sm font-medium transition-colors flex items-center justify-center gap-2",
                  active ? "border-accent bg-accent/10 text-ink" : "border-line-2 text-ink-2 hover:text-ink",
                )}
              >
                {active && opt.v === true ? <Check className="h-4 w-4 text-accent" /> : null}
                {opt.l}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  if (field.kind === "counter") {
    const v = (value as number) ?? 0;
    return (
      <div>
        <div className="text-sm font-medium text-ink mb-1">{field.label}</div>
        {field.help ? <div className="text-xs text-ink-3 mb-2.5">{field.help}</div> : null}
        <div className="inline-flex items-center border border-line-2 rounded-sm">
          <button type="button" onClick={() => onChange(Math.max(field.min, v - 1))} className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-ink">
            <Minus className="h-4 w-4" />
          </button>
          <div className="w-14 h-11 flex items-center justify-center font-mono text-lg text-ink border-x border-line-2">{v}</div>
          <button type="button" onClick={() => onChange(Math.min(field.max, v + 1))} className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-ink">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }
  // text
  return (
    <label className="block">
      <div className="text-sm font-medium text-ink mb-2">
        {field.label} {field.required ? <span className="text-accent">*</span> : null}
      </div>
      <input
        type={field.type ?? "text"}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        className="w-full bg-white/[0.04] border border-line-2 rounded-sm px-4 h-12 text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
      />
    </label>
  );
};
