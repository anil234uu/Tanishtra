import type { Metadata } from "next";
import { Bebas_Neue, Playfair_Display, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/Header/AnnouncementBar";
import { MainHeader } from "@/components/Header/MainHeader";
import { MobileBottomNav } from "@/components/Header/MobileBottomNav";
import { MobileMenu } from "@/components/Header/MobileMenu";
import { Footer } from "@/components/Footer/Footer";
import { CartDrawer } from "@/components/Ecommerce/CartDrawer";
import { QuickViewModal } from "@/components/Ecommerce/QuickViewModal";

import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { BackToTop } from "@/components/ui/BackToTop";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { OverlaySearch } from "@/components/ui/OverlaySearch";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TANISHTRA | Crafted for Men Who Command Presence",
  description: "Dark masculine luxury fashion brand selling premium men's accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${playfairDisplay.variable} ${inter.variable} ${montserrat.variable} antialiased font-inter bg-background text-text min-h-screen flex flex-col border-none outline-none overflow-x-hidden`}
      >
        <AnnouncementBar />
        <MainHeader />
        <MobileMenu />

        <main className="flex-1 mt-[96px] md:mt-[108px] overflow-x-hidden">
          {children}
        </main>

        <Footer />
        <MobileBottomNav />
        <CartDrawer />
        <QuickViewModal />

        <WhatsAppWidget />
        <BackToTop />
        <CookieConsent />
        <OverlaySearch />
      </body>
    </html>
  );
}
