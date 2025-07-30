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
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.name}</td>
            <td>{producto.year.split("-")[0]}</td>
            <td>{!producto.stock ? 'Si': 'No'}</td>
            <td> <img className='img-form'  src={producto.image || "/no-movie-img.jpg"} alt={producto.image} onError={(e) => {
      e.target.onerror = null; e.target.src = "/no-movie-img.jpg";
    }}/></td>
            <td>
              <Button variant="primary" size="sm" onClick={() => openEditModal(producto)} className="me-2">
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(producto.id)}>
                Eliminar
              </Button>
              <Button
                variant={producto.publish ? 'secondary' : 'success'}
                size="sm"
                onClick={() => onPublish(producto)}
              >
                {producto.publish ? 'Despublicar' : 'Publicar'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
