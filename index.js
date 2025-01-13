const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Banco de dados simulado
let products = [];

// Rota para listar todos os produtos
app.get('/products', (req, res) => {
  res.json(products);
});

// Rota para adicionar um novo produto
app.post('/products', (req, res) => {
  const { name, price, image } = req.body;
  
  if (!name || !price || !image) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }
  
  const newProduct = { id: Date.now(), name, price, image };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Rota para atualizar um produto
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  
  const productIndex = products.findIndex(product => product.id === parseInt(id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado!' });
  }
  
  products[productIndex] = { ...products[productIndex], name, price, image };
  res.json(products[productIndex]);
});

// Rota para excluir um produto
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  
  const productIndex = products.findIndex(product => product.id === parseInt(id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado!' });
  }
  
  products.splice(productIndex, 1);
  res.status(204).send();
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`API rodando em: http://localhost:${PORT}`);
});
