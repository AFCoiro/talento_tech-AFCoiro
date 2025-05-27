import './Header.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {Button} from 'react-bootstrap';

import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function NavbarLinks({ handleClose, className }) {

  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';
  const userId = localStorage.getItem('userId');

  const handleLogout = ()=>{
    localStorage.removeItem('auth');
    localStorage.removeItem("userId");
    navigate('/login')
  }

  const baseLinks = [
    { to: '/', text: 'Home' },
    { to: '/como-comprar', text: '¿Cómo comprar y alquilar?' },
    { to: '/nosotros', text: 'Nosotros' },
    { to: '/contacto', text: 'Contacto' },
    ...(!isAuth ? [{ to: '/login', text: 'Login' }]:[])
  ]
  const adminLinks = [
    { to: `/admin/${userId}`, text: 'Admin' },
    { to: `/perfil/${userId}`, text: 'Perfil' }

  ]
  const links = isAuth ? [...adminLinks, ...baseLinks] : baseLinks;

  return (
    <Nav className={`fw-semibold ${className}`}>
      {
        links.map(link => (
          <Nav.Link as={Link} to={link.to} onClick={handleClose}>{link.text}</Nav.Link>
        ))
      }
      {isAuth &&(
        <Nav.Link as="button" onClick={handleLogout} className='logOut-btn'>Cerrar sesión</Nav.Link>
      ) }
    </Nav>
  );
}
