const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const clientRoutes = require('./routes/Client');
app.use(cors());
app.use(express.json());
app.use('/api/clients', clientRoutes);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

app.use('/api/clients', require('./routes/clients'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
