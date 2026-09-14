// src/components/sections/ServicesCarousel.tsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "@/config/data";

// 8 Hizmet için 8 Adet Yüksek Kaliteli Unsplash Arka Plan Görseli
const bgImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // 1. Meta Ads
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", // 2. Google Ads
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop", // 3. E-ihracat
  "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop", // 4. Video Çekimi
  "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop", // 5. Drone Çekimi
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop", // 6. Yapay Zeka
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop", // 7. Sosyal Medya
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", // 8. Web Yazılımı (YENİ EKLENDİ)
];

export default function ServicesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sağa/Sola kaydırma fonksiyonu
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth >= 768 ? 400 : 320;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hizmetler" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Hafif arka plan ışığı */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Ortalanmış Başlık */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Uzmanlık Alanlarımız</h2>
            <p className="text-slate-400 text-lg">
              İşletmenizi dijitalde bir sonraki aşamaya taşımak için ihtiyacınız olan tüm veri odaklı ve yaratıcı çözümler.
            </p>
          </motion.div>
        </div>

        {/* Carousel ve Yüzen Oklar (Floating Arrows) Container'ı */}
        <div className="relative group">
          
          {/* Sol Ok - Sadece Desktop'ta görünür */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-[60%] z-20 hidden md:flex w-14 h-14 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-xl items-center justify-center text-white hover:bg-blue-600 hover:scale-110 hover:border-transparent transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-8 h-8 -ml-1" />
          </button>

          {/* Carousel Track */}
          <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
            <motion.div 
              ref={containerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 pt-4"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                
                // Görsel dizisinde eleman yoksa varsayılan son görseli kullan (Güvenlik Önlemi)
                const safeBgImage = bgImages[index] || bgImages[bgImages.length - 1];

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="snap-center shrink-0 w-[300px] md:w-[380px] h-[460px] relative rounded-[2rem] overflow-hidden group/card"
                  >
                    <Link href={`/hizmetler/${service.slug}`} className="block w-full h-full">
                      
                      {/* Arka Plan Görseli */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
                        style={{ backgroundImage: `url(${safeBgImage})` }}
                      />
                      
                      {/* Karartma Katmanı (Karanlık Gradient) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 group-hover/card:opacity-80 transition-opacity duration-300" />

                      {/* İçerik (Buğulu Cam Efekti) */}
                      <div className="absolute inset-x-4 bottom-4 p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 group-hover/card:bg-slate-900/60 group-hover/card:border-blue-500/30 transition-all duration-300 flex flex-col">
                        
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 group-hover/card:scale-110 group-hover/card:bg-blue-600 group-hover/card:text-white transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 pr-6">{service.title}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">{service.description}</p>
                        
                        {/* Hover Arrow */}
                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:border-transparent transition-all duration-300 opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Sağ Ok - Sadece Desktop'ta görünür */}
          <button 
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-[60%] z-20 hidden md:flex w-14 h-14 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-xl items-center justify-center text-white hover:bg-blue-600 hover:scale-110 hover:border-transparent transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-8 h-8 -mr-1" />
          </button>

        </div>
      </div>
    </section>
  );
}