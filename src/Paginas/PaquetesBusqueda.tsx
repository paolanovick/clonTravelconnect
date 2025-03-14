import { useState, useEffect } from "react";
import { Box, Container, Grid, Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "../componentes/generales/Header";
import ContenedorBusqueda from "../componentes/generales/buscador/ContenedorBusqueda";
import Footer from "../componentes/generales/Footer";
import ListadoPaquetes from "../componentes/especificos/paquetes/ListadoPaquetes";
import PanelFiltros from "../componentes/especificos/filtro/PanelFiltros";


const PaquetesBusqueda = () => {
  // const { estilos } = useEstilosAgencia();
  const [mostrarBotonArriba, setMostrarBotonArriba] = useState(false);

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
        // backgroundColor: estilos?.fondoGeneral.color,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* 🔹 Header */}
      <Header /> 

      {/* 🔹 Contenedor de Búsqueda */}
       <ContenedorBusqueda /> 

      {/* 🔹 Espaciador para evitar superposición */}
      <Box sx={{ height: "100vh" }} />

      {/* 🔹 Contenedor para PanelFiltros y ListadoPaquetes */}
       <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                position: "sticky",
                top: 100,
                width: "100%",
                padding: 2,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                minHeight: "calc(100vh - 150px)",
              }}
            >
              <PanelFiltros />
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ padding: 2, minHeight: "calc(100vh - 150px)" }}>
              <ListadoPaquetes />
            </Box>
          </Grid>
        </Grid>
      </Container> 

      {/* 🔹 Botón flotante "Volver Arriba" */}
      <Zoom in={mostrarBotonArriba}>
        <Fab
          color="primary"
          size="small"
          sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      {/* 🔹 Footer con ancho completo */}
       <Footer /> 
    </Box>
  );
};

export default PaquetesBusqueda;
