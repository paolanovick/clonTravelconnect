import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDatosGenerales, useTarjetas } from "../../../contextos/DatosAgenciaContext";

const BotonEliminarFiltros = () => {
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas(); // 🔥 Usa los estilos específicos de tarjetas

  /** 🔹 Define colores dinámicos */
  const bgcolor = tarjetas?.color.terciario || datosGenerales?.color?.terciario || "success.light";
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000";
  const hoverColor = tarjetas?.color.secundario || datosGenerales?.color?.secundario || "success.dark";

  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        bgcolor, // ✅ Color de fondo dinámico
        color: colorTexto, // ✅ Color de texto dinámico
        mt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        fontWeight: "bold",
        fontSize: "1rem",
        textTransform: "none",
        borderRadius: "50px", // 🔥 Botón más redondeado
        padding: "12px 20px",
        transition: "all 0.3s ease-in-out", // ✅ Suaviza cambios de estado
        "&:hover, &:focus-visible": {
          bgcolor: hoverColor,
          opacity: 0.9, // 🔥 Mejora el efecto visual del hover
          filter: "brightness(1.1)", // 🔥 Aumenta el brillo ligeramente
        },
        "&:active": {
          transform: "scale(0.98)", // 🔥 Pequeño efecto al hacer clic
        },
      }}
    >
      <ClearIcon />
      Eliminar todos los filtros
    </Button>
  );
};

export default BotonEliminarFiltros;
