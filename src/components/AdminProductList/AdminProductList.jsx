// src/components/AdminProductList/AdminProductList.jsx
import { Table, Button } from 'react-bootstrap';
import { useProductModal } from '../context/ProductModalContext';

export default function AdminProductList({ productos, onDelete,onPublish }) {
  const { openEditModal } = useProductModal();

  if (productos.length === 0) {
    return <p>No hay productos cargados.</p>;
  }


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Año</th>
          <th>Disponible</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.imdbID}>
            <td>{producto.imdbID}</td>
            <td>{producto.Title}</td>
            <td>{producto.Year.split("-")[0]}</td>
            <td>{!producto.Stock ? 'Si': 'No'}</td>
            <td> <img className='img-form'  src={producto.Poster || "/no-movie-img.jpg"} alt={producto.Poster} onError={(e) => {
      e.target.onerror = null; e.target.src = "/no-movie-img.jpg";
    }}/></td>
            <td>
              <Button variant="primary" size="sm" onClick={() => openEditModal(producto)} className="me-2">
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(producto.imdbID)}>
                Eliminar
              </Button>
              <Button
                variant={producto.Publish ? 'secondary' : 'success'}
                size="sm"
                onClick={() => onPublish(producto)}
              >
                {producto.Publish ? 'Despublicar' : 'Publicar'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
