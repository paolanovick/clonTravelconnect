// Hotel.tsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

interface HotelProps {
  hotel: {
    nombre: string;
    id_hotel: string;
    categoria_hotel: string; // puntuación del 1 al 5
  };
}

const Hotel: React.FC<HotelProps> = ({ hotel }) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "sans-serif";
  const colorPrimario = tarjetas?.color?.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColorContenido || "#333";

  const estrellas = parseInt(hotel.categoria_hotel || "0");

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: "#fff",
        border: `1px solid ${colorPrimario}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: tipografia,
          color: colorPrimario,
          fontWeight: "bold",
          fontSize: "1.3rem",
          mb: 1,
        }}
      >
        {hotel.nombre}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {[...Array(estrellas)].map((_, index) => (
          <StarIcon key={index} sx={{ color: "#FFD700", fontSize: 20 }} />
        ))}
        {estrellas === 0 && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: tipografia,
              color: colorTexto,
              fontStyle: "italic",
            }}
          >
            Sin categoría
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Hotel;
