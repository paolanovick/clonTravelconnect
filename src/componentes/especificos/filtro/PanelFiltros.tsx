import { Box } from "@mui/material";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import OrdenPaquetes from "../paquetes/OrdenPaquetes";
import FiltroFecha from "./FiltroFecha";
import FiltroBusqueda from "./FiltroBusqueda";
import ListaFiltros from "./ListaFiltros";
import BotonEliminarFiltros from "./BotonEliminarFiltros";

const PanelFiltros = () => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();

  const colorFondo = destacadosMes?.tarjetaColorSecundario || datosGenerales?.colorSecundarioAgencia;
  const colorTexto = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: colorFondo ? `rgba(${colorFondo}, 0.05)` : "rgba(255, 255, 255, 0.05)", // Fondo ultra translúcido basado en color secundario
        backdropFilter: "blur(12px)", // Desenfoque para suavizar el fondo
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombras sutiles
        color: colorTexto,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%", // Asegura que use el espacio del grid correctamente
        overflow: "auto", // Permite scroll si es necesario en pantallas pequeñas
      }}
    >
      <OrdenPaquetes />
      <FiltroFecha />
      <FiltroBusqueda />
      <ListaFiltros />
      <BotonEliminarFiltros />
    </Box>
  );
};

export default PanelFiltros;
