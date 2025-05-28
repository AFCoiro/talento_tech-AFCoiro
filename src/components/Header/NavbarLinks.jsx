import './Header.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {Button} from 'react-bootstrap';

import { Link, useNavigate, NavLink } from "react-router-dom";
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
    { id:1, to: '/', text: 'Home' },
    { id:2, to: '/info-sitio', text: 'Info del Sitio' },
    { id:3, to: '/contacto', text: 'Contacto' },
    ...(!isAuth ? [{ to: '/login', text: 'Login' }]:[])
  ]
  const adminLinks = [
    { id:4, to: `/admin/${userId}`, text: 'Admin' },
    { id:5, to: `/perfil/${userId}`, text: 'Perfil' }

  ]
  const links = isAuth ? [...adminLinks, ...baseLinks] : baseLinks;

  return (
    <Nav className={`fw-semibold ${className}`}>
      {
        links.map(link => (
          <NavLink 
            key={link.id} 
            as={Link} to={link.to} 
            onClick={handleClose}
            className={({isActive})=>`nav-link ${isActive ? 'active':''}`}
            >
              {link.text}
          </NavLink>
            
        ))
      }
      {isAuth &&(
        <Nav.Link key="logout" as="button" onClick={handleLogout} className='logOut-btn'>Cerrar sesión</Nav.Link>
      ) }
    </Nav>
  );
}
