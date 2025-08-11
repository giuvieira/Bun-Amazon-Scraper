import './style.css';

const input = document.getElementById('keyword');
const button = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

button.addEventListener('click', async () => {
  const keyword = input.value.trim();
  if (!keyword) return alert("Digite um produto!");

  resultsDiv.innerHTML = "Buscando...";

  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (!data.products || data.products.length === 0) {
      resultsDiv.innerHTML = "Nenhum produto encontrado.";
      return;
    }

    resultsDiv.innerHTML = data.products.map(prod =>
      `<div style="margin-bottom:20px;">
        <img src="${prod.image}" width="100" />
        <h3>${prod.title}</h3>
        <p>${prod.rating} - ${prod.reviews} avaliações</p>
      </div>`
    ).join('');
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "Erro ao buscar produtos.";
  }
});