import {
  
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModalFiltros from "./ModalFiltros"; // Asegurate de tener este archivo creado

import { useState } from "react";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

const BotonFiltros = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const colorPrimario = tarjetas?.color?.primario || datosGenerales?.color?.primario || "#1976d2";
  const colorTipografia = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#ffffff";
  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";

  return (
    <>
      {isMobile ? (
        <Tooltip title="Filtros">
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: colorPrimario,
              color: colorTipografia,
              "&:hover": {
                backgroundColor: "#004080",
              },
              borderRadius: "50%",
              p: 1.2,
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<FilterListIcon />}
          sx={{
            backgroundColor: colorPrimario,
            color: "white",
            fontWeight: "bold",
            fontFamily: tipografia,
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontSize: "0.9rem",
            "&:hover": {
              backgroundColor: "#004080",
            },
          }}
        >
          Filtros
        </Button>
      )}

      <ModalFiltros open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default BotonFiltros;
