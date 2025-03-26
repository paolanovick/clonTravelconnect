import { FunctionComponent } from "react";
import { Box, Grid, Divider } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";
import IzquierdaArriba from "./IzquierdaArriba";
import IzquierdaAbajo from "./IzquierdaAbajo";
import DerechaArriba from "./DerechaArriba";
import DerechaAbajo from "./DerechaAbajo";

const Footer: FunctionComponent = () => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  const fondoColor =
    footer?.color?.terciario || datosGenerales?.color?.terciario || "rgba(0, 0, 0, 0.7)";
  const logo = datosGenerales?.logoAgencia || null;
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: fondoColor,
        width: "100%",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 8, lg: 10 }, // 💅 Padding horizontal elegante y responsivo
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ width: "100%", m: 0, p: 0 }}>
        {/* 🔹 Sección superior */}
        <Grid
          container
          spacing={3}
          sx={{ width: "100%", m: 0 }}
          alignItems="flex-start"
        >
          <Grid item xs={12} md={6}>
            <IzquierdaArriba logo={logo} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "left", md: "right" } }}
          >
            <DerechaArriba />
          </Grid>
        </Grid>

        {/* 🔹 Línea divisoria */}
        <Divider
          sx={{
            my: { xs: 3, md: 4 },
            backgroundColor: "currentColor",
            opacity: 0.5,
          }}
        />

        {/* 🔹 Sección inferior */}
        <Grid
          container
          spacing={3}
          sx={{ width: "100%", m: 0 }}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <IzquierdaAbajo year={currentYear} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "left", md: "right" } }}
          >
            <DerechaAbajo />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
