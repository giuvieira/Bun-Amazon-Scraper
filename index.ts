import express from "express";

import type { Express } from 'express';
import cors from "cors";

import axios from "axios";
import { JSDOM } from "jsdom";

const app: Express = express();
const PORT = 3000;

app.use(cors());

app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword as string;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    type Product = {
        title: string;
        rating: string;
        reviews: string;
        image: string;
    };

    const products: Product[] = [];

    document.querySelectorAll(".s-result-item[data-component-type='s-search-result']").forEach(item => {
      const title = item.querySelector("h2 span")?.textContent || "";
      const rating = item.querySelector(".a-icon-alt")?.textContent || "";
      const reviews = item.querySelector(".a-size-base.s-underline-text")?.textContent || "";
      const image = item.querySelector("img.s-image")?.getAttribute("src") || "";

      products.push({ title, rating, reviews, image });
    });

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to scrape Amazon" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("Hello via Bun!");