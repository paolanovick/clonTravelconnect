import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ModalOrdenamiento from "./ModalOrdenamiento";
import { useFiltrosYOrdenamiento } from "../../../contextos/FiltrosYOrdenamientoContext";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const OrdenarPaquetes = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    ordenamientos,
    prioridadOrdenamientos,
    setOrdenamientos,
    setPrioridadOrdenamientos,
  } = useFiltrosYOrdenamiento();

  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const colorPrimario =
    tarjetas?.color?.primario || datosGenerales?.color?.primario || "#1976d2";
  const colorTexto =
    tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";
  const tipografia =
    tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Verdana, sans-serif";

  const handleOrdenar = (criterio: string, orden: "asc" | "desc") => {
    setOrdenamientos("salida", null);
    setOrdenamientos("precio", null);
    setOrdenamientos("nombre", null);
    setOrdenamientos("duracion", null);
    setOrdenamientos(criterio as any, orden);
    setPrioridadOrdenamientos([criterio as any]);
  };

  const criterioActivo = prioridadOrdenamientos[0];
  const ordenActivo = ordenamientos[criterioActivo];

  const labelCriterio = criterioActivo
    ? criterioActivo.charAt(0).toUpperCase() + criterioActivo.slice(1)
    : null;

  const flecha = ordenActivo === "asc" ? "↑" : ordenActivo === "desc" ? "↓" : "";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {isMobile ? (
        <Tooltip title={`Ordenar ${labelCriterio || ""} ${flecha}`}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: colorPrimario,
              color: colorTexto,
              "&:hover": {
                backgroundColor: `${colorPrimario}cc`,
              },
              borderRadius: "50%",
              p: 1.2,
              transition: "all 0.2s ease-in-out",
            }}
          >
            <SortIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<SortIcon />}
          sx={{
            backgroundColor: colorPrimario,
            color: colorTexto,
            fontWeight: "bold",
            fontFamily: tipografia,
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontSize: "0.9rem",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: `${colorPrimario}cc`,
              transform: "scale(1.02)",
            },
          }}
        >
          {labelCriterio && ordenActivo
            ? `Orden: ${labelCriterio} (${flecha})`
            : "Ordenar"}
        </Button>
      )}

      <ModalOrdenamiento
        open={open}
        onClose={() => setOpen(false)}
        onAplicar={(criterio, orden) => {
          handleOrdenar(criterio, orden);
          setOpen(false);
        }}
        colorPrimario={colorPrimario}
        tipografia={tipografia}
      />
    </Box>
  );
};

export default OrdenarPaquetes;
