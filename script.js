// Seleciona o formulário e os campos
const productForm = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('image');
const productsContainer = document.getElementById('products');

// Função para salvar os produtos no localStorage
function saveProduct(event) {
  event.preventDefault();

  // Obtém os dados do formulário
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

    // Recupera os produtos existentes do localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Adiciona o novo produto ao array
    products.push(product);


    // Salva o array atualizado no localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Atualiza a lista de produtos na página
    displayProducts();
    
    // Limpa o formulário
    productForm.reset();
  }
}

// Função para exibir os produtos na página
function displayProducts() {
  // Recupera os produtos do localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];
  
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
      <button class="delete-button" onclick="deleteProduct('${product.name}')">🗑️</button>
    `;

    productsContainer.appendChild(productCard);
  });
}

// Se não houver produtos no localStorage, adiciona os predefinidos
if (products.length === 0) {
  const defaultProducts = [
    {
      name: "Produto Exemplo 1",
      price: 50,
      image: "https://via.placeholder.com/200x150.png?text=Produto+1",
    },
    {
      name: "Produto Exemplo 2",
      price: 100,
      image: "https://via.placeholder.com/200x150.png?text=Produto+2",
    },
    {
      name: "Produto Exemplo 3",
      price: 150,
      image: "https://via.placeholder.com/200x150.png?text=Produto+3",
    }
  ];
}

// Verifica se o número de produtos é maior que 4
if (products.length > 4) {
  productsContainer.classList.add('scrollable');
} else {
  productsContainer.classList.remove('scrollable');
}

// Função para rolar suavemente para a esquerda
document.getElementById('scroll-left').addEventListener('click', function() {
  const productsContainer = document.getElementById('products');
  smoothScroll(productsContainer, -380); // Ajuste a distância da rolagem
});

// Função para rolar suavemente para a direita
document.getElementById('scroll-right').addEventListener('click', function() {
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


// Função para excluir um produto
function deleteProduct(productName) {
  // Recupera os produtos
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Filtra o produto a ser removido
  const updatedProducts = products.filter(product => product.name !== productName);

  // Atualiza o localStorage com os produtos restantes
  localStorage.setItem('products', JSON.stringify(updatedProducts));

  // Atualiza a lista de produtos na página
  displayProducts();
}

// Adiciona um ouvinte de evento para o formulário
productForm.addEventListener('submit', saveProduct);

// Exibe os produtos ao carregar a página
window.onload = displayProducts;
