const db = require('../db/connection');

// Ajouter un nouvel appareil
exports.addDevice = (req, res) => {
    const { name, ip } = req.body;

    if (!name || !ip) {
        return res.status(400).json({ message: 'Les champs name et ip sont obligatoires.' });
    }

    const query = 'INSERT INTO devices (name, ip_address) VALUES (?, ?)';
    db.query(query, [name, ip], (err) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'appareil :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }

        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, ['Ajout d\'un appareil', 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(201).json({ message: 'Appareil ajouté avec succès.' });
    });
};

// Supprimer un appareil spécifique
exports.deleteDevice = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM devices WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appareil non trouvé.' });
        }

        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, ['Suppression d\'un appareil', 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(200).json({ message: 'Appareil supprimé avec succès.' });
    });
};

// Récupérer tous les appareils (admin uniquement)
exports.getAllDevices = (req, res) => {
    const query = 'SELECT * FROM devices';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des appareils :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }

        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, ['Consultation de la liste des appareils', 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(200).json(results);
    });
};

// Mettre à jour un appareil spécifique
exports.updateDevice = (req, res) => {
    const { id } = req.params;
    const { name, ip_address } = req.body;

    if (!name || !ip_address) {
        return res.status(400).json({ message: 'Les champs name et ip_address sont obligatoires.' });
    }

    const query = 'UPDATE devices SET name = ?, ip_address = ? WHERE id = ?';
    db.query(query, [name, ip_address, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appareil non trouvé.' });
        }

        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, [`Mise à jour de l'appareil ID: ${id}`, 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(200).json({ message: 'Appareil mis à jour avec succès.' });
    });
};

// Récupérer un appareil spécifique par son ID
exports.getDeviceById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM devices WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'appareil :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Appareil non trouvé.' });
        }

        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, [`Consultation de l'appareil ID: ${id}`, 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(200).json(results[0]);
    });
};
exports.getUserDevices = (req, res) => {
    const userId = req.user ? req.user.id : 1; // Exemple avec userId = 1 pour tester
    const query = 'SELECT * FROM devices WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des appareils utilisateur :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }
        res.status(200).json(results);
    });
};
