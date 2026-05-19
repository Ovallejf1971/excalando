import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EVENTS, track } from "@/lib/analytics";

// Showreel del Hero: 3 escenas cicladas que muestran outputs reales de eXcalando.
// Patrón Ueno aplicado a agencia: mostrar lo que se construye, no contarlo.
// Sin video real — todas las escenas son React/SVG animado.

const SCENES = ["web", "chat", "flow"] as const;
type Scene = (typeof SCENES)[number];

const SCENE_DURATION_MS = 5500;

export const HeroShowreel = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SCENES.length), SCENE_DURATION_MS);
    return () => clearInterval(t);
  }, []);

  const current: Scene = SCENES[idx];

  return (
    <div className="relative w-full h-full bg-[#1A1A1A] overflow-hidden">
      {/* Marco "navegador" superior */}
      <div className="absolute top-0 left-0 right-0 h-9 bg-[#262626] border-b border-line-on-dark-2 flex items-center gap-2 px-4 z-10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C940]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="font-mono text-[10px] text-ink-on-dark-3 bg-dark px-3 py-0.5 rounded">
            {current === "web" && "excalando.com"}
            {current === "chat" && "WhatsApp · Asistente eXcalando"}
            {current === "flow" && "automatización · pedido → factura → notificación"}
          </div>
        </div>
        <div className="w-12" />
      </div>

      {/* Contenido animado */}
      <div className="absolute top-9 left-0 right-0 bottom-0">
        <AnimatePresence mode="wait">
          {current === "web" && <SceneWeb key="web" />}
          {current === "chat" && <SceneChat key="chat" />}
          {current === "flow" && <SceneFlow key="flow" />}
        </AnimatePresence>
      </div>

      {/* Indicador inferior */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {SCENES.map((s, i) => (
          <button
            key={s}
            onClick={() => {
              track(EVENTS.SHOWREEL_SCENE_CLICK, { scene: s });
              setIdx(i);
            }}
            aria-label={`Ir a escena ${i + 1}`}
            className={`h-1 rounded-full transition-all ${
              i === idx ? "w-8 bg-accent" : "w-2 bg-ink-on-dark-3/40 hover:bg-ink-on-dark-3/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ───────── Escena 1: Landing scrolling ─────────
const SceneWeb = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="absolute inset-0 bg-bg overflow-hidden"
  >
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-0, -60, -140, -220, -140, -60, 0] }}
      transition={{ duration: SCENE_DURATION_MS / 1000 - 0.5, times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1] }}
      className="absolute inset-x-0 top-0 p-4 space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="w-5 h-5 rounded-md bg-accent" />
        <div className="flex gap-2">
          <div className="w-10 h-1.5 rounded-full bg-ink-3" />
          <div className="w-10 h-1.5 rounded-full bg-ink-3" />
          <div className="w-10 h-1.5 rounded-full bg-ink-3" />
        </div>
      </div>
      {/* Hero block */}
      <div className="h-3 w-3/4 bg-ink rounded" />
      <div className="h-3 w-2/3 bg-ink rounded" />
      <div className="h-3 w-1/2 bg-accent rounded" />
      <div className="h-1.5 w-full bg-ink-3/40 rounded mt-2" />
      <div className="h-1.5 w-5/6 bg-ink-3/40 rounded" />
      <div className="h-7 w-32 bg-accent rounded mt-2" />
      {/* Section blocks */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 bg-bg-2 border border-line rounded" />
        ))}
      </div>
      <div className="h-20 w-full bg-bg-2 border border-line rounded mt-2" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="h-14 bg-bg-2 border border-line rounded" />
        <div className="h-14 bg-bg-2 border border-line rounded" />
      </div>
    </motion.div>
  </motion.div>
);

// ───────── Escena 2: WhatsApp chat ─────────
const CHAT_MESSAGES = [
  { from: "user", text: "Hola, quiero saber los precios", delay: 0.3 },
  { from: "bot", text: "¡Hola! Te muestro los planes 👇\nDesde $290.000/mes con setup incluido.", delay: 1.0 },
  { from: "user", text: "¿Puedo agendar una demo?", delay: 1.8 },
  { from: "bot", text: "Claro. ¿Te va bien mañana 10am o 3pm?", delay: 2.4 },
  { from: "user", text: "Mañana 10am perfecto", delay: 3.0 },
  { from: "bot", text: "Listo ✓ Te envío invitación al correo. ¡Hablamos!", delay: 3.5 },
] as const;

const SceneChat = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="absolute inset-0 bg-[#0B141A] p-3 flex flex-col gap-1.5 overflow-hidden"
  >
    {CHAT_MESSAGES.map((m, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: m.delay, duration: 0.25 }}
        className={`max-w-[80%] px-3 py-1.5 rounded-lg text-[11px] leading-snug whitespace-pre-line shadow-sm ${
          m.from === "user"
            ? "self-end bg-[#005C4B] text-white rounded-br-sm"
            : "self-start bg-[#202C33] text-[#E9EDEF] rounded-bl-sm"
        }`}
      >
        {m.text}
      </motion.div>
    ))}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ delay: 4.2, duration: 1.2, times: [0, 0.2, 0.8, 1] }}
      className="self-start bg-[#202C33] rounded-lg px-3 py-2 flex gap-1"
    >
      <span className="w-1.5 h-1.5 bg-[#8696A0] rounded-full animate-pulse" />
      <span
        className="w-1.5 h-1.5 bg-[#8696A0] rounded-full animate-pulse"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="w-1.5 h-1.5 bg-[#8696A0] rounded-full animate-pulse"
        style={{ animationDelay: "0.4s" }}
      />
    </motion.div>
  </motion.div>
);

// ───────── Escena 3: Workflow conectándose ─────────
const NODES = [
  { id: "pedido", label: "Pedido WA", x: 12, y: 28, color: "#25D366" },
  { id: "asistente", label: "Asistente", x: 48, y: 28, color: "#0066FF" },
  { id: "inventario", label: "Inventario", x: 84, y: 16, color: "#FFBD2E" },
  { id: "factura", label: "Factura", x: 84, y: 40, color: "#FF5F57" },
  { id: "cliente", label: "Cliente ✓", x: 48, y: 72, color: "#28C940" },
] as const;

const EDGES = [
  { from: "pedido", to: "asistente", delay: 0.4 },
  { from: "asistente", to: "inventario", delay: 1.0 },
  { from: "asistente", to: "factura", delay: 1.4 },
  { from: "factura", to: "cliente", delay: 2.0 },
  { from: "inventario", to: "cliente", delay: 2.3 },
] as const;

const SceneFlow = () => {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 bg-dark overflow-hidden"
    >
      {/* Grid sutil */}
      <div className="absolute inset-0 grid-bg-dark opacity-30" aria-hidden />

      <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* Edges */}
        {EDGES.map((e, i) => {
          const from = nodeMap[e.from];
          const to = nodeMap[e.to];
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#0066FF"
              strokeWidth="0.3"
              strokeDasharray="1 1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: e.delay, duration: 0.5 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 0.3 }}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: n.color, boxShadow: `0 0 12px ${n.color}80` }}
          />
          <div className="font-mono text-[8px] text-ink-on-dark-2 whitespace-nowrap">
            {n.label}
          </div>
        </motion.div>
      ))}

      {/* Bottom label */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[9px] text-ink-on-dark-3 uppercase tracking-wider">
        Pedido → Factura → Cliente · sin intervención humana
      </div>
    </motion.div>
  );
};
