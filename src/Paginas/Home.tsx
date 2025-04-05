import React from "react";
import { Box } from "@mui/material";


import Footer from "../componentes/generales/Footer";


import PublicidadCliente from "../componentes/especificos/puclibidadCliente/PublicidadCliente";
import DestacadosDelMes from "../componentes/especificos/destacadosMes/DestacadosDelMes";
import BannerRegistro from "../componentes/generales/BannerRegistro";
import ZocaloPoweredBy from "../componentes/generales/ZocaloPoweredBy"; // Ensure this path is correct
import TopHeader from "../componentes/generales/HeaderTop";
import Divisor from "../componentes/generales/Divisor";
import SeccionQuienesSomos from "../componentes/especificos/SeccionQuienesSomos/SeccionQuienesSomos";

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
      <TopHeader />
      
      <Box sx={{ height: "100vh" }} />
      <Divisor/>

      
      {/* Componentes comentados temporalmente */}
       <PublicidadCliente /> 
      <DestacadosDelMes /> 
      <SeccionQuienesSomos/>
       <BannerRegistro /> 

      
      <Footer /> {/* ✅ Faltaba Footer, lo agregué aquí */}
      <ZocaloPoweredBy />
      
    </Box>
  );
};

export default Home;
