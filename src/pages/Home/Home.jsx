import { Helmet } from 'react-helmet';
import Browser from "./Browser";
import ProductList from "../../components/ProductList/ProductList";
import { useState } from 'react';
export default function Home() {

const [searchQuery, setSearchQuery] = useState('');

const handleSearch = (query) => {
    setSearchQuery(query);
  };

return (
        <>
        <Helmet>
            <title>REWIND BUSTER | Inicio</title>
            <meta name="description" content="Explorá las películas más alquiladas del mes. REWIND BUSTER te conecta con tu cine interior." />
        </Helmet>

        <h1>Home</h1>

        <Browser onSearch={handleSearch}/>
        {searchQuery && (
        <ProductList category={searchQuery} title={`Resultados para: ${searchQuery}`} />
        )}

        <ProductList category={'Avengers'} title={'Las pelis de Avengers'}/>
        <ProductList category={'Batman'} title={'Lo nuevo del Caballero oscuro'}/>

        </>
    )
}