const db = require(__dirname + '/../db/connection');

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows) {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};
