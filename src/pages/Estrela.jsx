// src/Estrela.jsx (Corrigido)

// Aceita 'fill' e 'stroke' como props, com "gold" como padrão
export default function Estrela({ fill = "gold", stroke = "gold" }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"      
        height="25"    
        viewBox="0 0 24 24"
        fill={fill}     {/* Usa a prop */}
        stroke={stroke}   {/* Usa a prop */}
        strokeWidth="0"
      >
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.85L19.335 24 12 20.201 4.665 24 6 15.598 0 9.748l8.332-1.73z"/>
      </svg>
    );
  }