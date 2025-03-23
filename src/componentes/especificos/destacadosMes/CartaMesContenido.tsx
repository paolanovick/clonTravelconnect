import React from "react";
import { CardContent, Typography } from "@mui/material";
import { useDatosGenerales, useTarjetas } from "../../../contextos/DatosAgenciaContext";

interface CartaMesContenidoProps {
  nombre: string;
  descripcion: string;
  estilos: {
    tarjetaTipografiaColor: string | null;
  };
  cargando: boolean;
}

const CartaMesContenido: React.FC<CartaMesContenidoProps> = ({
  nombre,
  descripcion,  
  cargando,
}) => {
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas();

  // Aplicar fallback en caso de valores null
  const tipografia =
    tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Poppins, sans-serif";

  const tipografiaColor =
    tarjetas?.tipografiaColorContenido || datosGenerales?.colorTipografiaAgencia || "#000000";

  return (
    <CardContent
      sx={{
        backgroundColor: "transparent", // ✅ Fondo transparente
        padding: "16px",
        textAlign: "center",
        opacity: cargando ? 0 : 1,
        fontFamily: tipografia, // ✅ Usa la tipografía correcta
        flexGrow: 1,
        color: tipografiaColor, // ✅ Usa el color correcto
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "2rem" }}>
        {nombre}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
        {descripcion}
      </Typography>
    </CardContent>
  );
};

export default CartaMesContenido;
