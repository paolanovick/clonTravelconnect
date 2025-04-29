import { Box, InputBase, useMediaQuery, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useFiltrosYOrdenamiento } from "../../../contextos/FiltrosYOrdenamientoContext";

const FiltroBusqueda = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const { filtros, setFiltros } = useFiltrosYOrdenamiento();

  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mostrarInput, setMostrarInput] = useState(false);

  const colorFondo = tarjetas?.color.primario || datosGenerales?.color?.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";
  const colorInputFondo = tarjetas?.color.secundario || datosGenerales?.color?.secundario || "#f0f0f0";

  return (
    <Box
      sx={{
        backgroundColor: colorFondo,
        padding: esMobile ? 1.5 : 2.5,
        borderRadius: 4,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      {/* 🔹 Encabezado interactivo */}
      <Box
        onClick={() => esMobile && setMostrarInput(!mostrarInput)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          color: colorTexto,
          fontWeight: "bold",
          fontFamily: "Verdana, sans-serif",
          fontSize: esMobile ? "0.8rem" : "0.9rem",
          cursor: esMobile ? "pointer" : "default",
          borderRadius: "999px",
          backgroundColor: esMobile ? `${colorFondo}dd` : "transparent",
          px: 2,
          py: 1,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: esMobile ? `${colorFondo}f2` : "inherit",
          },
        }}
      >
        <SearchIcon sx={{ fontSize: esMobile ? 18 : 22 }} />
        Filtrar por Nombres
      </Box>

      {/* 🔹 Input visible solo en desktop o al desplegar en mobile */}
      <Collapse
        in={!esMobile || mostrarInput}
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: colorInputFondo,
            borderRadius: "25px",
            px: 2,
            py: 1,
            width: "90%",
            maxWidth: 400,
            height: 42,
            boxShadow: "inset 0px 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <InputBase
            placeholder="Buscar por nombre"
            value={filtros.busquedaNombre}
            onChange={(e) => setFiltros({ busquedaNombre: e.target.value })}
            sx={{
              flexGrow: 1,
              px: 1,
              color: tarjetas?.tipografiaColorContenido || "#333",
              fontWeight: "bold",
              fontSize: esMobile ? "0.8rem" : "0.9rem",
              "&::placeholder": {
                color: `${colorTexto}99`,
              },
            }}
          />
          <SearchIcon
            sx={{
              color: colorTexto,
              fontSize: esMobile ? 18 : 22,
              ml: 1,
            }}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default FiltroBusqueda;
