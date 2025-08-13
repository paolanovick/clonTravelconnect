// components/paquetes/SalidasContent.tsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useTarjetas, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";
import TarjetaSalida from "./TarjetaSalida";
import type { Salida } from "../../interfaces/Salida";

type TipoHabitacion = "single" | "doble" | "triple" | "cuadruple" | "familia_1" | "familia_2";
type CampoPrecio = "precio" | "impuesto" | "otro" | "otro2";

interface SalidasContentProps {
  salidas?: Salida[];
  fechaSalida?: string;
  currency?: string;
  /** Fallback desde el paquete (ej: "Aéreo", "Bus") */
  transportePaquete?: string | null;
}

const SalidasContent: React.FC<SalidasContentProps> = ({
  salidas,
  fechaSalida,
  currency = "USD",
  transportePaquete,
}) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "sans-serif";
  const colorPrimario = tarjetas?.color?.primario || "#FF9800";
  const colorTexto = tarjetas?.tipografiaColorContenido || "#333";

  if (!salidas || salidas.length === 0) {
    return <Typography>No hay salidas disponibles</Typography>;
  }

  const mostrarCampo = (valor?: number): boolean =>
    typeof valor === "number" && Number.isFinite(valor) && valor !== 0;

  const formatearMoneda = (valor?: number): string => {
    const n = typeof valor === "number" && Number.isFinite(valor) ? valor : 0;
    return new Intl.NumberFormat("es-AR", { style: "currency", currency }).format(n);
  };

  const labels: Record<TipoHabitacion, string> = {
    single: "Single",
    doble: "Doble",
    triple: "Triple",
    cuadruple: "Cuádruple",
    familia_1: "Familiar 1",
    familia_2: "Familiar 2",
  };

  const campos: CampoPrecio[] = ["precio", "impuesto", "otro", "otro2"];

  const campoLabels: Partial<Record<CampoPrecio, string>> = {
    precio: "Precio",
    impuesto: "Impuesto",
    otro: "Otro",
    otro2: "Otro 2",
  };

  // 🔒 Solo mostrar la leyenda cuando hay una fecha real (evita "Fecha no disponible")
  const mostrarFecha =
    !!fechaSalida &&
    fechaSalida.trim().length > 0 &&
    fechaSalida.toLowerCase() !== "fecha no disponible";

  return (
    <Box sx={{ mt: 2, px: 2 }}>
      {mostrarFecha && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: colorPrimario,
            fontFamily: tipografia,
            mb: 2,
            fontSize: "1.4rem",
          }}
        >
          Fecha del viaje:{" "}
          <Box component="span" sx={{ color: colorTexto, fontWeight: 600 }}>
            {fechaSalida}
          </Box>
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      {salidas.map((salida) => (
        <TarjetaSalida
          key={salida.id}
          salida={salida}
          campos={campos}
          labels={labels}
          campoLabels={campoLabels}
          mostrarCampo={mostrarCampo}
          formatearUSD={formatearMoneda}
          colorPrimario={colorPrimario}
          colorTexto={colorTexto}
          tipografia={tipografia}
          transportePaquete={transportePaquete}
        />
      ))}
    </Box>
  );
};

export default SalidasContent;
