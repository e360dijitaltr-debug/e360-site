// src/components/sections/ServiceVisualizer.tsx
"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Environment, RoundedBox } from "@react-three/drei";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from "recharts";

// --- RECHARTS TOOLTIP ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl">
        <p className="text-white font-bold text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- DATA SETLERİ ---
const metaAdsData = [
  { month: '1. Ay', ROAS: 1.2, Hedef: 1.5 },
  { month: '2. Ay', ROAS: 1.8, Hedef: 1.5 },
  { month: '3. Ay', ROAS: 2.5, Hedef: 2.0 },
  { month: '4. Ay', ROAS: 3.4, Hedef: 2.5 },
  { month: '5. Ay', ROAS: 4.8, Hedef: 3.0 },
  { month: '6. Ay', ROAS: 6.2, Hedef: 4.0 },
];

const googleAdsData = [
  { campaign: 'Arama Ağı', Tıklama: 4500, Dönüşüm: 420 },
  { campaign: 'PMax', Tıklama: 6200, Dönüşüm: 850 },
  { campaign: 'Görüntülü', Tıklama: 8000, Dönüşüm: 150 },
  { campaign: 'YouTube', Tıklama: 3500, Dönüşüm: 210 },
];

const eIhracatData = [
  { name: 'Avrupa (AB)', value: 55, color: '#2563EB' },
  { name: 'Amerika', value: 25, color: '#06B6D4' },
  { name: 'MENA', value: 15, color: '#10B981' },
  { name: 'Diğer', value: 5, color: '#64748B' },
];

const aiData = [
  { subject: 'Üretim Hızı', A: 98, fullMark: 100 },
  { subject: 'Maliyet Avantajı', A: 90, fullMark: 100 },
  { subject: 'SEO Uyumu', A: 95, fullMark: 100 },
  { subject: 'Özgünlük', A: 85, fullMark: 100 },
  { subject: 'Ölçeklenebilirlik', A: 100, fullMark: 100 },
];

