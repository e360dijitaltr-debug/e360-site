"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart2 } from "lucide-react";

type GrowthProps = {
  settings?: {
    growthTitle?: string | null;
    growthDesc?: string | null;
  } | null;
};

const data = [
  { month: "1. Ay", traffic: 4000, conversion: 240 },
  { month: "2. Ay", traffic: 5000, conversion: 400 },
  { month: "3. Ay", traffic: 7000, conversion: 650 },
  { month: "4. Ay", traffic: 11000, conversion: 1200 },
  { month: "5. Ay", traffic: 18000, conversion: 2800 },
  { month: "6. Ay", traffic: 26000, conversion: 4300 },
];

export default function GrowthSection({ settings }: GrowthProps) {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              
              {/* YENİ: Veritabanı bağlantısı eklendi */}
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {settings?.growthTitle ? (
                  <span dangerouslySetInnerHTML={{ __html: settings.growthTitle }} />
                ) : (
                  "Doğru strateji, rakamlarda kendini belli eder."
                )}
              </h2>
              
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {settings?.growthDesc || "İşletmenizin dijitaldeki potansiyelini tahmin etmiyoruz, hesaplıyoruz. Reklam yatırımınızı şeffaf metriklerle takip edilebilir büyüme grafiklerine dönüştürüyoruz."}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div><div className="text-3xl font-extrabold text-slate-900 mb-1">+450%</div><div className="text-sm font-medium text-slate-500">Örnek Trafik Artışı</div></div>
                <div><div className="text-3xl font-extrabold text-blue-600 mb-1">+12x</div><div className="text-sm font-medium text-slate-500">Potansiyel Müşteri</div></div>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-200/50 px-3 py-1.5 rounded-lg">
                <BarChart2 className="w-4 h-4" /> Temsili Büyüme Senaryosu
              </div>
            </motion.div>
          </div>

          {/* Grafik alanı aynı kaldı */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="mb-6 flex justify-between items-end">
                <div><h3 className="text-lg font-bold text-slate-900">6 Aylık Dijital Büyüme Projeksiyonu</h3><p className="text-sm text-slate-500">Web Trafiği & Dönüşüm Korelasyonu</p></div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} cursor={{ stroke: '#CBD5E1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area type="monotone" dataKey="conversion" name="Dönüşüm" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorConversion)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}