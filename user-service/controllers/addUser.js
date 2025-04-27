// Nouvelle ligne : utilise __dirname et vérifie le chemin
const db = require(__dirname + '/../db/connection');

exports.addUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    res.status(201).json({ message: 'Utilisateur ajouté', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur.' });
  }
};
