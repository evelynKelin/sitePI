// src/data/products.js

// Corrigi os caminhos das imagens para refletir que este arquivo está em /src/data/
import adicionar from "../assets/img/adicionar.png";
import prod1 from "../assets/img/prod1.png";
import prod2 from "../assets/img/prod2.png";
import prod3 from "../assets/img/prod3.png";
import prod4 from "../assets/img/prod4.png";
import prod5 from "../assets/img/prod5.png";
import prod6 from "../assets/img/prod6.png";
import prod7 from "../assets/img/prod7.png";
import prod8 from "../assets/img/prod8.png";

// Exportamos as listas para que possam ser importadas em qualquer lugar
export const produtos = [
  { id: 1, nome: "Washbag", img: prod1, imagem: adicionar },
  { id: 2, nome: "Copo Térmico Preto", img: prod2, imagem: adicionar },
  { id: 3, nome: "Kit Washbag", img: prod3, imagem: adicionar },
  { id: 4, nome: "Garrafa Térmica", img: prod4, imagem: adicionar },
  { id: 5, nome: "Colar Black", img: prod5, imagem: adicionar },
  { id: 6, nome: "Bomba para Chimarrão", img: prod6, imagem: adicionar },
  { id: 7, nome: "Colar Banshee", img: prod7, imagem: adicionar },
  { id: 8, nome: "Bolsa", img: prod8, imagem: adicionar },
];

export const precos = {
  1: 160,
  2: 120,
  3: 200,
  4: 180,
  5: 90,
  6: 75,
  7: 110,
  8: 140,
};