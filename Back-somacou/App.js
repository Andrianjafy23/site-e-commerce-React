const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express(); 
const PORT = 3000;

// Configuration de la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567890',  
    database: 'ecommerce',
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use('/uploads', express.static('uploads')); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage: storage });

// Route POST pour ajouter un produit avec une image
app.post('/api/products', upload.single('image'), (req, res) => {
    const { name, price } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Aucune image téléchargée." });
    }

    const image_url = req.file.path.replace(/\\/g, '/'); 

    const sql = 'INSERT INTO products (name, image_url, price) VALUES (?, ?, ?)';
    db.query(sql, [name, image_url, price], (err, result) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du produit.', error: err });
        }
        
        res.status(200).json({ message: 'Produit ajouté avec succès !', productId: result.insertId });
    });
});

// Route GET pour récupérer tous les produits
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des produits.' });
        }
        res.json(results);
    });
});

// Route POST pour ajouter un client
app.post('/api/client', (req, res) => {
    const { name, address, email, numero } = req.body;

    if (!address || !email || !numero) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
    }

    const sql = 'INSERT INTO client (name, address, email, numero) VALUES (?, ?, ?, ?)';
    const values = [name, address, email, numero];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur SQL lors de l\'insertion :', err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du client.', error: err });
        }

        return res.status(200).json({ message: 'Client ajouté avec succès', result });
    });
});

// Route GET pour récupérer tous les clients
app.get('/api/client', (req, res) => {
    const sql = 'SELECT * FROM client';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ message: 'Erreur lors de la récupération des clients.' });
        }
        res.json(results);
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1); 
    }
    console.log('Connexion à la base de données réussie.');
});
