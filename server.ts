import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

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

app.get('/api/market-data', async (req, res) => {
  try {
    // Fetch latest price from DB
    const latestPriceResult = await db.execute(`
      SELECT * FROM market_prices 
      ORDER BY created_at DESC LIMIT 1
    `);

    let marketData: any = null;

    if (latestPriceResult.rows.length > 0) {
      const latest = latestPriceResult.rows[0];
      marketData = {
        gold24k: latest.gold24k,
        gold22k: latest.gold22k,
        silver: latest.silver,
        trend: latest.trend,
        lastUpdated: new Date(latest.created_at as string).toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' }),
      };
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

    // Fallback if DB is empty
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
