import './Header.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from 'react';
import { Button, Container, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from "react-router-dom";
import NavbarLinks from './NavbarLinks'


export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header className="header-site">
      <Navbar expand="lg" className='header-navbar'>
        <Container>

          <Button
            variant="outline-light"
            className="d-lg-none hamburger-menu"
            onClick={handleShow}
            aria-label="Abrir menú"
          >
            <i className="bi bi-list fs-2"></i>
          </Button>

          <Navbar.Brand as={Link} to="/">
            <img
              alt="Rewind Buster Logo"
              src="../public/brand-small.png"
              width="150"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          {/* Menú lateral en mobile */}
          <Offcanvas show={show} onHide={handleClose} placement="start" className="side-navbar">
            <Offcanvas.Header closeButton closeVariant="white">
            </Offcanvas.Header>
            <Offcanvas.Body>
                <NavbarLinks key="mobile-nav" className="flex-column" handleClose={handleClose}/>
            </Offcanvas.Body>
          </Offcanvas>

          {/* Nav en desktop */}
          <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
            
                <NavbarLinks key="desktop-nav" className="ms-auto"  handleClose={handleClose}/>

          </Navbar.Collapse>

          <a href="#" className="shopCart">
            <i className="bi bi-basket2-fill text-light fs-4"></i>
          </a>
        </Container>
      </Navbar>      
    </header>
  );
}
