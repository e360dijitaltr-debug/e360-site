"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, MousePointerClick, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

// YENİ: Dışarıdan gelecek ayarların tipini tanımlıyoruz
type HeroProps = {
  settings?: {
    heroTitle?: string | null;
    heroSubtitle?: string | null;
  } | null;
};

export default function Hero({ settings }: HeroProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-52 lg:pb-36 overflow-hidden bg-slate-950 text-white">
      {/* Ambient Glows & Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 sm:top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] sm:w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 max-w-2xl relative z-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-[10px] sm:text-xs mb-6 border border-blue-500/20 uppercase tracking-widest shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Çanakkale & Global Dijital Dönüşüm
            </div>
            
            {/* YENİ: Veritabanında başlık varsa onu, yoksa eskisini göster (HTML taglarını destekler) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6">
              {settings?.heroTitle ? (
                <span dangerouslySetInnerHTML={{ __html: settings.heroTitle }} />
              ) : (
                <>
                  Dijitalde görünür olmak yetmez. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                    Satışa dönüşmek gerekir.
                  </span>
                </>
              )}
            </h1>
            
            {/* YENİ: Veritabanında açıklama varsa onu göster */}
            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 leading-relaxed font-normal pr-4 sm:pr-0">
              {settings?.heroSubtitle || "Rastgele tıklamalar faturaları ödemez. Veri odaklı Meta ve Google Ads mimarileriyle reklam bütçenizi yüksek kârlılığa dönüştürüyoruz."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={whatsappUrl} target="_blank" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300">
                Büyümeyi Başlatalım <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#hizmetler" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-slate-900/80 text-slate-300 px-8 py-4 rounded-2xl text-base font-semibold border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300">
                Nasıl Çalışıyoruz?
              </Link>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-8 sm:hidden relative w-full">
              {/* Mobil Görsel Kartı İçeriği (Değişmedi) */}
              <div className="glass-card p-5 rounded-3xl w-full border border-blue-500/20 shadow-2xl glow-blue relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] pointer-events-none" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"><TrendingUp className="w-5 h-5" /></div>
                    <div><div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Ortalama ROAS</div><div className="text-xs font-semibold text-emerald-400">Temsili Senaryo</div></div>
                  </div>
                  <div className="text-3xl font-extrabold text-white">4.2x</div>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative z-10">
                  <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 1.5, delay: 0.8 }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                </div>
              </div>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 border-t border-slate-900 pt-6">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500" /> Şeffaf Raporlama</div>
              <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-cyan-500" /> Performans Odaklı</div>
            </div>
          </motion.div>

          {/* MASAÜSTÜ YÜZEN KARTLAR (Değişmedi) */}
          <div className="lg:col-span-5 relative h-[420px] hidden sm:block">
            {/* Card 1 */}
            <motion.div initial={{ opacity: 0, x: 20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }} className="absolute top-6 right-4 glass-card p-5 rounded-3xl w-64 z-20 shadow-2xl glow-blue">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"><TrendingUp className="w-5 h-5" /></div>
                <div><div className="text-xs text-slate-400 font-medium">Ortalama ROAS</div><div className="text-xs font-semibold text-emerald-400">Temsili Senaryo</div></div>
              </div>
              <div className="text-4xl font-extrabold text-white">4.2x</div>
              <div className="mt-2 text-xs text-slate-400">Her 1₺ reklama karşılık getiri</div>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8, delay: 0.4, type: "spring" }} className="absolute bottom-10 left-4 glass-card p-5 rounded-3xl w-72 z-30 shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Müşteri Kazanım Oranı</div><Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="text-3xl font-extrabold text-white">+184%</div><div className="text-xs text-emerald-400 font-medium mb-1">Optimizasyon Sonrası</div>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.5, delay: 0.8 }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/80 rounded-3xl border border-slate-800/80 flex items-center justify-center overflow-hidden z-10">
              <MousePointerClick className="w-28 h-28 text-slate-800 absolute" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}