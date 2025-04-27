const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Connexion MySQL
const db = mysql.createConnection({
  host: 'mysql-db', // doit correspondre au nom du service MySQL dans Kubernetes
  user: 'root',
  password: 'Melisse123*',
  database: 'iotdb'
});

// Connexion à la base
db.connect((err) => {
  if (err) {
    console.error('❌ Échec connexion MySQL:', err);
  } else {
    console.log('✅ Connecté à MySQL !');
  }
});

// Ping
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Route pour lister les appareils
app.get('/devices', (req, res) => {
  db.query('SELECT * FROM devices', (err, results) => {
    if (err) {
      console.error('❌ Erreur SQL:', err);
      return res.status(500).json({ error: 'Erreur SQL' });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`🚀 Serveur en écoute sur le port ${port}`);
});
