// DescripcionContent.tsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

interface DescripcionContentProps {
  descripcion?: string | null;
}

const DescripcionContent: React.FC<DescripcionContentProps> = ({ descripcion }) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "sans-serif";
  const colorPrimario = tarjetas?.color?.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColorContenido || "#333";

  return (
    <Box sx={{ mt: 2, px: 2 }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          p: 3,
          borderRadius: 4,
          backgroundColor: "#fff",
          border: `1px solid ${colorPrimario}`,
          boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
        }}
      >
        {/* Icono */}
        <Box sx={{ color: colorPrimario, pt: 0.5 }}>
          <InfoOutlinedIcon sx={{ fontSize: 40 }} />
        </Box>

        {/* Texto */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: tipografia,
              color: colorPrimario,
              fontWeight: "bold",
              mb: 1,
              fontSize: "1.25rem",
            }}
          >
            Descripción del paquete
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: tipografia,
              color: colorTexto,
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
            }}
          >
            {descripcion ? descripcion : "No hay descripción disponible para este paquete turístico."}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default DescripcionContent;
