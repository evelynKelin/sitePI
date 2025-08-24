import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './login'; // importa a página de login
import copo from './assets/img/copo.png'; 

function App() {
  return (
    <div>
      {/* Menu */}
      <nav className="menuzinho">
        <ul>
          <li><Link to="/">logo loja</Link></li>
          <li><Link to="/">NomeLoja</Link></li>
          <li id="mDiferente">
            <Link to="/login"><button className='botaoUniversal'>Login</button></Link>
          </li>
        </ul>
      </nav>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (

    <div id="pai">

<li><Link to="/p2">Página 2</Link></li>
      <div id="filho1">
      <h1 className="fontePrincipal">Modelo Copo</h1>
    </div>

    <div id="filho2">
      
      <img src={copo} alt="Copo" />
    </div>

   <div class="anelFundo"></div>


    <div id="filho3">
    
      <h2 className='fonteSecundaria'>Algumas informações sobre o copo</h2>
      <p className="paragrafo">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
      </p>

      </div>


    <div id="filho4">
       <div className='fundinho2'>
      <h2 className='fonteSecundaria'>O desing</h2>
      <p className="paragrafo">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
      </p>

      </div>
      </div>


    </div>

 
  );
}

export default App;
