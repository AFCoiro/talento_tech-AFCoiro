import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';

export default function InfoSitio() {
  return (
    <>
      <Helmet>
        <title>REWIND BUSTER | Sobre Nosotros</title>
        <meta
          name="description"
          content="Conocé cómo funciona REWIND BUSTER, el videoclub online que revive la magia de alquilar películas. Respondemos tus preguntas frecuentes y te contamos quiénes somos."
        />
      </Helmet>

    <Container>
       <h1>Información del sitio</h1>

      <h2>Preguntas frecuentes</h2>
      <ul>
        <li><strong>¿Cómo alquilar una película?</strong> Solo tenés que iniciar sesión, elegir la película que te gusta y presionar “Alquilar”.</li>
        <li><strong>¿Cuánto cuesta?</strong> Todas las películas tienen un precio fijo de $3,99 por alquiler.</li>
        <li><strong>¿Por cuánto tiempo tengo acceso?</strong> Una vez alquilada, la película estará disponible durante 48 horas.</li>
        <li><strong>¿Necesito una cuenta?</strong> Sí, para alquilar necesitás registrarte gratuitamente con tu email.</li>
      </ul>

      <h2>Sobre nosotros</h2>
      <p>
        REWIND BUSTER nació con la idea de revivir la experiencia del videoclub clásico, adaptada al mundo digital. Queremos que el cine se siga disfrutando como antes: eligiendo con calma, compartiendo con otros y redescubriendo joyas ocultas.
      </p>

      <h2>Otros enlaces útiles</h2>
      <ul>
        <li><a href="/">Términos y condiciones</a></li>
        <li><a href="/">Contactanos</a></li>
      </ul>
    </Container>
    </>
  );
}
