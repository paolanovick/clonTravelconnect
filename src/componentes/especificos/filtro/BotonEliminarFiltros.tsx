import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDatosGenerales, useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useFiltrosYOrdenamiento } from "../../../contextos/FiltrosYOrdenamientoContext";
import { Filtros } from "../../../contextos/FiltrosYOrdenamientoContext";

const BotonEliminarFiltros = () => {
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas();
  const { setFiltros } = useFiltrosYOrdenamiento();

  // 🔹 Valores por defecto de filtros solamente (sin tocar ordenamientos)
  const filtrosLimpiados: Partial<Filtros> = {
    ciudades: [],
    hoteles: [],
    regimenes: [],
    estrellas: [1, 5],       // ✅ Tupla correcta
    precio: [0, 10000],      // ✅ Tupla correcta
    duracion: [1, 30],       // ✅ Tupla correcta
    habitaciones: [],
    serviciosIncluidos: [],
    aerolineas: [],
    ciudadesOrigenVuelo: [],
    ciudadesDestinoVuelo: [],
    tipoMoneda: [],
    ventaOnline: false,
    busquedaNombre: "",      // ✅ También se limpia
  };
  

  const bgcolor = tarjetas?.color.terciario || datosGenerales?.color?.terciario || "success.light";
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000";
  const hoverColor = tarjetas?.color.secundario || datosGenerales?.color?.secundario || "success.dark";

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={() => setFiltros(filtrosLimpiados)}
      sx={{
        bgcolor,
        color: colorTexto,
        mt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        fontWeight: "bold",
        fontSize: "1rem",
        textTransform: "none",
        borderRadius: "50px",
        padding: "12px 20px",
        transition: "all 0.3s ease-in-out",
        "&:hover, &:focus-visible": {
          bgcolor: hoverColor,
          opacity: 0.9,
          filter: "brightness(1.1)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <ClearIcon />
      Eliminar todos los filtros
    </Button>
  );
};

export default BotonEliminarFiltros;
