import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventIcon from "@mui/icons-material/Event";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import dayjs, { Dayjs } from "dayjs";

const FiltroFecha = () => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Dayjs | null>(dayjs());

  const colorFondo = destacadosMes?.tarjetaColorSecundario || datosGenerales?.colorSecundarioAgencia;
  const colorTexto = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  return (
    <Box
      sx={{
        bgcolor: colorFondo,
        p: 2,
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
          color: colorTexto,
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
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default FiltroFecha;
