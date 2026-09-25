import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soumen Manik | AI/ML & Engineering Showcase",
  description: "Next-gen portfolio showcasing AI/ML solutions, full-stack architectures, and systems development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