// --- 1. SİNEMA KAMERASI MODELİ (Gerçekçi ve Oval) ---
function CameraModel() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <RoundedBox args={[2.2, 1.4, 1.2]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </RoundedBox>
        <RoundedBox position={[-0.2, 0.8, -0.1]} args={[1.2, 0.4, 0.9]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
        </RoundedBox>
        <mesh position={[-0.6, 0.75, 0.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[-0.6, 0.75, -0.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="#2563eb" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.3, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.2, 64]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={1} />
        </mesh>
        <mesh position={[0, 0, 1.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.02, 64]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.5} metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>
  );
}

// --- 2. DRONE MODELİ (Aerodinamik, Pervane Korumalı) ---
function DroneModel() {
  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <group rotation={[0.2, Math.PI / 4, 0]}>
        <RoundedBox args={[1.2, 0.25, 1.2]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        <RoundedBox position={[0, 0.15, 0]} args={[0.7, 0.15, 0.7]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
        </RoundedBox>
        <mesh position={[0, -0.2, 0.4]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.2, 0.53]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 32]} />
          <meshStandardMaterial color="#2563eb" metalness={0.9} roughness={0.1} />
        </mesh>
        {[
          [-1, -1], [1, 1], [-1, 1], [1, -1]
        ].map(([x, z], i) => (
          <group key={i} position={[x * 0.8, 0, z * 0.8]}>
            <mesh position={[-x * 0.4, 0, -z * 0.4]} rotation={[0, Math.atan2(x, z), 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.0, 32]} />
              <meshStandardMaterial color="#334155" metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.15, 32]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.45, 0.015, 16, 64]} />
              <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.01, 32]} />
              <meshStandardMaterial color="#38bdf8" transparent opacity={0.2} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

// --- ANA BİLEŞEN ---
export default function ServiceVisualizer({ slug }: { slug: string }) {
  
  // 3D Obje Gerektiren Hizmetler (Video ve Drone)
  if (slug === 'video' || slug === 'drone') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 bg-slate-950 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl relative w-full max-w-full overflow-hidden" 
      >
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="mb-4 relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              {slug === 'video' ? 'Sinematik Prodüksiyon' : '4K Havadan Çekim'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">Modeli kaydırarak 360° çevirebilirsiniz.</p>
          </div>
          <div className="self-start sm:self-auto text-[10px] uppercase tracking-widest text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">
            3D İnteraktif
          </div>
        </div>
        
        <div className="relative z-10 w-full max-w-full h-[300px] sm:h-[400px] bg-slate-900/40 rounded-2xl border border-slate-800 cursor-grab active:cursor-grabbing overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }} style={{ touchAction: 'pan-y' }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Environment preset="city" />
              {slug === 'video' ? <CameraModel /> : <DroneModel />}
              <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- GRAFİK GEREKTİREN DİĞER HİZMETLER ---
  const renderChart = () => {
    switch (slug) {
      case 'meta-ads':
      case 'sosyal-medya':
        return (
          <div className="w-full h-[300px] min-w-0 relative">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={metaAdsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="ROAS" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRoas)" />
                <Area type="monotone" dataKey="Hedef" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'google-ads':
        return (
          <div className="w-full h-[300px] min-w-0 relative">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={googleAdsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                <XAxis dataKey="campaign" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b' }} />
                <Bar dataKey="Dönüşüm" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Tıklama" fill="#06b6d4" radius={[6, 6, 0, 0]} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'e-ihracat':
        return (
          <div className="w-full h-[300px] min-w-0 relative">
            <ResponsiveContainer width="99%" height="100%">
              <PieChart>
                <Pie
                  data={eIhracatData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {eIhracatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'yapay-zeka':
        return (
          <div className="w-full h-[300px] min-w-0 relative">
            <ResponsiveContainer width="99%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aiData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Radar name="AI Performansı" dataKey="A" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.4} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );

      // --- 5. WEB YAZILIMI: Kod Terminali (Mobilde Düzeltildi) ---
      case 'web-yazilim':
        return (
          <div className="w-full h-[300px] sm:h-[400px] bg-[#0d1117] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col font-mono relative min-w-0">
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-slate-700/50">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-[#8b949e] text-[10px] sm:text-xs">page.tsx - e-360-dijital</div>
              <div className="w-8 sm:w-12" /> {/* Spacer */}
            </div>
            
            {/* Kod Alanı (Whitespace-nowrap eklendi, mobilde font küçültüldü) */}
            <div className="p-3 sm:p-6 text-[10px] sm:text-sm overflow-x-auto no-scrollbar flex-1 relative z-10 leading-loose sm:leading-normal">
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-[#8b949e] mb-2 whitespace-nowrap">// Maksimum performanslı Next.js mimarisi</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="whitespace-nowrap">
                  <span className="text-[#ff7b72]">import</span> <span className="text-[#c9d1d9]">e360</span> <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@/dijital/gelecek'</span>;
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="mt-3 sm:mt-4 whitespace-nowrap">
                  <span className="text-[#ff7b72]">export default function</span> <span className="text-[#d2a8ff]">BüyümeMotoru</span><span className="text-[#c9d1d9]">() {'{'}</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="ml-2 sm:ml-6 mt-1 sm:mt-2 whitespace-nowrap">
                  <span className="text-[#ff7b72]">return</span> <span className="text-[#c9d1d9]">(</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="ml-4 sm:ml-10 mt-1 whitespace-nowrap">
                  <span className="text-[#7ee787]">&lt;MükemmelArayüz</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="ml-6 sm:ml-14 whitespace-nowrap">
                  <span className="text-[#79c0ff]">hız</span>=<span className="text-[#a5d6ff]">"ışık-hızı"</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="ml-6 sm:ml-14 whitespace-nowrap">
                  <span className="text-[#79c0ff]">seo</span>=<span className="text-[#a5d6ff]">"100/100"</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="ml-4 sm:ml-10 whitespace-nowrap">
                  <span className="text-[#7ee787]">/&gt;</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="ml-2 sm:ml-6 mt-1 text-[#c9d1d9] whitespace-nowrap">);</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="mt-1 sm:mt-2 text-[#c9d1d9] whitespace-nowrap">{'}'}</motion.div>
              </motion.div>
            </div>

            {/* Google Lighthouse Scores (Mobilde küçültüldü ve sağ alt köşeye sabitlendi) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 flex gap-2 sm:gap-4 z-20"
            >
              {[
                { label: 'Performans', score: '100' },
                { label: 'SEO', score: '100' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#0d1117]/90 backdrop-blur-md border border-[#27c93f]/30 p-1.5 sm:p-3 rounded-xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(39,201,63,0.15)] min-w-[56px] sm:min-w-[80px]">
                  <svg className="w-6 h-6 sm:w-10 sm:h-10 text-[#27c93f] mb-0.5 sm:mb-1" viewBox="0 0 36 36">
                    <path fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="23" className="text-[10px] sm:text-sm font-bold" fill="#27c93f" textAnchor="middle">{item.score}</text>
                  </svg>
                  <span className="text-[#c9d1d9] text-[7px] sm:text-[10px] uppercase font-semibold">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 bg-slate-950 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl relative w-full max-w-full overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="mb-6 sm:mb-8 relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Veri Projeksiyonu</h3>
          <p className="text-xs sm:text-sm text-slate-400">Bu hizmete ait temsili performans veya dağılım grafiği.</p>
        </div>
      </div>
      
      <div className="relative z-10 w-full overflow-hidden">
        {renderChart()}
      </div>
    </motion.div>
  );
}