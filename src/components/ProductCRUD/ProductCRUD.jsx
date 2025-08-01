import {useState, useEffect} from "react";
import { Container,Table, Modal, Button , Form, Row ,Col} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';


const URL_MOCKAPI = 'https://6881930066a7eb81224b3b18.mockapi.io/peliculas/movies';

export default function ProductCRUD() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); 
    const [currentItem, setCurrentItem] = useState({ name: "", description: "" });

    const fetchItems = async () => 
    {
    setLoading(true);
    try 
    {
      const res = await fetch(URL_MOCKAPI);
      if (!res.ok) throw new Error("Hubo un error al obtener la información");
      const data = await res.json();
      setItems(data);
    } 
    catch (error) 
    {
      toast.error("Hubo un error al obtener la información");
      console.error(error);
    } 
    finally 
    {
      setLoading(false);
    }
};

useEffect(() => {
    fetchItems();
}, []);


const handleChange = (e) => 
    {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  /*CREAR ITEM*/
    const handleCreate = async () => 
        {
        try {
        const res = await fetch(URL_MOCKAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentItem),
        });
        if (!res.ok) throw new Error("Error: No se pudo crear el item");

        await fetchItems();
        handleCloseModal();
        } catch (error) {
        toast.error("Error: No se pudo crear el item");
        console.error(error);
        }
    };

/*CREAR ITEM*/
    const handleUpdate = async () => {

        try {
            const res = await fetch(`${URL_MOCKAPI}/${currentItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentItem),
            });

            if (!res.ok) throw new Error("Error: No se pudo actualizar el item");
            await fetchItems();
            handleCloseModal();

        } catch (error) {
            toast.error("Error: No se pudo actualizar el item");
            console.error(error);
        }

    };


/*BORRAR ITEM*/
    const handleDelete = async (id) => {

        if (window.confirm("¿Seguro que querés eliminar este item?")) {
            try {
                const res = await fetch(`${URL_MOCKAPI}/${id}`, { method: "DELETE" });
                if (!res.ok) throw new Error("Error: No se pudo eliminar item");
                await fetchItems();

            } catch (error) {
                toast.error("Error: No se pudo eliminar item");
                console.error(error);
            }
        }
    };


/*MODAL de ADMIN */
  const openCreateModal = () => {
    setModalMode("create");
    setCurrentItem({ name: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">

      <Button variant="primary" onClick={openCreateModal} className="mb-3">
        Crear nuevo item
      </Button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Año</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay items
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.year}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear nuevo item" : "Editar item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese descripción"
                name="description"
                value={currentItem.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modalMode === "create" ? handleCreate : handleUpdate}
            disabled={!currentItem.name || !currentItem.description}
          >
            {modalMode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );

}