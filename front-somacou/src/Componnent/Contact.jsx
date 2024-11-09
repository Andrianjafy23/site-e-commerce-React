import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css'; // CSS personnalisé

function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    num: '',
    sujet: '',
    mes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3000/api/contact', formData)
      .then((response) => {
        alert(response.data.message); // Message de succès
        setFormData({ nom: '', email: '', num: '', sujet: '', mes: '' }); // Réinitialiser les champs
      })
      .catch((error) => {
        console.error('Erreur:', error.response ? error.response.data : error.message);
        alert("Erreur lors de l'envoi du formulaire.");
      });
  };

  return (
    <div className="container mt-5" style={{width:'50%'}}>
      <div className="card p-4 shadow-sm">
        <h1 className="text-center mb-4">CONTACT</h1>
        <p className="text-center">Pour nous contacter, veuillez remplir le formulaire ci-dessous.</p>
      </div>
      <div className="card p-4 shadow mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Votre nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              placeholder="Votre email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Numéro de téléphone"
              name="num"
              value={formData.num}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Sujet de message"
              name="sujet"
              value={formData.sujet}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Votre message"
              name="mes"
              value={formData.mes}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
