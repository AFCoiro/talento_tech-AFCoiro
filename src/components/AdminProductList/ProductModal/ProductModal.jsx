// src/components/AdminProductList/ProductModal.jsx
import { Modal } from 'react-bootstrap';
import { useProductModal } from '../../context/ProductModalContext';
import ProductForm from '../ProductForm/ProductForm';


export default function ProductModal({ onCreate, onUpdate }) {
  const {
    showModal,
    modalMode,
    currentProduct,
    setCurrentProduct,
    closeModal,
  } = useProductModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSubmit = () => {
    if (modalMode === 'create') onCreate(currentProduct);
    else onUpdate(currentProduct);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalMode === 'create' ? 'Agregar Producto' : 'Editar Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm
          product={currentProduct}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          modalMode={modalMode}
        />
      </Modal.Body>
    </Modal>
  );
}
