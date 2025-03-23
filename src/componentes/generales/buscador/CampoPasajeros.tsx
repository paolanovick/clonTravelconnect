import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/FormularioContext"; // Importamos el contexto del formulario

interface CampoPasajerosProps {
  label: string;
}

const CampoPasajeros: React.FC<CampoPasajerosProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { viajeros, setViajeros } = useFormulario(); // Usamos el contexto para la cantidad de viajeros

  if (!datosGenerales) return null;

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const fondoColor = buscador?.color.secundario || datosGenerales.color.secundario || "#F5F5F5";
  const tipografiaColor = buscador?.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#000000";

  /** 🔥 Aplicamos jerarquía correcta para la tipografía del label */
  const labelColor =
    buscador?.tipografiaColorLabel ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000"; // Fallback a negro

  // Manejador de cambio de cantidad de viajeros
  const handleChangeCantidadViajeros = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Si el valor es una cadena vacía, se establece como 0
    if (value === "") {
      setViajeros(0);
    } else if (/^\d*$/.test(value)) { // Solo permite números
      setViajeros(Number(value)); // Actualiza la cantidad de viajeros en el contexto
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <PeopleIcon sx={{ color: labelColor, fontSize: 24 }} />
        <Typography sx={{ color: labelColor, fontWeight: 500, fontFamily: "Poppins, sans-serif" }}>
          {label}
        </Typography>
      </Box>
      <TextField
        name="viajeros"
        value={viajeros === 0 ? "" : viajeros} // Muestra cadena vacía si el valor es 0
        onChange={handleChangeCantidadViajeros}
        fullWidth
        placeholder="Seleccionar"
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: fondoColor, // 🔹 Color de fondo del input
          borderRadius: "25px",
          fontFamily: "Poppins, sans-serif", // 🔹 Tipografía
          "& .MuiOutlinedInput-root": {
            color: tipografiaColor, // 🔹 Color del texto dentro del input
            "& fieldset": {
              borderColor: "transparent", // 🔹 Sin borde visible
            },
            "&:hover fieldset": {
              borderColor: tipografiaColor, // 🔹 Borde visible al pasar el mouse
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: tipografiaColor,
            opacity: 0.7, // 🔹 Mantiene el color de placeholder igual al original
          },
        }}
      />
    </Box>
  );
};

export default CampoPasajeros;