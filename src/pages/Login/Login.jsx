import { useState } from 'react';
import { Container, Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [ inputValue, setInputValue ]= useState('');
    
    const navigate = useNavigate();

    const handleLogin = (e)=>{
        e.preventDefault();
        localStorage.setItem('auth','true');
        /*Guardar el value del input en el localStorage lo hice para que cuando se accede a admin o a perfil desde el navbar, muestre tambien el nombre en el DOM*/
        localStorage.setItem('userId',inputValue);

        navigate(`/perfil/${encodeURIComponent(inputValue)}`)
    }

return (
    <Container className='mt-5' style={{maxWidth:400}}>
        <h2>Inciar sesión</h2>
        <Form onSubmit={handleLogin}>
            <Form.Group className='mb-3'>
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password"/>
            </Form.Group>
            <Button type='submit' variant='primary' >Entrar</Button>
        </Form>
    </Container>

    );
}