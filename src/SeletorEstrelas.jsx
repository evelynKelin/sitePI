// src/SeletorEstrelas.jsx
import React, { useState } from 'react';

// Componente de estrela individual
function EstrelaIcone({ preenchida, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill={preenchida ? "gold" : "grey"}
      stroke={preenchida ? "gold" : "grey"}
      strokeWidth="0"
      onClick={onClick}
      style={{ cursor: 'pointer', marginRight: '5px' }}
    >
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.85L19.335 24 12 20.201 4.665 24 6 15.598 0 9.748l8.332-1.73z"/>
    </svg>
  );
}

// Componente principal do seletor
export default function SeletorEstrelas({ nota, onChange }) {
  const [hoverNota, setHoverNota] = useState(0);

  return (
    <div style={{ margin: '15px 0' }}>
      {[1, 2, 3, 4, 5].map((valor) => (
        <span
          key={valor}
          onMouseEnter={() => setHoverNota(valor)}
          onMouseLeave={() => setHoverNota(0)}
        >
          <EstrelaIcone
            preenchida={valor <= (hoverNota || nota)}
            onClick={() => onChange(valor)}
          />
        </span>
      ))}
    </div>
  );
}