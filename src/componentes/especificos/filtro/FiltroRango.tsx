import {
  Box,
  Typography,
  Slider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from "@mui/icons-material/StarRate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Filtros } from "../../../contextos/FiltrosYOrdenamientoContext";

interface FiltroRangoProps {
  label: string;
  campo: "precio" | "duracion" | "estrellas";
  min: number;
  max: number;
  filtros: Filtros;
  setFiltros: (f: Filtros) => void;
}

const iconos = {
  precio: <MonetizationOnIcon fontSize="small" />,
  duracion: <AccessTimeIcon fontSize="small" />,
  estrellas: <StarRateIcon fontSize="small" />,
};

const FiltroRango = ({ label, campo, min, max, filtros, setFiltros }: FiltroRangoProps) => {
  const tarjetas = useTarjetas();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const valor = filtros[campo];

  const handleChange = (_: Event, newValue: number | number[]) => {
    const nuevosFiltros = { ...filtros, [campo]: newValue };
    setFiltros(nuevosFiltros);
  };

  return (
    <Box
      sx={{
        backgroundColor: `${tarjetas?.color.primario || "#1976d2"}15`,
        border: `1px solid ${tarjetas?.color.primario || "#1976d2"}55`,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        p: isMobile ? 2 : 3,
        mb: isMobile ? 3 : 4,
        textAlign: "center",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          fontFamily: tarjetas?.tipografia || "Verdana, sans-serif",
          fontWeight: "bold",
          color: tarjetas?.tipografiaColorContenido || "#333",
          mb: 2,
        }}
      >
        {iconos[campo]} {label}
      </Typography>

      <Slider
        value={valor}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{
          color: tarjetas?.color.primario || "#1976d2",
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 20,
            height: 20,
            backgroundColor: "#fff",
            border: `2px solid ${tarjetas?.color.primario || "#1976d2"}`,
            '&:hover': {
              boxShadow: `0px 0px 0px 6px ${tarjetas?.color.primario || "#1976d2"}33`,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
            backgroundColor: "#999",
          },
        }}
      />
    </Box>
  );
};

export default FiltroRango;
