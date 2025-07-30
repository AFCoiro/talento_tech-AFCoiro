import './Admin.scss';
import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import { ProductModalProvider, useProductModal } from '../../components/context/ProductModalContext';
import AdminProductList from '../../components/AdminProductList/AdminProductList';
import ProductModal from '../../components/AdminProductList/ProductModal/ProductModal';

const URL_MOCKAPI = 'https://6881930066a7eb81224b3b18.mockapi.io/peliculas/movies';

function AdminContent() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openCreateModal } = useProductModal();

  // Traer películas desde la API al montar
  useEffect(() => {
    async function fetchProductos() {
      setLoading(true);
      try {
        const res = await fetch(URL_MOCKAPI);
        if (!res.ok) throw new Error('Error al traer productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        alert('No se pudieron cargar los productos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductos();
  }, []);

  // Crear película - POST a API
  const agregarPelicula = async (producto) => {
    try {
      const res = await fetch(URL_MOCKAPI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
      if (!res.ok) throw new Error('No se pudo crear el producto');
      const nuevoProducto = await res.json();
      setProductos([...productos, nuevoProducto]);
    } catch (error) {
      alert('Error al crear el producto');
      console.error(error);
    }
  };

  // Actualizar película - PUT a API
  const actualizarPelicula = async (productoActualizado) => {
    if (!window.confirm('¿Seguro que querés actualizar esta película?')) return;

    try {
      const res = await fetch(`${URL_MOCKAPI}/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });
      if (!res.ok) throw new Error('No se pudo actualizar el producto');
      const actualizado = await res.json();
      setProductos(productos.map(p => (p.id === actualizado.id ? actualizado : p)));
    } catch (error) {
      alert('Error al actualizar el producto');
      console.error(error);
    }
  };

  // Borrar película - DELETE a API
  const deleteMovie = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar esta película?')) return;

    try {
      const res = await fetch(`${URL_MOCKAPI}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('No se pudo eliminar la película');
      setProductos(productos.filter(p => p.id !== id));

    } catch (error) {
      alert('Error al eliminar la película');
      console.error(error);

    }
  };

  // Publicar/Despublicar película
  const publishMovie = async (producto) => {
    if (!window.confirm('¿Seguro que querés publicar esta película?')) return;

    try {
      const updatedProduct = { ...producto, publish: !producto.publish };
      const res = await fetch(`${URL_MOCKAPI}/${producto.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
      });

      if (!res.ok) throw new Error('No se pudo publicar la película');
      const data = await res.json();
      setProductos(productos.map(p =>  (p.id === data.id ? data : p)));

    } catch (error) {
      alert('Error al publicar la película');
      console.error(error);

    }
  };


  return (
    <Container className="my-4">
      <h1>Panel de Administración</h1>
      <Button variant="success" className="mb-3" onClick={openCreateModal}>
        Agregar película
      </Button>

      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <AdminProductList productos={productos} onDelete={deleteMovie} onPublish={publishMovie}/>
      )}

      <ProductModal onCreate={agregarPelicula} onUpdate={actualizarPelicula} />
    </Container>
  );
}


export default function Admin() {
  return (
    <ProductModalProvider>
      <AdminContent />
    </ProductModalProvider>
  );
}
