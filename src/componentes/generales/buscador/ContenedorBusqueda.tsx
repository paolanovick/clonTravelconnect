import React from "react";
import { Box, Typography } from "@mui/material";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import SelectorPestanas from "./SelectorPestanas";
import SearchInputs from "./SearchFields";
import BotonBusqueda from "./BotonBusqueda"; // 🔥 Importamos el nuevo botón

const ContenedorBusqueda: React.FC = () => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) {
    return <Typography sx={{ textAlign: "center", mt: 4 }}>Cargando datos de la agencia...</Typography>;
  }

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const fondoColor = buscador?.fondoColor || datosGenerales.colorTerciarioAgencia || "white";

  return (
    <Box
      sx={{
        position: "absolute",
        top: "62.5vh",
        left: "50%",
        transform: "translate(-50%, 0)",
        width: { xs: "90vw", md: "60vw" },
        backgroundColor: fondoColor, // ✅ Se usa el color de fondo correcto
        borderRadius: "35px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: "16px", md: "32px" },
        minHeight: { xs: "auto", md: "125px" },
        zIndex: 1200,
      }}
    >
      {/* 🔥 Selector de Pestañas (Ahora centrado correctamente) */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 4 }}>
        <SelectorPestanas />
      </Box>

      {/* 🔥 Sección de Inputs */}
      <Box sx={{ width: "100%", mb: 3 }}>
        <SearchInputs />
      </Box>

      {/* 🔥 Botón de Búsqueda superpuesto */}
      <BotonBusqueda />
    </Box>
  );
};

export default ContenedorBusqueda;
