// TransporteContent.tsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";
import TrainIcon from "@mui/icons-material/Train";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

interface TransporteContentProps {
  transporte?: string;
}

const iconoTransporte = (texto: string) => {
  const lower = texto.toLowerCase();

  if (lower.includes("bus") || lower.includes("micro") || lower.includes("ómnibus"))
    return <DirectionsBusIcon sx={{ fontSize: 40 }} />;
  if (lower.includes("auto") || lower.includes("vehículo") || lower.includes("auto"))
    return <DirectionsCarIcon sx={{ fontSize: 40 }} />;
  if (lower.includes("vuelo") || lower.includes("avión") || lower.includes("aéreo"))
    return <FlightIcon sx={{ fontSize: 40 }} />;
  if (lower.includes("tren"))
    return <TrainIcon sx={{ fontSize: 40 }} />;
  if (lower.includes("camión") || lower.includes("flete"))
    return <LocalShippingIcon sx={{ fontSize: 40 }} />;

  return <DirectionsCarIcon sx={{ fontSize: 40 }} />;
};

const TransporteContent: React.FC<TransporteContentProps> = ({ transporte }) => {
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
          alignItems: "center",
          gap: 2,
          p: 3,
          borderRadius: 4,
          backgroundColor: "#fff",
          border: `1px solid ${colorPrimario}`,
          boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
        }}
      >
        {/* Icono */}
        <Box sx={{ color: colorPrimario }}>
          {transporte ? iconoTransporte(transporte) : <DirectionsBusIcon sx={{ fontSize: 40 }} />}
        </Box>

        {/* Texto */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: tipografia,
              color: colorPrimario,
              fontWeight: "bold",
              mb: 0.5,
              fontSize: "1.25rem",
            }}
          >
            Medio de transporte
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: tipografia,
              color: colorTexto,
              fontWeight: 500,
              fontSize: "1rem",
              lineHeight: 1.5,
            }}
          >
            {transporte ? transporte : "No hay información de transporte disponible para este paquete."}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TransporteContent;
