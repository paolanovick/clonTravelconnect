import React from "react";
import ContenedorCartasMes from "./ContenedorCartasMes";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";


const DestacadosDelMes: React.FC = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) return null;

  const tituloTipografia =
    tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";
  const tituloTipografiaColor =
    tarjetas?.tipografiaColorTitulo ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
        mb: 5,
        width: "100%",
        px: 0, // ✅ Eliminamos el padding lateral que afectaba la alineación
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 5,
            color: tituloTipografiaColor,
            fontFamily: tituloTipografia,
            textTransform: "uppercase",
            letterSpacing: "2px",
            position: "relative",
            display: "inline-block",
            fontSize: {
              xs: "1.8rem",
              sm: "2.4rem",
              md: "3.2rem",
              lg: "4rem",
            },
          }}
        >
          Destacados del Mes
          <motion.span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)",
              mixBlendMode: "overlay",
              pointerEvents: "none",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </Typography>
      </motion.div>

      <ContenedorCartasMes />
      
    </Box>
  );
};

export default DestacadosDelMes;
