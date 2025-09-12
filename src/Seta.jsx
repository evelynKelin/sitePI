import React from "react";

export default function Seta({ direcao = "arrow_back", onClick, className }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {direcao}
    </span>
  );
}
