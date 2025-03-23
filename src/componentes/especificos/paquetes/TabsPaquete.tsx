import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const TabsPaquete = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const [tabSeleccionada, setTabSeleccionada] = useState(0);

  // 🔹 Colores dinámicos con fallback
  const colorFondo = tarjetas?.color.secundario || datosGenerales?.color.secundario || "#f5f5f5";
  const colorIndicador = tarjetas?.color.primario || datosGenerales?.color.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColorContenido || datosGenerales?.colorTipografiaAgencia || "#000";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorFondo, // 🔥 Color de fondo dinámico
        p: 1,
        borderRadius: 2, // 🔹 Bordes redondeados sutiles
        boxShadow: 2, // 🔹 Pequeña sombra para resaltar
      }}
    >
      <Tabs
        value={tabSeleccionada}
        onChange={(_, newValue) => setTabSeleccionada(newValue)}
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          "& .MuiTabs-flexContainer": {
            justifyContent: "center",
          },
          "& .MuiTabs-indicator": { backgroundColor: colorIndicador },
        }}
      >
        {["Hoteles", "Descripción", "Itinerario", "Asistencia"].map((label, index) => (
          <Tab
            key={index}
            label={label}
            sx={{
              color: colorTexto,
              flex: 1,
              textAlign: "center",
              fontWeight: "bold",
              "&:hover": { opacity: 0.8 },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsPaquete;
