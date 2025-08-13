import React from "react";
import { Box, Typography } from "@mui/material";
import { useDatosGenerales, useTarjetas } from "../../../../contextos/agencia/DatosAgenciaContext";

// Función para calcular contraste (devuelve blanco o negro)
const getContrastingColor = (hexColor: string): string => {
  let color = hexColor.replace("#", "");
  if (color.length === 3) {
    color = color.split("").map((c) => c + c).join("");
  }
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

interface CartaMesPrecioProps {
  precio: number;
  moneda: string;
}

const CartaMesPrecio: React.FC<CartaMesPrecioProps> = ({ precio, moneda }) => {
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas();

  const tipografia =
    tarjetas?.tipografia ||
    datosGenerales?.tipografiaAgencia ||
    "Poppins, sans-serif";

  const colorPrimario =
    tarjetas?.color?.primario ||
    datosGenerales?.color?.primario ||
    "#FFFFFF";

  const textoContraste = getContrastingColor(colorPrimario);

  const codigoMoneda = moneda?.trim().toUpperCase() || "";

  return (
    <Box
      sx={{
        backgroundColor: colorPrimario,
        color: textoContraste,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: tipografia,
        borderRadius: "0 0 16px 16px",
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ fontSize: "1.2rem", color: textoContraste }}
      >
        Desde
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontSize: "2.4rem",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          color: textoContraste,
        }}
      >
        <span style={{ fontFamily: tipografia, color: textoContraste }}>
          {codigoMoneda}
        </span>
        {Math.round(precio).toLocaleString("es-AR")}
      </Typography>
    </Box>
  );
};

export default CartaMesPrecio;
