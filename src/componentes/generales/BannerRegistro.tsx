import React from "react";
import { Box, Typography, TextField, Button, InputAdornment, Container, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useBannerRegistro, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const BannerRegistro: React.FC = () => {
  const bannerRegistro = useBannerRegistro();
  const datosGenerales = useDatosGenerales();


  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const fondoColor = bannerRegistro?.color?.primario|| datosGenerales?.color?.primario || "#FF5733";
  const tipografia = datosGenerales?.tipografiaAgencia || "Arial";
  const tipografiaColor = bannerRegistro?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";
  const colorSecundario = bannerRegistro?.color?.secundario || "#C70039";

  return (
    <Box
      sx={{
        width: "100vw",
        backgroundColor: fondoColor,
        padding: { xs: "50px 20px", md: "70px 0" },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={5}>
          {/* 🔥 Texto alineado a la izquierda */}
          <Grid item xs={12} md={6}>
            {bannerRegistro?.titulo && (
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: tipografiaColor,
                  textAlign: { xs: "center", md: "left" },
                  maxWidth: "450px",
                  fontFamily: tipografia,
                }}
              >
                {bannerRegistro?.titulo||"Resgistrate por Ofertas Exclusivas"}
              </Typography>
            )}
          </Grid>

          {/* 🔥 Input y botón alineados a la derecha */}
          <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "center", md: "flex-end" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: "12px",
                width: { xs: "100%", md: "auto" },
              }}
            >
              {/* 🔥 Input de Email */}
              <TextField
                placeholder="Ingrese su email aquí"
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "25px",
                  width: { xs: "100%", md: "280px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    color: "#333",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorSecundario,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#666" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* 🔥 Botón de Registro */}
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "50px",
                  padding: "12px 32px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  border: `3px solid ${tipografiaColor}`,
                  color: tipografiaColor,
                  backgroundColor: "transparent",
                  transition: "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: tipografiaColor,
                    color: fondoColor,
                    transform: "scale(1.05)",
                  },
                }}
              >
                Registrarme!
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BannerRegistro;