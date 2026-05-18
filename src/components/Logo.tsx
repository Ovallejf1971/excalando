// Marca eXcalando: X estilizada (azul Electric Blue) sobre cuadrado hueso/azul.
// Reutilizada en Nav, Footer, y donde haga falta identidad.

export const LogoMark = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#0066FF" />
    <path
      d="M16 14 L32 30 L48 14 L52 18 L36 34 L52 50 L48 54 L32 38 L16 54 L12 50 L28 34 L12 18 Z"
      fill="#F4F1EC"
    />
    <circle cx="50" cy="50" r="3" fill="#222222" />
  </svg>
);

export const Wordmark = ({ className = "" }: { className?: string }) => (
  <span className={"font-display font-bold tracking-tight " + className}>
    e<span className="text-accent">X</span>calando
  </span>
);
