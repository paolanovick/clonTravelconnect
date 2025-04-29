import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useFiltrosYOrdenamiento } from "../../../contextos/FiltrosYOrdenamientoContext";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";

interface FiltroBooleanoProps {
  label: string;
  campo: "ventaOnline"; // Por ahora es el único campo booleano
}

const FiltroBooleano = ({ label, campo }: FiltroBooleanoProps) => {
  const { filtros, setFiltros } = useFiltrosYOrdenamiento();
  const tarjetas = useTarjetas();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const valor = filtros[campo] as boolean;

  const handleToggle = () => {
    setFiltros({ [campo]: !valor });
  };

  return (
    <Box sx={{ mb: isMobile ? 3 : 4 }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: "bold",
          color: tarjetas?.tipografiaColorContenido || "#333",
          fontFamily: tarjetas?.tipografia || "Verdana, sans-serif",
        }}
      >
        {label}
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={valor}
            onChange={handleToggle}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: tarjetas?.color.primario || "#1976d2",
              },
              "& .MuiSwitch-track": {
                backgroundColor: tarjetas?.color.primario || "#1976d2",
              },
            }}
          />
        }
        label={valor ? "Sí" : "No"}
        sx={{
          fontFamily: tarjetas?.tipografia || "Verdana, sans-serif",
          color: tarjetas?.tipografiaColorContenido || "#333",
        }}
      />
    </Box>
  );
};

export default FiltroBooleano;
