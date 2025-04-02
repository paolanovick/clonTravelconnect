import { Box, useTheme, useMediaQuery } from "@mui/material";
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Obtenemos los colores del contexto
  const colorPrimario = tarjetas?.color?.primario || datosGenerales?.color?.primario || "#1976d2";
  const colorTipografia = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#ffffff";
  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";

  const filtros = [
    { label: "Precio (USD)", icon: <AttachMoneyIcon sx={{ color: "inherit" }} /> },
    { label: "Ciudades", icon: <LocationOnIcon sx={{ color: "inherit" }} /> },
    { label: "Hoteles", icon: <HotelIcon sx={{ color: "inherit" }} /> },
    { label: "Estrellas del Hotel", icon: <StarBorderIcon sx={{ color: "inherit" }} /> },
    { label: "Regímenes", icon: <RestaurantIcon sx={{ color: "inherit" }} /> },
    { label: "Duración", icon: <TimerIcon sx={{ color: "inherit" }} /> },
    { label: "Destinos", icon: <PublicIcon sx={{ color: "inherit" }} /> },
    { label: "Servicios Incluidos", icon: <ConfirmationNumberIcon sx={{ color: "inherit" }} /> },
    { label: "Habitaciones", icon: <KingBedIcon sx={{ color: "inherit" }} /> },
  ];

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "transparent",
        color: colorTipografia,
        fontFamily: tipografia,
        display: "flex",
        flexDirection: "column",
        alignItems: isSmallScreen ? "center" : "flex-start",
        justifyContent: "flex-start",
        gap: 1.2,
        width: "100%",
      }}
    >
      {filtros.map((filtro, index) => (
        <FiltroItem 
          key={index}
          label={filtro.label}
          icon={filtro.icon}
          isSmallScreen={isSmallScreen}
          colorPrimario={colorPrimario}
          colorTipografia={colorTipografia}
          tipografia={tipografia}
        />
      ))}
    </Box>
  );
};

export default ListaFiltros;