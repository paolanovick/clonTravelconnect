import React from "react";
import { Box, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CampoBusqueda from "./CampoBusqueda";
import CampoFecha from "./CampoFecha";
import CampoPasajeros from "./CampoPasajeros";

// Importación para evitar errores con MUI DatePicker
import type {} from "@mui/x-date-pickers/themeAugmentation";

const SearchInputs: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ backgroundColor: "transparent", padding: "16px", borderRadius: "25px" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          {/* 🔹 Ciudad de Origen */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: "220px" }}>
            <CampoBusqueda label="Ciudad de Salida" />
          </Grid>

          {/* 🔹 Destino */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: "220px" }}>
            <CampoBusqueda label="Ciudad de Destino" />
          </Grid>

          {/* 🔹 Fecha de Salida */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: "220px" }}>
            <CampoFecha label="Fecha de Salida" />
          </Grid>

          {/* 🔹 Cantidad de Pasajeros */}
          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: "220px" }}>
            <CampoPasajeros label="Viajeros" />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchInputs;
