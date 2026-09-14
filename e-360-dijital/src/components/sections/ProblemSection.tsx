"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { PhoneCall } from "lucide-react";

type ProblemProps = {
  settings?: {
    problemTitle?: string | null;
    problemDesc?: string | null;
  } | null;
};

export default function ProblemSection({ settings }: ProblemProps) {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          
          {/* YENİ: Veritabanı bağlantısı eklendi */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            {settings?.problemTitle ? (
              <span dangerouslySetInnerHTML={{ __html: settings.problemTitle }} />
            ) : (
              <>Takvim 2026. <br className="hidden md:block"/> Pazarlama stratejiniz hâlâ <span className="text-slate-500 line-through">2015</span>'teyse küçük bir sorun var.</>
            )}
          </h2>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {settings?.problemDesc || "Sadece sosyal medyada post paylaşmak veya 'öne çıkar' butonuna basmak artık müşteri getirmiyor. Doğru hedefleme, doğru teklif, kaliteli kreatif ve amansız bir ölçümleme şart."}
          </p>
          
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            <PhoneCall className="w-5 h-5" /> Sizi Geleceğe Taşıyalım
          </a>
        </motion.div>
      </div>
    </section>
  );
}