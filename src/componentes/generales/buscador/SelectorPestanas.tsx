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
  const tabsColor = buscador?.tabsColor || datosGenerales.colorPrincipalAgencia || "#007BFF";
  const fondoColor = datosGenerales.colorTerciarioAgencia || "#E0E0E0";
  const hoverColor = datosGenerales.colorSecundarioAgencia || "#0056b3";

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
          backgroundColor: fondoColor,
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
              color: pestanaActiva === opcion.valor ? "white" : tabsColor,
              backgroundColor: pestanaActiva === opcion.valor ? tabsColor : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: pestanaActiva === opcion.valor ? hoverColor : fondoColor,
              },
              "&.Mui-selected": {
                backgroundColor: tabsColor,
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: hoverColor,
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
