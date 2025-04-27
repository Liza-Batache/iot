const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3308, // pas 3306 si tu l’as mappé comme ça
    user: 'root',
    password: 'Melisse123*',
    database: 'iotdb'
    
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err.message);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

module.exports = db;