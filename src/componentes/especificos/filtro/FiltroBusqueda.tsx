import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const FiltroBusqueda = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  // 🔹 Colores dinámicos con fallback
  const colorFondo = tarjetas?.color.primario || datosGenerales?.color.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";
  const colorInputFondo = tarjetas?.color.secundario || datosGenerales?.color.secundario || "#f0f0f0";

  return (
    <Box
      sx={{
        backgroundColor: colorFondo, // 🔥 Color de fondo dinámico
        p: 3,
        borderRadius: 4,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: colorTexto, // 🔥 Color de texto dinámico
          fontWeight: "bold",
        }}
      >
        <SearchIcon /> Filtrar por Nombres
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          backgroundColor: colorInputFondo, // 🔥 Input con fondo secundario
          borderRadius: "20px",
          px: 2,
          py: 1,
          boxShadow: "inset 0px 2px 5px rgba(0,0,0,0.2)", // 🔹 Sombra interna para mayor realismo
        }}
      >
        <InputBase
          placeholder="Seleccionar"
          sx={{
            flex: 1,
            color: tarjetas?.tipografiaColorContenido,
            fontWeight: "bold",
            fontSize: "0.9rem",
            "&::placeholder": {
              color: `${colorTexto}99`, // 🔹 Placeholder con opacidad
            },
          }}
        />
        <SearchIcon sx={{ color: colorTexto }} />
      </Box>
    </Box>
  );
};

export default FiltroBusqueda;
