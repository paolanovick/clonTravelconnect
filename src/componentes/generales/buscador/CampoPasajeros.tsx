import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/FormularioContext";

interface CampoPasajerosProps {
  label: string;
}

const CampoPasajeros: React.FC<CampoPasajerosProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { viajeros, setViajeros } = useFormulario();

  useEffect(() => {
    if (!viajeros || viajeros === 0) {
      const valoresGuardados = localStorage.getItem("valoresPrevios");
      if (valoresGuardados) {
        const { viajeros: viajerosGuardados } = JSON.parse(valoresGuardados);
        if (viajerosGuardados !== undefined && viajerosGuardados !== null) {
          setViajeros(viajerosGuardados);
        }
      }
    }
  }, []);

  if (!datosGenerales) return null;

  const fondoColor = buscador?.color?.secundario || datosGenerales?.color?.secundario || "#F5F5F5";
  const tipografiaColor = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";
  const labelColor =
    buscador?.tipografiaColorLabel ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  const handleChangeCantidadViajeros = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setViajeros(0);
    } else if (/^\d*$/.test(value)) {
      setViajeros(Number(value));
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
        value={viajeros === 0 ? "" : viajeros}
        onChange={handleChangeCantidadViajeros}
        fullWidth
        placeholder="Seleccionar"
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: fondoColor,
          borderRadius: "25px",
          fontFamily: "Poppins, sans-serif",
          "& .MuiOutlinedInput-root": {
            color: tipografiaColor,
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: tipografiaColor,
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: tipografiaColor,
            opacity: 0.7,
          },
        }}
      />
    </Box>
  );
};

export default CampoPasajeros;
