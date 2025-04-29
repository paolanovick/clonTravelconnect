import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/FormularioContext";
import ModalViajeros from "./ModalViajeros";

interface CampoPasajerosProps {
  label: string;
}

const CampoPasajeros: React.FC<CampoPasajerosProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { viajeros, setViajeros } = useFormulario();
  const [modalAbierto, setModalAbierto] = useState(false);

  const fondoColor = buscador?.color?.secundario || datosGenerales?.color?.secundario || "#F5F5F5";
  const tipografiaColor = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";
  const labelColor =
    buscador?.tipografiaColorLabel ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  useEffect(() => {
    const valoresGuardados = localStorage.getItem("valoresPrevios");
    if (valoresGuardados && (!viajeros || (viajeros.adultos === 0 && viajeros.menores === 0))) {
      const { viajeros: viajerosGuardados } = JSON.parse(valoresGuardados);
      if (viajerosGuardados) {
        setViajeros(viajerosGuardados);
      }
    }
  }, []);

  const resumen =
    viajeros?.adultos || viajeros?.menores
      ? `${viajeros.adultos || 0} adulto${viajeros.adultos === 1 ? "" : "s"}${
          viajeros.menores ? ` y ${viajeros.menores} menor${viajeros.menores === 1 ? "" : "es"}` : ""
        }`
      : "";

  const handleAplicar = (adultos: number, menores: number) => {
    setViajeros({ adultos, menores });
    setModalAbierto(false);
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
        value={resumen}
        placeholder="Seleccionar"
        onClick={() => setModalAbierto(true)}
        fullWidth
        variant="outlined"
        size="small"
        InputProps={{
          readOnly: true,
        }}
        sx={{
          backgroundColor: fondoColor,
          borderRadius: "25px",
          fontFamily: "Poppins, sans-serif",
          cursor: "pointer",
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

      {/* 🔲 Modal con onAplicar corregido */}
      <ModalViajeros
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onAplicar={handleAplicar}
      />
    </Box>
  );
};

export default CampoPasajeros;
