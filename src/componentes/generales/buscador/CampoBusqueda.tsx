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

  // 🔥 Estado local del input (sincronizado con el contexto)
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (label === "Ciudad de Salida") {
      setInputValue(ciudadOrigen ?? ""); // 🔥 Asegura que nunca sea undefined
    } else if (label === "Ciudad de Destino") {
      setInputValue(destino ?? ""); // 🔥 Asegura que nunca sea undefined
    }
  }, [ciudadOrigen, destino, label]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<UbicacionIATA[]>([]);

  useEffect(() => {
    setOpcionesFiltradas(obtenerUbicaciones(inputValue || "")); // 🔥 Asegura que inputValue nunca sea undefined
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

    // 🔥 Actualiza el contexto solo cuando el usuario selecciona una opción
    if (label === "Ciudad de Salida") {
      setCiudadOrigen(ubicacion.nombre);
    } else if (label === "Ciudad de Destino") {
      setDestino(ubicacion.nombre);
    }
  };

  const handleBlur = () => {
    // 🔥 Guarda en el contexto cuando el usuario deja de escribir
    if (label === "Ciudad de Salida") {
      setCiudadOrigen(inputValue || ""); // 🔥 Evita valores undefined
    } else if (label === "Ciudad de Destino") {
      setDestino(inputValue || ""); // 🔥 Evita valores undefined
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
          onChange={(e) => setInputValue(e.target.value || "")} // 🔥 Evita valores undefined
          onBlur={handleBlur} // 🔥 Guarda en el contexto al perder foco
          onClick={handleToggleMenu}
          sx={{
            backgroundColor: fondoColor,
            borderRadius: "25px",
            fontFamily: tipografia,
            "& .MuiOutlinedInput-root": {
              color: tipografiaColor,
              "& fieldset": { borderColor: "transparent" }, // 🚨 Borde invisible por defecto
              "&:hover fieldset": { borderColor: tipografiaColor }, // 🚨 Borde cuando pasa el mouse
              "&.Mui-focused fieldset": { borderColor: "transparent" }, // 🔥 Quita el contorno azul en focus
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
