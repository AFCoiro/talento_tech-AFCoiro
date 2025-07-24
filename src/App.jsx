import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter , Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import InfoSitio from './pages/InfoSitio/InfoSitio';
import Contacto from './pages/Contacto/Contacto';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Perfil from './pages/Perfil/Perfil';
import RutaProtegida from './components/RutaProtegida'




function App() {

  return (
    <>
    <BrowserRouter>

        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/info-sitio' element={<InfoSitio/>} />
          <Route path='/contacto' element={<Contacto/>} />
          <Route path='/login' element={<Login/>} />
          
          <Route path='/perfil/:id' element={<RutaProtegida><Perfil/></RutaProtegida>} />
          <Route path='/admin/:id' element={<RutaProtegida><Admin/></RutaProtegida>} />

        </Routes>
        <Footer/>

    </BrowserRouter>
    </>
    
  )
}

export default App
