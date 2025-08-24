import React from 'react';
import Menu from './components/Menu'; // importa o Menu.jsx
import copo from './assets/img/copo.png'; 

export default function Pagina2() {
  return (
    <div>
      {/* Menu reutilizado */}
      <Menu />  

      {/* Conteúdo da página */}
      <div>
        <h1 className="fonteSecundaria">Um texto aqui</h1>

        {/* Círculo de fundo atrás do copo */}
        <div className="anelFundo"></div>

        {/* Imagem do copo */}
        <div id="copo2">  
          <img src={copo} alt="Copo" />
        </div>
      </div>
    </div>
  );
}
