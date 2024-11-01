import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaSearch } from 'react-icons/fa'; 
import logo from '../assets/logo.png';

function Head() {
  const [expand, setExpand] = useState('lg');

  return (
    <Navbar key={expand} expand={expand} style={{ position: 'fixed', top: 0, width: '100%',height:'65px', zIndex: 1000, backgroundColor: 'whitesmoke' }}>
      <Container fluid style={{ display: 'flex', alignItems: 'center', gap:'20%' }}> 
        
        <Navbar.Brand href="/" style={{ color: 'red', display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
          <img 
            src={logo} 
            alt="logo" 
            style={{ 
              width: '80px', 
              height: '50px', 
              borderRadius: '50%', 
              border: '2px solid red',
              padding: '2px' 
            }} 
          />
          <span style={{ marginLeft: '10px' }}>SOMACOU</span> 
        </Navbar.Brand>
        <Form className="d-flex" style={{ width: '20%', marginRight: 'auto', position: 'relative' }}>
          <Form.Control
            type="search"
            placeholder="Rechercher un produit... "
            aria-label="Search"
            style={{ borderRadius: '5px', padding: '0.5rem 1rem', paddingLeft: '2.5rem' }} 
          />
          <FaSearch 
            style={{ 
              position: 'absolute', 
              left: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#888' 
            }} 
          />
        </Form>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav style={{ display:'flex', alignItems:'center', gap:'40px'}}>
              <Nav.Link href="#action1">HOME</Nav.Link>
              <NavDropdown title="PRODUITS" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                <NavDropdown.Item href="/body">LITERIE</NavDropdown.Item>
                <NavDropdown.Item href="/body">CUISINE</NavDropdown.Item>
                <NavDropdown.Item href="/body">SALLE DE BAIN</NavDropdown.Item>
                <NavDropdown.Item href="/body">TISSUS</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">PHARMACEUTIQUES</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="SERVICES" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                <NavDropdown.Item href="#action3">BLANCHISSERIE</NavDropdown.Item>
                <NavDropdown.Item href="#action4">LAVAGE</NavDropdown.Item>
                <NavDropdown.Item href="#action4">BRODERIE</NavDropdown.Item>
                <NavDropdown.Item href="#action4">CONFECTION</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">TEINTURE TOUTE QUANTITÉ</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Head;
