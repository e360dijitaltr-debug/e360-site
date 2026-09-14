import { 
  BarChart3, Search, Globe2, Video, Plane, Bot, Share2, 
  Target, TrendingUp, Users, Zap, Shield, LineChart, Play, Aperture,
  Code2, MonitorSmartphone, Cpu 
} from "lucide-react"

export const services = [
  {
    id: "1",
    title: "Meta Ads Reklam Yönetimi",
    slug: "meta-ads",
    description: "Facebook ve Instagram'da yüksek ROAS hedefli, veri odaklı reklam stratejileri.",
    longDescription: "Sadece 'öne çıkar' butonuna basarak bütçenizi israf etmeyin. Meta'nın yapay zeka destekli Advantage+ kampanyaları, doğru hedef kitle segmentasyonu ve dikkat çekici kreatiflerle dönüşüm oranlarınızı maksimize ediyoruz. Piksel kurulumundan dönüşüm API (CAPI) entegrasyonuna kadar tüm teknik süreçleri üstleniyor, her kuruşunuzun getirisini ölçüyoruz.",
    icon: BarChart3,
    features: [
      { title: "Gelişmiş Piksel & CAPI", icon: Zap },
      { title: "Yeniden Hedefleme (Retargeting)", icon: Target },
      { title: "A/B Kreatif Testleri", icon: Shield },
      { title: "ROAS Odaklı Optimizasyon", icon: TrendingUp },
    ],
    seo: {
      title: "Meta Ads Reklam Yönetimi | Çanakkale Facebook & Instagram Reklam",
      description: "Çanakkale merkezli ajansımızla Meta Ads (Facebook & Instagram) reklamlarınızı optimize edin, satışlarınızı ve müşteri sayınızı artırın."
    }
  },
  {
    id: "2",
    title: "Google Ads Yönetimi",
    slug: "google-ads",
    description: "Arama ağı, Display ve YouTube reklamlarıyla doğrudan satın alma niyetindeki kitleye ulaşın.",
    longDescription: "Müşterileriniz tam olarak sunduğunuz hizmeti veya ürünü aradığında ilk sırada olun. Arama Ağı (Search), Görüntülü Reklam Ağı (Display), Maksimum Performans (PMax) ve YouTube reklamlarıyla 360 derece Google hakimiyeti sağlıyoruz. Negatif anahtar kelime stratejileriyle çöp tıklamaları engelliyor, bütçenizi sadece gerçek alıcılara harcıyoruz.",
    icon: Search,
    features: [
      { title: "PMax Kampanyaları", icon: TrendingUp },
      { title: "Arama Ağı Optimizasyonu", icon: Search },
      { title: "Dönüşüm İzleme", icon: LineChart },
      { title: "Bütçe Verimliliği", icon: Zap },
    ],
    seo: {
      title: "Google Ads Ajansı | Çanakkale Google Reklam Yönetimi",
      description: "Google'da ilk sırada yer alın. Sertifikalı uzmanlarımızla Google Ads kampanyalarınızı yönetiyor, dönüşüm oranlarınızı artırıyoruz."
    }
  },
  {
    id: "3",
    title: "E-ihracat Reklam Yönetimi",
    slug: "e-ihracat",
    description: "Sınırları aşın. Global pazarlarda markanızı doğru hedef kitleyle buluşturalım.",
    longDescription: "Yerel pazara sıkışıp kalmayın. Ürünlerinizi Avrupa, Amerika veya Ortadoğu pazarlarına sunmak için gereken lokalize reklam stratejilerini kurguluyoruz. Hedef ülkenin diline, satın alma alışkanlıklarına ve platform tercihlerine uygun global kampanyalarla e-ihracat gelirinizi döviz bazında büyütüyoruz.",
    icon: Globe2,
    features: [
      { title: "Lokalizasyon Stratejisi", icon: Target },
      { title: "Global Rakip Analizi", icon: Search },
      { title: "Çok Dilli Kampanyalar", icon: Globe2 },
      { title: "Gümrük/Kargo Algı Yönetimi", icon: Shield },
    ],
    seo: {
      title: "E-ihracat Reklam Danışmanlığı | Yurt Dışı Satışlarınızı Artırın",
      description: "Global pazarlara açılın. E-ihracat markanız için yurt dışı odaklı Google ve Meta reklam stratejileri kurguluyoruz."
    }
  },
  {
    id: "4",
    title: "Profesyonel Video Çekimi",
    slug: "video",
    description: "Marka kimliğinizi yansıtan, dönüşüm odaklı ve sinematik reklam filmleri.",
    longDescription: "İnsanlar okumak yerine izlemeyi tercih ediyor. Markanızın hikayesini, ürünlerinizin kalitesini veya hizmetinizin değerini anlatan, dijital platformların (Reels, TikTok, YouTube Shorts) dinamiklerine uygun kısa ve etkili videolar üretiyoruz. Senaryo, çekim, kurgu ve renk düzenlemesi (color grading) süreçlerinin tamamını kapsayan uçtan uca prodüksiyon hizmeti.",
    icon: Video,
    features: [
      { title: "Sinematik Ekipmanlar", icon: Aperture },
      { title: "Reels & TikTok Uyumlu", icon: Play },
      { title: "Profesyonel Kurgu/Montaj", icon: Video },
      { title: "Senaryo & Konsept", icon: Target },
    ],
    seo: {
      title: "Çanakkale Video Çekimi & Tanıtım Filmi | Profesyonel Prodüksiyon",
      description: "Markanız için yüksek kaliteli, dönüşüm garantili tanıtım filmleri ve sosyal medya (Reels, TikTok) videoları çekiyoruz."
    }
  },
  {
    id: "5",
    title: "Profesyonel Drone Çekimi",
    slug: "drone",
    description: "Tesis, emlak veya etkinlikleriniz için 4K havadan etkileyici prodüksiyon çözümleri.",
    longDescription: "Markanıza farklı bir perspektif katın. Fabrikalar, oteller, gayrimenkul projeleri, açık hava etkinlikleri ve kurumsal tanıtımlar için profesyonel pilotlarımızla havadan 4K çözünürlükte video ve fotoğraf çekimleri gerçekleştiriyoruz. Elde edilen ham görüntüleri reklam kampanyalarınızda kullanılacak şekilde kurguluyoruz.",
    icon: Plane,
    features: [
      { title: "4K Yüksek Çözünürlük", icon: Video },
      { title: "Geniş Açı Perspektif", icon: Globe2 },
      { title: "Emlak & Tesis Tanıtımı", icon: Target },
      { title: "Lisanslı Operatörler", icon: Shield },
    ],
    seo: {
      title: "Çanakkale Drone Çekimi | Havadan Fotoğraf & Video Prodüksiyon",
      description: "İşletmeniz, tesisiniz veya gayrimenkul projeleriniz için Çanakkale ve çevresinde profesyonel 4K drone çekimi hizmeti."
    }
  },
  {
    id: "6",
    title: "Yapay Zeka İçerik Üretimi",
    slug: "yapay-zeka",
    description: "Yeni nesil AI araçlarıyla markanız için yaratıcı ve SEO uyumlu içerikler.",
    longDescription: "Teknolojinin sınırlarını pazarlama stratejilerine entegre ediyoruz. Gelişmiş yapay zeka modellerini kullanarak sektörel blog yazıları, ürün açıklamaları, sosyal medya metinleri ve görsel taslaklar (midjourney/dall-e) üretiyoruz. Hem hızı artırıyor hem de marka dilinize sadık, SEO uyumlu ve özgün içerik havuzları oluşturuyoruz.",
    icon: Bot,
    features: [
      { title: "SEO Uyumlu Metinler", icon: Search },
      { title: "AI Görsel Üretimi", icon: Aperture },
      { title: "Hızlı İçerik Ölçekleme", icon: Zap },
      { title: "Kişiselleştirilmiş Promtlar", icon: Target },
    ],
    seo: {
      title: "Yapay Zeka Destekli İçerik Üretimi | Dijital Pazarlama",
      description: "Midjourney, ChatGPT ve gelişmiş AI araçlarıyla markanız için hızlı, yaratıcı ve SEO uyumlu dijital içerikler üretiyoruz."
    }
  },
  {
    id: "7",
    title: "Sosyal Medya Yönetimi",
    slug: "sosyal-medya",
    description: "Sadece beğeni değil, topluluk ve sadakat inşa eden premium profil yönetimi.",
    longDescription: "Sosyal medya vitrininizdir. Instagram, LinkedIn, Facebook ve TikTok hesaplarınızı profesyonel bir görsel dille baştan yaratıyoruz. Sadece post paylaşmıyor; stratejik içerik takvimleri oluşturuyor, topluluk yönetimi yapıyor ve etkileşim oranlarınızı organik olarak artıracak 'trend' odaklı paylaşımlar kurguluyoruz.",
    icon: Share2,
    features: [
      { title: "Görsel Kimlik Tasarımı", icon: Aperture },
      { title: "İçerik Takvimi & Planlama", icon: LineChart },
      { title: "Topluluk Yönetimi", icon: Users },
      { title: "Organik Büyüme Stratejisi", icon: TrendingUp },
    ],
    seo: {
      title: "Çanakkale Sosyal Medya Yönetimi Ajansı | Dijital İletişim",
      description: "Markanızın sosyal medya hesaplarını profesyonelce yönetiyor, estetik görseller ve etkileşim odaklı içeriklerle kitlenizi büyütüyoruz."
    }
  },
  {
    id: "8",
    title: "Modern Web Yazılımı",
    slug: "web-yazilim",
    description: "Next.js mimarisiyle ışık hızında, SEO uyumlu ve dönüşüm odaklı web projeleri.",
    longDescription: "Hazır şablonlara ve yavaş yüklenen hantal sistemlere (WordPress vb.) son veriyoruz. İşletmeniz için tamamen size özel, en güncel teknolojilerle (Next.js, React, Tailwind) kodlanmış web siteleri geliştiriyoruz. Milisaniyelik açılış hızları ve kusursuz mobil uyumluluk ile Google'da üst sıralara çıkarken, ziyaretçilerinizi müşteriye dönüştüren premium arayüzler sunuyoruz.",
    icon: Code2,
    features: [
      { title: "Işık Hızında Performans", icon: Zap },
      { title: "Özel UI/UX Tasarımı", icon: MonitorSmartphone },
      { title: "Gelişmiş SEO Altyapısı", icon: Target },
      { title: "Modern Teknolojiler (React)", icon: Cpu },
    ],
    seo: {
      title: "Çanakkale Web Tasarım & Yazılım | Profesyonel Web Sitesi",
      description: "İşletmenize özel, yüksek performanslı, mobil uyumlu ve SEO dostu modern web siteleri geliştiriyoruz."
    }
  }
];

