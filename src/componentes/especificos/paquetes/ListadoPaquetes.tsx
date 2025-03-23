import { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Button } from "@mui/material";
import TarjetaPaquete from "./TarjetaPaquete";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";

const ListadoPaquetes = () => {
  const [paquetes, setPaquetes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [cantidadVisible, setCantidadVisible] = useState(10); // 🔥 Mostrar solo 10 paquetes al inicio
  const tarjeta = useTarjetas();

  const cargarPaquetes = () => {
    const data = localStorage.getItem("resultadosBusqueda");
    if (data) {
      const paquetesParseados = JSON.parse(data);
      console.log("🔍 Paquetes actualizados:", paquetesParseados);
      setPaquetes(paquetesParseados);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarPaquetes(); // 🔥 Cargar paquetes al montar el componente

    // 🔥 Escuchar cambios en localStorage mediante el evento personalizado
    const actualizarPaquetes = () => cargarPaquetes();
    window.addEventListener("actualizarPaquetes", actualizarPaquetes);

    return () => {
      window.removeEventListener("actualizarPaquetes", actualizarPaquetes);
    };
  }, []);

  /** 🔥 Función para cargar 10 más */
  const cargarMas = () => setCantidadVisible((prev) => prev + 10);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={40} />
        </Box>
      ) : paquetes.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          No se encontraron paquetes. Intenta con otros criterios de búsqueda.
        </Typography>
      ) : paquetes.length === 1 && paquetes[0].id === "error" ? (
        // 🔥 Caso en el que no se encontraron paquetes (Error 404)
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
          <TarjetaPaquete
            paquete={{
              id: "error",
              titulo: "No se encontraron paquetes",
              imagen: "/imagenes/default-image.jpg",
              fechaSalida: "----",
              duracion: "-- No disponible --",
              regimen: "--",
              destinos: "--",
              tarifa: 0,
              impuestos: 0,
              total: 0,
            }}
            cargando={true} // 🔥 Simula el estado de carga en la tarjeta
          />
        </Box>
      ) : (
        <>
          {/* 🔥 Renderizar solo los paquetes visibles */}
          <Grid container spacing={3} justifyContent="center">
            {paquetes.slice(0, cantidadVisible).map((paquete) => {
              // ✅ Obtener tarifa, impuestos y total de la mejor salida disponible
              const mejorSalida = paquete.salidas?.[0]; // Tomamos la primera salida disponible

              const tarifa = mejorSalida?.doble_precio ? parseFloat(mejorSalida.doble_precio) : 0;
              const impuestos = mejorSalida?.doble_impuesto ? parseFloat(mejorSalida.doble_impuesto) : 0;
              const total = tarifa + impuestos;

              console.log("🔍 Datos pasados a TarjetaPaquete:", {
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
              });

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
                    }}
                    cargando={false}
                  />
                </Grid>
              );
            })}
          </Grid>

          {/* 🔥 Botón para cargar más si hay más paquetes disponibles */}
          {cantidadVisible < paquetes.length && (
            <Button
              variant="contained"
              onClick={cargarMas}
              sx={{ mt: 3, borderRadius: "25px", backgroundColor: tarjeta?.color.primario, color: tarjeta?.tipografiaColor, fontWeight: "bold" }}
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
