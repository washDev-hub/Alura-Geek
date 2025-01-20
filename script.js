// Seleciona o formulário e os campos respectivos
const productForm = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('image');
const productsContainer = document.getElementById('products');

// URL base da API
const API_URL = 'http://localhost:3000/products';

// Função para salvar os produtos na API
async function saveProduct(event) {
  event.preventDefault();

  // Obtém os dados do formulário completos
  const name = nameInput.value;
  const price = priceInput.value;
  const image = imageInput.value;

  if (name && price && image) {
    // Cria o objeto do produto
    const product = {
      name,
      price,
      image,
    };

    try {
      // Envia o produto para a API
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      // Atualiza a lista de produtos na página
      displayProducts();

      // Limpa o formulário
      productForm.reset();
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
    }
  }
}

// Função para exibir os produtos na página
async function displayProducts() {
  try {
    // Obtém os produtos da API
    const response = await fetch(API_URL);
    const products = await response.json();

    // Limpa o contêiner de produtos antes de renderizar
    productsContainer.innerHTML = '';

    // Adiciona os produtos ao HTML
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">R$ ${product.price}</p>
        <button class="delete-button" onclick="deleteProduct(${product.id})">🗑️</button>
      `;
      productsContainer.appendChild(productCard);
    });
   // Função de limpar os campos do formulário
function limparFormulario() {
  // Define os valores dos campos do formulário como vazios
  document.getElementById('name').value = ''; // Campo de nome do produto
  document.getElementById('price').value = ''; // Campo de preço
  document.getElementById('image').value = ''; // Campo de imagem
}

// Associar a função ao botão de limpar
document.getElementById('clear').addEventListener('click', limparFormulario);


// Associar a função ao botão de limpar
document.getElementById('clear').addEventListener('click', limparFormulario);


    // Verifica se o número de produtos é maior que 4
    if (products.length > 4) {
      productsContainer.classList.add('scrollable');
    } else {
      productsContainer.classList.remove('scrollable');
    }
  } catch (error) {
    console.error('Erro ao exibir os produtos:', error);
  }
}

// Função para excluir um produto
async function deleteProduct(productId) {
  try {
    // Envia a requisição DELETE para a API
    await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });

    // Atualiza a lista de produtos na página
    displayProducts();
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
  }
}

// Função para rolar suavemente para a esquerda
document.getElementById('scroll-left').addEventListener('click', function () {
  const productsContainer = document.getElementById('products');
  smoothScroll(productsContainer, -380); // Ajuste a distância da rolagem
});

// Função para rolar suavemente para a direita
document.getElementById('scroll-right').addEventListener('click', function () {
  const productsContainer = document.getElementById('products');
  smoothScroll(productsContainer, 380); // Ajuste a distância da rolagem
});

// Função para rolagem suave
function smoothScroll(element, distance) {
  const start = element.scrollLeft;
  const end = start + distance;
  const duration = 400; // Duração da rolagem em milissegundos
  let startTime;

  // Função de animação
  function animateScroll(timestamp) {
    if (!startTime) startTime = timestamp;
    const timeElapsed = timestamp - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    element.scrollLeft = start + (end - start) * progress;

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  // Inicia a animação da rolagem
  requestAnimationFrame(animateScroll);
}

// Adiciona um ouvinte de evento para o formulário
productForm.addEventListener('submit', saveProduct);

// Exibe os produtos ao carregar a página
window.onload = displayProducts;


//Para esconder o Cabeçalho
let lastScrollTop = 0; // Para rastrear a direção do rolar
const header = document.querySelector("header");
const addProduct = document.querySelector(".add-product");

// Função para esconder ou mostrar o cabeçalho
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Rolando para baixo - esconde o cabeçalho e a aba
    header.classList.add("hidden");
    addProduct.classList.add("hidden");
  } else {
    // Rolando para cima - mostra o cabeçalho e a aba
    header.classList.remove("hidden");
    addProduct.classList.remove("hidden");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Impede o valor negativo
});

