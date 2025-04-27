const db = require('../db/connection');

// Trouver un utilisateur par email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// Ajouter un nouvel utilisateur
exports.createUser = ({ username, email, role, password }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)';
        console.log('Requête exécutée :', query);
        db.query(query, [username, email, role, password], (err, results) => {
            if (err) {
                console.error('Erreur MySQL :', err);
                return reject(err); // Rejet de la promesse en cas d'erreur
            }
            resolve(results); // Résolution de la promesse avec les résultats
        });
    });
};

// Trouver un utilisateur par email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};