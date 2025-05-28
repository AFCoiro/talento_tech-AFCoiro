import ProductCard from "./ProductCard/ProductCard";
import { useState, useEffect } from 'react'
import { Container, Row , Col, Spinner} from 'react-bootstrap';

import './ProductList.scss';


export default function ProductList({category,title}){

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const API_KEY = '5fe9fd5d';
        let url = `http://www.omdbapi.com/?s=${category}&apikey=${API_KEY}`;

        fetch(url)
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
    },[category])

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
                    <ProductCard prod={prod} agregarAlCarrito={(prod) => alert(`Agregamos a la cesta ${prod.Title}` )} />
                </Col>
            ))}
            </Row>
            )}
        </Container>
    
        
    )
}