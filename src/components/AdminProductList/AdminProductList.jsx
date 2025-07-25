// src/components/AdminProductList/AdminProductList.jsx
import { Table, Button } from 'react-bootstrap';
import { useProductModal } from '../context/ProductModalContext';

export default function AdminProductList({ productos, onDelete }) {
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
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(({ id, name, year,image }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{year}</td>
            <td> <img className='img-form'  src={image || "/no-movie-img.jpg"} alt={image} onError={(e) => {
      e.target.onerror = null; e.target.src = "/no-movie-img.jpg";
    }}/></td>
            <td>
              <Button variant="primary" size="sm" onClick={() => openEditModal({ id, name, year,image })} className="me-2">
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
