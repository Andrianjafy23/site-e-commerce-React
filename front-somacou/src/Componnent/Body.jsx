import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { SlArrowDown } from "react-icons/sl";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TiShoppingCart } from "react-icons/ti";

function Body() {
  const [products, setProducts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    literie: true,
    cuisines: true,
    salle: true,
    tissus: true,
    phar: false,
  });

  const [filteredProductName, setFilteredProductName] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };
    fetchProducts();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterClick = (productName) => {
    setFilteredProductName(productName);
  };

  const handleBuyClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    numero: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      numero: formData.numero,
      cart: cart,
    };

    axios.post('http://localhost:3000/api/client', data)
      .then(response => {
        alert('Commande envoyée avec succès');
        setFormData({ name: '', address: '', email: '', numero: '' });
        setCart([]);
        handleCloseForm();
      })
      .catch(error => {
        alert('Erreur lors de l\'envoi de la commande');
      });
  };

 
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert("Bien ajouté au panier");
  };
  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((total, product) => {
    const price = parseFloat(product.price);
    if (isNaN(price)) {
      return total; 
    }
    return total + price;
  }, 0);
  

  const filteredProducts = filteredProductName
    ? products.filter(product => product.name.toLowerCase().includes(filteredProductName.toLowerCase()))
    : products;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='vatany' style={{ overflow: 'hidden', width: '300px', marginRight: '20px' }}>
        <h2>PRODUIT</h2>
        <h3 onClick={() => toggleSection('literie')}>
          <SlArrowDown className={`icon ${expandedSections.literie ? 'rotated' : ''}`} />
          LITERIE
        </h3>
        {expandedSections.literie && (
          <div className='list'>
            {['COUVERTURES', 'DRAPS', 'TRAVERSIN', 'OREILLERS, COUSSINS', 'COUETTE', 'COUVRE LIT'].map(item => (
              <a href="#" key={item} onClick={() => handleFilterClick(item)}>{item}</a>
            ))}
          </div>
        )}

        <h3 onClick={() => toggleSection('cuisines')}>
          <SlArrowDown className={`icon ${expandedSections.cuisines ? 'rotated' : ''}`} />
          CUISINE
        </h3>
        {expandedSections.cuisines && (
          <div className='list'>
            {['NAPPES', 'TORCHONS', 'SERPILLERES'].map(item => (
              <a href="#" key={item} onClick={() => handleFilterClick(item)}>{item}</a>
            ))}
          </div>
        )}

        <h3 onClick={() => toggleSection('salle')}>
          <SlArrowDown className={`icon ${expandedSections.salle ? 'rotated' : ''}`} />
          SALLE DE BAIN
        </h3>
        {expandedSections.salle && (
          <div className='list'>
            {['TAPIS DE BAIN', 'SERVIETTES', 'PEIGNOIR', 'ENSEMBLE'].map(item => (
              <a href="#" key={item} onClick={() => handleFilterClick(item)}>{item}</a>
            ))}
          </div>
        )}

        <h3 onClick={() => toggleSection('tissus')}>
          <SlArrowDown className={`icon ${expandedSections.tissus ? 'rotated' : ''}`} />
          TISSUS
        </h3>
        {expandedSections.tissus && (
          <div className='list'>
            {['TISSUS D\'AMEUBLEMENT', 'TISSUS LINGE DE MAISON', 'TISSUS IMPORT', 'TISSUS MÉTIS'].map(item => (
              <a href="#" key={item} onClick={() => handleFilterClick(item)}>{item}</a>
            ))}
          </div>
        )}

        <h3 onClick={() => toggleSection('phar')}>
          <SlArrowDown className={`icon ${expandedSections.phar ? 'rotated' : ''}`} />
          PHARMACEUTIQUES
        </h3>
        {expandedSections.phar && (
          <div className='list'>
            <a href="#" onClick={() => handleFilterClick('COTON')}>COTON</a>
          </div>
        )}
      
      </div>

      <div className='produit'>
  
  <button style={{ border: 'none', marginLeft:'85%', marginBottom:'10px', backgroundColor:'white' }} onClick={() => setShowCart(!showCart)}>
    {showCart ? (
      <>
        Mon compte|<TiShoppingCart style={{ fontSize: '30px' }} />
      </>
    ) : (
      <>
        Mon compte|<TiShoppingCart style={{ fontSize: '30px' }} />
      </>
    )}
  </button>


        {showCart && (
          <div className='panier' style={{ marginTop: '20px', backgroundColor:'#adc4d5' }}>
            <h1>Panier</h1>
            <ul style={{ 
              listStyleType: 'none',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '20px',
            }}>
              {cart.map((item, index) => (
                <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <p>{item.name} - {item.price} ar</p>
                  <img
                    src={`http://localhost:3000/${item.image_url}`}
                    alt={item.name}
                    style={{ width: '100%', height: 'auto', maxWidth: '100px' }}
                  />
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(index)}>Retirer</button>
                </li>
              ))}
            </ul>
            {cart.length === 0 && <p>Votre panier est vide.</p>}
            {cart.length > 0 && <h3>Total: {totalPrice} ar</h3>}
            <button className="btn btn-primary" onClick={handleBuyClick}>Envoyer la commande</button>
          </div>
        )}
        <ul style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          listStyleType: 'none',
          padding: 0
        }}>
          {filteredProducts.map((product) => (
            <li key={product.id} style={{
              textAlign: 'center',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3>{product.name}</h3>
              <img
                src={`http://localhost:3000/${product.image_url}`}
                alt={product.name}
                style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
              />
              <p>Prix: {product.price} ar</p>
              <button className="btn btn-secondary" onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
            </li>
          ))}
        </ul>
        
        {showForm && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Formulaire de commande</h5>
                  <button type="button" className="btn-close" onClick={handleCloseForm}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nom</label>
                      <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Adresse</label>
                      <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="numero" className="form-label">Numéro</label>
                      <input type="text" className="form-control" id="numero" value={formData.numero} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;