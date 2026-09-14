import Link from "next/link";
import Logo from "../ui/Logo";
import { siteConfig } from "@/config/site";
import { services } from "@/config/data";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-white brightness-200">
              <Logo theme="light" /> {/* YENİ: Footer'a özel sadece açık tema logoyu istedik */}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
               {/* Sosyal Medya İkonları eklenebilir */}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Hizmetlerimiz</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Ajans</h4>
            <ul className="space-y-3">
              <li><Link href="/hakkimizda" className="text-sm text-slate-400 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">Blog & Görüşler</Link></li>
              <li><Link href="/iletisim" className="text-sm text-slate-400 hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="text-sm text-slate-400">{siteConfig.contact.address}</li>
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g,'')}`} className="text-sm font-medium text-white hover:text-blue-400 transition-colors block">
                  {siteConfig.contact.phone}
                </a>
                <a href={`tel:${siteConfig.contact.phone2.replace(/\s/g,'')}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                  {siteConfig.contact.phone2}
                </a>
              </li>
              <li>
                <Link 
                  href={whatsappUrl} 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 mt-2"
                >
                  WhatsApp'tan Yazın <ArrowUpRight className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/gizlilik" className="hover:text-white">Gizlilik Politikası</Link>
            <Link href="/cerez" className="hover:text-white">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}