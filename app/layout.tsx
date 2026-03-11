import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Black Quantum Labs — Digital Engineering Studio",
    template: "%s — Black Quantum Labs",
  },
  description:
    "Full-spectrum digital engineering studio. We build what others can't imagine — from idea to infrastructure.",
  keywords: ["web development", "mobile apps", "AI integration", "UI/UX design", "Chennai", "tech studio"],
  openGraph: {
    title: "Black Quantum Labs — Digital Engineering Studio",
    description: "We build what others can't imagine.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/layout/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} antialiased`}
        style={{ background: "var(--color-bg)", color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScrolling>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <div className="relative z-0">
              {children}
            </div>
            <Footer />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
