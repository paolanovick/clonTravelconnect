import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box, GlobalStyles } from "@mui/material";
import { useDatosGenerales } from "./contextos/DatosAgenciaContext"; // ✅ Reemplazo de EstilosAgencia
import AppRoutes from "./routers"; // 🚀 Importamos las rutas

const App: React.FC = () => {
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>No se pudieron cargar los datos de la agencia.</Box>;
  }

  /** 🔥 Aplicamos el color de fondo desde `Datos Generales` */
  const fondoColor = datosGenerales.colorFondoAgencia || "#F5F5F5"; // ✅ Fallback a color gris claro

  return (
    <Router>
      {/* 🔹 Elimina margen y padding global para evitar espacios en blanco */}
      <GlobalStyles
        styles={{
          "html, body, #root": {
            margin: 0,
            padding: 0,
            width: "100%",
            minHeight: "100vh",
            overflowX: "hidden",
          },
        }}
      />

      <Box
        sx={{
          backgroundColor: fondoColor, // ✅ Ahora usa `colorFondoAgencia`
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          boxSizing: "border-box",
        }}
      >
        <AppRoutes /> {/* 🚀 Todo el contenido puede hacer scroll */}
      </Box>
    </Router>
  );
};

export default App;
