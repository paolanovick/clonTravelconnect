import { useState, useEffect } from "react";
import { Box, Container, Grid, Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Footer from "../componentes/generales/Footer";
import ListadoPaquetes from "../componentes/especificos/paquetes/ListadoPaquetes";
import PanelFiltros from "../componentes/especificos/filtro/PanelFiltros";
import BannerRegistro from "../componentes/generales/BannerRegistro";
import { useBuscador } from "../contextos/DatosAgenciaContext";
import ZocaloPoweredBy from "../componentes/generales/ZocaloPoweredBy";
import HeaderTop from "../componentes/generales/HeaderTop";
import Divisor from "../componentes/generales/Divisor";

const PaquetesBusqueda = () => {
  const [mostrarBotonArriba, setMostrarBotonArriba] = useState(false);
  const buscador = useBuscador();

  useEffect(() => {
    const handleScroll = () => {
      setMostrarBotonArriba(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <HeaderTop/>
      <Divisor/>
      <Box sx={{ height: "100vh" }} />

      {/* Contenedor principal con padding entre componentes */}
      <Container maxWidth="xl" sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={4}> {/* Aumenté el spacing a 4 para más padding entre columnas */}
          {/* Panel de Filtros con padding derecho */}
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Box sx={{ 
              paddingRight: { md: 3, lg: 4 }, // Padding derecho responsivo
              height: "100%"
            }}>
              <PanelFiltros />
            </Box>
          </Grid>

          {/* Listado de Paquetes con padding izquierdo */}
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <Box
              sx={{
                width: "100%",
                minHeight: "calc(100vh - 150px)",
                display: "flex",
                flexDirection: "column",
                paddingLeft: { md: 3, lg: 4 }, // Padding izquierdo responsivo
              }}
            >
              <ListadoPaquetes />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ height: "80px" }} />
      <BannerRegistro />

      <Zoom in={mostrarBotonArriba}>
        <Fab
          size="small"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: buscador?.color.primario || "primary.main",
            color: "#fff",
            "&:hover": {
              backgroundColor: buscador?.color.primario ? `${buscador.color.primario}CC` : "primary.dark",
            },
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      <Footer />
      <ZocaloPoweredBy/>
    </Box>
  );
};

export default PaquetesBusqueda;