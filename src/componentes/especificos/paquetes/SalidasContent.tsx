import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import TarjetaSalida from "./TarjetaSalida"; // ✅ Import corregido (con mayúscula)

interface SalidasContentProps {
  salidas?: Array<any>;
  fechaSalida?: string;
}

const SalidasContent: React.FC<SalidasContentProps> = ({ salidas, fechaSalida }) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "sans-serif";
  const colorPrimario = tarjetas?.color?.primario || "#FF9800";
  const colorTexto = tarjetas?.tipografiaColorContenido || "#333";

  if (!salidas || salidas.length === 0) {
    return <Typography>No hay salidas disponibles</Typography>;
  }

  const mostrarCampo = (valor?: string | number): boolean => {
    const numero = typeof valor === "string" ? parseFloat(valor) : valor;
    return typeof numero === "number" && !isNaN(numero) && numero !== 0;
  };
  
  const formatearUSD = (valor: string | number | undefined) => {
    const numero = typeof valor === "string" ? parseFloat(valor) : valor;
    return numero ? `$${numero.toLocaleString("en-US")}` : null;
  };

  const labels = {
    single: "Single",
    doble: "Doble",
    triple: "Triple",
    cuadruple: "Cuádruple",
  };

  const campos = ["precio", "impuesto", "otro", "otro2"];

  const campoLabels: Record<string, string> = {
    precio: "Precio",
    impuesto: "Impuesto",
    otro: "Otro",
    otro2: "Otro 2",
  };

  return (
    <Box sx={{ mt: 2, px: 2 }}>
      {/* 🔶 Fecha del viaje destacada */}
      {fechaSalida && (
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

      {/* 🔶 Agrupamos por cada salida */}
      {salidas.map((salida) => (
        <TarjetaSalida
          key={salida.id}
          salida={salida}
          campos={campos}
          labels={labels}
          campoLabels={campoLabels}
          mostrarCampo={mostrarCampo}
          formatearUSD={formatearUSD}
          colorPrimario={colorPrimario}
          colorTexto={colorTexto}
          tipografia={tipografia}
        />
      ))}
    </Box>
  );
};

export default SalidasContent;
