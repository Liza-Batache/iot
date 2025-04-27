const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const authController = require('../../controllers/shared/authController');
// Route POST pour la connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Erreur lors de la connexion :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }

        if (results.length > 0) {
            const user = results[0];
            res.status(200).json({
                message: 'Connexion réussie.',
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            res.status(401).json({ message: 'Identifiants invalides.' });
        }
    });
});

router.post('/login', authController.login);

module.exports = router;
