import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/FormularioContext";

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
  }, []);

  if (!datosGenerales) return null;

  const fondoColor = buscador?.color?.secundario || datosGenerales?.color?.secundario || "#F5F5F5";
  const tipografiaColor = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";
  const labelColor =
    buscador?.tipografiaColorLabel ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  const fechaDayjs = fechaSalida ? dayjs(fechaSalida) : null;

  const handleChangeFecha = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setFechaSalida(newValue.toDate());
    } else {
      setFechaSalida(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={2} position="relative">
        <Box display="flex" alignItems="center" gap={2}>
          <EventIcon sx={{ color: labelColor, fontSize: 24 }} />
          <Typography sx={{ color: labelColor, fontWeight: 500, fontFamily: "Poppins, sans-serif" }}>
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
                  backgroundColor: fondoColor,
                  borderRadius: "25px",
                  fontFamily: "Poppins, sans-serif",
                  "& .MuiOutlinedInput-root": {
                    color: tipografiaColor,
                    "& fieldset": { borderColor: "transparent" },
                    "&:hover fieldset": { borderColor: tipografiaColor },
                  },
                  "& .MuiSvgIcon-root": {
                    color: tipografiaColor,
                  },
                },
              },
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CampoFecha;
