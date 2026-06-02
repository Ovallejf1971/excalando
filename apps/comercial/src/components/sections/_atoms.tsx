// Small reusable bits used across sections.
import { cn } from "@/lib/utils";

export const Eyebrow = ({ n, children, className }: { n: string; children: React.ReactNode; className?: string }) => (
  <div className={cn("flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-3", className)}>
    <span className="text-accent">[{n}]</span>
    <span>{children}</span>
  </div>
);

export const SectionHeader = ({
  n,
  eyebrow,
  title,
  lead,
}: {
  n: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) => (
  <div className="max-w-3xl mb-10 md:mb-16">
    <Eyebrow n={n}>{eyebrow}</Eyebrow>
    <h2 className="mt-4 mb-3 md:mt-5 md:mb-4 text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.02em] text-ink text-balance">
      {title}
    </h2>
    {lead ? <p className="text-base md:text-lg leading-relaxed text-ink-2 max-w-2xl text-pretty">{lead}</p> : null}
  </div>
);

export const Section = ({
  id,
  className,
  alt,
  dark,
  children,
}: {
  id?: string;
  className?: string;
  alt?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={cn(
      "px-5 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-32",
      dark
        ? "section-dark border-t border-line-on-dark"
        : alt
        ? "bg-bg-2 border-t border-line"
        : "bg-bg border-t border-line",
      className,
    )}
  >
    {children}
  </section>
);
