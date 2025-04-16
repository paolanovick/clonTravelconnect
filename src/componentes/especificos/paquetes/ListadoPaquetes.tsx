import { useState, useEffect } from "react";
import { Grid, Box, CircularProgress, Button } from "@mui/material";
import TarjetaPaquete from "./TarjetaPaquete";
import MensajeSinPaquetes from "./MensajeSinPaquetes";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useFiltrosYOrdenamiento } from "../../../contextos/FiltrosYOrdenamientoContext";
import { filtrarPaquetes } from "../../../contextos/filtrarPaquetes";
import { ordenarPaquetes } from "../../../contextos/ordenarPaquetes";
import type { PaqueteData } from "../../../interfaces/tarjetasInterfaces";

const ListadoPaquetes = () => {
  const [paquetes, setPaquetes] = useState<PaqueteData[]>([]);
  const [cargando, setCargando] = useState(true);
  const [cantidadVisible, setCantidadVisible] = useState(10);

  const tarjeta = useTarjetas();
  const {
    filtros,
    setFiltros,
    ordenamientos,
    setOrdenamientos,
    prioridadOrdenamientos,
    setPrioridadOrdenamientos,
  } = useFiltrosYOrdenamiento();

  const cargarPaquetes = () => {
    const data = localStorage.getItem("resultadosBusqueda");
    if (data) {
      const paquetesParseados: PaqueteData[] = JSON.parse(data).filter(
        (p: any) => p?.id && p.id !== -1
      );
      console.log("🔍 Paquetes cargados y listos:", paquetesParseados);
      setPaquetes(paquetesParseados);
    } else {
      setPaquetes([]);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarPaquetes();

    // ✅ Simulación de filtro por precio entre 4000 y 4500
    setFiltros({
      precio: [0, 100000000],
    });

    // ✅ Simulación de ordenamiento por precio ascendente
    setOrdenamientos("precio", "asc");
    setPrioridadOrdenamientos(["precio"]);

    const actualizarPaquetes = () => cargarPaquetes();
    window.addEventListener("actualizarPaquetes", actualizarPaquetes);

    return () => {
      window.removeEventListener("actualizarPaquetes", actualizarPaquetes);
    };
  }, []);

  const cargarMas = () => setCantidadVisible((prev) => prev + 10);

  const paquetesFiltrados = filtrarPaquetes(paquetes, filtros);
  const paquetesOrdenados = ordenarPaquetes(
    paquetesFiltrados,
    ordenamientos,
    prioridadOrdenamientos
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={40} />
        </Box>
      ) : paquetesOrdenados.length === 0 ? (
        <MensajeSinPaquetes />
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {paquetesOrdenados.slice(0, cantidadVisible).map((paquete) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                key={paquete.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TarjetaPaquete paquete={paquete} cargando={false} />
              </Grid>
            ))}
          </Grid>

          {cantidadVisible < paquetesOrdenados.length && (
            <Button
              variant="contained"
              onClick={cargarMas}
              sx={{
                mt: 3,
                borderRadius: "25px",
                backgroundColor: tarjeta?.color.primario,
                color: tarjeta?.tipografiaColor,
                fontWeight: "bold",
              }}
            >
              Ver más
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default ListadoPaquetes;
