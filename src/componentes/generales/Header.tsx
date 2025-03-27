import React, { useRef, useEffect } from "react";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👉 Importamos navegación
import { useHeader, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const Header: React.FC = () => {
  const header = useHeader();
  const datosGenerales = useDatosGenerales();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate(); // 👉 Hook de navegación

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBackground = header?.videoBackground || null;
  const imagenBackground = header?.imagenBackground || null;

  useEffect(() => {
    if (videoRef.current && videoBackground) {
      videoRef.current.play().catch((error) => console.error("Error al reproducir el video:", error));
    }
  }, [videoBackground]);

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
      {videoBackground ? (
        <Box
          component="video"
          ref={videoRef}
          key={videoBackground}
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
          alignItems: "center",
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
          whileHover={{ scale: 1.25  }}
        >
          {datosGenerales?.logoAgencia && (
            <Box
              component="img"
              src={datosGenerales.logoAgencia}
              alt="Logo Agencia"
              onClick={() => navigate("/")} // 👉 Redirección a Home
              onError={(e) => (e.currentTarget.style.display = "none")}
              sx={{
                height: isMobile ? 200 : 300,
                width: "auto",
                maxWidth: "1500px",
                cursor: "pointer",
                 // 👉 Inclinado y más al centro
                transition: "transform 0.3s ease-in-out",
              }}
            />
          )}
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
