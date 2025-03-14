import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const TabsPaquete = () => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();
  const [tabSeleccionada, setTabSeleccionada] = useState(0);

  const colorFondo = destacadosMes?.tarjetaColorSecundario || datosGenerales?.colorSecundarioAgencia;
  const colorIndicador = destacadosMes?.tarjetaColorPrimario || datosGenerales?.colorPrincipalAgencia;
  const colorTexto = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabSeleccionada}
        onChange={(_, newValue) => setTabSeleccionada(newValue)}
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          bgcolor: colorFondo,
          "& .MuiTabs-indicator": { backgroundColor: colorIndicador }, // Aplica el color del indicador manualmente
        }}
      >
        <Tab label="Hoteles" sx={{ color: colorTexto }} />
        <Tab label="Descripción" sx={{ color: colorTexto }} />
        <Tab label="Itinerario" sx={{ color: colorTexto }} />
        <Tab label="Asistencia" sx={{ color: colorTexto }} />
      </Tabs>
    </Box>
  );
};

export default TabsPaquete;
