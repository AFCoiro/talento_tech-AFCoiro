import './Admin.scss';
import { Helmet } from 'react-helmet';

import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { ToastContainer, toast,Flip } from 'react-toastify';
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
        toast.error('No se pudieron cargar los productos');

        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductos();
  }, []);

  //Fetch reutilizable para los distintos llamados
    const handleApiRequest = async (method,endPoint,body,msjPregunta,msjError,msjOk,updateProductosCallback) => {
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
          toast.success(msjOk)
        } catch (error) {
          toast.error(msjError);
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
      'Película agregada con éxito',
      (prev, data) => [...prev, data],
    );
  }

  // Actualizar película - PUT a API  const agregarPelicula = (producto)=>{
  const actualizarPelicula = (pelicula)=>{
    handleApiRequest(
      'PUT',
      pelicula.imdbID,
      pelicula, 
      '¿Seguro que querés actualizar esta película?',
      'No se pudo actualizar la película',
      'Película actualizada con éxito',
      (prev, data) =>(prev.map(p => (p.imdbID === data.imdbID ? data : p)))

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
      'Película eliminada con éxito',
      (prev) =>(prev.filter(p => p.imdbID !== pelicula))
    );
  }

  // Publicar/Despublicar película
      const publishMovie = (pelicula)=>{
    handleApiRequest(
      'PUT',
      pelicula.imdbID,
      { ...pelicula, Publish: !pelicula.Publish }, 
      '¿Seguro que querés publicar esta película?',
      'No se pudo publicar la película',
      'Película publicada con éxito',
      (prev,data) =>(prev.map(p => (p.imdbID === data.imdbID ? data : p)))
    )
  }


  return (
    <>
    <Helmet>
      <title>REWIND BUSTER | Panel de Administración</title>
      <meta name="robots" content="noindex" />
    </Helmet>

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
    </Container>
    </>
  );
}


export default function Admin() {
  return (
    <ProductModalProvider>
      <AdminContent />
    </ProductModalProvider>
  );
}
