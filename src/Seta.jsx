// src/Seta.jsx
export default function Seta({
  direcao = "arrow_forward", // tipo de seta (padrão: direita)
  width = 25,
  height = 25,
  color = "rgb(227,193,165)",
  onClick,
  className
}) {
  // Define o caminho SVG conforme a direção
  const paths = {
    arrow_forward: "M12 4l8 8-8 8-1.41-1.41L16.17 12 10.59 6.41 12 4z",
    arrow_back: "M12 20l-8-8 8-8 1.41 1.41L7.83 12l5.58 5.59L12 20z",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth="0"
      onClick={onClick}
      className={className}
      style={{ cursor: "pointer" }}
    >
      <path d={paths[direcao] || paths.arrow_forward} />
    </svg>
  );
}
