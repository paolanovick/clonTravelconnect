import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useBuscador, useDatosGenerales } from "../../../../../contextos/agencia/DatosAgenciaContext";
import { useFormulario } from "../../../../../contextos/formulario/FormularioContext";
import ModalViajeros from "./ModalViajeros";

interface CampoPasajerosProps {
  label: string;
}

const CampoPasajeros: React.FC<CampoPasajerosProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { viajeros, setViajeros } = useFormulario();
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const valoresGuardados = localStorage.getItem("valoresPrevios");
    if (valoresGuardados && (!viajeros || (viajeros.adultos === 0 && viajeros.menores === 0))) {
      const { viajeros: viajerosGuardados } = JSON.parse(valoresGuardados);
      if (viajerosGuardados) setViajeros(viajerosGuardados);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!datosGenerales) return null;

  // 🎯 Fallbacks coherentes con DatosAgencia
  const fondoInput =
    buscador?.inputFondoColor ||
    buscador?.color?.secundario ||
    datosGenerales?.color?.secundario ||
    "#F5F5F5";

  const colorTextoInput =
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
    buscador?.tipografia ||
    datosGenerales?.tipografiaAgencia ||
    "Poppins, sans-serif";

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
        <Typography sx={{ color: labelColor, fontWeight: 500, fontFamily: tipografia }}>
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
        InputProps={{ readOnly: true }}
        sx={{
          backgroundColor: fondoInput,
          borderRadius: "25px",
          fontFamily: tipografia,
          cursor: "pointer",
          "& .MuiOutlinedInput-root": {
            color: colorTextoInput,
            "& fieldset": { borderColor: "transparent" }, // ❌ sin borde
            "&:hover fieldset": { borderColor: "transparent" }, // ❌ sin borde hover
            "&.Mui-focused fieldset": { borderColor: "transparent" }, // ❌ sin borde focus
          },
          "& .MuiInputBase-input::placeholder": {
            color: colorTextoInput,
            opacity: 0.7,
          },
        }}
      />

      <ModalViajeros
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onAplicar={handleAplicar}
      />
    </Box>
  );
};

export default CampoPasajeros;
