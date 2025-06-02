const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// GET /api/clients
router.get('/', async (req, res) => {
  // PUT /api/clients/:id - Modifier un client
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, adresse, telephone, email } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      `
        UPDATE client
        SET nom = ?, prenom = ?, adresse = ?, telephone = ?, email = ?
        WHERE idClient = ?
      `,
      [nom, prenom, adresse, telephone, email, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }

    res.status(200).json({ message: 'Client mis à jour avec succès' });
  } catch (err) {
    console.error('Erreur SQL:', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du client' });
  }
});

});

module.exports = router;
