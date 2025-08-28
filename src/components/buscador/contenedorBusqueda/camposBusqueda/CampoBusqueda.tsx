import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, ClickAwayListener } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useBuscador, useDatosGenerales } from "../../../../contextos/agencia/DatosAgenciaContext";
import { useFormulario } from "../../../../contextos/formulario/FormularioContext";
import { obtenerUbicaciones } from "../../../../services/comunes/ubicacionesService";
import PopperUbicaciones from "./campoDestino/PopperUbicaciones";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [opcionesFiltradas, setOpcionesFiltradas] = useState<UbicacionIATA[]>([]);

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
      if (label === "Ciudad de Salida") {
        setInputValue(ciudadOrigen ?? "");
      } else if (label === "Ciudad de Destino") {
        setInputValue(destino ?? "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOpcionesFiltradas(obtenerUbicaciones(inputValue || ""));
  }, [inputValue]);

  if (!datosGenerales) return null;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    filtrarOpciones(value);
  };

  const handleSelect = (ubicacion: UbicacionIATA) => {
    const valor = `${ubicacion.nombre} (${ubicacion.codigo})`;
    setInputValue(valor);
    
    if (label === "Ciudad de Salida") {
      setCiudadOrigen(valor);
    } else {
      setDestino(valor);
    }
    
    setOpen(false);
  };

  const filtrarOpciones = async (query: string) => {
    try {
      const opciones = await obtenerUbicaciones(query);
      setOpcionesFiltradas(opciones);
    } catch (error) {
      console.error("Error al filtrar opciones:", error);
    }
  };

  // 🎯 Colores y tipografía
  const fondoColor =
    buscador?.inputFondoColor ||
    buscador?.color?.secundario ||
    datosGenerales?.color?.secundario ||
    "#F5F5F5";

  const tipografiaColorTexto =
    buscador?.inputColor ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  const labelColor =
    buscador?.tipografiaColorLabel ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  const tipografia =
    buscador?.tipografia || datosGenerales?.tipografiaAgencia || "Poppins, sans-serif";

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box display="flex" flexDirection="column" gap={2} position="relative">
        <Box display="flex" alignItems="center" gap={2}>
          <LocationOnIcon sx={{ color: labelColor, fontSize: 24 }} />
          <Typography sx={{ color: labelColor, fontWeight: 500, fontFamily: tipografia }}>
            {label}
          </Typography>
        </Box>

        <Box display="flex">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Seleccionar"
            value={inputValue}
            sx={{
              backgroundColor: fondoColor,
              borderRadius: "25px",
              fontFamily: tipografia,
              "& .MuiOutlinedInput-root": {
                color: tipografiaColorTexto,
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "transparent" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: tipografiaColorTexto,
                opacity: 0.7,
              },
            }}
            onChange={handleChange}
            onFocus={handleFocus}
            size="small"
          />
        </Box>
        
        <PopperUbicaciones
          open={open}
          anchorEl={anchorEl}
          opcionesFiltradas={opcionesFiltradas}
          handleSelect={handleSelect}
          label={label}
          colorPrimario={buscador?.color?.primario || datosGenerales?.color?.primario || "#1976d2"}
          tipografia={tipografia}
          colorTerciario={buscador?.color?.terciario || datosGenerales?.color?.terciario || undefined}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default CampoBusqueda;
