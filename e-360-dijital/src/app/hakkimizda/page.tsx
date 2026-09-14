import { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

// Google için SEO Metadata Ayarları
export const metadata: Metadata = {
  title: "Hakkımızda | e-360 Dijital - Çanakkale Dijital Pazarlama",
  description: "5 yıldır Çanakkale ve Türkiye genelinde işletmeleri büyütüyoruz. Google & Meta Ads partnerliğimiz, 360° yönetim ve yapay zeka mobil uygulama çözümlerimizle tanışın.",
  keywords: [
    "Çanakkale dijital pazarlama ajansı", 
    "Haktan Demir", 
    "Google Ads Partner", 
    "Meta Ads Partner Çanakkale", 
    "Profesyonel video ve drone çekimi", 
    "Yapay zeka destekli mobil uygulama geliştirme"
  ]
};

export default function AboutPage() {
  return <AboutContent />;
}