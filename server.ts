import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "exists" : "missing");
console.log("API_KEY:", process.env.API_KEY ? "exists" : "missing");

// Turso DB Connection
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://sonawale-vercel-icfg-fctpkxnw9kfbyxywrghysj9s.aws-ap-south-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzIwOTAwOTEsImlkIjoiMDE5Yzk4Y2MtZTUwMS03MTYyLThkNjQtYjc0NTIxYjBhMTg2IiwicmlkIjoiZmU3MWQ5NTItZTdkNy00OTNmLTg3NGEtNjgzM2EzMTYwNDRiIn0.iATXZ9KPU0OIZ-YhaiFKXppB4twFnnnDBrM0GaJhIF5hC48kfNV9UWY9OQAqHwkBm3OkTsJ8Cx2J618QrU6hAw",
});

// Initialize DB Tables
async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS market_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gold24k TEXT,
      gold22k TEXT,
      silver TEXT,
      trend TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      summary TEXT,
      date TEXT,
      category TEXT,
      image_url TEXT,
      author TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initDB().catch(console.error);

// Gemini AI Setup
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });

async function fetchFromGemini() {
  const prompt = `
  You are a financial news reporter for the Hyderabad gold and silver market.
  Provide the current estimated market prices for Hyderabad in Telugu.
  Include:
  1. 24K Gold price per 10 grams (e.g., "₹72,500")
  2. 22K Gold price per 10 grams (e.g., "₹66,450")
  3. Silver price per 1 kg (e.g., "₹91,000")
  4. trend (either "up", "down", or "stable")

  Also provide 4-5 short news headlines related to the Hyderabad gold/silver market in Telugu.
  For each news item, provide:
  1. title (Telugu)
  2. summary (Telugu)
  3. date (string)
  4. category (Only use: "బంగారం ధరలు", "వెండి ధరలు", "మార్కెట్ విశ్లేషణ", "గ్లోబల్ మార్కెట్", "పెట్టుబడి")
  5. imageUrl (Use a high-quality placeholder URL like https://pub-0a5d163a427242319da103daaf44fbf3.r2.dev/placeholder-[1-5].jpg or https://picsum.photos/seed/[unique_id]/400/250)
  
  Return the data in JSON format with the following structure:
  {
    "gold24k": "...",
    "gold22k": "...",
    "silver": "...",
    "trend": "...",
    "news": [
      {
        "title": "...",
        "summary": "...",
        "date": "...",
        "category": "...",
        "imageUrl": "..."
      }
    ]
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

app.get('/api/market-data', async (req, res) => {
  try {
    // Check if we have data from the last hour
    const latestPriceResult = await db.execute(`
      SELECT * FROM market_prices 
      ORDER BY created_at DESC LIMIT 1
    `);

    let shouldFetchNew = true;
    let marketData: any = null;

    if (latestPriceResult.rows.length > 0) {
      const latest = latestPriceResult.rows[0];
      const createdAt = new Date(latest.created_at as string).getTime();
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;

      if (now - createdAt < oneHour) {
        shouldFetchNew = false;
        marketData = {
          gold24k: latest.gold24k,
          gold22k: latest.gold22k,
          silver: latest.silver,
          trend: latest.trend,
          lastUpdated: new Date(latest.created_at as string).toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' }),
        };
      }
    }

    if (shouldFetchNew) {
      console.log("Fetching new data from Gemini (older than 1 hour or no data)");
      const newData = await fetchFromGemini();
      
      if (newData) {
        // Insert new prices
        await db.execute({
          sql: `INSERT INTO market_prices (gold24k, gold22k, silver, trend) VALUES (?, ?, ?, ?)`,
          args: [newData.gold24k, newData.gold22k, newData.silver, newData.trend]
        });

        // Insert new articles
        if (newData.news && Array.isArray(newData.news)) {
          for (const item of newData.news) {
            await db.execute({
              sql: `INSERT INTO articles (title, summary, date, category, image_url, author) VALUES (?, ?, ?, ?, ?, ?)`,
              args: [item.title, item.summary, item.date, item.category, item.imageUrl, "Harish"]
            });
          }
        }

        marketData = {
          gold24k: newData.gold24k,
          gold22k: newData.gold22k,
          silver: newData.silver,
          trend: newData.trend,
          lastUpdated: new Date().toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' }),
        };
      }
    }

    // Fetch latest 10 articles from DB
    const articlesResult = await db.execute(`
      SELECT * FROM articles 
      ORDER BY created_at DESC LIMIT 10
    `);

    let news = articlesResult.rows.map(row => ({
      title: row.title,
      summary: row.summary,
      date: row.date,
      category: row.category,
      imageUrl: row.image_url,
      author: row.author
    }));

    // Fallback if DB is empty and Gemini failed
    if (!marketData) {
      marketData = {
        gold24k: "₹72,500",
        gold22k: "₹66,450",
        silver: "₹91,000",
        trend: "stable",
        lastUpdated: new Date().toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (news.length === 0) {
      news = [
        {
          title: "హైదరాబాద్‌లో స్థిరంగా కొనసాగుతున్న బంగారం ధరలు",
          summary: "అంతర్జాతీయ మార్కెట్లో సానుకూల పరిణామాల నేపథ్యంలో హైదరాబాద్‌లో బంగారం ధరలు స్థిరంగా ఉన్నాయి.",
          date: new Date().toLocaleDateString('te-IN'),
          category: "బంగారం ధరలు",
          imageUrl: "https://pub-0a5d163a427242319da103daaf44fbf3.r2.dev/placeholder-1.jpg",
          author: "Harish"
        }
      ];
    }

    res.json({
      ...marketData,
      news
    });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
