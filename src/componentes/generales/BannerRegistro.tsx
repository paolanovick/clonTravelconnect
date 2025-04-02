import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Container,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import {
  useBannerRegistro,
  useDatosGenerales,
} from "../../contextos/DatosAgenciaContext";

const BannerRegistro: React.FC = () => {
  const bannerRegistro = useBannerRegistro();
  const datosGenerales = useDatosGenerales();

  const fondoColor =
    bannerRegistro?.color?.primario ||
    datosGenerales?.color?.primario ||
    "#FF5733";
  const tipografia = datosGenerales?.tipografiaAgencia || "Arial";
  const tipografiaColor =
    bannerRegistro?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#FFFFFF";
  const colorSecundario = bannerRegistro?.color?.secundario || "#C70039";

  return (
    <Box
      sx={{
        width: "100vw",
        backgroundColor: fondoColor,
        py: { xs: 5, sm: 6, md: 8 },
        px: 0, // ✅ quitamos el padding externo para permitir centrado real
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          px: { xs: 2, sm: 4 }, // ✅ aplicamos padding interno dentro del container
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, sm: 5 }}
          alignItems="center"
          justifyContent={{ xs: "center", md: "center", lg: "space-between" }}
          textAlign={{ xs: "center", md: "center", lg: "left" }}
        >
          {/* 🔥 Título */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "center", lg: "flex-start" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: tipografiaColor,
                  fontFamily: tipografia,
                  fontSize: {
                    xs: "1.6rem",
                    sm: "2rem",
                    md: "2.2rem",
                    lg: "2.5rem",
                  },
                  lineHeight: 1.3,
                  maxWidth: "600px",
                }}
              >
                {bannerRegistro?.titulo ||
                  "Registrate por Ofertas Exclusivas"}
              </Typography>
            </Box>
          </Grid>

          {/* 🔥 Input + Botón */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "center",
                  lg: "flex-end",
                },
                gap: { xs: 2, sm: 2.5 },
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                <TextField
                  fullWidth
                  placeholder="Ingrese su email aquí"
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "25px",
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
              </Box>

              <Button
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  whiteSpace: "nowrap",
                  borderRadius: "50px",
                  padding: "12px 28px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  border: `3px solid ${tipografiaColor}`,
                  color: tipografiaColor,
                  backgroundColor: "transparent",
                  transition:
                    "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
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
