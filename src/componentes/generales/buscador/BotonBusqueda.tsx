import React from "react";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useNavigate } from "react-router-dom"; // 🚀 Importamos para redirigir

const BotonBusqueda: React.FC = () => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const navigate = useNavigate(); // 🚀 Hook de navegación

  if (!datosGenerales) return null;

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const botonColor = buscador?.botonBuscarColor || datosGenerales.colorPrincipalAgencia || "#007BFF";
  const textoColor =  buscador?.tipografiaColor|| datosGenerales.colorTipografiaAgencia;
  const hoverColor = buscador?.inputColor||datosGenerales.colorSecundarioAgencia ;

  // 🔥 Función para manejar la redirección
  const handleClick = () => {
    navigate("/paquetes-busqueda"); // 🔥 Redirige a PaquetesBusqueda.tsx
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "-40px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1300,
      }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="contained"
          onClick={handleClick} // 🚀 Agregamos la redirección aquí
          sx={{
            borderRadius: "35px",
            padding: "16px 48px",
            fontSize: "22px",
            fontWeight: "bold",
            backgroundColor: botonColor,
            color: textoColor,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              backgroundColor: hoverColor,
            },
          }}
        >
          Buscar
        </Button>
      </motion.div>
    </Box>
  );
};

export default BotonBusqueda;
