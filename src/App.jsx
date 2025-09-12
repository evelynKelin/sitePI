import { Routes, Route, Link, useNavigate } from "react-router-dom";
import copo from "./assets/img/copo.png";
import "./App.css"; // CSS importado aqui

// Componente de ícone (Seta)
function Seta({ direcao = "arrow_back", onClick, className }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      onClick={onClick}
    >
      {direcao}
    </span>
  );
}

// Página Home
const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="pai">
      <div id="filho1">
        <h1 className="fontePrincipal">Modelo Copo</h1>
      </div>

      <div id="filho2">
        <img src={copo} alt="Copo" />
      </div>

      <div className="anelFundo"></div>

      <div id="filho3">
        <h2 className="fonteSecundaria">Algumas informações sobre o copo</h2>
        <p className="paragrafo">
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...
        </p>
      </div>

      <div id="filho4">
        <div className="fundinho2">
          <h2 className="fonteSecundaria">O design</h2>
          <p className="paragrafo">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...
          </p>
        </div>
      </div>

      {/* Seta direita para ir para Login */}
      <Seta
        direcao="arrow_forward"
        onClick={() => navigate("/login")}
        className="seta-direita"
      />
    </div>
  );
};

// Página Login
const Login = () => {
  const navigate = useNavigate();

  return (
    <div id="login">
      <h1>Login</h1>
      <p>Faça login aqui.</p>

      {/* Seta esquerda para voltar para Home */}
      <Seta
        direcao="arrow_back"
        onClick={() => navigate("/")}
        className="seta-esquerda"
      />
    </div>
  );
};

// App principal
export default function App() {
  return (
    <>
      {/* Menu global */}
      <nav className="menuzinho">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
