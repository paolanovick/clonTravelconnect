import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventIcon from "@mui/icons-material/Event";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import dayjs, { Dayjs } from "dayjs";

const FiltroFecha = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Dayjs | null>(dayjs());

  // 🔹 Colores dinámicos con fallback
  const colorFondo = tarjetas?.color.primario || datosGenerales?.color.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";

  return (
    <Box
      sx={{
        backgroundColor: colorFondo, // 🔥 Color de fondo dinámico
        p: 3,
        borderRadius: 4,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: colorTexto, // 🔥 Color de texto dinámico
          fontWeight: "bold",
        }}
      >
        <EventIcon /> Seleccionar Fecha
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={fechaSeleccionada}
          onChange={(newValue) => setFechaSeleccionada(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                mt: 2,
                bgcolor: "white",
                borderRadius: 2,
                textAlign: "center",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default FiltroFecha;
