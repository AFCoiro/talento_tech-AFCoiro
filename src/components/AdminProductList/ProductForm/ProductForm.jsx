import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function ProductForm({ product, onChange, onSubmit, onCancel, modalMode }) {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, [product]);

  const validate = () => {
    const errores = [];
    if (!product.name.trim()) errores.push('Debe ingresar un título ');
    if (product.year === '' || isNaN(product.year) || Number(product.year) <= 1900) {
      errores.push('La fecha debe ser un número de 4 cifras mayor a 1900');
    }
    setErrors(errores);
    return errores.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit();
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titulo" className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product?.name || ''}
            onChange={onChange}
            placeholder="titulo de la película"
          />
        </Form.Group>

        <Form.Group controlId="fecha" className="mb-3">
          <Form.Label>Año</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={product?.year || ''}
            onChange={onChange}
            placeholder="Año de estreno"
          />
        </Form.Group>

        <Form.Group controlId="imagen" className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={product?.image || ''}
            onChange={onChange}
            placeholder="imagen formato jpeg,png,webP..."
          />
        </Form.Group>

        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {modalMode === 'create' ? 'Crear' : 'Actualizar'}
        </Button>
      </Form>
    </>
  );
}
