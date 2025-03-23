import { Box } from "@mui/material";
import FiltroItem from "./FiltroItem";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TimerIcon from "@mui/icons-material/Timer";
import PublicIcon from "@mui/icons-material/Public";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import KingBedIcon from "@mui/icons-material/KingBed";

const ListaFiltros = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  // 🔹 Colores y tipografía dinámicos con fallback
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";
  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";

  const filtros = [
    { label: "Precio (USD)", icon: <AttachMoneyIcon color="inherit" /> },
    { label: "Ciudades", icon: <LocationOnIcon color="inherit" /> },
    { label: "Hoteles", icon: <HotelIcon color="inherit" /> },
    { label: "Estrellas del Hotel", icon: <StarBorderIcon color="inherit" /> },
    { label: "Regímenes", icon: <RestaurantIcon color="inherit" /> },
    { label: "Duración", icon: <TimerIcon color="inherit" /> },
    { label: "Destinos", icon: <PublicIcon color="inherit" /> },
    { label: "Servicios Incluidos", icon: <ConfirmationNumberIcon color="inherit" /> },
    { label: "Habitaciones", icon: <KingBedIcon color="inherit" /> },
  ];

  return (
    <Box
      sx={{
        p: 2,
        pl: 2, // 🔥 Agrega un pequeño padding izquierdo para mover los filtros a la derecha
        backgroundColor: "transparent",
        color: colorTexto,
        fontFamily: tipografia,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 1.2,
        width: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      {filtros.map((filtro, index) => (
        <FiltroItem key={index} label={filtro.label} icon={filtro.icon} />
      ))}
    </Box>
  );
};

export default ListaFiltros;
