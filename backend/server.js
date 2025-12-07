// backend/server.js

const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// =================== TEST ROUTE ===================
app.get('/', (req, res) => {
  res.send('Backend server is running ✅');
});

// =================== ITEMS (DUMMY DATA) ===================
const items = [
  { id: 1, name: 'Rice', defaultUnit: 'kg' },
  { id: 2, name: 'Wheat Flour', defaultUnit: 'kg' },
  { id: 3, name: 'Cooking Oil', defaultUnit: 'litres' },
  { id: 4, name: 'Sugar', defaultUnit: 'kg' },
  { id: 5, name: 'Biscuit Packets', defaultUnit: 'packets' },
  { id: 6, name: 'Soft Drinks', defaultUnit: 'litres' }
];

// GET /api/items → send list of items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// =================== ORDERS ===================
// Temporary in-memory storage (array)
const orders = [];

// POST /api/orders → receive order from frontend
app.post('/api/orders', (req, res) => {
  const order = req.body;

  console.log('📦 New order received:');
  console.log(JSON.stringify(order, null, 2));

  // push into array
  orders.push({
    ...order,
    createdAt: new Date()
  });

  res.json({
    success: true,
    message: 'Order received successfully on backend',
    totalOrders: orders.length
  });
});

// GET /api/orders → list all orders (for checking)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// =================== START SERVER ===================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
