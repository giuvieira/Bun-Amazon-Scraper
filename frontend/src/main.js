import './style.css';

const input = document.getElementById('keyword');
const button = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

button.addEventListener('click', async () => {
  const keyword = input.value.trim();
  if (!keyword) return alert("Digite um produto!");

  resultsDiv.innerHTML = "<p class='loading'>Buscando...</p>";

  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (!data.products || data.products.length === 0) {
      resultsDiv.innerHTML = "<p class='empty'>Nenhum produto encontrado.</p>";
      return;
    }

    resultsDiv.innerHTML = data.products.map(prod =>
      `<div class="card">
        <img src="${prod.image}" alt="${prod.title}" />
        <div class="info">
          <h3>${prod.title}</h3>
          <p>${prod.rating} - ${prod.reviews} avaliações</p>
        </div>
      </div>`
    ).join('');
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p class='error'>Erro ao buscar produtos.</p>";
  }
});