import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";
import { useDatosAgencia } from "../contextos/DatosAgenciaContext";
import { DatosAgencia } from "../interfaces/datosAgencia";

declare global {
  interface Window {
    cambiarSimulacion?: (idAgencia: string) => void;
    __DATOS_AGENCIA__?: DatosAgencia;
  }
}

const SelectorSimulacion: React.FC = () => {
  const { setDatosAgencia } = useDatosAgencia();
  const [simulacion, setSimulacion] = useState<string>(window.__DATOS_AGENCIA__?.idAgencia || "001");

  // 🔥 Sincronizar `simulacion` con cambios en `window.__DATOS_AGENCIA__`
  useEffect(() => {
    const handleCambioSimulacion = () => {
      if (window.__DATOS_AGENCIA__) {
        setSimulacion(window.__DATOS_AGENCIA__.idAgencia);
        setDatosAgencia?.(window.__DATOS_AGENCIA__);
      }
    };

    window.addEventListener("cambioSimulacion", handleCambioSimulacion);
    handleCambioSimulacion(); // ✅ Sincroniza al inicio

    return () => window.removeEventListener("cambioSimulacion", handleCambioSimulacion);
  }, [setDatosAgencia]);

  // 🔥 Manejar cambio de simulación
  const manejarCambio = (event: SelectChangeEvent<string>) => {
    const nuevaSimulacion = event.target.value;
    setSimulacion(nuevaSimulacion);

    if (window.cambiarSimulacion) {
      window.cambiarSimulacion(nuevaSimulacion);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Typography variant="h6">Seleccionar Simulación</Typography>
      <FormControl sx={{ mt: 2, width: "250px" }}>
        <InputLabel>Agencia</InputLabel>
        <Select value={simulacion} onChange={manejarCambio} label="Agencia">
          <MenuItem value="001">Desierto Aventura</MenuItem>
          <MenuItem value="002">Jungla EcoTours</MenuItem>
          <MenuItem value="003">Glaciar Explorer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectorSimulacion;