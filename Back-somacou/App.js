const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const util = require('util');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');


const app = express();
const PORT = 3000;

// Configuration de la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'ecommerce',
});

// Promisify db.query pour utiliser async/await
const query = util.promisify(db.query).bind(db);

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1);
    }
    console.log('Connexion à la base de données réussie.');
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Configuration de multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limiter à 5 MB
});

// Route POST pour ajouter un produit avec une image
app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, price } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Aucune image téléchargée." });
    }

    const image_url = req.file.path.replace(/\\/g, '/'); 

    try {
        const sql = 'INSERT INTO products (name, image_url, price) VALUES (?, ?, ?)';
        const result = await query(sql, [name, image_url, price]);
        res.status(200).json({ message: 'Produit ajouté avec succès !', productId: result.insertId });
    } catch (err) {
        console.error('Erreur SQL:', err);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du produit.', error: err });
    }
});

// Route GET pour récupérer tous les produits
app.get('/api/products', async (req, res) => {
    try {
        const sql = 'SELECT * FROM products';
        const results = await query(sql);
        res.json(results);
    } catch (err) {
        console.error('Erreur lors de la récupération des produits:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des produits.' });
    }

    // Route DELETE pour supprimer un produit
app.delete('/api/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const sql = 'DELETE FROM products WHERE id = ?';
        await query(sql, [productId]);
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (err) {
        console.error("Erreur SQL lors de la suppression du produit:", err);
        res.status(500).json({ message: "Erreur lors de la suppression du produit." });
    }
});



});
app.post('/api/client', async (req, res) => {
    const { name, address, email, numero, cart } = req.body;

    try {
        const sql = 'INSERT INTO client (name, address, email, numero, cart) VALUES (?, ?, ?, ?, ?)';
        const result = await query(sql, [name, address, email, numero, JSON.stringify(cart)]);
        res.status(201).json({ message: 'Client ajouté avec succès', clientId: result.insertId });
    } catch (err) {
        console.error('Erreur SQL lors de l\'ajout du client :', err);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du client.' });
    }
});
// Route GET pour récupérer tous les clients
app.get('/api/client', async (req, res) => {
    try {
        const sql = 'SELECT * FROM client';
        const results = await query(sql);
        res.json(results);
    } catch (err) {
        console.error('Erreur lors de la récupération des clients:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des clients.' });
    }
});


app.delete('/api/client/:id', async (req, res) => {
    const clientId = req.params.id;
    try {
        const sql = 'DELETE FROM client WHERE id = ?';
        await query(sql, [clientId]);
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (err) {
        console.error("Erreur SQL lors de la suppression de la commande:", err);
        res.status(500).json({ message: "Erreur lors de la suppression de la commande." });
    }
});

app.post('/api/users', (req, res) => {
    const { email, password } = req.body;

    // Requête SQL pour récupérer l'utilisateur par email
    db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Erreur SQL:', error);
            return res.status(500).json({ success: false, message: 'Erreur serveur' });
        }

        // Si aucun utilisateur n'est trouvé avec l'email donné
        if (results.length === 0) {
            console.log(`Aucun utilisateur trouvé avec l'email: ${email}`);
            return res.status(401).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        const user = results[0]; // On récupère le premier utilisateur trouvé

        // Log du rôle et mot de passe pour déboguer
        console.log('Utilisateur trouvé:', user);
        console.log('Rôle de l\'utilisateur :', user.role);

        // Comparer le mot de passe en clair
        if (password === user.password && user.role === 'admin') {
            console.log('Mot de passe correct, rôle admin');
            return res.json({ success: true, message: 'Connexion réussie' });
        } else {
            console.log('Mot de passe incorrect ou rôle non admin');
            return res.status(401).json({ success: false, message: 'Identifiants incorrects' });
        }
    });
});

app.post('/api/contact', (req, res) => {
    console.log('Données reçues:', req.body); // Affiche les données reçues
    const { nom = 'default_titre', email, num, sujet, mes } = req.body;
    const sql = 'INSERT INTO contact (nom, email, num, sujet, mes) VALUES (?, ?, ?, ?, ?)';
    const values = [nom, email, num, sujet, mes];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ message: "Erreur lors de l'envoi du message", error: err });
      }
      res.json({ message: 'Message envoyé', result });
    });
  });
      
  

process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Erreur lors de la fermeture de la connexion à la base de données:', err);
        } else {
            console.log('Connexion à la base de données fermée.');
        }
        process.exit();
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
