import React, { useRef, useEffect } from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useHeader, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const Header: React.FC = () => {
  const header = useHeader();
  const datosGenerales = useDatosGenerales();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBackground = header?.videoBackground || null;
  const imagenBackground = header?.imagenBackground || null;

  useEffect(() => {
    if (videoRef.current && videoBackground) {
      videoRef.current.play().catch((error) =>
        console.error("Error al reproducir el video:", error)
      );
    }
  }, [videoBackground]);

  const opacidad = header?.imagenBackgroundOpacidad ?? 1;
  const opacidadNormalizada =
    opacidad >= 0 && opacidad <= 1 ? opacidad : 1;

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor:
          videoBackground || imagenBackground ? "transparent" : "#000",
        boxShadow: "none",
        height: { xs: "100vh", sm: "75vh", md: "65vh" },
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
            onError={(e) =>
              (e.currentTarget.style.display = "none")
            }
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
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          px: { xs: 2, sm: 4, md: 6 },
          pt: { xs: 0, sm: 1, md: 1 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "flex-start",
            },
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.25 }}
          >
            {datosGenerales?.logoAgencia && (
              <Box
                component="img"
                src={datosGenerales.logoAgencia}
                alt="Logo Agencia"
                onClick={() => navigate("/")}
                onError={(e) =>
                  (e.currentTarget.style.display = "none")
                }
                sx={{
                  height: { xs: 170, sm: 200, md: 250, lg: 300 },
                  width: "auto",
                  maxWidth: "90vw",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  mt: { xs: 2, sm: 3, md: 4 },
                }}
              />
            )}
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
