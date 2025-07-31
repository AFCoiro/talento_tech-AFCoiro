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

  //Fetch reutilizable para los distintos llamados
    const handleApiRequest = async (method,endPoint,body,msjPregunta,msjError,updateProductosCallback) => {
        if (!window.confirm(msjPregunta)) return;

        try {
          const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
          };
          if (body !== null) {
            options.body = JSON.stringify(body);
          }

          const res = await fetch(`${URL_MOCKAPI}/${endPoint}`, options);

          if (!res.ok) throw new Error(msjError);
          const data = await res.json();
          setProductos(prev => updateProductosCallback(prev, data));
        } catch (error) {
          alert(msjError);
          console.error(error);
        }
    }

  // Crear película - POST a API
  const agregarPelicula = (pelicula)=>{
    handleApiRequest(
      'POST',
      '',
      pelicula, 
      '¿Entonces queres subir la película?',
      'No se pudo subir la película',
      (prev, data) => [...prev, data],
    );
  }

  // Actualizar película - PUT a API  const agregarPelicula = (producto)=>{
  const actualizarPelicula = (pelicula)=>{
    handleApiRequest(
      'PUT',
      pelicula.id,
      pelicula, 
      '¿Seguro que querés actualizar esta película?',
      'No se pudo actualizar la película',
      (prev, data) =>(prev.map(p => (p.id === data.id ? data : p)))

    );
  }

  // Borrar película - DELETE a API
    const deleteMovie = (pelicula)=>{
    handleApiRequest(
      'DELETE',
      pelicula,
      null, 
      '¿Seguro que querés eliminar esta película?',
      'No se pudo eliminar la película',
      (prev) =>(prev.filter(p => p.id !== pelicula))
    );
  }

  // Publicar/Despublicar película
      const publishMovie = (pelicula)=>{
    handleApiRequest(
      'PUT',
      pelicula.id,
      { ...pelicula, publish: !pelicula.publish }, 
      '¿Seguro que querés publicar esta película?',
      'No se pudo publicar la película',
      (prev,data) =>(prev.map(p => (p.id === data.id ? data : p)))
    )
  }


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
