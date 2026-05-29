import type { Metadata, Viewport } from "next";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

const SITE_NAME = "VIRENZA Landscape Solutions";
const SITE_DESCRIPTION =
  "Professional landscaping, irrigation repair, and yard cleanup in Phoenix, Scottsdale, Mesa, and surrounding AZ cities. Fast response. Fully licensed.";
const SITE_TITLE = "VIRENZA | Arizona's Premier Landscaping & Irrigation";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://virenzalandscaping.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://virenzalandscaping.com/#business",
  name: "VIRENZA Landscape Solutions",
  description: SITE_DESCRIPTION,
  url: "https://virenzalandscaping.com",
  telephone: "+16024354418",
  email: "veilllc0555@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    postalCode: "85001",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.4484,
    longitude: -112.074,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    "Phoenix, AZ",
    "Scottsdale, AZ",
    "Mesa, AZ",
    "Tempe, AZ",
    "Chandler, AZ",
    "Glendale, AZ",
  ],
  priceRange: "$$",
  hasMap: "https://maps.google.com/?q=Phoenix,AZ",
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
