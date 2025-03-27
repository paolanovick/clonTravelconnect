import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, ClickAwayListener } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/FormularioContext";
import { obtenerUbicaciones } from "./ubicacionesService";
import PopperUbicaciones from "./PopperUbicaciones";

interface UbicacionIATA {
  codigo: string;
  nombre: string;
}

interface CampoBusquedaProps {
  label: "Ciudad de Salida" | "Ciudad de Destino";
}

const CampoBusqueda: React.FC<CampoBusquedaProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { ciudadOrigen, destino, setCiudadOrigen, setDestino } = useFormulario();

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const valoresGuardados = localStorage.getItem("valoresPrevios");
    const yaHayValor = label === "Ciudad de Salida" ? ciudadOrigen : destino;

    if (!yaHayValor && valoresGuardados) {
      const { ciudadOrigen: guardadoOrigen, destino: guardadoDestino } = JSON.parse(valoresGuardados);

      if (label === "Ciudad de Salida" && guardadoOrigen) {
        setInputValue(guardadoOrigen);
        setCiudadOrigen(guardadoOrigen);
      } else if (label === "Ciudad de Destino" && guardadoDestino) {
        setInputValue(guardadoDestino);
        setDestino(guardadoDestino);
      }
    } else {
      // Si ya hay valor, lo mostramos directamente
      if (label === "Ciudad de Salida") {
        setInputValue(ciudadOrigen ?? "");
      } else if (label === "Ciudad de Destino") {
        setInputValue(destino ?? "");
      }
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<UbicacionIATA[]>([]);

  useEffect(() => {
    setOpcionesFiltradas(obtenerUbicaciones(inputValue || ""));
  }, [inputValue]);

  if (!datosGenerales) return null;

  const colorPrimario = buscador?.color?.primario || datosGenerales?.color?.primario || "#007bff";
  const fondoColor = buscador?.color?.secundario || datosGenerales?.color?.secundario || "#F5F5F5";
  const tipografiaColor = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";
  const labelColor = buscador?.tipografiaColorLabel || buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";
  const tipografia = buscador?.tipografia || datosGenerales?.tipografiaAgencia || "Poppins, sans-serif";

  const handleToggleMenu = (event: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (ubicacion: UbicacionIATA) => {
    setInputValue(ubicacion.nombre);
    handleClose();

    if (label === "Ciudad de Salida") {
      setCiudadOrigen(ubicacion.nombre);
    } else if (label === "Ciudad de Destino") {
      setDestino(ubicacion.nombre);
    }
  };

  const handleBlur = () => {
    if (label === "Ciudad de Salida") {
      setCiudadOrigen(inputValue || "");
    } else if (label === "Ciudad de Destino") {
      setDestino(inputValue || "");
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box display="flex" flexDirection="column" gap={2} position="relative">
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon sx={{ color: labelColor, fontSize: 24 }} />
          <Typography sx={{ color: labelColor, fontWeight: 500, fontFamily: tipografia }}>
            {label}
          </Typography>
        </Box>

        <TextField
          value={inputValue}
          fullWidth
          placeholder={`Escriba una ${label.toLowerCase()}...`}
          variant="outlined"
          size="small"
          onChange={(e) => setInputValue(e.target.value || "")}
          onBlur={handleBlur}
          onClick={handleToggleMenu}
          sx={{
            backgroundColor: fondoColor,
            borderRadius: "25px",
            fontFamily: tipografia,
            "& .MuiOutlinedInput-root": {
              color: tipografiaColor,
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: tipografiaColor },
              "&.Mui-focused fieldset": { borderColor: "transparent" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: tipografiaColor,
              opacity: 0.7,
            },
          }}
        />

        <PopperUbicaciones
          open={open}
          anchorEl={anchorEl}
          opcionesFiltradas={opcionesFiltradas}
          handleSelect={handleSelect}
          label={label}
          colorPrimario={colorPrimario}
          tipografia={tipografia}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default CampoBusqueda;
