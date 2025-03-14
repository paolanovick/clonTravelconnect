import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Paginas/Home";
import PaquetesBusqueda from "./Paginas/PaquetesBusqueda";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/paquetes-busqueda" element={<PaquetesBusqueda />} />
      {/* 🚀 Aquí puedes agregar más rutas sin afectar `App.tsx` */}
    </Routes>
  );
};

export default AppRoutes;
