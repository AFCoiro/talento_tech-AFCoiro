import './Header.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function NavbarLinks({ handleClose, className }) {
  return (
    <Nav className={`fw-semibold ${className}`}>
      <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
      <Nav.Link as={Link} to="/como-comprar" onClick={handleClose}>¿Cómo comprar y alquilar?</Nav.Link>
      <Nav.Link as={Link} to="/nosotros" onClick={handleClose}>Nosotros</Nav.Link>
      <Nav.Link as={Link} to="/contacto" onClick={handleClose}>Contacto</Nav.Link>
      <Nav.Link as={Link} to="/login" onClick={handleClose}>Login</Nav.Link>
    </Nav>
  );
}
