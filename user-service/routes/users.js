const express = require('express');
const { addUser } = require('../controllers/addUser');
const { getUsers } = require('../controllers/getUsers');
const { editUser } = require('../controllers/editUser');
const { deleteUser } = require('../controllers/deleteUser');

const router = express.Router();

// Liste des utilisateurs
router.get('/', getUsers);

// Ajouter un utilisateur
router.post('/', addUser);

// Modifier un utilisateur
router.put('/:id', editUser);

// Supprimer un utilisateur
router.delete('/:id', deleteUser);

module.exports = router;
