export interface MarketData {
  gold24k: string;
  gold22k: string;
  silver: string;
  lastUpdated: string;
  trend: "up" | "down" | "stable";
  news: {
    title: string;
    summary: string;
    date: string;
    category: string;
    imageUrl: string;
    author?: string;
  }[];
}

export async function fetchHyderabadMarketData(): Promise<MarketData> {
  try {
    const response = await fetch('/api/market-data');
    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    // Fallback data if API fails
    return {
      gold24k: "₹78,500",
      gold22k: "₹72,000",
      silver: "₹95,000",
      lastUpdated: new Date().toLocaleTimeString(),
      trend: "stable",
      news: [
        {
          title: "హైదరాబాద్‌లో స్థిరంగా ఉన్న బంగారం ధరలు",
          summary: "నేడు హైదరాబాద్ మార్కెట్లో బంగారం ధరల్లో ఎటువంటి మార్పు లేదు. అంతర్జాతీయ మార్కెట్ ప్రభావంతో ధరలు స్థిరంగా కొనసాగుతున్నాయి.",
          date: new Date().toLocaleDateString(),
          category: "బంగారం ధరలు",
          imageUrl: "https://pub-0a5d163a427242319da103daaf44fbf3.r2.dev/placeholder-1.jpg",
          author: "Harish"
        },
        {
          title: "పెరుగుతున్న వెండి ధరలు: కిలోకు రూ. 95,000 మార్కు",
          summary: "పారిశ్రామిక డిమాండ్ పెరగడంతో వెండి ధరలు క్రమంగా పెరుగుతున్నాయి. నేడు హైదరాబాద్‌లో వెండి ధర కిలోకు రూ. 95,000 వద్ద ఉంది.",
          date: new Date().toLocaleDateString(),
          category: "వెండి ధరలు",
          imageUrl: "https://pub-0a5d163a427242319da103daaf44fbf3.r2.dev/placeholder-2.jpg",
          author: "Harish"
        }
      ]
    };
  }
}
