import { Card, Button} from 'react-bootstrap';

export default function ProductCard ({prod, agregarAlCarrito}) {
    return(
            <Card className='mt-2 product-card'>
                <Card.Img variant="top" src={prod.Poster} alt={prod.Title} />
                <Card.Body>
                  <Card.Title>{prod.Title}</Card.Title>
                  <Card.Text>{prod.Year}</Card.Text>
                  <Button variant="primary" onClick={()=>agregarAlCarrito(prod)}>Agregar a la cesta</Button>

                </Card.Body>
              </Card>
    )
}