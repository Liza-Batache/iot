const db = require('../db/connection'); // Connexion à votre base de données MySQL

class ProfileModel {
    // Trouver un profil par ID et le mettre à jour
    static async findByIdAndUpdate(id, updates) {
        return new Promise((resolve, reject) => {
            const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updates);
            const query = `UPDATE users SET ${fields} WHERE id = ?`;

            db.query(query, [...values, id], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.affectedRows === 0) {
                    resolve(null); // Pas de mise à jour effectuée
                } else {
                    resolve({ id, ...updates });
                }
            });
        });
    }

    // Trouver un profil par ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE id = ?`;
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0] || null);
                }
            });
        });
    }

    // Créer un nouveau profil
    static create(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)`;
            db.query(query, [data.username, data.email, data.role, data.password], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: results.insertId, ...data });
                }
            });
        });
    }

    // Supprimer un profil par ID
    static deleteById(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM users WHERE id = ?`;
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.affectedRows === 0) {
                    resolve(null); // Aucun profil trouvé
                } else {
                    resolve(true); // Profil supprimé
                }
            });
        });
    }
}

module.exports = ProfileModel;
