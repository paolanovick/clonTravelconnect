import { Box, Select, MenuItem, Typography } from "@mui/material";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import MenuIcon from "@mui/icons-material/Menu";

const OrdenPaquetes = () => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();

  const colorFondo = destacadosMes?.tarjetaColorSecundario || datosGenerales?.colorSecundarioAgencia;
  const colorTexto = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";
  const colorIcono = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  return (
    <Box
      sx={{
        bgcolor: colorFondo,
        p: 2,
        borderRadius: "15px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
      }}
    >
      {/* 🔹 Título con Icono */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <MenuIcon sx={{ fontSize: "1.5rem", color: colorIcono }} />
        <Typography
          variant="h6"
          sx={{
            color: colorTexto,
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          Orden de Paquetes
        </Typography>
      </Box>

      {/* 🔹 Selector de Orden */}
      <Select
        fullWidth
        defaultValue="asc"
        sx={{
          bgcolor: colorFondo,
          color: "black",
          borderRadius: "10px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1rem",
          py: 0.5,
          boxShadow: "0px 1px 4px rgba(0,0,0,0.2)",
          "& .MuiSelect-select": {
            textAlign: "center",
          },
          "& .MuiSelect-icon": {
            color: "black",
          },
        }}
      >
        <MenuItem value="asc">Precios de Menor a Mayor</MenuItem>
        <MenuItem value="desc">Precios de Mayor a Menor</MenuItem>
      </Select>
    </Box>
  );
};

export default OrdenPaquetes;
