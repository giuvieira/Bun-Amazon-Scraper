import express from "express";

import type { Express } from 'express';
import cors from "cors";

import axios, { AxiosError } from "axios";
import { JSDOM } from "jsdom";

const app: Express = express();
const PORT = 3000;

app.use(cors());

/**
 * Endpoint para raspar dados da Amazon com base em uma palavra-chave.
 * Utiliza axios para a requisição HTTP e JSDOM para o parsing do HTML.
 */
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword as string;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    
    // Adiciona um User-Agent para simular um navegador e evitar bloqueios da Amazon.
    // Um timeout é definido para prevenir que a requisição trave indefinidamente.
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      timeout: 10000,
    });


    // A requisição pode falhar mesmo sem um erro de rede. Esta verificação lida com códigos de status HTTP não-200, como 404 ou 503.
    if (response.status !== 200) {
      console.error(`Falha na requisição para a Amazon com status: ${response.status}`);
      return res.status(response.status).json({ error: `Falha ao acessar a página da Amazon. Status: ${response.status}` });
    }

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
      const title = item.querySelector("h2 .a-text-normal")?.textContent?.trim() || "";
      const rating = item.querySelector(".a-icon-alt")?.textContent?.trim() || "";
      const reviews = item.querySelector(".a-size-base.s-underline-text")?.textContent?.trim() || "";
      const image = item.querySelector("img.s-image")?.getAttribute("src") || "";

      // evitar dados incompletos ou anúncios que não são produtos reais.
      if (title && image) {
        products.push({ title, rating, reviews, image });
      }
    });

    if (products.length === 0) {
      console.warn('Nenhum produto encontrado para a palavra-chave:', keyword);
      return res.json({ products: [] });
    }

    res.json({ products });

   } catch (error) {
    if (error instanceof AxiosError) {
      // Erro de requisição do Axios (ex: timeout, erro de rede)
      console.error('Erro de requisição para a Amazon:', error.message);
      res.status(502).json({ error: `Erro de rede ao conectar com a Amazon: ${error.message}` });
    } else {
      // Outros erros (ex: JSDOM falha)
      console.error('Erro interno do servidor:', error);
      res.status(500).json({ error: "Falha ao raspar a página da Amazon" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("Hello via Bun!");