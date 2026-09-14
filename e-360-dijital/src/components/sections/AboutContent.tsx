"use client";

import { motion, type Variants } from "framer-motion";
import { 
  Target, Play, Plane, 
  Smartphone, Bot, BarChart3, Search, Sparkles, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AboutContent() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, e-360 Dijital'in büyüme ortaklığı hakkında görüşmek istiyorum.")}`;

  // Bento Grid Kart Animasyonları
  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 overflow-x-hidden">
      
      {/* Hero Alanı */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl mb-16 text-center">
        <motion.div initial="hidden" animate="visible" variants={itemVariant} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 font-bold text-xs mb-6 uppercase tracking-widest border border-blue-200">
            <Sparkles className="w-4 h-4" /> 5. Yılımızda Yeni Hedefler
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Sadece reklam yapmıyor, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              büyüme inşa ediyoruz.
            </span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Ticari faaliyetin ötesinde bir amacımız var: Potansiyeline inandığımız işletmelerle omuz omuza yürümek, 360 derece dijital yönetimle karşılıklı &quot;kazan-kazan&quot; ilkesini gerçeğe dönüştürmek.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid (Showcase Alanı) */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]"
        >
          
          {/* 1. Kutu: Partnerlikler (Span 2) */}
          <motion.div variants={itemVariant} className="col-span-1 md:col-span-2 bg-slate-950 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-700" />
            <div className="relative z-10">
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/5">
                  <Search className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/5">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Resmi Çözüm Ortağı</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Google Ads ve Meta Ads (Facebook/Instagram) partneri olarak; 100&apos;den fazla küçük ve büyük markanın satışlarını ve marka bilinirliğini ölçülebilir şekilde artırdık.
              </p>
            </div>
          </motion.div>

          {/* 2. Kutu: İstatistik (Span 1) */}
          <motion.div variants={itemVariant} className="col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-extrabold text-blue-600 mb-2">100+</div>
            <div className="font-bold text-slate-900 mb-1">Büyütülen Marka</div>
            <p className="text-xs text-slate-500">5 yıllık süreçte dokunduğumuz ve satışlarını katladığımız işletmeler.</p>
          </motion.div>

          {/* 3. Kutu: 360 Derece (Span 1) */}
          <motion.div variants={itemVariant} className="col-span-1 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Target className="w-32 h-32" />
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">360° Yönetim</h3>
              <p className="text-blue-100 text-xs">Stratejiden prodüksiyona, tasarımdan reklama tam kapsamlı dijital sahiplik.</p>
            </div>
          </motion.div>

          {/* 4. Kutu: Prodüksiyon (Çanakkale) (Span 2) */}
          <motion.div variants={itemVariant} className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/20 group">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full w-fit mb-4">
                  <Plane className="w-4 h-4" /> Çanakkale & Bölge
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Premium Prodüksiyon</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Sadece reklam çıkmak yetmez, neyi gösterdiğiniz önemlidir. Çanakkale ve çevre illerde markanızın kimliğine uygun profesyonel video, 4K drone ve ürün çekimleri gerçekleştiriyoruz.
                </p>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Play className="w-4 h-4" /></span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Plane className="w-4 h-4" /></span>
                </div>
              </div>
              <div className="w-full sm:w-48 h-48 rounded-2xl bg-slate-900 relative overflow-hidden flex-shrink-0 group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                 {/* CSS ile yapılmış abstract lens animasyonu */}
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full border-4 border-blue-500/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                       <div className="w-8 h-8 rounded-full bg-cyan-400/80 shadow-[0_0_20px_#22d3ee]" />
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* 5. Kutu: AI ve Mobil Uygulama (Span 2) */}
          <motion.div variants={itemVariant} className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-5">
              <Smartphone className="w-64 h-64 text-blue-600" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Yapay Zeka & Mobil Uygulama</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pazarlamayı yazılımla destekliyoruz. Markanızın teknolojik altyapısını güçlendirmek, operasyonlarınızı hızlandırmak ve müşterilerinize yeni nesil deneyimler sunmak için React Native ve Expo altyapılı, yapay zeka entegreli özel mobil uygulamalar geliştiriyoruz.
              </p>
            </div>
          </motion.div>

          {/* 6. Kutu: Kurucu Mesajı (Span Full) */}
          <motion.div variants={itemVariant} className="col-span-1 md:col-span-3 lg:col-span-4 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mt-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />
            <div className="max-w-3xl mx-auto">
              <svg className="w-10 h-10 text-slate-700 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-8">
                &quot;Bizim için başarı, ay sonunda kesilen faturalar değil; iş ortaklarımızın &apos;sizinle çalıştıktan sonra ciro rekoru kırdık&apos; cümlesidir. e-360 Dijital&apos;i kurarken tek bir kural koydum: İnanmadığımız, büyüteceğimize ikna olmadığımız hiçbir markanın sorumluluğunu almayacağız.&quot;
              </p>
              <div className="inline-flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 mb-3 overflow-hidden">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="https://ui-avatars.com/api/?name=Haktan+Demir&background=2563eb&color=fff&size=128" alt="Haktan Demir" className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-white text-lg">Haktan Demir</div>
                <div className="text-blue-400 text-sm">Kurucu, e-360 Dijital</div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* CTA Alanı */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link 
            href={whatsappUrl}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300"
          >
            Büyüme Yolculuğuna Başlayalım <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}