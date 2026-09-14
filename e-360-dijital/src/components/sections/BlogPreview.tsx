"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";

// YENİ: Veritabanından gelecek blog verisinin tipini tanımlıyoruz
type PreviewBlog = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string | null;
};

// YENİ: Bileşen artık dışarıdan "blogs" adında bir parametre (props) alıyor
export default function BlogPreview({ blogs }: { blogs: PreviewBlog[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth >= 768 ? 440 : 340;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Dijitalde Güncel Kalın</h2>
            <p className="text-slate-400 text-lg mb-6">Pazarlama stratejileri, platform güncellemeleri ve veri odaklı büyüme taktikleri.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              Tüm Yazıları İncele <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 -translate-y-[60%] z-20 hidden md:flex w-14 h-14 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-xl items-center justify-center text-white hover:bg-blue-600 hover:scale-110 hover:border-transparent transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100">
            <ChevronLeft className="w-8 h-8 -ml-1" />
          </button>

          <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
            <motion.div ref={containerRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 pt-4">
              
              {/* YENİ: Artık data.ts'i değil, props'tan gelen veritabanı bloglarını (ilk 6'sını) dönüyoruz */}
              {blogs.slice(0, 6).map((post, index) => {
                // YENİ: Resim yoksa varsayılan görseli atıyoruz
                const bgImage = post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"; 
                
                return (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="snap-center shrink-0 w-[320px] md:w-[420px] h-[480px] relative rounded-[2rem] overflow-hidden group/card">
                    <Link href={`/blog/${post.slug}`} className="block w-full h-full">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110" style={{ backgroundImage: `url(${bgImage})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 group-hover/card:opacity-80 transition-opacity duration-300" />

                      <div className="absolute inset-x-4 bottom-4 p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 group-hover/card:bg-slate-900/60 group-hover/card:border-blue-500/30 transition-all duration-300 flex flex-col">
                        <div className="mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/40 px-3 py-1.5 rounded-full border border-blue-500/20 shadow-sm">{post.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover/card:text-blue-400 transition-colors pr-6">{post.title}</h3>
                        <p className="text-slate-300 font-medium text-sm leading-relaxed line-clamp-2 mb-6">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs font-medium text-slate-400 mt-auto pt-4 border-t border-white/10">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {post.readTime}</span>
                        </div>
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

          <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 -translate-y-[60%] z-20 hidden md:flex w-14 h-14 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-xl items-center justify-center text-white hover:bg-blue-600 hover:scale-110 hover:border-transparent transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100">
            <ChevronRight className="w-8 h-8 -mr-1" />
          </button>
        </div>
      </div>
    </section>
  );
}