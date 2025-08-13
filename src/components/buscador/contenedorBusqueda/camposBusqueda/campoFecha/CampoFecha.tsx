import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { useBuscador, useDatosGenerales } from "../../../../../contextos/agencia/DatosAgenciaContext";
import { useFormulario } from "../../../../../contextos/formulario/FormularioContext";

interface CampoFechaProps {
  label: string;
}

const CampoFecha: React.FC<CampoFechaProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { fechaSalida, setFechaSalida } = useFormulario();

  useEffect(() => {
    if (!fechaSalida) {
      const valoresGuardados = localStorage.getItem("valoresPrevios");
      if (valoresGuardados) {
        const { fechaSalida: fechaGuardada } = JSON.parse(valoresGuardados);
        if (fechaGuardada) {
          const fecha = new Date(fechaGuardada);
          setFechaSalida(fecha);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!datosGenerales) return null;

  // 🎯 Fallbacks: Buscador -> Generales -> defaults
  const fondoInput =
    buscador?.inputFondoColor ||
    buscador?.color?.secundario ||
    datosGenerales?.color?.secundario ||
    "#F5F5F5";

  const colorTexto =
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

  const fechaDayjs = fechaSalida ? dayjs(fechaSalida) : null;

  const handleChangeFecha = (newValue: dayjs.Dayjs | null) => {
    setFechaSalida(newValue ? newValue.toDate() : null);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} position="relative">
      <Box display="flex" alignItems="center" gap={2}>
        <EventIcon sx={{ color: labelColor, fontSize: 24 }} />
        <Typography sx={{ color: labelColor, fontWeight: 500, fontFamily: tipografia }}>
          {label}
        </Typography>
      </Box>

      <Box display="flex">
        <DesktopDatePicker
          format="DD/MM/YYYY"
          value={fechaDayjs}
          onChange={handleChangeFecha}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              size: "small",
              sx: {
                backgroundColor: fondoInput,
                borderRadius: "25px",
                fontFamily: tipografia,
                "& .MuiOutlinedInput-root": {
                  color: colorTexto,
                  "& fieldset": { borderColor: "transparent" }, // ❌ sin borde
                  "&:hover fieldset": { borderColor: "transparent" }, // ❌ sin borde hover
                  "&.Mui-focused fieldset": { borderColor: "transparent" }, // ❌ sin borde focus
                },
                "& .MuiSvgIcon-root": {
                  color: colorTexto,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CampoFecha;
