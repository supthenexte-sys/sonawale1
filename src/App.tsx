import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Clock, MapPin, Newspaper, RefreshCw, ChevronRight, Search, Menu, Tv, Home, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { fetchHyderabadMarketData, MarketData } from './services/marketService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'advertise'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const loadData = async () => {
    setRefreshing(true);
    const marketData = await fetchHyderabadMarketData();
    setData(marketData);
    setLoading(false);
    setRefreshing(false);
  };

  const PageContent = () => {
    switch (currentView) {
      case 'about':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-[#C00000] border-b-4 border-[#C00000] pb-2 inline-block">మా గురించి (About Us)</h2>
            <p className="text-lg leading-relaxed">
              సోనావాలే (Sonawale.com) హైదరాబాద్‌లోని బంగారం మరియు వెండి మార్కెట్ ధరలను ఎప్పటికప్పుడు ఖచ్చితత్వంతో అందించే అగ్రగామి వేదిక. మా లక్ష్యం వినియోగదారులకు మరియు వ్యాపారులకు మార్కెట్ ఒడిదుడుకులను సులభంగా అర్థమయ్యేలా చేయడం.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-[#C00000]">
                <h3 className="font-bold text-xl mb-3">మా లక్ష్యం</h3>
                <p className="text-gray-600 italic">"హైదరాబాద్ మార్కెట్ ధరలను పారదర్శకంగా మరియు వేగంగా ప్రతి ఇంటికీ చేరవేయడం."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-yellow-400">
                <h3 className="font-bold text-xl mb-3">ఎందుకు సోనావాలే?</h3>
                <p className="text-gray-600">మేము కేవలం ధరలనే కాకుండా, మార్కెట్ విశ్లేషణలు మరియు అంతర్జాతీయ ప్రభావాలను కూడా వివరిస్తాము.</p>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-[#C00000] border-b-4 border-[#C00000] pb-2 inline-block">సంప్రదించండి (Contact Us)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-gray-600">మీకు ఏవైనా సందేహాలు ఉన్నా లేదా మాతో కలిసి పనిచేయాలనుకున్నా, దయచేసి క్రింది వివరాల ద్వారా మమ్మల్ని సంప్రదించండి.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded-full text-[#C00000]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">ఈమెయిల్</p>
                      <p className="font-bold">info@sonawale.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded-full text-[#C00000]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">ఫోన్</p>
                      <p className="font-bold">+91 40 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded-full text-[#C00000]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">చిరునామా</p>
                      <p className="font-bold">హైదరాబాద్, తెలంగాణ, భారతదేశం.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-8 shadow-lg rounded-sm">
                <h3 className="text-xl font-bold mb-6">మాకు సందేశం పంపండి</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="మీ పేరు" className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#C00000] outline-none" />
                  <input type="email" placeholder="మీ ఈమెయిల్" className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#C00000] outline-none" />
                  <textarea placeholder="మీ సందేశం" rows={4} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[#C00000] outline-none"></textarea>
                  <button className="w-full bg-[#C00000] text-white font-bold py-3 hover:bg-[#A00000] transition-colors uppercase tracking-widest">పంపండి</button>
                </form>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-[#C00000] border-b-4 border-[#C00000] pb-2 inline-block">గోప్యతా విధానం (Privacy Policy)</h2>
            <div className="prose prose-red max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>సోనావాలేలో మీ గోప్యత మాకు చాలా ముఖ్యం. మేము మీ సమాచారాన్ని ఎలా సేకరిస్తాము మరియు ఉపయోగిస్తాము అనే దాని గురించి ఇక్కడ వివరాలు ఉన్నాయి:</p>
              <h3 className="text-xl font-bold text-black">1. సమాచార సేకరణ</h3>
              <p>మీరు మా వెబ్‌సైట్‌ను సందర్శించినప్పుడు లేదా మా వార్తాలేఖకు సభ్యత్వం పొందినప్పుడు మేము మీ పేరు మరియు ఈమెయిల్ వంటి ప్రాథమిక వివరాలను మాత్రమే సేకరిస్తాము.</p>
              <h3 className="text-xl font-bold text-black">2. కుకీల వినియోగం</h3>
              <p>మెరుగైన వినియోగదారు అనుభవం కోసం మేము కుకీలను ఉపయోగిస్తాము. ఇది వెబ్‌సైట్ పనితీరును మెరుగుపరచడంలో మాకు సహాయపడుతుంది.</p>
              <h3 className="text-xl font-bold text-black">3. సమాచార భద్రత</h3>
              <p>మేము మీ వ్యక్తిగత సమాచారాన్ని ఏ మూడవ పక్షానికి విక్రయించము లేదా పంచుకోము. మీ డేటా మా వద్ద సురక్షితంగా ఉంటుంది.</p>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-[#C00000] border-b-4 border-[#C00000] pb-2 inline-block">నిబంధనలు మరియు షరతులు (Terms)</h2>
            <div className="prose prose-red max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>సోనావాలే వెబ్‌సైట్‌ను ఉపయోగించడం ద్వారా, మీరు ఈ క్రింది నిబంధనలకు అంగీకరిస్తున్నారు:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>వెబ్‌సైట్‌లోని సమాచారం కేవలం అవగాహన కోసం మాత్రమే. పెట్టుబడి నిర్ణయాలకు ముందు నిపుణులను సంప్రదించండి.</li>
                <li>ధరలు మార్కెట్ పరిస్థితులపై ఆధారపడి నిరంతరం మారుతూ ఉంటాయి.</li>
                <li>మా కంటెంట్‌ను అనుమతి లేకుండా కాపీ చేయడం లేదా వాణిజ్యపరంగా ఉపయోగించడం నిషేధించబడింది.</li>
              </ul>
            </div>
          </div>
        );
      case 'advertise':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-[#C00000] border-b-4 border-[#C00000] pb-2 inline-block">ప్రకటనలు (Advertise with Us)</h2>
            <p className="text-lg">మీ వ్యాపారాన్ని హైదరాబాద్‌లోని వేలాది మంది బంగారం మరియు వెండి కొనుగోలుదారులకు చేరవేయండి.</p>
            <div className="bg-yellow-50 p-8 border border-yellow-200 rounded-sm">
              <h3 className="text-xl font-bold mb-4">ప్రకటనల అవకాశాలు:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#C00000] rounded-full"></div> బ్యానర్ ప్రకటనలు</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#C00000] rounded-full"></div> స్పాన్సర్డ్ కథనాలు</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#C00000] rounded-full"></div> వార్తాలేఖ ప్రమోషన్లు</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#C00000] rounded-full"></div> సోషల్ మీడియా ప్రమోషన్లు</li>
              </ul>
              <div className="mt-8">
                <p className="font-bold">మరిన్ని వివరాల కోసం సంప్రదించండి:</p>
                <p className="text-[#C00000] font-black text-xl">ads@sonawale.com</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!data) return;

    // Local Business & Organization Schema
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": "Sonawale",
      "url": "https://sonawale.com",
      "logo": "https://picsum.photos/seed/sonawale/200/200",
      "sameAs": [
        "https://facebook.com/sonawale",
        "https://twitter.com/sonawale"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "description": "Hyderabad's premier gold and silver market news platform in Telugu."
    };

    // Articles Schema
    const articlesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": data.news.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": item.title,
          "description": item.summary,
          "image": item.imageUrl,
          "datePublished": new Date().toISOString(),
          "author": {
            "@type": "Organization",
            "name": "Sonawale"
          }
        }
      }))
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(businessSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(articlesSchema);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [data]);

  const TrendIcon = ({ trend }: { trend: MarketData['trend'] }) => {
    switch (trend) {
      case 'up': return <TrendingUp className="text-red-600 w-5 h-5" />;
      case 'down': return <TrendingDown className="text-green-600 w-5 h-5" />;
      default: return <Minus className="text-gray-400 w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-telugu-body text-gray-900">
      {/* Top Header Bar */}
      <header className="bg-[#C00000] text-white">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              onClick={() => setCurrentView('home')}
              className="bg-white text-[#C00000] px-2 py-1 font-black text-2xl rounded-sm font-telugu-head flex items-center gap-1 cursor-pointer"
            >
              SONAWALE <span className="text-xs font-bold border-l border-[#C00000] pl-1">తెలుగు</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 text-xs font-bold uppercase">
              <Tv className="w-5 h-5" /> LIVE
            </button>
            <Search className="w-5 h-5 cursor-pointer" />
            <Menu className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <nav className="bg-[#A00000] text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 overflow-x-auto">
          <ul className="flex items-center gap-6 h-10 whitespace-nowrap text-sm font-bold">
            <li 
              onClick={() => { setCurrentView('home'); setSelectedCategory(null); }}
              className={cn("cursor-pointer hover:text-yellow-400", !selectedCategory && currentView === 'home' && "text-yellow-400")}
            >
              <Home className="w-5 h-5" />
            </li>
            {["బంగారం ధరలు", "వెండి ధరలు", "మార్కెట్ విశ్లేషణ", "గ్లోబల్ మార్కెట్", "పెట్టుబడి"].map(cat => (
              <li 
                key={cat}
                onClick={() => { setCurrentView('home'); setSelectedCategory(cat); }}
                className={cn("hover:text-yellow-400 cursor-pointer", selectedCategory === cat && "text-yellow-400")}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Breaking News Ticker */}
      <div className="bg-[#E0E0E0] text-black py-1 overflow-hidden whitespace-nowrap border-b border-gray-300">
        <div className="animate-marquee inline-block px-4 font-bold text-sm">
          బ్రేకింగ్ న్యూస్: హైదరాబాద్ మార్కెట్లో బంగారం ధరలు {data?.trend === 'up' ? 'పెరిగాయి' : data?.trend === 'down' ? 'తగ్గాయి' : 'స్థిరంగా ఉన్నాయి'} • వెండి ధర కిలోకు {data?.silver} వద్ద కొనసాగుతోంది • నేటి 24K బంగారం ధర: {data?.gold24k} • 
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {currentView === 'home' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              
              {/* Hero Article (First News Item) */}
              {!loading && data?.news?.[0] && (
                <div className="mb-8 group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden rounded-sm mb-4">
                    <img 
                      src={data.news[0].imageUrl} 
                      alt={data.news[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-0 left-0 bg-[#C00000] text-white px-3 py-1 text-xs font-bold uppercase">
                      {data.news[0].category}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight mb-2 group-hover:text-[#C00000] transition-colors">
                    {data.news[0].title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">{data.news[0].date}</p>
                  <p className="text-gray-700 leading-relaxed">
                    {data.news[0].summary}
                  </p>
                  <div className="h-px bg-gray-200 mt-6"></div>
                </div>
              )}

              {/* Latest Updates Section */}
              <div className="mb-4 flex items-center gap-4">
                <h2 className="text-xl font-black uppercase tracking-tight border-b-4 border-[#C00000] pb-1">
                  {selectedCategory ? selectedCategory : 'LATEST UPDATES'}
                </h2>
                <div className="flex-1 h-px bg-gray-300 mt-2"></div>
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs font-bold text-[#C00000] hover:underline"
                  >
                    అన్నీ చూడండి
                  </button>
                )}
              </div>

              {loading ? (
                <div className="space-y-8 animate-pulse">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-200 w-1/4"></div>
                        <div className="h-6 bg-gray-200 w-full"></div>
                        <div className="h-4 bg-gray-100 w-5/6"></div>
                      </div>
                      <div className="w-32 h-20 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {(selectedCategory 
                    ? data?.news?.filter(n => n.category === selectedCategory)
                    : data?.news?.slice(1)
                  )?.map((item, idx) => (
                    <article key={idx} className="flex gap-4 group cursor-pointer border-b border-dotted border-gray-300 pb-6 last:border-0">
                      <div className="flex-1 flex flex-col gap-1">
                        <span className="text-xs font-bold text-[#C00000] uppercase">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold leading-tight group-hover:text-[#C00000] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs hidden md:block">
                          {item.summary.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="w-32 md:w-48 aspect-[4/3] overflow-hidden rounded-sm flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar: Prices & Market Data */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-sm shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b-2 border-[#C00000] pb-2">
                  <h2 className="text-lg font-black flex items-center gap-2 uppercase">
                    <MapPin className="w-5 h-5 text-[#C00000]" />
                    నేటి మార్కెట్ ధరలు
                  </h2>
                  <button 
                    onClick={loadData}
                    disabled={refreshing}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={cn("w-4 h-4 text-gray-400", refreshing && "animate-spin")} />
                  </button>
                </div>

                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-200 rounded"></div>)}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-sm">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">24K బంగారం (10 గ్రా)</p>
                        <p className="text-xl font-black text-gray-900">{data?.gold24k}</p>
                      </div>
                      <TrendIcon trend={data?.trend || 'stable'} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-sm">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">22K బంగారం (10 గ్రా)</p>
                        <p className="text-xl font-black text-gray-900">{data?.gold22k}</p>
                      </div>
                      <TrendIcon trend={data?.trend || 'stable'} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-sm">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">వెండి (1 కిలో)</p>
                        <p className="text-xl font-black text-gray-900">{data?.silver}</p>
                      </div>
                      <TrendIcon trend={data?.trend || 'stable'} />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase mt-4">
                      <Clock className="w-3 h-3" />
                      అప్‌డేట్: {data?.lastUpdated}
                    </div>
                  </div>
                )}
              </div>

              {/* Market Analysis Ad/Promo */}
              <div className="bg-[#C00000] text-white p-6 rounded-sm text-center">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-yellow-400">SONAWALE PREMIUM</h3>
                <p className="text-lg font-bold mb-4">మార్కెట్ విశ్లేషణలు నేరుగా మీ మొబైల్‌కు!</p>
                <button className="bg-white text-[#C00000] px-6 py-2 text-xs font-bold uppercase rounded-full hover:bg-yellow-400 transition-colors">
                  ఇప్పుడే చేరండి
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-12">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-[#C00000] font-bold mb-8 hover:underline"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> హోమ్ పేజీకి తిరిగి వెళ్ళండి
            </button>
            <PageContent />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16 border-t-4 border-[#C00000]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="bg-white text-[#C00000] px-2 py-1 font-black text-2xl rounded-sm font-telugu-head inline-flex items-center gap-1">
                SONAWALE <span className="text-xs font-bold border-l border-[#C00000] pl-1">తెలుగు</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                హైదరాబాద్‌లోని బంగారం మరియు వెండి మార్కెట్ ధరలు, విశ్లేషణలు మరియు తాజా వార్తలను అందించే నమ్మకమైన వేదిక. మార్కెట్ ఒడిదుడుకులను ఎప్పటికప్పుడు తెలుసుకోండి.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C00000] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C00000] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C00000] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C00000] transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Market Categories */}
            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-6 text-yellow-400 border-l-4 border-[#C00000] pl-3">మార్కెట్ విభాగాలు</h5>
              <ul className="text-sm space-y-3 text-gray-400">
                {["బంగారం ధరలు", "వెండి ధరలు", "మార్కెట్ విశ్లేషణ", "గ్లోబల్ మార్కెట్", "పెట్టుబడి సలహాలు"].map(cat => (
                  <li 
                    key={cat}
                    onClick={() => { setCurrentView('home'); setSelectedCategory(cat.replace(' సలహాలు', '')); window.scrollTo(0, 0); }}
                    className="hover:text-white cursor-pointer flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C00000]" /> {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-6 text-yellow-400 border-l-4 border-[#C00000] pl-3">త్వరిత లింకులు</h5>
              <ul className="text-sm space-y-3 text-gray-400">
                <li onClick={() => setCurrentView('about')} className="hover:text-white cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3 text-[#C00000]" /> మా గురించి</li>
                <li onClick={() => setCurrentView('contact')} className="hover:text-white cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3 text-[#C00000]" /> సంప్రదించండి</li>
                <li onClick={() => setCurrentView('advertise')} className="hover:text-white cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3 text-[#C00000]" /> ప్రకటనలు</li>
                <li onClick={() => setCurrentView('privacy')} className="hover:text-white cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3 text-[#C00000]" /> గోప్యతా విధానం</li>
                <li onClick={() => setCurrentView('terms')} className="hover:text-white cursor-pointer flex items-center gap-2"><ChevronRight className="w-3 h-3 text-[#C00000]" /> నిబంధనలు</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-6 text-yellow-400 border-l-4 border-[#C00000] pl-3">సంప్రదించండి</h5>
              <ul className="text-sm space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C00000] shrink-0" />
                  <span>info@sonawale.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C00000] shrink-0" />
                  <span>+91 40 1234 5678</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C00000] shrink-0" />
                  <span>హైదరాబాద్, తెలంగాణ, భారతదేశం.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">
              © {new Date().getFullYear()} SONAWALE.COM - అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.
            </div>
            <div className="flex gap-6 text-[10px] text-gray-500 uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer">Sitemap</span>
              <span className="hover:text-white cursor-pointer">RSS Feed</span>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        /* Custom Scrollbar for Nav */
        nav div::-webkit-scrollbar {
          height: 0px;
        }
      `}} />
    </div>
  );
}
