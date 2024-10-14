import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';  
import { SlArrowDown } from "react-icons/sl";
import 'bootstrap/dist/css/bootstrap.min.css';

function Body() {
  const [products, setProducts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    literie: false,
    cuisines: false,
    salle: false,
    tissus: false,
    phar: false,
  });

  const [activeSection, setActiveSection] = useState(null);
  const [showForm, setShowForm] = useState(false); 

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

  const handleLinkClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleBuyClick = () => {
    setShowForm(true); // Affiche le formulaire lorsque le bouton "Acheter" est cliqué
  };

  const handleCloseForm = () => {
    setShowForm(false); // Cache le formulaire lorsque le bouton "Fermer" est cliqué
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
  
    // Données du formulaire
    const data = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      numero: formData.numero, 
    };
  
    // Envoyer les données au serveur
    axios.post('http://localhost:3000/api/client', data)
      .then(response => {
        console.log(response.data);
        alert('Commande envoyée avec succès');
        setFormData({ name: '', address: '', email: '', numero: '' });
        handleCloseForm(); 
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du client', error);
        alert('Erreur lors de l\'envoi de la commande'); // Alerte en cas d'erreur
      });
  };
  
  

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='vatany' style={{ overflow: 'hidden', width: '300px', marginRight: '20px' }}>
        <h2>PRODUIT</h2>

        {/* Sections de produits */}
        <h3 onClick={() => toggleSection('literie')}>
          <SlArrowDown className={`icon ${expandedSections.literie ? 'rotated' : ''}`} />
          LITERIE
        </h3>
        {expandedSections.literie && (
          <div className='list'>
            {['COUVERTURES', 'DRAPS', 'TRAVERSIN', 'OREILLERS, COUSSINS', 'COUETTE', 'COUVRE LIT'].map(item => (
              <a href="#" key={item} onClick={() => handleLinkClick('literie')}>{item}</a>
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
              <a href="#" key={item} onClick={() => handleLinkClick('cuisines')}>{item}</a>
            ))}
          </div>
        )}

        <h3 onClick={() => toggleSection('salle')}>
          <SlArrowDown className={`icon ${expandedSections.salle ? 'rotated' : ''}`} />
          SALLE DE BAIN
        </h3>
        {expandedSections.salle && (
          <div className='list'>
            <a href="#" onClick={() => handleLinkClick('salle')}>TAPIS DE BAIN</a>
            <a href="#" onClick={() => handleLinkClick('salle')}>SERVIETTES</a>
            <a href="#" onClick={() => handleLinkClick('salle')}>PEIGNOIR</a>
            <a href="#" onClick={() => handleLinkClick('salle')}>ENSEMBLE</a>
          </div>
        )}

        <h3 onClick={() => toggleSection('tissus')}>
          <SlArrowDown className={`icon ${expandedSections.tissus ? 'rotated' : ''}`} />
          TISSUS
        </h3>
        {expandedSections.tissus && (
          <div className='list'>
            {['TISSUS D\'AMEUBLEMENT', 'TISSUS LINGE DE MAISON', 'TISSUS IMPORT', 'TISSUS MÉTIS'].map(item => (
              <a href="#" key={item} onClick={() => handleLinkClick('tissus')}>{item}</a>
            ))}
          </div>
        )}

        <h3 onClick={() => toggleSection('phar')}>
          <SlArrowDown className={`icon ${expandedSections.phar ? 'rotated' : ''}`} />
          PHARMACEUTIQUES
        </h3>
        {expandedSections.phar && (
          <div className='list'>
            <a href="#" onClick={() => handleLinkClick('phar')}>COTON</a>
          </div>
        )}

        <h3>MENAGE</h3>
        <h3>RIDEAUX</h3>
        <h3>BRODERIE</h3>
        <h3>FIL A TRICOTER</h3>
      </div>

      <div className='produit'>
        {!activeSection && (
          <div className='pardefaut'>
            <ul style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '20px', 
              listStyleType: 'none', 
              padding: 0 
            }}>
            {products.map((product) => (
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
                <p>Prix: {product.price} €</p>
                <button className="btn btn-primary" onClick={handleBuyClick}>Acheter</button>
              </li>
            ))}
            </ul>
          </div>
        )}

        {activeSection === 'literie' && (
          <div className='literi'>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <h3>{product.name}</h3>
                  <img 
                    src={`http://localhost:5000/${product.image_url} `} 
                    alt={product.name} 
                    style={{ width: '200px', height: 'auto' }} 
                  />
                  <p>Prix: {product.price} €</p>
                  <p>Date de création: {new Date(product.created_at).toLocaleString()}</p>
                  <button>Acheter</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'cuisines' && (
          <div className='cuisine'>
            <h2>Produit cuisines</h2>
            <div>
              <img src="" alt="Produit cuisine 1" />
              <img src="" alt="Produit cuisine 2" />
            </div>
            <label>Prix: 50€</label>
          </div>
        )}

        {activeSection === 'salle' && (
          <div className='salle'>
            <h2>Produit de salle de bain</h2>
            <div>
              <img src="" alt="Tapis de bain" />
            </div>
            <label>Prix: 30€</label>
          </div>
        )}

        {activeSection === 'tissus' && (
          <div className='tissus'>
            <h2>Produit tissus</h2>
            <div>
              <img src="" alt="Tissus ameublement" />
            </div>
            <label>Prix: 25€</label>
          </div>
        )}

        {activeSection === 'phar' && (
          <div className='phar'>
            <h2>Produit pharmaceutiques</h2>
            <div>
              <img src="" alt="Coton" />
            </div>
            <label>Prix: 10€</label>
          </div>
        )}

{showForm && (
  <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="modal-header">
          <h5 className="modal-title">Formulaire d'ajout de client</h5>
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
              <label htmlFor="numero" className="form-label">Numéro de téléphone</label>
              <input type="text" className="form-control" id="numero" value={formData.numero} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Fermer</button>
              <button type="submit" className="btn btn-primary"> confirmer l'achat</button>
            </div>
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
