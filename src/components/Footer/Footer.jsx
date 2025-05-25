import './Footer.scss'
import { Container, Row, Col,Nav, Navbar } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer-site py-3">
        <Container>
            <Row className="align-items-center">
                <Col md={6} className="d-flex justify-content-start">
                <small className="text-footer">
                    © {new Date().getFullYear()} Rewindbuster. All Rights Reserved.
                </small>
                </Col>

                <Col md={6} className="d-flex justify-content-end">
                <Nav >
                    <Nav.Link href="https://www.facebook.com/" target="_blank" className="social-icon">
                    <i className="bi bi-facebook"></i>
                    </Nav.Link>
                    <Nav.Link href="https://x.com/?lang=es" target="_blank" className="social-icon">
                    <i className="bi bi-twitter-x"></i>
                    </Nav.Link>
                    <Nav.Link href="https://www.instagram.com/" target="_blank" className="social-icon">
                    <i className="bi bi-instagram"></i>
                    </Nav.Link>
                    <Nav.Link href="https://www.tiktok.com/" target="_blank" className="social-icon">
                    <i className="bi bi-tiktok"></i>
                    </Nav.Link>
                </Nav>
                </Col>
            </Row>
        </Container>
    </footer>
  );
}
