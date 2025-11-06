import React from "react";

export default function Verificado({ className, onClick }) {
  return (
    <span
      className={`icone-verificado ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer",
        color:"rgb(163,0,255)"
       }}
    >
      check_circle
    </span>
  );
}
