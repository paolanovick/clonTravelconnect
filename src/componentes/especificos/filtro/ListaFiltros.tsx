import { Box } from "@mui/material";
import FiltroItem from "./FiltroItem";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const ListaFiltros = () => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();

  const colorTexto = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  const filtros = [
    { label: "Precio (USD)", icon: "💲" },
    { label: "Ciudades", icon: "📍" },
    { label: "Hoteles", icon: "🏨" },
    { label: "Estrellas del Hotel", icon: "⭐" },
    { label: "Regímenes", icon: "🍽️" },
    { label: "Duración", icon: "⏳" },
    { label: "Destinos", icon: "🗺️" },
    { label: "Servicios Incluidos", icon: "🎟️" },
    { label: "Habitaciones", icon: "🛏️" },
  ];

  return (
    <Box sx={{ p: 2, color: colorTexto }}>
      {filtros.map((filtro, index) => (
        <FiltroItem key={index} label={filtro.label} icon={filtro.icon} />
      ))}
    </Box>
  );
};

export default ListaFiltros;
