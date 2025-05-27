import { useParams } from "react-router-dom"

export default function Admin() {
    const {id} = useParams();

return (
        <>
        <h1>Perfil de usuario</h1>
        <h2>Hola, {id}</h2>
        </>
    )
}