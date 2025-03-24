import { FunctionComponent } from "react";
import { Box, Container, Grid, Divider } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";
import IzquierdaArriba from "./IzquierdaArriba";
import IzquierdaAbajo from "./IzquierdaAbajo";
import DerechaArriba from "./DerechaArriba";
import DerechaAbajo from "./DerechaAbajo";

const Footer: FunctionComponent = () => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  

  const fondoColor = footer?.color?.terciario || datosGenerales?.color?.terciario || "rgba(0, 0, 0, 0.7)";
  const logo = datosGenerales?.logoAgencia;
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: fondoColor,
        width: "100%",
        py: 5,
        px: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        {/* 🔹 Sección superior */}
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <IzquierdaArriba logo={logo} /> {/* Logo aumentado */}
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
            <DerechaArriba />
          </Grid>
        </Grid>

        {/* 🔹 Línea divisoria */}
        <Divider sx={{ my: 3, backgroundColor: "currentColor", opacity: 0.5 }} />

        {/* 🔹 Sección inferior */}
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <IzquierdaAbajo year={currentYear} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
            <DerechaAbajo />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
