import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useBusqueda } from "./useBusqueda";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/FormularioContext";

const BotonBusqueda: React.FC = () => {
  const { enviarFormulario, resetFormulario } = useFormulario();
  const { loading, handleClick } = useBusqueda(); // 🔥 Eliminamos `{}` ya que los datos vienen del contexto
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) return null;

  const textoColor = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";
  const botonColor = buscador?.color.primario || datosGenerales?.color?.primario || "#007BFF";
  const hoverColor = buscador?.color.secundario || datosGenerales?.color?.secundario || botonColor;

  const handleBusqueda = () => {
    enviarFormulario(); // 🔥 Guarda los valores en el contexto antes de resetear
    handleClick(); // 🔥 Ejecuta la búsqueda
    resetFormulario(); // 🔥 Limpia los inputs después de la búsqueda
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
      <motion.div initial={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Button
          variant="contained"
          onClick={handleBusqueda}
          sx={{
            borderRadius: "35px",
            padding: "16px 48px",
            fontSize: "22px",
            fontWeight: "bold",
            backgroundColor: botonColor,
            color: textoColor,
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              backgroundColor: hoverColor,
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: textoColor }} /> : "Buscar"}
        </Button>
      </motion.div>
    </Box>
  );
};

export default BotonBusqueda;
