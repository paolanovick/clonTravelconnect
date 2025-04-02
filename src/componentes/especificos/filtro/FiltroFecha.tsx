import { useState } from "react";
import {
  Box,
   useMediaQuery,
  Collapse
} from "@mui/material";
import {
  LocalizationProvider,
  DesktopDatePicker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventIcon from "@mui/icons-material/Event";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { useTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";

const FiltroFecha = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const [fechaSeleccionada, setFechaSeleccionada] = useState<Dayjs | null>(dayjs());
  const [mostrarInput, setMostrarInput] = useState(false);

  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down("md"));

  const colorFondo = tarjetas?.color.primario || datosGenerales?.color?.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";

  return (
    <Box
      sx={{
        backgroundColor: colorFondo,
        p: esMobile ? 1.5 : 3,
        borderRadius: 4,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
        textAlign: "center",
        width: "100%",
        maxWidth: esMobile ? "280px" : "100%",
        mx: "auto",
      }}
    >
      {/* 🔹 Encabezado como botón en mobile */}
      <Box
        onClick={() => esMobile && setMostrarInput(!mostrarInput)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          color: colorTexto,
          fontWeight: "bold",
          fontFamily: "Verdana, sans-serif",
          fontSize: esMobile ? "0.8rem" : "0.9rem",
          cursor: esMobile ? "pointer" : "default",
          borderRadius: esMobile ? "999px" : 0,
          backgroundColor: esMobile ? `${colorFondo}dd` : "transparent",
          px: esMobile ? 2 : 0,
          py: esMobile ? 0.8 : 0,
          mx: "auto",
          width: "fit-content",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: esMobile ? `${colorFondo}f2` : "inherit",
          },
        }}
      >
        <EventIcon sx={{ fontSize: esMobile ? 18 : 22 }} />
        Seleccionar Fecha
      </Box>

      {/* 🔹 DatePicker visible solo en desktop o cuando se expande en mobile */}
      <Collapse in={!esMobile || mostrarInput}>
        <Box sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={fechaSeleccionada}
              onChange={(newValue) => setFechaSeleccionada(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    bgcolor: "white",
                    borderRadius: 2,
                    textAlign: "center",
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                      fontSize: esMobile ? "0.8rem" : "0.9rem",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Collapse>
    </Box>
  );
};

export default FiltroFecha;
