const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Route pour récupérer les journaux
router.get('/', (req, res) => {
    const query = 'SELECT * FROM logs ORDER BY timestamp DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des journaux :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json(results);
    });
});

module.exports = router;
