import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useBusqueda } from "../../../hooks/useBusqueda";
import { useBuscador, useDatosGenerales, useTarjetas } from "../../../contextos/agencia/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/formulario/FormularioContext";

const BotonBusqueda: React.FC = () => {
  const { enviarFormulario, resetFormulario } = useFormulario();
  const { loading, handleClick } = useBusqueda();
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas();

  if (!datosGenerales) return null;

  const tipografia =
    buscador?.tipografia || datosGenerales?.tipografiaAgencia || "Poppins, sans-serif";

  const textoColor =
    tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";

  const colorPrimario =
    buscador?.color?.primario || datosGenerales?.color?.primario || "#007BFF";

  const handleBusqueda = () => {
    enviarFormulario();
    handleClick();
    resetFormulario();
  };

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="contained"
        onClick={handleBusqueda}
        sx={{
          borderRadius: "35px",
          padding: { xs: "14px 36px", md: "16px 48px" },
          fontSize: { xs: "18px", md: "22px" },
          fontWeight: "bold",
          backgroundColor: colorPrimario,
          color: textoColor,
          fontFamily: tipografia,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: textoColor, // 🔄 El color de fondo pasa a ser el del texto
            color: colorPrimario,        // 🔄 El color del texto pasa a ser el del fondo original
          },
        }}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: textoColor }} />
        ) : (
          "Buscar"
        )}
      </Button>
    </motion.div>
  );
};

export default BotonBusqueda;
