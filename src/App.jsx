import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { useState, useEffect } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Container, Row , Col, Card, Button, Spinner} from 'react-bootstrap';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import ComoComprar from './pages/ComoComprar/ComoComprar';
import Nosotros from './pages/Nosotros/Nosotros';
import Contacto from './pages/Contacto/Contacto';
import Login from './pages/Login/Login';

const API_KEY = '5fe9fd5d';
// const URL = `http://www.omdbapi.com/?s=avengers&apikey=${API_KEY}`;


function App() {



const [product, setProduct] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(()=>{
    fetch(`http://www.omdbapi.com/?s=avengers&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data =>{
      setProduct(data.Search)
    })
    .catch((err)=>{
      setError("No pudimos cargar los productos. Intentá de nuevo más tarde.")
      console.error(`***Error***: ${err}`)
    })
    .finally(()=>{
      setLoading(false)
    })
},[])
  return (
    <>
    <BrowserRouter>

        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/como-comprar' element={<ComoComprar/>} />
          <Route path='/nosotros' element={<Nosotros/>} />
          <Route path='/contacto' element={<Contacto/>} />
          <Route path='/login' element={<Login/>} />

        </Routes>
        <Container className='mt-4 bgred'>
        <h2>Nuevos Lanzamientos</h2>
        {loading && <Spinner>Cargando...</Spinner>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {product && (
        <Row>
          {product.map((prod) => (
            <Col key={prod.id}>
              <Card className='mt-2'>
                <Card.Img variant="top" src={prod.Poster} alt={prod.Title} />
                <Card.Body>
                  <Card.Title>{prod.Title}</Card.Title>
                  <Card.Text>{prod.Year}</Card.Text>
                  <Button variant="primary">Alquilar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        )}
        </Container>

        <Footer/>

    </BrowserRouter>
    </>
    
  )
}

export default App
