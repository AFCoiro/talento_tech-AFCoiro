import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
import ProductForm from "../../components/productForm/productForm";
import AdminProductList from "../../components/AdminProductList/AdminProductList";
export default function Admin() {
    const {id} = useParams();

    const [productos, setProductos] = useState([]);
    const [productoEditar, setProductoEditar] = useState(null);
    const [contadorId, setcontadorId] = useState(1);

    const agregarProduto=(producto)=>{
    const nuevoProducto = {...producto, id:contadorId};
    setProductos([...productos, nuevoProducto]);
    setcontadorId(contadorId + 1);
    };

    const actualizarProducto = (productoActualizado) =>{
    setProductos(productos.map(p=>(p.id === productoActualizado.id ? productoActualizado: p)));
        setProductoEditar(null);
    }

    const borrarProducto = (id) =>{
    setProductos(productos.filter(p=> p.id !== id))
    };

    const editarProducto = (productos)=>{
    setProductoEditar(productos)
    }

return (
        <>
        <h1>Perfil de administrador</h1>
        <h2>Hola, {id}</h2>
        <Container className="my-4">
                    
        <ProductForm
        onSubmit={productoEditar ? actualizarProducto : agregarProduto}
        productoEditar={productoEditar}
        onCancel={()=> setProductoEditar(null)}
        />
            
        <AdminProductList
        productos={productos}
        onEdit={editarProducto}
        onDelete={borrarProducto}
        />
        </Container>

        </>
    )
}
