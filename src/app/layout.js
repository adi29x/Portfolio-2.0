import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { GradualBlur } from "@/components/ui/GradualBlur";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aditya Kapoor — Cinematic Founder Ecosystem Portfolio",
  description: "A world-class immersive digital founder ecosystem for Aditya Kapoor. Combining personal branding, startup incubation, and luxury architectural modern UI systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="bg-soft-white text-charcoal min-h-full flex flex-col font-sans relative">
        {/* Cinematic noise texture overlay */}
        <div className="noise-overlay" />
        
        {/* Viewport side edges atmospheric cinematic framing (Desktop Only) */}
        <GradualBlur
          position="left"
          width="4rem"
          strength={0.6}
          opacity={0.2}
          className="hidden lg:block fixed inset-y-0 left-0 z-50 pointer-events-none"
        />
        <GradualBlur
          position="right"
          width="4rem"
          strength={0.6}
          opacity={0.2}
          className="hidden lg:block fixed inset-y-0 right-0 z-50 pointer-events-none"
        />

        <SmoothScroll>
          <Header />
          <CommandMenu />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
export { metadata };
