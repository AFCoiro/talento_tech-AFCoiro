import { useEffect, useState } from 'react';
import { Alert, Button , Form, Row ,Col} from "react-bootstrap";


export default function ProductForm({onSubmit, productoEditar,onCancel}){
  const [titulo, setTitulo] = useState('')
  const [fecha, setFecha] = useState('')
  const [errores, setErrores] = useState('')

  useEffect(()=>{
    if(productoEditar){
      setTitulo(productoEditar.titulo);
      setFecha(productoEditar.fecha.toString());
      setErrores([]);
  }else{
    setTitulo('');
    setFecha('');
    setErrores([]);
  }
},[productoEditar]);

const validar = ()=>{
  const erroresValidacion = [];
  if(!titulo.trim()){
    erroresValidacion.push('El titulo es requerido');
}
if(fecha === '' || isNaN(fecha) || Number(fecha)<=1900){
  erroresValidacion.push('El año debe ser un número de cuatro cifras');
}
setErrores(erroresValidacion);
return erroresValidacion.length ===0;
};

const handleSubmit = (e)=>{
  e.preventDefault();

  if (!validar()) return;
  const producto = {
    titulo: titulo.trim(),
    fecha: Number(fecha)
  };

  if(productoEditar){
    producto.id = productoEditar.id;
  }

  onSubmit(producto);
  
  if(!productoEditar){
    setTitulo('');
    setFecha('');
  }
};

  return(
    <Form onSubmit={handleSubmit}>
      {errores.length > 0 && (
        <Alert variant='danger'>
          <ul>{errores.map((error, index) => (
            <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group as={Row} controlId='titulo'>
        <Form.Label column>Titulo de película</Form.Label>
        <Col>
          <Form.Control 
            type='text'
            placeholder='titulo de Pelicula...'
            value={titulo}
            onChange={(e)=>setTitulo(e.target.value)}
          />
        </Col>
      </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="fecha">
        <Form.Label column sm={2}>Año de estreno</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            placeholder="Año de estreno..."
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min="0"
            step="0.01"
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" className="me-2">
        {productoEditar ? 'Actualizar' : 'Agregar'}
      </Button>

      {productoEditar && (
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </Form>
  );
}