import React from 'react';
import './style.css';  
import { FaFacebook, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';


function Pied() {
  return (
    <footer className="footer  pt-4 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Navigation</h5>
            <ul className="list-unstyled">
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#produits">Produits</a></li>
              <li><a href="#pret-a-porter">Prêt à porter</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Coordonnées</h5>
            <p><FaMapMarkerAlt /> PK 08 Route d'AMBOHIMANGA ILAFY, Antananarivo Madagascar</p>
            <p><FaPhoneAlt /> Tél : 034 07 424 88 - 032 07 424 88 - 033 07 424 88</p>
            <p><FaEnvelope /> Email : <a href="mailto:somacou@gmail.com">somacou@gmail.com</a></p>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6">
            <p>&copy; SOMACOU 2024 - <a href="https://madagascar-design.com">Création site web : madagascar-design.com</a></p>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'40px', justifyContent:'right'}}>
            <a href="https://www.facebook.com/somacoucouleurvanill" className="social-icon"><FaFacebook style={{fontSize:'40px'}}/></a>
            <a href="mailto:somacou@gmail.com" className="social-icon"><FaEnvelope style={{fontSize:'40px'}}/></a>
            <a href="tel:0340742488" className="social-icon"><FaPhoneAlt style={{fontSize:'40px'}}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Pied;
