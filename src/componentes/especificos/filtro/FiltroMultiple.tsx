import React from "react"; // ✅ Necesario para JSX.Element / ReactNode
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useFiltrosYOrdenamiento } from "../../../contextos/FiltrosYOrdenamientoContext";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import PublicIcon from "@mui/icons-material/Public";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import KingBedIcon from "@mui/icons-material/KingBed";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FlightIcon from "@mui/icons-material/Flight";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

interface FiltroMultipleProps {
  label: string;
  campo:
    | "ciudades"
    | "hoteles"
    | "regimenes"
    | "habitaciones"
    | "serviciosIncluidos"
    | "aerolineas"
    | "ciudadesOrigenVuelo"
    | "ciudadesDestinoVuelo"
    | "tipoMoneda";
  opciones: string[];
}

const iconos: Record<string, React.ReactNode> = {
  ciudades: <PublicIcon fontSize="small" />,
  hoteles: <HotelIcon fontSize="small" />,
  regimenes: <RestaurantIcon fontSize="small" />,
  habitaciones: <KingBedIcon fontSize="small" />,
  serviciosIncluidos: <ConfirmationNumberIcon fontSize="small" />,
  aerolineas: <FlightIcon fontSize="small" />,
  ciudadesOrigenVuelo: <PublicIcon fontSize="small" />,
  ciudadesDestinoVuelo: <PublicIcon fontSize="small" />,
  tipoMoneda: <MonetizationOnIcon fontSize="small" />,
};

const FiltroMultiple = ({ label, campo, opciones }: FiltroMultipleProps) => {
  const { filtros, setFiltros } = useFiltrosYOrdenamiento();
  const tarjetas = useTarjetas();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const seleccionadas = filtros[campo] as string[];

  const toggleOpcion = (opcion: string) => {
    const nuevaLista = seleccionadas.includes(opcion)
      ? seleccionadas.filter((item) => item !== opcion)
      : [...seleccionadas, opcion];

    setFiltros({ [campo]: nuevaLista });
  };

  return (
    <Box
      sx={{
        backgroundColor: `${tarjetas?.color.primario || "#1976d2"}15`,
        border: `1px solid ${tarjetas?.color.primario || "#1976d2"}33`,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        p: isMobile ? 2 : 3,
        mb: isMobile ? 3 : 4,
      }}
    >
      {/* 🔹 Título con ícono */}
      <Typography
        variant="subtitle2"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 2,
          fontWeight: "bold",
          color: tarjetas?.tipografiaColorContenido || "#333",
          fontFamily: tarjetas?.tipografia || "Verdana, sans-serif",
        }}
      >
        {iconos[campo]} {label}
      </Typography>

      {/* 🔹 Lista de checkboxes */}
      <FormGroup>
        {opciones.map((opcion) => (
          <FormControlLabel
            key={opcion}
            control={
              <Checkbox
                checked={seleccionadas.includes(opcion)}
                onChange={() => toggleOpcion(opcion)}
                sx={{
                  color: tarjetas?.color.primario,
                  "&.Mui-checked": {
                    color: tarjetas?.color.primario,
                  },
                }}
              />
            }
            label={opcion}
            sx={{
              color: tarjetas?.tipografiaColorContenido || "#333",
              fontFamily: tarjetas?.tipografia || "Verdana, sans-serif",
              fontSize: "0.85rem",
              mb: 1,
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default FiltroMultiple;
