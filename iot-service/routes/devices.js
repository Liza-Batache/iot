const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/all', (req, res) => {
    const query = 'SELECT * FROM devices';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(200).json(results);
    });
});

router.get('/', (req, res) => {
    const userId = 1;
    const query = 'SELECT * FROM devices WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des appareils utilisateur :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }
        res.status(200).json(results);
    });
});

router.post('/', (req, res) => {
    const { name, ip_address, user_id } = req.body;

    if (!name || !ip_address || !user_id) {
        return res.status(400).send('Les champs name, ip_address et user_id sont obligatoires.');
    }

    const query = 'INSERT INTO devices (name, ip_address, user_id) VALUES (?, ?, ?)';
    db.query(query, [name, ip_address, user_id], (err) => {
        if (err) {
            console.error('Erreur lors de l\'insertion :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.status(201).send('Appareil ajouté avec succès');
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM devices WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'appareil :', err);
            return res.status(500).send('Erreur serveur');
        }
        if (results.length === 0) {
            return res.status(404).send('Appareil non trouvé');
        }
        res.json(results[0]);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM devices WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression :', err);
            return res.status(500).send('Erreur serveur');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Appareil non trouvé');
        }
        res.send('Appareil supprimé avec succès');
    });
});

module.exports = router;
