"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import * as LucideIcons from "lucide-react"; // YENİ: İkonları veritabanından gelen isme göre otomatik çekeceğiz
import { siteConfig } from "@/config/site";

// YENİ: Veritabanından gelecek hizmetlerin tipini tanımladık
type DbService = { title: string; slug: string; description: string; icon: string | null };

export default function Header({ logoNode, dbServices = [] }: { logoNode?: React.ReactNode, dbServices?: DbService[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    setIsMobileMenuOpen(false);
    setIsScrolled(window.scrollY > 20);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;
  const isHomePage = pathname === "/";
  const useDarkText = !isScrolled && !isHomePage && !isMobileMenuOpen;
  const navLinkClass = `text-sm font-bold transition-colors ${useDarkText ? "text-slate-800 hover:text-blue-600" : "text-slate-300 hover:text-white"}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-black/40" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        
        {/* ÇİFT LOGO SİSTEMİ: Kaydırmaya göre beyaz/siyah logo otomatik değişir */}
        <Link href="/" className={`relative z-50 flex-shrink-0 transition-colors ${
          useDarkText 
            ? 'text-slate-900 [&_.logo-light]:hidden [&_.logo-dark]:block' 
            : 'text-white [&_.logo-light]:block [&_.logo-dark]:hidden'
        }`}>
          {logoNode}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className={navLinkClass}>Ana Sayfa</Link>
          <div className="relative group" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
            <button className={`flex items-center gap-1 py-2 ${navLinkClass}`}>
              Hizmetlerimiz <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180 ${useDarkText ? 'text-blue-600' : 'text-blue-400'}`} />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2, ease: "easeOut" }} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/80 border border-slate-800 p-3 grid grid-cols-2 gap-1.5">
                  
                  {/* YENİ: Masaüstü menüsünü veritabanından çekilen 'dbServices' ile oluşturuyoruz */}
                  {dbServices.map((service) => {
                    const Icon = (LucideIcons as any)[service.icon || "Circle"] || LucideIcons.Circle;
                    return (
                      <Link key={service.slug} href={`/hizmetler/${service.slug}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-colors group/item border border-transparent hover:border-slate-700/50">
                        <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white mb-0.5 group-hover/item:text-blue-400 transition-colors">{service.title}</div>
                          <div className="text-xs text-slate-400 line-clamp-1">{service.description}</div>
                        </div>
                      </Link>
                    )
                  })}

                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/hakkimizda" className={navLinkClass}>Hakkımızda</Link>
          <Link href="/blog" className={navLinkClass}>Blog</Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href={whatsappUrl} target="_blank" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20">
            Teklif Al <ArrowRight className="w-4 h-4" />
          </Link>
          <button className={`lg:hidden p-2 rounded-xl border transition-colors ${useDarkText ? "text-slate-800 bg-white border-slate-300 shadow-sm" : "text-white bg-slate-900 border-slate-800"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "100vh" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden fixed inset-0 top-[65px] bg-slate-950/95 backdrop-blur-2xl z-40 overflow-y-auto px-6 pt-6 pb-20 border-t border-slate-800">
            <div className="flex flex-col gap-5 max-w-sm mx-auto">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white py-2 border-b border-slate-900">Ana Sayfa</Link>
              <div className="py-2 border-b border-slate-900">
                <div className="text-xl font-bold text-white mb-3">Hizmetlerimiz</div>
                <div className="grid gap-2 pl-2">
                  
                  {/* YENİ: Mobil menüyü veritabanından çekilen 'dbServices' ile oluşturuyoruz */}
                  {dbServices.map(s => {
                    const Icon = (LucideIcons as any)[s.icon || "Circle"] || LucideIcons.Circle;
                    return (
                      <Link key={s.slug} href={`/hizmetler/${s.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-slate-300 flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-900 transition-colors">
                        <Icon className="w-4 h-4 text-blue-500" /> {s.title}
                      </Link>
                    )
                  })}

                </div>
              </div>
              <Link href="/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white py-2 border-b border-slate-900">Hakkımızda</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white py-2 border-b border-slate-900">Blog</Link>
              <div className="mt-2 mb-24">
                <Link href={whatsappUrl} target="_blank" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl text-base font-bold shadow-xl shadow-blue-600/30 w-full">
                  <Sparkles className="w-5 h-5" /> Hemen Teklif Al
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}