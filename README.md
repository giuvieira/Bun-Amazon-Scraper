# Bun-Amazon-Scraper

Um aplicativo web simples e eficiente para raspar listagens de produtos da Amazon, construído com Bun no backend e Vite com Vanilla JavaScript no frontend.

## Objetivo

O objetivo deste projeto é demonstrar a criação de uma aplicação full-stack que realiza web scraping de forma performática. O backend, desenvolvido com Bun, utiliza `axios` e `JSDOM` para raspar dados da primeira página de resultados de busca da Amazon. O frontend, construído com Vite e JavaScript puro, consome essa API e exibe os resultados em uma interface amigável.

## Tecnologias Utilizadas

  * **Backend**: [Bun](https://bun.sh/) (runtime), [Express](https://expressjs.com/pt-br/) (framework web), [Axios](https://axios-http.com/) (cliente HTTP) e [JSDOM](https://www.npmjs.com/package/jsdom) (parser HTML).
  * **Frontend**: [Vite](https://vitejs.dev/) (ferramenta de build), [Vanilla JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) (lógica), HTML e CSS.

## Funcionalidades

  * Backend API (`/api/scrape`):
      * Recebe uma palavra-chave via `query parameter`.
      * Faz a requisição para a página de busca da Amazon.
      * Extrai Título, Avaliação, Número de Reviews e URL da Imagem de cada produto.
      * Retorna os dados em formato JSON.
  * Frontend:
      * Interface simples com campo de busca e botão.
      * Faz a chamada para a API de backend.
      * Renderiza os produtos raspados de forma dinâmica na página.

## Como Executar a Aplicação

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

Certifique-se de ter o [Bun](https://bun.sh/) instalado na sua máquina. O Bun já inclui um gerenciador de pacotes, então não é necessário instalar o Node.js separadamente.

### 1\. Configuração do Backend

1.  Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://docs.github.com/articles/referencing-and-citing-content
    cd Bun-Amazon-Scraper
    ```

2.  Instale as dependências do backend:

    ```bash
    bun install
    ```

3.  Inicie o servidor de backend:

    ```bash
    bun run index.ts
    ```

    O servidor será iniciado na porta `3000`.

### 2\. Configuração do Frontend

1.  Acesse a pasta do frontend em um **novo terminal**:

    ```bash
    cd frontend
    ```

2.  Instale as dependências do frontend:

    ```bash
    bun install
    ```

3.  Inicie o servidor de desenvolvimento do Vite:

    ```bash
    bun run dev
    ```

    O servidor estará disponível no seu navegador em `http://localhost:5173`.

> **Importante:** Ambos os servidores (backend e frontend) precisam estar rodando simultaneamente em terminais separados para que a aplicação funcione completamente.

## Considerações Importantes

  * **Política de Same-Origin (CORS)**: O backend foi configurado com o middleware `cors` para permitir que o frontend, rodando em uma porta diferente (`5173`), faça requisições para a API de raspagem (`3000`) sem ser bloqueado pelo navegador.
  * **Robustez do Scraper**: O scraper utiliza seletores CSS específicos para a estrutura atual da página da Amazon. Se a Amazon atualizar a sua interface, os seletores podem precisar ser ajustados no arquivo `index.ts` para que o scraper continue funcionando.
  * **Tratamento de Erros**: O backend inclui um tratamento de erros robusto para lidar com falhas de requisição, timeouts ou dados incompletos, fornecendo feedback claro no console e para o frontend.
