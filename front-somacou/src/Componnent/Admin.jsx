import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [commande, setCommande] = useState([]);

    // Fonction pour gérer l'ajout d'un produit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('price', price);

        try {
            const response = await axios.post('http://localhost:3000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setName('');
            setImage(null);
            setPrice('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
            alert('Erreur lors de l\'ajout du produit.');
        }
    };

    // Fonction pour récupérer les commandes
    const fetchCommande = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/client');
            setCommande(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error.message);
            alert('Erreur lors de la récupération des commandes.');
        }
    };

    // Utilisation de useEffect pour récupérer les commandes à l'initialisation
    useEffect(() => {
        fetchCommande();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Ajouter un produit</h2>
            <form onSubmit={handleSubmit} className="border p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Nom du produit</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="Nom du produit"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Image du produit</label>
                    <input
                        type="file"
                        className="form-control"
                        id="productImage"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        id="productPrice"
                        placeholder="Prix"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Ajouter le produit</button>
            </form>

            <div className="mt-5">
                <h2>Liste des commandes</h2>
                {commande.length > 0 ? (
                    commande.map((item, index) => (
                        <div key={index} className="border p-2 mb-2">
                            <h4>{item.name}</h4>
                            <p>Adresse : {item.address}</p>
                            <p>Email : {item.email}</p>
                            <p>Numéro : {item.numero}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucune commande disponible</p>
                )}
            </div>
        </div>
    );
};

export default Admin;
