import React, { useState } from "react";
import { Box, Grid, TextField, Typography, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
import EventIcon from "@mui/icons-material/Event";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

// 🔹 Importación para evitar errores con MUI DatePicker
import type {} from "@mui/x-date-pickers/themeAugmentation";

const SearchInputs: React.FC = () => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const [fechaSalida, setFechaSalida] = useState<dayjs.Dayjs | null>(null);

  if (!datosGenerales) return null;

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const fondoColor = buscador?.fondoColor || datosGenerales.colorTerciarioAgencia || "#F5F5F5";
  const inputColor = buscador?.inputColor || datosGenerales.colorPrincipalAgencia || "#FFFFFF";
  const tipografiaColor = buscador?.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#000000";
  const calendarioColorPrimario = buscador?.calendarioColorPrimario || datosGenerales.colorPrincipalAgencia || "#1976d2";
  const calendarioColorSecundario = buscador?.calendarioColorSecundario || datosGenerales.colorSecundarioAgencia || "#42a5f5";

  /** 🔹 Crear tema con Frutiger Aero y ajustes de colores en `TextField` y `DatePicker` */
  const frutigerAeroTheme = createTheme({
    typography: {
      fontFamily: datosGenerales.tipografiaAgencia || "'Poppins', sans-serif",
    },
    palette: {
      primary: { main: calendarioColorPrimario },
      secondary: { main: calendarioColorSecundario },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: datosGenerales.tipografiaAgencia || "'Poppins', sans-serif",
            backgroundColor: inputColor,
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              color: tipografiaColor,
              fontFamily: datosGenerales.tipografiaAgencia || "'Poppins', sans-serif",
            },
            "& .MuiInputBase-input::placeholder": {
              color: tipografiaColor,
              opacity: 1,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={frutigerAeroTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            backgroundColor: fondoColor, // ✅ Aplicamos el color de fondo
            padding: "16px",
            borderRadius: "25px",
          }}
        >
          <Grid container spacing={2}>
            {/* 🔹 Lugar de Salida */}
            <Grid item xs={12} md={3}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EventIcon sx={{ color: tipografiaColor, fontSize: 24 }} />
                  <Typography sx={{ color: tipografiaColor, fontWeight: 500, textAlign: "center" }}>
                    Ciudad de Origen
                  </Typography>
                </Box>
                <TextField fullWidth placeholder="Seleccionar" variant="outlined" size="small" />
              </Box>
            </Grid>

            {/* 🔹 Destino */}
            <Grid item xs={12} md={3}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EventIcon sx={{ color: tipografiaColor, fontSize: 24 }} />
                  <Typography sx={{ color: tipografiaColor, fontWeight: 500, textAlign: "center" }}>
                    Destino
                  </Typography>
                </Box>
                <TextField fullWidth placeholder="Seleccionar" variant="outlined" size="small" />
              </Box>
            </Grid>

            {/* 🔹 Fecha de Salida con calendario corregido */}
            <Grid item xs={12} md={3}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EventIcon sx={{ color: tipografiaColor, fontSize: 24 }} />
                  <Typography sx={{ color: tipografiaColor, fontWeight: 500, textAlign: "center" }}>
                    Fecha de Salida
                  </Typography>
                </Box>
                <DesktopDatePicker
                  format="DD/MM/YYYY"
                  value={fechaSalida}
                  onChange={(newValue) => setFechaSalida(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      size: "small",
                      sx: { borderRadius: "25px", color: tipografiaColor },
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* 🔹 Cantidad de Pasajeros */}
            <Grid item xs={12} md={3}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EventIcon sx={{ color: tipografiaColor, fontSize: 24 }} />
                  <Typography sx={{ color: tipografiaColor, fontWeight: 500, textAlign: "center" }}>
                    Viajeros
                  </Typography>
                </Box>
                <TextField fullWidth placeholder="Seleccionar" variant="outlined" size="small" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default SearchInputs;
