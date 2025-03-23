import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { ReactNode } from "react";

interface FiltroItemProps {
  label: string;
  icon: ReactNode;
}

const FiltroItem = ({ label, icon }: FiltroItemProps) => {
  const [hover, setHover] = useState(false);
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  // 🔹 Colores dinámicos con fallback
  const colorFondo = tarjetas?.color.primario || datosGenerales?.color.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";
  const tipografia = tarjetas?.tipografiaColorContenido || datosGenerales?.tipografiaAgencia || "Arial";

  return (
    <Button
      fullWidth
      variant="contained"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setHover(!hover)} // 🔥 Para móviles, expandir al hacer click/tap
      sx={{
        backgroundColor: colorFondo,
        color: colorTexto,
        borderRadius: hover ? "50px" : "50%", // 🔥 Cambia entre circular y expandido
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
        textTransform: "none",
        fontFamily: tipografia,
        fontSize: "0.9rem",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: hover ? "flex-start" : "center", // 🔥 Centrado cuando es círculo
        gap: hover ? 1.5 : 0, // 🔥 Espacio entre icono y texto solo cuando está expandido
        py: "8px",
        px: hover ? "16px" : "10px", // 🔥 Padding reducido cuando es círculo
        minHeight: 40,
        width: hover ? "100%" : "40px", // 🔥 Se expande solo en hover
        maxWidth: hover ? "95%" : "40px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: `${colorFondo}CC`, // 🔥 Hover con opacidad
          transform: "scale(1.02)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      {/* 🔥 Ícono centrado cuando es un círculo */}
      <Box
        sx={{
          color: colorTexto,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
        }}
      >
        {icon}
      </Box>

      {/* 🔥 Texto solo visible cuando está expandido */}
      {hover && (
        <Typography
          sx={{
            color: colorTexto,
            fontFamily: tipografia,
            fontWeight: "bold",
            textAlign: "left",
            flexGrow: 1,
            pr: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </Typography>
      )}
    </Button>
  );
};

export default FiltroItem;