export const blogs = [
  // Çanakkale & Yerel SEO Odaklı (Local Dominance)
  { id: 1, category: "Yerel SEO", title: "Çanakkale'de Dijital Pazarlama ile İşletmenizi Büyütmenin 5 Yolu", excerpt: "Çanakkale'deki yerel işletmelerin dijitalde nasıl öne çıkabileceğini ve müşteri sayılarını nasıl katlayabileceğini inceliyoruz.", date: "15 Eki 2026", readTime: "4 dk", slug: "canakkale-dijital-pazarlama-ile-isletmenizi-buyutun" },
  { id: 2, category: "Google Ads", title: "Çanakkale Restoranları ve Otelleri İçin Google Ads Stratejileri", excerpt: "Turizm ve gıda sektöründe Çanakkale'de en çok aranan işletme olmanın Google Ads (Arama Ağı) sırları.", date: "12 Eki 2026", readTime: "5 dk", slug: "canakkale-restoran-otel-google-ads-stratejileri" },
  { id: 3, category: "Sosyal Medya", title: "Çanakkale'nin En İyi Sosyal Medya Yönetimi Nasıl Yapılır?", excerpt: "Yerel markaların Instagram ve TikTok'ta nasıl viral olabileceğini ve sadık bir müşteri kitlesi yaratabileceğini anlatıyoruz.", date: "10 Eki 2026", readTime: "3 dk", slug: "canakkale-en-iyi-sosyal-medya-yonetimi" },
  { id: 4, category: "Prodüksiyon", title: "Çanakkale Emlak Sektöründe Drone Çekiminin Satışlara Etkisi", excerpt: "Gayrimenkul ve inşaat projelerinde 4K havadan çekimlerin (drone) müşteri karar sürecine doğrudan etkisi.", date: "08 Eki 2026", readTime: "4 dk", slug: "canakkale-emlak-drone-cekimi-satis-etkisi" },
  { id: 5, category: "Web Tasarım", title: "Çanakkale Web Tasarım: İşletmenize Neden Modern Bir Site Lazım?", excerpt: "Hantal ve eski web sitelerinin size nasıl müşteri kaybettirdiğini ve Next.js tabanlı modern sitelerin gücünü keşfedin.", date: "05 Eki 2026", readTime: "6 dk", slug: "canakkale-web-tasarim-modern-site-gucu" },
  
  // Meta Ads (Facebook & Instagram)
  { id: 6, category: "Meta Ads", title: "2026 Meta Ads Algoritması: Sadece Bütçe Değil, Veri Konuşuyor", excerpt: "iOS güncellemelerinden sonra değişen hedefleme mantığı ve yapay zeka destekli Advantage+ kampanyaları nasıl kurgulanmalı?", date: "01 Eki 2026", readTime: "5 dk", slug: "2026-meta-ads-algoritmasi-ve-veri" },
  { id: 7, category: "Meta Ads", title: "Instagram Reklamlarında Yüksek ROAS Elde Etmenin 3 Altın Kuralı", excerpt: "Reklam bütçenizi çöpe atmadan, doğrudan satın almaya yönelik Instagram reklam stratejileri kurgulamanın yolları.", date: "28 Eyl 2026", readTime: "4 dk", slug: "instagram-reklamlarinda-yuksek-roas-kurallari" },
  { id: 8, category: "Meta Ads", title: "Yeniden Hedefleme (Retargeting) ile Sepeti Terk Edenleri Geri Getirin", excerpt: "Sitenize girip alışveriş yapmadan çıkan kullanıcıları Meta pikseli ile nasıl yakalar ve müşteriye dönüştürürsünüz?", date: "25 Eyl 2026", readTime: "4 dk", slug: "yeniden-hedefleme-ile-sepeti-terk-edenleri-kurtarin" },
  { id: 9, category: "Meta Ads", title: "B2B Şirketler İçin Facebook Reklamları İşe Yarar Mı?", excerpt: "Sadece son tüketiciye (B2C) değil, diğer işletmelere (B2B) satış yapan firmaların Facebook reklamlarını nasıl kullanması gerektiği.", date: "22 Eyl 2026", readTime: "5 dk", slug: "b2b-sirketler-icin-facebook-reklamlari" },
  { id: 10, category: "Meta Ads", title: "Reklam Kreatiflerinde A/B Testi Neden Hayat Kurtarır?", excerpt: "Hangi görselin veya videonun daha çok sattığını tahmin etmek yerine, veri odaklı A/B testleriyle kesin sonuçlara ulaşın.", date: "19 Eyl 2026", readTime: "3 dk", slug: "reklam-kreatiflerinde-ab-testi-onemi" },

  // Google Ads & SEO
  { id: 11, category: "Google Ads", title: "Maksimum Performans (PMax) Kampanyaları Nasıl Optimize Edilir?", excerpt: "Google'ın yapay zeka odaklı PMax kampanyalarında bütçe israfını önlemek ve dönüşümleri artırmak için taktikler.", date: "16 Eyl 2026", readTime: "6 dk", slug: "google-pmax-kampanyalari-optimizasyonu" },
  { id: 12, category: "Google Ads", title: "Google Arama Ağı Reklamlarında Negatif Kelimelerin Gücü", excerpt: "Alakasız aramalarda paranızın boşa gitmesini engellemek için negatif anahtar kelime listeleri nasıl oluşturulur?", date: "14 Eyl 2026", readTime: "4 dk", slug: "google-arama-agi-negatif-kelimeler" },
  { id: 13, category: "SEO", title: "E-ticaret Siteleri İçin 2026 SEO Trendleri", excerpt: "Organik trafik çekmek ve Google'da kalıcı olarak üst sıralarda yer almak için e-ticaret sitelerinin yapması gerekenler.", date: "11 Eyl 2026", readTime: "7 dk", slug: "e-ticaret-siteleri-icin-2026-seo-trendleri" },
  { id: 14, category: "SEO", title: "Site Hızının (Core Web Vitals) Satışlara ve SEO'ya Etkisi", excerpt: "Yavaş açılan bir web sitesinin size kaç müşteriye mal olduğunu hiç hesapladınız mı? Next.js'in bu konudaki devrimi.", date: "08 Eyl 2026", readTime: "5 dk", slug: "site-hizi-satis-seo-etkisi" },
  { id: 15, category: "Google Ads", title: "YouTube Reklamları: Atlanamayan Videolarla Marka Bilinirliği", excerpt: "Doğru kurgulanmış YouTube reklamlarının televizyon reklamlarından neden daha ucuz ve etkili olduğunun analizi.", date: "05 Eyl 2026", readTime: "4 dk", slug: "youtube-reklamlari-marka-bilinirligi" },

  // E-İhracat & Global
  { id: 16, category: "E-İhracat", title: "Avrupa Pazarına Açılırken Yapılan En Büyük 3 Hata", excerpt: "Sınır ötesi e-ticaret yaparken reklam bütçenizi boşa harcamamak için dikkat etmeniz gereken lokalizasyon kuralları.", date: "01 Eyl 2026", readTime: "6 dk", slug: "avrupa-pazari-e-ihracat-hatalari" },
  { id: 17, category: "E-İhracat", title: "Mikro İhracat Yapanlar İçin Yurt Dışı Reklam Hedeflemesi", excerpt: "Küçük bütçelerle İngiltere, Almanya ve ABD pazarlarında doğru alıcıyı bulmanın dijital pazarlama sırları.", date: "28 Ağu 2026", readTime: "5 dk", slug: "mikro-ihracat-yurt-disi-reklam-hedefleme" },
  { id: 18, category: "E-İhracat", title: "Shopify ve Yurt Dışı Ödeme Altyapıları İçin Dönüşüm Hileleri", excerpt: "Global müşterinin sepeti terk etmesini engellemek için checkout (ödeme) sayfasında yapılması gereken optimizasyonlar.", date: "25 Ağu 2026", readTime: "4 dk", slug: "shopify-yurt-disi-odeme-donusum-hileleri" },
  { id: 19, category: "E-İhracat", title: "Çok Dilli Reklam Kampanyaları Yönetmenin Zorlukları ve Çözümleri", excerpt: "Farklı dil ve kültürlere reklam çıkarken çeviri hatalarından kaçınmak ve yerel jargonu yakalamak neden önemlidir?", date: "22 Ağu 2026", readTime: "5 dk", slug: "cok-dilli-reklam-kampanyalari-yonetimi" },
  { id: 20, category: "E-İhracat", title: "E-İhracatta ROAS (Yatırım Getirisi) Nasıl Doğru Hesaplanır?", excerpt: "Kur farkları, kargo ve gümrük maliyetleri işin içine girdiğinde dijital reklamların gerçek kârlılığını hesaplama rehberi.", date: "19 Ağu 2026", readTime: "6 dk", slug: "e-ihracat-roas-dogru-hesaplama" },

  // Prodüksiyon (Video & Drone)
  { id: 21, category: "Prodüksiyon", title: "Video Reklamlarda İlk 3 Saniye Kuralı (Hook)", excerpt: "Kullanıcıların dikkat süresi azalıyor. Yüksek dönüşüm getiren video reklamların kancaları (hook) nasıl tasarlanır?", date: "15 Ağu 2026", readTime: "3 dk", slug: "video-reklam-ilk-uc-saniye-kurali" },
  { id: 22, category: "Prodüksiyon", title: "Fabrika ve Üretim Tesisleri İçin Neden Drone Çekimi Şart?", excerpt: "B2B müşterilerinize kurumsal kapasitenizi ve büyüklüğünüzü göstermenin en prestijli yolu: 4K Havadan Çekimler.", date: "12 Ağu 2026", readTime: "4 dk", slug: "fabrika-uretim-tesisleri-drone-cekimi" },
  { id: 23, category: "Prodüksiyon", title: "Reels ve TikTok İçin Kullanıcı Tarafından Üretilen İçerik (UGC)", excerpt: "Çok profesyonel görünen sinematik reklamlar yerine, doğal telefon çekimi hissi veren UGC reklamların yükselişi.", date: "09 Ağu 2026", readTime: "5 dk", slug: "reels-tiktok-ugc-icerik-reklamlari" },
  { id: 24, category: "Prodüksiyon", title: "Ürün Fotoğrafçılığında Işığın Satın Alma Kararına Etkisi", excerpt: "Karanlık ve amatör çekilmiş bir ürünün marka algısını nasıl yıktığını ve profesyonel aydınlatmanın psikolojik gücünü inceledik.", date: "06 Ağu 2026", readTime: "4 dk", slug: "urun-fotografciligi-isik-etkisi" },
  { id: 25, category: "Prodüksiyon", title: "Kurumsal Tanıtım Filmi Çektirirken Ajansa Sormanız Gerekenler", excerpt: "Paranızı sokağa atmamak için, bir prodüksiyon şirketiyle anlaşmadan önce mutlaka kontrol etmeniz gereken detaylar.", date: "03 Ağu 2026", readTime: "6 dk", slug: "kurumsal-tanitim-filmi-ajans-secreken" },

  // Yapay Zeka & Gelecek
  { id: 26, category: "Yapay Zeka", title: "Midjourney ve DALL-E ile Reklam Görsellerinde Maliyet Düşürme", excerpt: "Yapay zeka araçlarını kullanarak telifsiz, markanıza özel ve sınırsız reklam görseli (kreatif) üretmenin yolları.", date: "28 Tem 2026", readTime: "5 dk", slug: "midjourney-dalle-reklam-gorselleri" },
  { id: 27, category: "Yapay Zeka", title: "ChatGPT ile SEO Uyumlu Kategori ve Ürün Açıklaması Yazdırmak", excerpt: "E-ticaret sitenizdeki binlerce ürün için özgün ve SEO'ya dost açıklamaları yapay zeka ile nasıl hızlıca üretirsiniz?", date: "25 Tem 2026", readTime: "4 dk", slug: "chatgpt-seo-urun-aciklamasi-yazdirma" },
  { id: 28, category: "Yapay Zeka", title: "Yapay Zeka Pazarlama Uzmanlarının Yerini Alacak Mı?", excerpt: "Sektördeki en büyük korku. AI araçlarının işimizi elimizden alıp almayacağına dair e-360 Dijital'in vizyoner bakış açısı.", date: "22 Tem 2026", readTime: "6 dk", slug: "yapay-zeka-pazarlama-uzmanlarinin-yerini-alacak-mi" },
  { id: 29, category: "Web Yazılım", title: "İşletmenize Özel Yapay Zeka Destekli Mobil Uygulamalar", excerpt: "Müşterilerinizin cebine girmenin en iyi yolu. React Native ve Expo ile geliştirdiğimiz akıllı mobil uygulamalar.", date: "19 Tem 2026", readTime: "4 dk", slug: "isletmenize-ozel-yapay-zeka-mobil-uygulamalar" },
  { id: 30, category: "Yapay Zeka", title: "Veri Analizinde Yapay Zekanın Gücü: Geleceği Tahmin Etmek", excerpt: "Reklam kampanyalarından gelen karmaşık verileri AI ile işleyip bir sonraki ayın satış projeksiyonunu nasıl yapıyoruz?", date: "16 Tem 2026", readTime: "5 dk", slug: "veri-analizi-yapay-zeka-gelecegi-tahmin" },

  // Çeşitli Sektörel Rehberler
  { id: 31, category: "Dijital Strateji", title: "Diş Hekimleri ve Klinikler İçin Sağlık Turizmi Reklamları", excerpt: "İngiltere ve Avrupa'dan hasta çekmek isteyen kliniklerin Google ve Meta reklamlarında uyması gereken yasal sınırlar ve stratejiler.", date: "10 Tem 2026", readTime: "7 dk", slug: "dis-hekimleri-saglik-turizmi-reklamlari" },
  { id: 32, category: "Dijital Strateji", title: "Otomotiv Sektöründe Lead (Potansiyel Müşteri) Toplama Kampanyaları", excerpt: "Araç kiralama (Rent a car) ve bayiler için dönüşüm oranı yüksek Facebook Lead Form reklamlarının sırları.", date: "07 Tem 2026", readTime: "4 dk", slug: "otomotiv-sektoru-lead-toplama-kampanyalari" },
  { id: 33, category: "Sosyal Medya", title: "2026'da LinkedIn'de B2B Müşteri Bulmanın İncelikleri", excerpt: "Profesyonel ağ LinkedIn'de şirketinizin otoritesini artırarak büyük kurumsal anlaşmalara imza atmanın yolları.", date: "04 Tem 2026", readTime: "5 dk", slug: "linkedin-b2b-musteri-bulma" },
  { id: 34, category: "SEO", title: "Local SEO Nedir? Google Haritalarda Nasıl Üste Çıkılır?", excerpt: "Fiziksel bir mağazanız varsa, etrafınızdaki insanların sizi Google Haritalar'da (My Business) ilk sırada görmesi için yapmanız gerekenler.", date: "01 Tem 2026", readTime: "6 dk", slug: "local-seo-google-haritalarda-uste-cikma" },
  { id: 35, category: "Web Tasarım", title: "WordPress vs Next.js: Hangi Altyapıyı Seçmelisiniz?", excerpt: "İşletmeniz için web sitesi yaptırırken eski nesil WordPress mi yoksa modern React/Next.js mimarisi mi daha kârlı?", date: "28 Haz 2026", readTime: "5 dk", slug: "wordpress-vs-nextjs-hangi-altyapi" },

  // İleri Düzey Taktikler
  { id: 36, category: "Google Ads", title: "Reklam Bütçenizi Tüketen 'Tıklama Sahtekarlığı' (Click Fraud) Nedir?", excerpt: "Rakiplerinizin ve botların reklamlarınıza tıklayarak bütçenizi bitirmesini önleyecek güvenlik duvarı taktikleri.", date: "25 Haz 2026", readTime: "4 dk", slug: "tiklama-sahtekarligi-click-fraud-nedir" },
  { id: 37, category: "Dijital Strateji", title: "Omnichannel Pazarlama: Müşteriyi Her Yerde Karşılamak", excerpt: "Bir kullanıcının Instagram'da gördüğü ürünü, Google'da aratıp, web sitesinden almasına giden çok kanallı satın alma yolculuğu.", date: "22 Haz 2026", readTime: "6 dk", slug: "omnichannel-pazarlama-nedir" },
  { id: 38, category: "Meta Ads", title: "Meta Advantage+ Katalog Reklamları İle Satışları Otomatize Edin", excerpt: "Binlerce ürünü olan e-ticaret siteleri için dinamik katalog reklamlarının kurulumu ve ROAS optimizasyonu.", date: "19 Haz 2026", readTime: "5 dk", slug: "meta-advantage-katalog-reklamlari" },
  { id: 39, category: "Sosyal Medya", title: "Topluluk Yönetimi (Community Management) Neden Satışlardan Önemlidir?", excerpt: "Müşterilerin sadece ürün aldığı değil, markanızla bağ kurduğu bir dijital kabile yaratmanın uzun vadeli getirileri.", date: "16 Haz 2026", readTime: "4 dk", slug: "topluluk-yonetimi-neden-onemli" },
  { id: 40, category: "Prodüksiyon", title: "Etkinlik ve Lansmanlarda Neden Çok Kameralı Reji Kurulmalı?", excerpt: "Büyük kurumsal etkinliklerinizi dijitalde ölümsüzleştirmek için uyguladığımız profesyonel reji ve canlı yayın standartları.", date: "13 Haz 2026", readTime: "3 dk", slug: "etkinlik-lansman-cok-kamerali-reji" },

  // Veri & Analiz
  { id: 41, category: "Veri Analizi", title: "Google Analytics 4 (GA4) Eticaret Kurulumunda En Sık Yapılan Hatalar", excerpt: "Verilerinizi yanlış okumanıza sebep olan eksik yapılandırmalar ve Universal Analytics'ten GA4'e geçerken dikkat edilmesi gerekenler.", date: "10 Haz 2026", readTime: "7 dk", slug: "google-analytics-4-eticaret-kurulum-hatalari" },
  { id: 42, category: "Dijital Strateji", title: "Müşteri Yaşam Boyu Değeri (LTV) Dijital Reklamlarda Neden Önemli?", excerpt: "Bir müşteriyi kazanmak için ödediğiniz paranın (CAC), o müşterinin size ömür boyu bırakacağı kârdan (LTV) düşük olmasını sağlamak.", date: "07 Haz 2026", readTime: "5 dk", slug: "musteri-yasam-boyu-degeri-ltv-nedir" },
  { id: 43, category: "Web Tasarım", title: "Dönüşüm Oranı Optimizasyonu (CRO): Web Siteniz Neden Satmıyor?", excerpt: "Trafiğiniz yüksek ama satışınız yoksa, sitenizin kullanıcı deneyiminde (UX) kör noktalar var demektir. Isı haritaları (Heatmap) ile analiz.", date: "04 Haz 2026", readTime: "6 dk", slug: "donusum-orani-optimizasyonu-cro" },
  { id: 44, category: "SEO", title: "Backlink Alırken Sitenizin Spama Düşmemesi İçin 4 Kritik Uyarı", excerpt: "Otorite artırmak isterken Google'dan ceza (penalty) yememeniz için toksik backlink reddetme süreçleri.", date: "01 Haz 2026", readTime: "4 dk", slug: "backlink-alirken-spama-dusmemek" },
  { id: 45, category: "Sosyal Medya", title: "Influencer Marketing 2026: Mikro ve Nano Etkileyicilerin Yükselişi", excerpt: "Milyon takipçili ünlülere devasa bütçeler harcamak yerine, sadık ve niş kitlelere sahip mikro influencerlar ile çalışmanın avantajları.", date: "28 May 2026", readTime: "5 dk", slug: "influencer-marketing-mikro-nano-etkileyiciler" },

  // Final 5 - E360 Kültürü ve Trendler
  { id: 46, category: "Dijital Strateji", title: "Kriz Dönemlerinde Dijital Reklam Bütçesi Neden Kesilmemeli?", excerpt: "Ekonomik daralmalarda rakipleriniz reklamı durdururken, sizin pastadan çok daha büyük bir pay (Market Share) alma fırsatınız.", date: "25 May 2026", readTime: "4 dk", slug: "kriz-donemlerinde-dijital-reklam-kesilmemeli" },
  { id: 47, category: "Google Ads", title: "Görüntülü Reklam Ağı (GDN) Çöp Trafik Midir?", excerpt: "Milyonlarca alakasız site ve uygulamada görünerek bütçe yakmak yerine, hedef kitle odaklı GDN yerleşimleri nasıl yapılır?", date: "22 May 2026", readTime: "5 dk", slug: "goruntulu-reklam-agi-gdn-cop-trafik-mi" },
  { id: 48, category: "Web Yazılım", title: "PWA (Progressive Web App) Nedir? Siteniz Neden Uygulama Gibi Çalışmalı?", excerpt: "Kullanıcıların web sitenizi tıpkı bir mobil uygulama gibi telefonlarına indirmesini sağlayan PWA teknolojisinin faydaları.", date: "19 May 2026", readTime: "4 dk", slug: "pwa-progressive-web-app-nedir" },
  { id: 49, category: "SEO", title: "Sesli Arama (Voice Search) Optimizasyonu Nasıl Yapılır?", excerpt: "Siri, Alexa ve Google Asistan üzerinden yapılan sesli aramalara yönelik sitenizin içeriğini nasıl optimize edersiniz?", date: "16 May 2026", readTime: "5 dk", slug: "sesli-arama-voice-search-optimizasyonu" },
  { id: 50, category: "Ajans Kültürü", title: "e-360 Dijital Olarak Neden Şeffaf Raporlamaya Takıntılıyız?", excerpt: "Karmaşık Excel tabloları arkasına saklanmıyor, markalarımıza her kuruşun nereye gittiğini anlık dashboardlar ile gösteriyoruz.", date: "13 May 2026", readTime: "3 dk", slug: "e-360-dijital-seffaf-raporlama-kulturu" },
];
// Kategoriye Göre Akıllı Görsel Seçici (Server ve Client ortak kullanımı için buraya taşındı)
export const getBlogImage = (category: string, id: number) => {
  const map: Record<string, string[]> = {
    "Yerel SEO": ["https://images.unsplash.com/photo-1512758684066-84d967786445?q=80&w=800&auto=format&fit=crop"],
    "Google Ads": ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"],
    "Sosyal Medya": ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"],
    "Prodüksiyon": ["https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop"],
    "Web Tasarım": ["https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop"],
    "Meta Ads": ["https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"],
    "SEO": ["https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop"],
    "E-İhracat": ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"],
    "Yapay Zeka": ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"],
    "Web Yazılım": ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"],
    "Dijital Strateji": ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"],
    "Veri Analizi": ["https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop"],
    "Ajans Kültürü": ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"]
  };
  const images = map[category] || ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"];
  return images[id % images.length];
};