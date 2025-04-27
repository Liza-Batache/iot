const userModel = require('../../models/userModel');
const ProfileModel = require('../../models/ProfileModel');
const db = require('../../db/connection'); // Connexion à la base de données

// Fonction pour ajouter un profil
exports.addProfile = async (req, res) => {
    console.log('Données reçues :', req.body);
    const { username, email, role, password } = req.body;

    if (!username || !email || !role || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        await userModel.createUser({ username, email, role, password });

        // Ajouter au journal
        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, [`Ajout d'un profil : ${username}`, 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(201).json({ message: 'Profil ajouté avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Fonction pour mettre à jour un profil
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
    }

    try {
        const updatedProfile = await ProfileModel.findByIdAndUpdate(id, updates);

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profil non trouvé.' });
        }

        // Ajouter au journal
        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, [`Mise à jour du profil ID: ${id}`, 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(200).json({ message: 'Profil mis à jour avec succès.', profile: updatedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil.' });
    }
};

// Fonction pour récupérer tous les profils
exports.getAllProfiles = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            return res.status(500).json({ message: 'Erreur serveur.' });
        }
        res.status(200).json(results);
    });
};

// Fonction pour supprimer un profil
exports.deleteProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const profile = await ProfileModel.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Profil non trouvé.' });
        }

        await ProfileModel.deleteById(id);

        // Ajouter au journal
        const logQuery = 'INSERT INTO logs (action, user) VALUES (?, ?)';
        db.query(logQuery, [`Suppression du profil ID: ${id}`, 'Admin'], (err) => {
            if (err) console.error('Erreur lors de l\'ajout au journal :', err);
        });

        res.status(200).json({ message: 'Profil supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du profil :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};
