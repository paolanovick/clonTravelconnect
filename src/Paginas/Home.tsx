import React from "react";
import { Box } from "@mui/material";
import Header from "../componentes/generales/Header";
import ContenedorBusqueda from "../componentes/generales/buscador/ContenedorBusqueda";
import Footer from "../componentes/generales/Footer";
import SelectorSimulacion from "../componentes/selectorSimulacion";

import PublicidadCliente from "../componentes/especificos/puclibidadCliente/PublicidadCliente";
import DestacadosDelMes from "../componentes/especificos/destacadosMes/DestacadosDelMes";
import BannerRegistro from "../componentes/generales/BannerRegistro";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <Header />
      <ContenedorBusqueda />
      <Box sx={{ height: "100vh" }} />
      
      {/* Componentes comentados temporalmente */}
       <PublicidadCliente /> 
      <DestacadosDelMes /> 
       <BannerRegistro /> 

      <SelectorSimulacion />
      <Footer /> {/* ✅ Faltaba Footer, lo agregué aquí */}
    </Box>
  );
};

export default Home;
