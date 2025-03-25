import React from "react";
import { TextField } from "@mui/material";
import { useDatosGenerales, useBuscador } from "../../../contextos/DatosAgenciaContext";

interface InputBusquedaProps {
  busqueda: string;
  setBusqueda: (value: string) => void;
  setMostrarSugerencias: (value: boolean) => void;
}

const InputBusqueda: React.FC<InputBusquedaProps> = ({ busqueda, setBusqueda, setMostrarSugerencias }) => {
  const datosGenerales = useDatosGenerales();
  const buscador = useBuscador();

  const inputColor = buscador?.inputColor || datosGenerales?.color.secundario || "#FFFFFF";
  const colorTipografia = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";
  const tipografia = datosGenerales?.tipografiaAgencia || "'Poppins', sans-serif";

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Escribe una ciudad o aeropuerto"
      value={busqueda}
      onChange={(e) => {
        setBusqueda(e.target.value);
        setMostrarSugerencias(true);
      }}
      sx={{
        mb: 2,
        bgcolor: inputColor,
        borderRadius: "25px",
        fontFamily: tipografia,
        "& .MuiOutlinedInput-root": {
          color: colorTipografia,
          "& fieldset": { borderColor: colorTipografia },
          "&:hover fieldset": { borderColor: colorTipografia },
        },
      }}
    />
  );
};

export default InputBusqueda;
