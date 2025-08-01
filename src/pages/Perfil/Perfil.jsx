import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import ProductList from "../../components/ProductList/ProductList";

export default function Admin() {
    const URL_MOCKAPI = 'https://6881930066a7eb81224b3b18.mockapi.io/peliculas/movies';
    const {id} = useParams();
    const [peliculas, setProducts] = useState([]);


    useEffect(() => {
        fetch(URL_MOCKAPI)
        .then(res => {
            if (!res.ok) throw new Error('Error al cargar productos');
            return res.json();
        })
        .then(data => {
            const publicados = data.filter(producto => producto.Publish === true);
            setProducts(publicados);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

return ( 
        <>
        <Helmet>
            <title>REWIND BUSTER | Mi Perfil</title>
            <meta name="robots" content="noindex" />
        </Helmet>

        <h1>Perfil de usuario</h1>

        <ProductList category={peliculas} title={`Hola, ${id}. Estas son las peliculas publicadas por los administradores:`}/>
        </>
    )
}



