import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import CheckIcon from "@mui/icons-material/Check";

const SelectorPestanas: React.FC = () => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const [pestanaActiva, setPestanaActiva] = useState("paquetes");

  if (!datosGenerales) return null;

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const fondoGeneral = "#F5F5F5"; // Blanco grisáceo
  const fondoSeleccionado = buscador?.color?.secundario || datosGenerales?.color?.secundario || "#D1E3FF";
  const hoverColor = buscador?.color?.primario || datosGenerales?.color?.primario || "#0056b3";
  const tipografiaColorSeleccionado = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "black";

  const opciones = [
    { valor: "paquetes", label: "Paquetes" },
    { valor: "vuelos", label: "Vuelos" },
    { valor: "hoteles", label: "Hoteles" },
    { valor: "autos", label: "Autos" },
    { valor: "cruceros", label: "Cruceros" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        maxWidth: "858px",
        mb: 2,
        overflowX: "auto", // ✅ Evita recortes en pantallas pequeñas
      }}
    >
      <ToggleButtonGroup
        value={pestanaActiva}
        exclusive
        onChange={(_, nuevaPestana) => {
          if (nuevaPestana !== null) setPestanaActiva(nuevaPestana);
        }}
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: { xs: "100%", md: "858px" },
          backgroundColor: fondoGeneral, // 🔥 Blanco grisáceo
          borderRadius: "35px",
          padding: "4px",
        }}
      >
        {opciones.map((opcion) => (
          <ToggleButton
            key={opcion.valor}
            value={opcion.valor}
            sx={{
              flex: 1,
              minWidth: { xs: "70px", sm: "120px" },
              borderRadius: "35px",
              textTransform: "none",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "600",
              fontFamily: "Poppins, sans-serif",
              color: pestanaActiva === opcion.valor ? tipografiaColorSeleccionado : "black",
              backgroundColor: pestanaActiva === opcion.valor ? fondoSeleccionado : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: pestanaActiva === opcion.valor ? hoverColor : fondoGeneral,
                color: tipografiaColorSeleccionado,
              },
              "&.Mui-selected": {
                backgroundColor: fondoSeleccionado,
                color: tipografiaColorSeleccionado,
              },
              "&.Mui-selected:hover": {
                backgroundColor: hoverColor,
                color: tipografiaColorSeleccionado,
              },
            }}
          >
            {pestanaActiva === opcion.valor && <CheckIcon sx={{ fontSize: 20 }} />}
            <Typography fontWeight="bold">{opcion.label}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SelectorPestanas;
