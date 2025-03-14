import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const FiltroBusqueda = () => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();

  const colorFondo = destacadosMes?.tarjetaColorSecundario || datosGenerales?.colorSecundarioAgencia;
  const colorTexto = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";
  const colorInputFondo = destacadosMes?.tarjetaColorPrimario || datosGenerales?.colorPrincipalAgencia;

  return (
    <Box
      sx={{
        bgcolor: colorFondo,
        p: 2,
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
          color: colorTexto,
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
          bgcolor: colorInputFondo,
          borderRadius: "20px",
          px: 2,
        }}
      >
        <InputBase
          placeholder="Seleccionar"
          sx={{ flex: 1, color: colorTexto, fontWeight: "bold" }}
        />
        <SearchIcon sx={{ color: colorTexto }} />
      </Box>
    </Box>
  );
};

export default FiltroBusqueda;
