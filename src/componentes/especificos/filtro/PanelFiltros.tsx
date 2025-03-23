import { Box } from "@mui/material";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

import FiltroFecha from "./FiltroFecha";
import FiltroBusqueda from "./FiltroBusqueda";
import ListaFiltros from "./ListaFiltros";
import BotonEliminarFiltros from "./BotonEliminarFiltros";
import OrdenarPaquetes from "./OrdenarPaquetes";

const PanelFiltros = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  // 🔹 Color de texto dinámico
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  return (
    <Box
      sx={{
        backgroundColor: "transparent", // 🔥 Fondo completamente transparente
        backdropFilter: "blur(12px)", // 🔥 Efecto de vidrio esmerilado
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        color: colorTexto,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 🔥 Centra los subcomponentes horizontalmente
        justifyContent: "center", // 🔥 Centra verticalmente si el tamaño lo permite
        width: "fit-content", // 🔥 Ajusta el tamaño según el contenido
        maxWidth: "100%", // 🔹 Evita que sea más grande de lo necesario
        minHeight: "auto", // 🔥 Altura ajustada automáticamente
        padding: 3,
        gap: 3, // 🔥 Espaciado optimizado
      }}
    >
      <OrdenarPaquetes/>
      <FiltroFecha />
      <FiltroBusqueda />
      <ListaFiltros />
      <BotonEliminarFiltros />
    </Box>
  );
};

export default PanelFiltros;
