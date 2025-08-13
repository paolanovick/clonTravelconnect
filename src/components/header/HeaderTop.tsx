import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "./Header";
import ContenedorBusqueda from "../buscador/ContenedorBusqueda";

const TopHeader = () => {
  const theme = useTheme();
  const [headerHeight, setHeaderHeight] = useState(0);
  const contenedorHeight = 120;

  const calcularAltoHeader = () => {
    const w = window.innerWidth;
    // Debe reflejar lo definido en Header.tsx:
    // xs: 100vh, sm: 75vh, md+: 65vh
    if (w < 600) return window.innerHeight * 1.0;
    if (w < 900) return window.innerHeight * 0.75;
    return window.innerHeight * 0.65;
  };

  useEffect(() => {
    const update = () => setHeaderHeight(calcularAltoHeader());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: theme.zIndex.appBar, // 1100 por defecto
        }}
      >
        <Header />
      </Box>

      {/* Contenedor de búsqueda superpuesto */}
      <Box
        sx={{
          position: "absolute",
          top: `calc(${headerHeight}px - ${contenedorHeight / 2}px)`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "1200px",
          height: `${contenedorHeight}px`,
          // Debe estar por encima del AppBar (1100)
          zIndex: theme.zIndex.appBar + 1, // 1101+
          backgroundColor: "transparent",
        }}
      >
        <ContenedorBusqueda />
      </Box>

      {/* Espaciador (opcional: podrías usar headerHeight) */}
      <Box sx={{ height: "30px" }} />
    </Box>
  );
};

export default TopHeader;
