import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function ProductForm({ product, onChange, onSubmit, onCancel, modalMode }) {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, [product]);

  const validate = () => {
    const errores = [];
    if (!product.Title.trim()) errores.push('Debe ingresar un título ');
    if (product.Year === '' || isNaN(product.Year) || Number(product.Year) <= 1900) {
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
        <Form.Group controlId="Title" className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="Title"
            value={product?.Title || ''}
            onChange={onChange}
            placeholder="titulo de la película"
          />
        </Form.Group>

        <Form.Group controlId="Year" className="mb-3">
          <Form.Label>Año</Form.Label>
          <Form.Control
            type="number"
            name="Year"
            value={product?.Year || ''}
            onChange={onChange}
            placeholder="Año de estreno"
          />
        </Form.Group>

        <Form.Group controlId="Poster" className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            name="Poster"
            value={product?.Poster || ''}
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
