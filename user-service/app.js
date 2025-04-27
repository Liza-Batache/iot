const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Endpoint de santé
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Route test users
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ]);
});

const PORT = 3000; // ✅ correspond bien à celui utilisé dans Docker
app.listen(PORT, () => {
  console.log(`User-service running on http://localhost:${PORT}`);
});
