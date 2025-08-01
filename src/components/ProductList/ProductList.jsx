import ProductCard from "./ProductCard/ProductCard";
import { useState, useEffect } from 'react'
import { Container, Row , Col, Spinner} from 'react-bootstrap';
import { ToastContainer, toast, Flip } from 'react-toastify';

import './ProductList.scss';


export default function ProductList({category,title}){
    const API_KEY = '5fe9fd5d';

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

  if (Array.isArray(category)) {
    // Vino un array de perfil
    setProduct(category);
    setLoading(false);
  } else {
    // category es string
    const url = `https://www.omdbapi.com/?s=${category}&apikey=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if(data.Search) {
          setProduct(data.Search);
          setError(null);
        } else {
          setProduct([]);
          setError("No se encontraron resultados.");
        }
      })
      .catch(err => {
        setError("No pudimos cargar los productos.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }
}, [category]);

    return(

        <Container className='mt-4 bgred'>
            <h2>{title}</h2>
            {loading && (
            <div className="text-center my-4">
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {product && (
            <Row>
            {product.map((prod) => (
                <Col key={prod.imdbID}>
                    <ProductCard prod={prod} agregarAlCarrito={(prod) => toast.success(`Agregamos a la cesta ${prod.Title}` )} />
                      <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Flip}
                        />
                </Col>
            ))}
            </Row>
            )}
        </Container>
    
        
    )
}
