import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './login'; // importa a página de login

function App() {
  return (
    <div>
      {/* Menu */}
      <nav className="menuzinho">
        <ul>
          <li><Link to="/">logo loja</Link></li>
          <li><Link to="/">NomeLoja</Link></li>
          <li id="mDiferente">
            <Link to="/login"><button>Login</button></Link>
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
    <div>
      <h1>Algum dia vai ser um site</h1>
    </div>
  );
}

export default App;
