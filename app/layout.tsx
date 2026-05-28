import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIRENZA | Arizona's Premier Landscaping & Irrigation",
  description:
    "Professional landscaping, irrigation repair, and yard cleanup services in Arizona. Transform your outdoor space with VIRENZA.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
