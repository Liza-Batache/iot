const userModel = require('../../models/userModel');

const db = require('../../db/connection');


exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont obligatoires.' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email], (err, results) => {
    if (err) {
        console.error('Erreur lors de la récupération des données utilisateur :', err);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (results.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = results[0];

    if (user.password !== password) {
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Check role and respond accordingly
    if (user.role === 'admin') {
        res.json({ role: 'admin' });
    } else if (user.role === 'user') {
        res.json({ role: 'user' });
    } else {
        res.status(400).json({ message: 'Role inconnu.' });
    }
});

};

