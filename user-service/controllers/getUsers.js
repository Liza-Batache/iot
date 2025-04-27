const db = require(__dirname + '/../db/connection');

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, username, email, role, created_at FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};
