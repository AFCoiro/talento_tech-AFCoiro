import { createContext, useState, useContext } from 'react';

const ProductModalContext = createContext();

export function ProductModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [currentProduct, setCurrentProduct] = useState(null);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentProduct({ Title: '', Year: '' , Poster:''});
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setCurrentProduct(product);
    setShowModal(true);
  };


  

  const closeModal = () => setShowModal(false);

  return (
    <ProductModalContext.Provider
      value={{
        showModal,
        modalMode,
        currentProduct,
        openCreateModal,
        openEditModal,
        closeModal,
        setCurrentProduct,
      }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  return useContext(ProductModalContext);
}
