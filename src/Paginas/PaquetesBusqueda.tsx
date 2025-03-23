import { useState, useEffect } from "react";
import { Box, Container, Grid, Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "../componentes/generales/Header";
import ContenedorBusqueda from "../componentes/generales/buscador/ContenedorBusqueda";
import Footer from "../componentes/generales/Footer";
import ListadoPaquetes from "../componentes/especificos/paquetes/ListadoPaquetes";
import PanelFiltros from "../componentes/especificos/filtro/PanelFiltros";
import BannerRegistro from "../componentes/generales/BannerRegistro";
import { useBuscador } from "../contextos/DatosAgenciaContext";

const PaquetesBusqueda = () => {
  const [mostrarBotonArriba, setMostrarBotonArriba] = useState(false);
  const buscador = useBuscador(); // ✅ Ahora está dentro del componente

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
      {/* 🔹 Header */}
      <Header />

      {/* 🔹 Contenedor de Búsqueda */}
      <ContenedorBusqueda />

      {/* 🔹 Espaciador para evitar superposición */}
      <Box sx={{ height: "100vh" }} />

      {/* 🔹 Contenedor para PanelFiltros y ListadoPaquetes */}
      <Container maxWidth="xl" sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={3} alignItems="flex-start">
          {/* 🔹 Panel de Filtros */}
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <PanelFiltros />
          </Grid>

          {/* 🔹 Listado de Paquetes (Ahora alineado correctamente) */}
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <Box
              sx={{
                width: "100%",
                minHeight: "calc(100vh - 150px)",
                display: "flex",
                flexDirection: "column",
                paddingLeft: { lg: 2 }, // 🔹 Ajuste para mantener espacio sin desalinear
              }}
            >
              <ListadoPaquetes />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 🔹 Más espacio antes de BannerRegistro */}
      <Box sx={{ height: "80px" }} />

      {/* 🔹 Banner de Registro */}
      <BannerRegistro />

      {/* 🔹 Botón flotante "Volver Arriba" con color dinámico */}
      <Zoom in={mostrarBotonArriba}>
        <Fab
          size="small"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: buscador?.color.primario || "primary.main", // ✅ Usa el color dinámico del buscador
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

      {/* 🔹 Footer */}
      <Footer />
    </Box>
  );
};

export default PaquetesBusqueda;
