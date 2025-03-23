import React from "react";
import { Button } from "@mui/material";
import { useDatosGenerales, useBuscador } from "../../../contextos/DatosAgenciaContext";

interface BotonSeleccionarProps {
  seleccion: { codigo: string; nombre: string } | null;
  onSeleccionar: (codigoIATA: string, nombre: string) => void;
  onClose: () => void;
}

const BotonSeleccionar: React.FC<BotonSeleccionarProps> = ({ seleccion, onSeleccionar, onClose }) => {
  const datosGenerales = useDatosGenerales();
  const buscador = useBuscador();

  const colorBoton = datosGenerales?.colorPrincipalAgencia || "#FF6600"; // 🔹 Naranja por defecto
  const colorTipografia = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";
  const tipografia = datosGenerales?.tipografiaAgencia || "'Poppins', sans-serif";

  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{ 
        mt: 2, 
        borderRadius: "30px", // 🔹 Más redondeado para asemejarse al de la imagen
        backgroundColor: colorBoton, // 🔹 Fondo ahora es el color principal de la agencia
        color: colorTipografia, // 🔹 Texto en el mismo color que el resto del componente
        fontFamily: tipografia, // 🔹 Aplica la tipografía correcta
        fontWeight: "bold", // 🔹 Texto en negrita
        fontSize: "1rem", // 🔹 Tamaño de fuente más grande
        border: `3px solid ${colorTipografia}`, // 🔹 Borde grueso blanco como en la imagen
        padding: "12px 24px", // 🔹 Más padding para hacerlo más visible
        transition: "all 0.3s ease-in-out", // 🔹 Transición suave
        "&:hover": {
          backgroundColor: "transparent", // 🔹 Efecto inverso al pasar el mouse
          color: colorBoton, // 🔹 Cambia el texto al color del fondo original
          border: `3px solid ${colorBoton}`, // 🔹 Cambia el borde a color naranja
        },
      }}
      disabled={!seleccion}
      onClick={() => {
        if (seleccion) {
          onSeleccionar(seleccion.codigo, seleccion.nombre);
          onClose();
        }
      }}
    >
      Seleccionar
    </Button>
  );
};

export default BotonSeleccionar;
