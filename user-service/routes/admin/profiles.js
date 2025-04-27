const express = require('express');
const router = express.Router();
const profilesController = require('../../controllers/admin/profilesController');
const db = require('../../db/connection'); // Connexion DB (si nécessaire directement ici)
// Route pour ajouter un profil
router.post('/add', (req, res, next) => {
    console.log('Requête reçue dans /admin/profiles/add', req.body);
    next();
}, profilesController.addProfile);

router.get('/all', (req, res) => {
    const query = 'SELECT id, username, email, role FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }
        res.status(200).json(results); // Retourne tous les utilisateurs
    });
});


// Route pour mettre à jour un profil
router.put('/:id', profilesController.updateProfile);
router.delete('/delete/:id', profilesController.deleteProfile);
router.get('/all', profilesController.getAllProfiles);
router.patch('/:id', profilesController.updateProfile);
module.exports = router;
