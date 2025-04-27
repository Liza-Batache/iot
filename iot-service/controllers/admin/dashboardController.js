const db = require('../../db/connection');

// Fonction pour récupérer les statistiques du tableau de bord
exports.getStats = async (req, res) => {
    try {
        const [users] = await db.promise().query('SELECT COUNT(*) AS count FROM users');
        const [devices] = await db.promise().query('SELECT COUNT(*) AS count FROM devices');
        const alertCount = 0; // Vous pouvez ajouter une requête pour les alertes si nécessaire

        // Ajouter au journal
        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, ['Consultation des statistiques du tableau de bord', 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(200).json({
            userCount: users[0].count,
            deviceCount: devices[0].count,
            alertCount, // Exemple statique pour le moment
        });
    } catch (err) {
        console.error('Erreur lors de la récupération des statistiques :', err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};
