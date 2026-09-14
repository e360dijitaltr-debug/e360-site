import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/ui/Logo";
import { prisma } from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-360 Dijital | Çanakkale Dijital Pazarlama Ajansı",
  description: "Çanakkale merkezli dijital pazarlama ajansı. Google Ads, Meta Ads, e-ihracat reklamları ve yaratıcı prodüksiyon ile işletmenizi dijitalde büyütün.",
  keywords: ["Çanakkale dijital pazarlama ajansı", "dijital pazarlama", "Google Ads", "Meta Ads", "sosyal medya yönetimi", "drone çekimi", "profesyonel video çekimi"],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // YENİ: Veritabanından hizmetleri sırasına göre çekiyoruz
  const dbServices = await prisma.service.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-slate-900 flex flex-col min-h-screen`}>
        
        {/* İŞTE SİHİRLİ DOKUNUŞ BURADA: dbServices'i Header'a aktardık! */}
        <Header logoNode={<Logo />} dbServices={dbServices} />
        
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}