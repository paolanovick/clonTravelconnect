import React, { useState, useEffect } from "react";
import { Grid, Box, Button, CircularProgress, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CartaMes from "./CartaMes";
import { useDatosGenerales, useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { obtenerPaquetesDestacados } from "../../../servicios/especificos/servicioCartasDestacadoMes";
import { PaqueteDestacado } from "../../../interfaces/PaqueteDestacado";

const ContenedorCartasMes: React.FC = () => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const [paquetes, setPaquetes] = useState<PaqueteDestacado[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [cantidadVisible, setCantidadVisible] = useState<number>(window.innerWidth < 768 ? 4 : 8); // 🔥 Mejor visibilidad en móviles

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos: PaqueteDestacado[] = await obtenerPaquetesDestacados();
        setPaquetes(datos);
      } catch (error) {
        console.error("Error al cargar paquetes destacados:", error);
        setPaquetes([]); // 🔥 Evita estados inválidos
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const cargarMas = () => setCantidadVisible((prev) => prev + 8);
  const reducir = () => setCantidadVisible(window.innerWidth < 768 ? 4 : 8);

  if (!datosGenerales) return <Typography sx={{ textAlign: "center", mt: 4 }}>Cargando estilos...</Typography>;

  /** 🔥 Aplicamos fallbacks correctos desde `tarjetas` y `datosGenerales` */
  const tarjetaTipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";
  const tarjetaTipografiaColor = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";
  const tarjetaColorPrimario = tarjetas?.color?.primario || datosGenerales?.color?.primario || "#FF5733";
  const tarjetaColorSecundario = tarjetas?.color?.secundario || datosGenerales?.color?.secundario || "#C70039";
  const tarjetaColorTerciario = tarjetas?.color?.terciario || datosGenerales?.color?.terciario || "#900C3F";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: "100%",
        maxWidth: { xs: "95%", sm: "90%", md: "85%", lg: "1600px" },
        margin: "0 auto",
        overflow: "hidden",
        backgroundColor: "transparent", // ✅ Fondo transparente
      }}
    >
      {cargando ? (
        <CircularProgress sx={{ color: tarjetaColorPrimario, mt: 3 }} />
      ) : paquetes.length > 0 ? (
        <>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "95%", md: "90%", lg: "1600px" },
              alignItems: "stretch",
            }}
          >
            {paquetes.slice(0, cantidadVisible).map((paquete) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={paquete.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "stretch",
                  opacity: 0,
                  transform: "translateY(20px)",
                  animation: "fadeInUp 0.5s ease-out forwards",
                  "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <CartaMes
                  paquete={paquete}
                  estilos={{
                    tarjetaTipografia,
                    tarjetaTipografiaColor,
                    tarjetaColorPrimario,
                    tarjetaColorSecundario,
                    tarjetaColorTerciario,
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {paquetes.length > cantidadVisible && (
            <Button
              variant="contained"
              onClick={cantidadVisible < paquetes.length ? cargarMas : reducir}
              sx={{
                mt: 2,
                borderRadius: "25px",
                backgroundColor: tarjetaColorPrimario,
                "&:hover": { backgroundColor: tarjetaColorSecundario },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="button" sx={{ color: tarjetaTipografiaColor }}>
                {cantidadVisible < paquetes.length ? "Ver más" : "Ver menos"}
              </Typography>
              {cantidadVisible < paquetes.length ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Button>
          )}
        </>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 4 }}>No hay paquetes disponibles.</Typography>
      )}
    </Box>
  );
};

export default ContenedorCartasMes;
