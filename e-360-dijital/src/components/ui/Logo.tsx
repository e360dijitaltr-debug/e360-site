import { prisma } from "@/lib/prisma";

type LogoSettings = {
  logoUrl?: string | null;
  logoSvg?: string | null;
  logoDarkUrl?: string | null;
  logoDarkSvg?: string | null;
};

// YENİ: Dışarıdan "theme" adında bir özellik alıyoruz (light, dark veya dynamic)
export default async function Logo({ className = "", theme = "dynamic" }: { className?: string, theme?: "light" | "dark" | "dynamic" }) {
  const settings = (await prisma.siteSettings.findUnique({ where: { id: "global" } })) as LogoSettings | null;

  // BEYAZ/AÇIK LOGO (Koyu Zeminler İçin)
  const renderLight = () => {
    if (settings?.logoSvg) return <div className="logo-light flex items-center [&>svg]:max-h-[36px] [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: settings.logoSvg }} />;
    if (settings?.logoUrl) return <img src={settings.logoUrl} alt="Logo" className="logo-light max-h-[36px] w-auto object-contain" />;
    return (
      <svg className="logo-light" width="140" height="36" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 18C22.5 24.3513 17.3513 29.5 11 29.5C4.64873 29.5 -0.5 24.3513 -0.5 18C-0.5 11.6487 4.64873 6.5 11 6.5C17.3513 6.5 22.5 11.6487 22.5 18Z" fill="#2563EB" fillOpacity="0.1"/>
        <path d="M16 18.5C16 21.5376 13.5376 24 10.5 24C7.46243 24 5 21.5376 5 18.5C5 15.4624 7.46243 13 10.5 13C13.5376 13 16 15.4624 16 18.5Z" fill="#2563EB"/>
        <text x="28" y="24" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#FFFFFF" letterSpacing="-0.03em">e-360<tspan fill="#2563EB">.</tspan></text>
        <text x="88" y="24" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill="#64748B" letterSpacing="0.05em">DİJİTAL</text>
      </svg>
    );
  };

  // SİYAH/KOYU LOGO (Açık Zeminler İçin)
  const renderDark = () => {
    if (settings?.logoDarkSvg) return <div className="logo-dark flex items-center [&>svg]:max-h-[36px] [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: settings.logoDarkSvg }} />;
    if (settings?.logoDarkUrl) return <img src={settings.logoDarkUrl} alt="Logo Dark" className="logo-dark max-h-[36px] w-auto object-contain" />;
    return (
      <svg className="logo-dark" width="140" height="36" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 18C22.5 24.3513 17.3513 29.5 11 29.5C4.64873 29.5 -0.5 24.3513 -0.5 18C-0.5 11.6487 4.64873 6.5 11 6.5C17.3513 6.5 22.5 11.6487 22.5 18Z" fill="#2563EB" fillOpacity="0.1"/>
        <path d="M16 18.5C16 21.5376 13.5376 24 10.5 24C7.46243 24 5 21.5376 5 18.5C5 15.4624 7.46243 13 10.5 13C13.5376 13 16 15.4624 16 18.5Z" fill="#2563EB"/>
        <text x="28" y="24" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="800" fill="#0F172A" letterSpacing="-0.03em">e-360<tspan fill="#2563EB">.</tspan></text>
        <text x="88" y="24" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill="#64748B" letterSpacing="0.05em">DİJİTAL</text>
      </svg>
    );
  };

  return (
    <div className={className}>
      {(theme === "dynamic" || theme === "light") && renderLight()}
      {(theme === "dynamic" || theme === "dark") && renderDark()}
    </div>
  );
}