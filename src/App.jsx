import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
        <Helmet>
            <title>REWIND BUSTER</title>
            <meta name="description" content="REWIND BUSTER: Alquiler de películas online con espíritu retro. Reviví el videoclub." />
            <meta name="theme-color" content="#0e3fa9" />
            <meta property="og:title" content="REWIND BUSTER" />
            <meta property="og:description" content="El videoclub volvió. Disfrutá películas clásicas y nuevas como si fuera 1995." />
            <meta property="og:image" content="/brand-small.png" />
            <meta property="og:type" content="website" />
        </Helmet>

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
