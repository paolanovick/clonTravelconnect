import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { PaqueteDestacado } from "../../../interfaces/PaqueteDestacado";

interface CartaMesProps {
  paquete: PaqueteDestacado;
  estilos: {
    tarjetaTipografia: string;
    tarjetaTipografiaColor: string;
    tarjetaColorPrimario: string;
    tarjetaColorSecundario: string;
    tarjetaColorTerciario: string;
  };
}

const CartaMes: React.FC<CartaMesProps> = ({ paquete, estilos }) => {
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setCargando(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      sx={{
        width: 280,
        minHeight: 350,
        borderRadius: "16px",
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": { transform: "scale(1.05)" },
        backgroundColor: estilos.tarjetaColorPrimario,
        color: estilos.tarjetaTipografiaColor,
        fontFamily: estilos.tarjetaTipografia,
      }}
    >
      {cargando && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <CircularProgress sx={{ color: estilos.tarjetaColorSecundario }} />
        </Box>
      )}

      <CardMedia
        component="img"
        height="150"
        image={paquete.imagen || "/imagenes/default-image.jpg"}
        alt={paquete.nombre}
        sx={{
          filter: cargando ? "blur(8px)" : "none",
          transition: "filter 0.5s ease-in-out",
        }}
      />

      <CardContent
        sx={{
          backgroundColor: estilos.tarjetaColorTerciario,
          padding: "16px",
          textAlign: "center",
          opacity: cargando ? 0 : 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {paquete.nombre}
        </Typography>
        <Typography variant="body2">
          {paquete.descripcion}
        </Typography>
      </CardContent>

      <Box
        sx={{
          backgroundColor: estilos.tarjetaColorPrimario,
          color: "white",
          padding: "12px",
          textAlign: "center",
          fontWeight: "bold",
          borderRadius: "0 0 16px 16px",
        }}
      >
        Desde ARS {paquete.precio.toLocaleString("es-AR")}
      </Box>
    </Card>
  );
};

export default CartaMes;
