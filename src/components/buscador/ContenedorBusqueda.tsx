import React from "react";
import { Box, Typography } from "@mui/material";
import { useBuscador, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";
import SelectorPestanas from "./contenedorBusqueda/pestanias/SelectorPestanas";
import SearchInputs from "./contenedorBusqueda/camposBusqueda/SearchFields";
import BotonBusqueda from "./boton/BotonBusqueda";

const ContenedorBusqueda: React.FC = () => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) {
    return <Typography sx={{ textAlign: "center", mt: 4 }}>Cargando datos de la agencia...</Typography>;
  }

  // 🎯 Fallbacks desde Buscador -> Generales
  const fontFamily =
    buscador?.tipografia || datosGenerales.tipografiaAgencia || "Arial, sans-serif";

  const textColor =
    buscador?.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#000";

  // Fondo del contenedor = inputFondoColor ≡ Secundario
  const fondoColor =
    buscador?.color.secundario ||
    buscador?.color?.secundario ||
    datosGenerales.color?.secundario ||
    "#FFFFFF";

  return (
    <Box
      sx={{
        position: "relative", // para anclar el botón
        width: "100%",
        backgroundColor: fondoColor,
        color: textColor,
        fontFamily,
        borderRadius: "35px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        border: "1px solid transparent", // ❌ sin bordes de color
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: "24px", md: "32px" },
        px: { xs: "16px", md: "32px" },
        pb: { xs: "48px", md: "56px" }, // espacio para el botón
        minHeight: { xs: "auto", md: "125px" },
      }}
    >
      {/* 🔥 Selector de Pestañas */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 4 }}>
        <SelectorPestanas />
      </Box>

      {/* 🔥 Sección de Inputs */}
      <Box sx={{ width: "100%" }}>
        <SearchInputs />
      </Box>

      {/* 🔵 Botón de Búsqueda centrado y flotando en la parte inferior */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, 50%)",
          zIndex: 5,
        }}
      >
        <BotonBusqueda />
      </Box>
    </Box>
  );
};

export default ContenedorBusqueda;
