import React from "react";
import { Box, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs"; // Importamos dayjs directamente
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useFormulario } from "../../../contextos/FormularioContext"; // Importamos el contexto del formulario

interface CampoFechaProps {
  label: string;
}

const CampoFecha: React.FC<CampoFechaProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { fechaSalida, setFechaSalida } = useFormulario(); // Usamos el contexto para la fecha

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

  // Convertimos la fecha del contexto (Date) a un objeto dayjs para el DatePicker
  const fechaDayjs = fechaSalida ? dayjs(fechaSalida) : null;

  // Manejador de cambio de fecha
  const handleChangeFecha = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      const fechaDate = newValue.toDate(); // Convertimos dayjs a Date
      setFechaSalida(fechaDate); // Guardamos la fecha como Date en el contexto
    } else {
      setFechaSalida(null); // Si no hay fecha, la limpiamos
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
                  backgroundColor: fondoColor, // 🔹 Color de fondo del input
                  borderRadius: "25px",
                  fontFamily: "Poppins, sans-serif", // 🔹 Tipografía
                  "& .MuiOutlinedInput-root": {
                    color: tipografiaColor,
                    "& fieldset": {
                      borderColor: "transparent", // 🔹 Sin borde visible
                    },
                    "&:hover fieldset": {
                      borderColor: tipografiaColor, // 🔹 Borde visible al pasar el mouse
                    },
                  },
                  "& .MuiSvgIcon-root": {
                    color: tipografiaColor, // 🔹 Color del icono del calendario
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