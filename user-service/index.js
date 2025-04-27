const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

// 🔐 Configuration base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql-db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Melisse123*',
    database: process.env.DB_NAME || 'iotdb',
    port: process.env.DB_PORT || 3306,
    connectTimeout: 10000
});

// 🧪 Test de connexion MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Erreur de connexion à MySQL :", err.message);
        process.exit(1);
    } else {
        console.log("✅ Connexion réussie à la base de données MySQL");
    }
});

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 📄 Route statique dashboard admin
app.get("/html/dashboard_admin.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/dashboard_admin.html"));
});

// ✅ Endpoint santé
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// ✅ Endpoint test utilisateurs
app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ]);
});

// ❌ Page 404 si rien trouvé
app.use((req, res) => {
    res.status(404).send("Page non trouvée");
});

// 🎯 Lancement
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 User-service opérationnel sur http://localhost:${PORT}`);
    console.log(`✅ Endpoint de santé : http://localhost:${PORT}/health`);
});
