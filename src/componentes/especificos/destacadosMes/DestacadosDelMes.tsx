import React from "react";
import ContenedorCartasMes from "./ContenedorCartasMes";
import { Box, Typography } from "@mui/material";
import { useDestacadosMes, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const DestacadosDelMes: React.FC = () => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) return null; // ✅ Prevenir errores si `datosGenerales` es `null`

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` si `DestacadosMes` tiene valores `null` */
  const tituloTipografia = destacadosMes?.tituloTipografia || datosGenerales.tipografiaAgencia || "Arial";
  const tituloTipografiaColor = destacadosMes?.tituloTipografiaColor || datosGenerales.colorTipografiaAgencia || "#000000";

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
        mb: 5,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          mb: 5,
          color: tituloTipografiaColor, // ✅ Ahora el título usa el color de la tipografía correcta
          fontFamily: tituloTipografia,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
        }}
      >
        Destacados del Mes
      </Typography>

      {/* ✅ Ahora `ContenedorCartasMes` obtiene los paquetes internamente desde el contexto */}
      <ContenedorCartasMes />
    </Box>
  );
};

export default DestacadosDelMes;
