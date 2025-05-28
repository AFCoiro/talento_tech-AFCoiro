import ProdutList from "../../components/ProductList/ProductList";

export default function Home() {
return (
        <>
        <h1>Home</h1>
        <ProdutList category={'Avengers'} title={'Las pelis de Avengers'}/>
        <ProdutList category={'Batman'} title={'Lo nuevo del Caballero oscuro'}/>

        </>
    )
}