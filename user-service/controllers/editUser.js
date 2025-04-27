const db = require(__dirname + '/../db/connection');


exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
      [username, email, role, id]
    );

    if (result.affectedRows) {
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur.' });
  }
};
