import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';

export default function Contacto() {
  return (
    <Container>
      <Helmet>
        <title>REWIND BUSTER | Contacto</title>
        <meta
          name="description"
          content="¿Tenés dudas o sugerencias? Escribinos desde nuestra sección de contacto."
        />
      </Helmet>

      <h1>Contacto</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = `mailto:agustinfcoiro@gmail.com`;
        }}
        style={{ maxWidth: '400px', marginBottom: '1.5rem' }}
      >
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            required
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </div>
        <button type="submit">Enviar correo</button>
      </form>

      <a
        href="https://www.linkedin.com/in/agustinfcoiro/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          backgroundColor: '#0A66C2',
          color: 'white',
          padding: '0.5rem 1rem',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Visitar LinkedIn
      </a>
    </Container>
  );
}
