import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function Browser({ onSearch }) {
  const [busqueda, setBusqueda] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(busqueda.trim());
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex mx-auto col-8 col-xl-4 pb-4">
      <Form.Control
        type="search"
        placeholder="Busca tus películas y series favoritas..."
        className="me-2"
        aria-label="Search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <Button variant="primary" type="submit">Buscar</Button>
    </Form>
  );
}
