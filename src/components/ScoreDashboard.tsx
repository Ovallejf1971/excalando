import { useEffect, useState } from "react";

export const ScoreDashboard = () => {
  const [score, setScore] = useState(38);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setTick((t) => t + 1);
      const target = 38 + Math.sin(Date.now() / 1500) * 4;
      setScore(Math.round(target * 10) / 10);
    }, 80);
    return () => clearInterval(i);
  }, []);

  const bars = [
    { l: "Presencia web", v: 38 },
    { l: "SEO local", v: 24 },
    { l: "Captación", v: 51 },
    { l: "Atención", v: 67 },
    { l: "Automatización", v: 12 },
  ];
  const sparkPath = Array.from({ length: 24 }, (_, i) => {
    const y = 30 + Math.sin((i + tick * 0.05) * 0.6) * 8 + i * 0.6;
    const x = (i / 23) * 100;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");

  const acciones = [
    { p: "01", t: "Reescribir página principal con propuesta de valor clara", w: "+18 pts" },
    { p: "02", t: "Activar perfil Google Business + reviews", w: "+12 pts" },
    { p: "03", t: "Conectar WhatsApp a asistente IA (24/7)", w: "+9 pts" },
  ];

  return (
    <div
      className="relative p-1 rounded-lg shadow-card"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,102,255,0.35), transparent 50%, rgba(0,102,255,0.35))",
      }}
    >
      <div className="bg-bg-2 border border-line-2 rounded-md p-4 sm:p-6 md:p-7 font-mono">
        <div className="flex items-center justify-between mb-5 gap-3">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-danger/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-warn/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/70" />
          </div>
          <div className="text-[10px] sm:text-[11px] text-ink-3 tracking-wider truncate">score.excalando.com/marca-real</div>
          <div className="text-[11px] text-accent flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: "0 0 8px #0066FF" }} />
            LIVE
          </div>
        </div>

        <div className="grid sm:grid-cols-[1fr_1px_1fr] gap-5 sm:gap-6 items-center">
          <div>
            <div className="text-[10px] text-ink-3 tracking-[0.15em] mb-1">SCORE DIGITAL</div>
            <div className="flex items-baseline gap-1">
              <div className="text-[64px] sm:text-[72px] md:text-[84px] font-semibold text-ink leading-none tracking-[-0.05em] tabular-nums">
                {Math.round(score)}
              </div>
              <div className="text-lg sm:text-xl md:text-[22px] text-ink-3">/100</div>
            </div>
            <div className="text-xs text-warn mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-warn rounded-sm" />
              Hay mucho por hacer
            </div>
            <svg viewBox="0 0 100 60" className="w-full h-[50px] sm:h-[60px] mt-4 block" preserveAspectRatio="none">
              <path d={sparkPath} stroke="#0066FF" strokeWidth={1} fill="none" />
              <path d={sparkPath + " L100,60 L0,60 Z"} fill="rgba(0,102,255,0.12)" />
            </svg>
            <div className="flex justify-between text-[9px] text-ink-3 mt-1">
              <span>HACE 30D</span>
              <span className="text-accent">HOY</span>
              <span>+90D ↗</span>
            </div>
          </div>
          <div className="hidden sm:block h-60 bg-line" />
          <div className="border-t sm:border-t-0 border-line pt-5 sm:pt-0">
            <div className="text-[10px] text-ink-3 tracking-[0.15em] mb-3.5">FRENTES PRIORIZADOS</div>
            {bars.map((b, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-ink-2">{b.l}</span>
                  <span className="text-ink">{b.v}</span>
                </div>
                <div className="h-1 bg-line rounded-sm overflow-hidden">
                  <div
                    className={`h-full transition-[width] duration-1000 ${b.v < 40 ? "bg-danger" : b.v < 60 ? "bg-warn" : "bg-success"}`}
                    style={{ width: `${b.v}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 sm:mt-6 pt-5 border-t border-line">
          <div className="text-[10px] text-ink-3 tracking-[0.15em] mb-3">SIGUIENTES 3 ACCIONES (AUTO)</div>
          <div className="flex flex-col gap-2">
            {acciones.map((a) => (
              <div key={a.p} className="grid grid-cols-[auto_1fr_auto] gap-2 sm:gap-3 text-[11px] sm:text-xs items-center py-2">
                <span className="text-accent">[{a.p}]</span>
                <span className="text-ink-2 leading-snug">{a.t}</span>
                <span className="text-success text-[10px] sm:text-[11px] shrink-0">{a.w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
