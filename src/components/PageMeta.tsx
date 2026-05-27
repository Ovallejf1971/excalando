import { Helmet } from "react-helmet-async";

type PageMetaProps = {
  title: string;
  description: string;
  path: string; // sin dominio, ej: "/manifiesto"
  ogImage?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

const SITE_URL = "https://excalando.com";
const DEFAULT_OG = `${SITE_URL}/og-image.svg`;

export const PageMeta = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
  type = "website",
  noindex = false,
}: PageMetaProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
