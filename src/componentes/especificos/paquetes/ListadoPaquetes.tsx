import { useState, useEffect } from "react";
import { Grid, Box, CircularProgress, Button } from "@mui/material";
import TarjetaPaquete from "./TarjetaPaquete";
import MensajeSinPaquetes from "./MensajeSinPaquetes";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";

const ListadoPaquetes = () => {
  const [paquetes, setPaquetes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [cantidadVisible, setCantidadVisible] = useState(10);
  const tarjeta = useTarjetas();

  const cargarPaquetes = () => {
    const data = localStorage.getItem("resultadosBusqueda");
    if (data) {
      const paquetesParseados = JSON.parse(data).filter(
        (p: any) => p?.id && p.id !== "error"
      );
      console.log("🔍 Paquetes actualizados:", paquetesParseados);
      setPaquetes(paquetesParseados);
    } else {
      setPaquetes([]);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarPaquetes();

    const actualizarPaquetes = () => cargarPaquetes();
    window.addEventListener("actualizarPaquetes", actualizarPaquetes);

    return () => {
      window.removeEventListener("actualizarPaquetes", actualizarPaquetes);
    };
  }, []);

  const cargarMas = () => setCantidadVisible((prev) => prev + 10);

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
      ) : paquetes.length === 0 ? (
        <MensajeSinPaquetes />
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {paquetes.slice(0, cantidadVisible).map((paquete) => {
              const mejorSalida = paquete.salidas?.[0];
              const tarifa = mejorSalida?.doble_precio ? parseFloat(mejorSalida.doble_precio) : 0;
              const impuestos = mejorSalida?.doble_impuesto ? parseFloat(mejorSalida.doble_impuesto) : 0;
              const total = tarifa + impuestos;

              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={paquete.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <TarjetaPaquete
                    paquete={{
                      id: paquete.id,
                      titulo: `Viaje a ${paquete.ciudad}`,
                      imagen: paquete.imagen_principal || "/imagenes/default-image.jpg",
                      fechaSalida: mejorSalida?.fecha_desde || "Fecha no disponible",
                      duracion: paquete.cant_noches ? `${paquete.cant_noches} noches` : "Duración no disponible",
                      regimen: paquete.regimen || "Según Itinerario",
                      destinos: paquete.ciudad,
                      tarifa,
                      impuestos,
                      total,
                      hoteles: paquete.hoteles,
                      descripcion: paquete.descripcion,
                      salidas: paquete.salidas,
                      transporte: paquete.transporte,
                      usuario:paquete.usuario,
                    }}
                    cargando={false}
                  />
                </Grid>
              );
            })}
          </Grid>

          {cantidadVisible < paquetes.length && (
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
