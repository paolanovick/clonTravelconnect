import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import FiltroFecha from "./FiltroFecha";
import FiltroBusqueda from "./FiltroBusqueda";
import ListaFiltros from "./ListaFiltros";
import BotonEliminarFiltros from "./BotonEliminarFiltros";
import OrdenarPaquetes from "./OrdenarPaquetes";
import { useState } from "react";

const PanelFiltros = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const colorTexto =
    tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";
  const colorPrimario =
    tarjetas?.color?.primario || datosGenerales?.color?.primario || "#FF9800";

  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down("md"));
  const esTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [abierto, setAbierto] = useState(false);

  return (
    <>
      {/* 🔹 Botón visible solo en mobile/tablet - VERSIÓN ORIGINAL */}
      {esMobile && !abierto && (
        <Fade in={!abierto}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              p: 0,
              m: 0,
              width: "100%"
            }}
          >
            <Typography
              sx={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "0.875rem",
                color: colorTexto,
              }}
            >
              Filtros
            </Typography>

            <Box
              onClick={() => setAbierto(true)}
              sx={{
                backgroundColor: colorPrimario,
                color: colorTexto,
                borderRadius: "999px",
                px: 3,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                boxShadow: 4,
                cursor: "pointer",
              }}
            >
              <FilterListIcon />
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  fontFamily: "Verdana, sans-serif",
                }}
              >
                Filtros
              </Typography>
            </Box>
          </Box>
        </Fade>
      )}

      {/* 🔹 Panel deslizable animado para mobile/tablet */}
      {esMobile && (
        <Fade in={abierto}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1300,
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              display: abierto ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              p: 0,
              m: 0
            }}
          >
            <IconButton
              onClick={() => setAbierto(false)}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: colorTexto,
                backgroundColor: colorPrimario,
                ":hover": {
                  backgroundColor: colorPrimario,
                  opacity: 0.8,
                },
                p: 1,
                m: 0
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Slide del panel */}
            <Slide direction="down" in={abierto} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  width: "100%",
                  color: colorTexto,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  p: esTablet ? 4 : 2,
                  m: 0,
                  mt: 8,
                  maxWidth: "600px"
                }}
              >
                <OrdenarPaquetes />
                <FiltroFecha />
                <FiltroBusqueda />
                <ListaFiltros />
                <BotonEliminarFiltros />
              </Box>
            </Slide>
          </Box>
        </Fade>
      )}

      {/* 🔹 Panel normal para desktop */}
      {!esMobile && (
        <Box
          sx={{
            backgroundColor: "transparent",
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            color: colorTexto,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
            p: 4,
            m: "0 auto",
            gap: 3
          }}
        >
          <OrdenarPaquetes />
          <FiltroFecha />
          <FiltroBusqueda />
          <ListaFiltros />
          <BotonEliminarFiltros />
        </Box>
      )}
    </>
  );
};

export default PanelFiltros;