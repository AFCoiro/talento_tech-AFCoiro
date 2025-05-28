import './Header.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function NavbarLinks({ handleClose, className }) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('auth');
    //agregue el userId para que se mantenga el nombre de usuario al hacer click en los nav de admin y perfil.
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const baseLinks = [
    { id: 1, to: '/', text: 'Home' },
    { id: 2, to: '/info-sitio', text: 'Info del Sitio' },
    { id: 3, to: '/contacto', text: 'Contacto' },
    ...(!isAuth ? [{ id: 4, to: '/login', text: 'Login' }] : []),
  ];

  const adminLinks = [
    { id: 5, to: `/admin/${userId}`, text: 'Admin' },
    { id: 6, to: `/perfil/${userId}`, text: 'Perfil' },
  ];

  const logOutLink = isAuth
    ? [{ id: 'logout', text: 'Cerrar sesión', onClick: handleLogout, isButton: true }]
    : [];

  const allLinks = isAuth
    ? [...adminLinks, ...baseLinks, ...logOutLink]
    : baseLinks;

  return (
    <Nav className={`fw-semibold ${className}`}>
      {allLinks.map((link) => (
        <Nav.Link
          key={link.id}
          as={link.isButton ? 'button' : Link}
          to={link.isButton ? undefined : link.to}
          onClick={link.onClick || handleClose}
          className={link.isButton ? 'logOut-btn' : ''}
        >
          {link.text}
        </Nav.Link>
      ))}
    </Nav>
  );
}
