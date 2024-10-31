import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [pro, setPro] = useState(false);

    // Fonction pour ajouter un produit
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
            fetchProducts();  // Actualiser la liste des produits après l'ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
            alert("Erreur lors de l'ajout du produit.");
        }
    };

    const [commande, setCommande] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fonction pour récupérer les commandes
    const fetchCommande = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/client');
            setCommande(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes:", error);
            alert("Erreur lors de la récupération des commandes.");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchCommande();
    }, []); 
   

    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        }
    };

    // Utilisation de useEffect pour récupérer les commandes et les produits à l'initialisation
    useEffect(() => {
        fetchCommande();
        fetchProducts();
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
                <h2>Liste des Produits</h2>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <img 
                                    src={`http://localhost:3000/${product.image_url}`} 
                                    className="card-img-top" 
                                    alt={product.name} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Prix : ${product.price}</p>
                                    <button className="btn btn-danger w-100">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mt-5">
            <h2>Liste des Commandes</h2>
            {isLoading ? (
                <p>Chargement des commandes...</p>
            ) : commande.length > 0 ? (
                <div className="row">
                    {commande.map((item, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Client: {item.name}</h5>
                                    <p className="card-text">Adresse : {item.address}</p>
                                    <p className="card-text">Email : {item.email}</p>
                                    <p className="card-text">Numéro : {item.numero}</p>
                                    <h6>Panier :</h6>
                                    {item.cart ? (
                                        <ul>
                                            {JSON.parse(item.cart).map((product, i) => (
                                                <li key={i} className="mb-3">
                                                    <img
                                                        src={`http://localhost:3000/${product.image_url}`}
                                                        alt={product.name}
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        className="mb-2"
                                                    />
                                                    <div><strong>Produit :</strong> {product.name}</div>
                                                    <div><strong>Quantité :</strong> {product.quantity}</div>
                                                    <div><strong>Prix :</strong> ${product.price}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Aucun produit dans le panier</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucune commande disponible</p>
            )}
        </div>

        </div>
    );
};

export default Admin;
