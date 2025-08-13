import React from "react";
import { CardContent, Typography } from "@mui/material";
import { useDatosGenerales, useTarjetas } from "../../../../contextos/agencia/DatosAgenciaContext";

interface CartaMesContenidoProps {
  nombre: string;
  cargando: boolean;
}

const CartaMesContenido: React.FC<CartaMesContenidoProps> = ({
  nombre,
  cargando,
}) => {
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas();

  const tipografia =
    tarjetas?.tipografia ||
    datosGenerales?.tipografiaAgencia ||
    "'Poppins', sans-serif";

  const tipografiaColorTitulo =
    tarjetas?.tipografiaColorTitulo ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  return (
    <CardContent
      sx={{
        backgroundColor: "#FFFFFF", // 🔥 Blanco fijo para contraste y lectura
        padding: "16px",
        textAlign: "center",
        opacity: cargando ? 0 : 1,
        fontFamily: tipografia,
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: tipografiaColorTitulo,
        }}
      >
        {nombre}
      </Typography>
    </CardContent>
  );
};

export default CartaMesContenido;
