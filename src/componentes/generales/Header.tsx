import React, { useRef, useEffect } from "react";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useHeader, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const Header: React.FC = () => {
  const header = useHeader();
  const datosGenerales = useDatosGenerales();
  const isMobile = useMediaQuery("(max-width: 600px)");

  // 🔥 Declaramos los hooks antes de cualquier return
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBackground = header?.videoBackground || null;
  const imagenBackground = header?.imagenBackground || null;

  useEffect(() => {
    if (videoRef.current && videoBackground) {
      videoRef.current.play().catch((error) => console.error("Error al reproducir el video:", error));
    }
  }, [videoBackground]); // 🔥 Se ejecuta solo si `videoBackground` cambia

  if (!datosGenerales) {
    return null;
  }

  const opacidad = header?.imagenBackgroundOpacidad ?? 1;
  const opacidadNormalizada = opacidad >= 0 && opacidad <= 1 ? opacidad : 1;

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: videoBackground || imagenBackground ? "transparent" : "#000",
        boxShadow: "none",
        height: isMobile ? "100vh" : "75vh",
        width: "100vw",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        zIndex: 1100,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      {/* 🔥 Renderiza el video si está disponible */}
      {videoBackground ? (
        <Box
          component="video"
          ref={videoRef}
          key={videoBackground} // 🔥 Esto fuerza la recarga si cambia la URL
          src={videoBackground}
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      ) : (
        // 🔥 Si no hay video, renderiza la imagen de fondo
        imagenBackground && (
          <Box
            component="img"
            src={imagenBackground}
            alt="Fondo"
            onError={(e) => (e.currentTarget.style.display = "none")}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
        )
      )}

      {/* 🔥 Capa negra con opacidad dinámica */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `rgba(0, 0, 0, ${opacidadNormalizada})`,
          zIndex: 1,
        }}
      />

      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: isMobile ? "center" : "flex-start",
          width: "100%",
          height: "100%",
          px: isMobile ? 0 : 4,
          pt: 2,
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.2 }}
        >
          {datosGenerales.logoAgencia && (
            <Box
              component="img"
              src={datosGenerales.logoAgencia}
              alt="Logo Agencia"
              onError={(e) => (e.currentTarget.style.display = "none")}
              sx={{
                height: isMobile ? 360 : 480, // 🔥 Aumento x2 el tamaño del logo
                width: "auto",
                maxWidth: "1500px", // Ajustado proporcionalmente
                cursor: "pointer",
              }}
            />
          )}
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
