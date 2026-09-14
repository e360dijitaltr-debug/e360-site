import { FileText, Briefcase, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Kontrol Paneli</h1>
      <p className="text-slate-500 font-medium mb-8">Sitenizin genel durumunu buradan takip edebilirsiniz.</p>

      {/* İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">0</div>
            <div className="text-sm font-semibold text-slate-500">Yayındaki Bloglar</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">0</div>
            <div className="text-sm font-semibold text-slate-500">Aktif Hizmetler</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">%100</div>
            <div className="text-sm font-semibold text-slate-500">Sistem Durumu</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Kurulum Başarılı! 🚀</h3>
        <p className="text-slate-600">Kendi özel veritabanımız ve panelimiz aktif. Sol menüden Blog veya Hizmetler sayfasına geçerek içerik eklemeye başlayabiliriz.</p>
      </div>
    </div>
  );
}