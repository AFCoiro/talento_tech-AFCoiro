import {Table, Button} from 'react-bootstrap';


export default function AdminProductList({productos, onEdit, onDelete}){
if (productos.length === 0) {
    return <p>No hay productos cargados.</p>
}
return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Película</th>
                    <th>Año</th>
                    <th>Imagen</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {productos.map(({id, titulo,fecha,img})=>(
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{titulo}</td>
                        <td>{fecha}</td>
                        <td>{img}</td>
                        <td>
                            <Button variant="primary" onClick={() => onEdit({id,titulo,fecha,img})}>Edit</Button>
                            <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
)
}