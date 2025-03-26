import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  salida: any;
  campos: string[];
  labels: Record<string, string>;
  campoLabels: Record<string, string>;
  mostrarCampo: (valor?: string | number) => boolean;
  formatearUSD: (valor: string | number | undefined) => string | null;
  colorPrimario: string;
  colorTexto: string;
  tipografia: string;
}

const TarjetaSalida: React.FC<Props> = ({
  salida,
  campos,
  labels,
  campoLabels,
  mostrarCampo,
  formatearUSD,
  colorPrimario,
  colorTexto,
  tipografia,
}) => {
  const tiposConDatos = Object.keys(labels).filter((tipo) =>
    mostrarCampo(salida[`${tipo}_precio`])
  );

  if (tiposConDatos.length === 0) return null;

  return (
    <Box key={salida.id} sx={{ mb: 5 }}>
      {/* 🔹 Info general de la salida */}
      <Box sx={{ mb: 2 }}>
        {salida.fecha_desde && salida.fecha_hasta && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              fontFamily: tipografia,
              color: colorPrimario,
              fontSize: "1.1rem",
            }}
          >
            Salida:{" "}
            <Box component="span" sx={{ fontWeight: 500, color: colorTexto }}>
              {salida.fecha_desde} - {salida.fecha_hasta}
            </Box>
          </Typography>
        )}
      </Box>

      {/* 🔹 Cards por tipo dentro de la salida */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "flex-start",
        }}
      >
        {tiposConDatos.map((tipo) => (
          <Box
            key={tipo}
            sx={{
              border: `1px solid ${colorPrimario}`,
              borderRadius: 3,
              p: 2,
              minWidth: 200,
              flex: "1 1 220px",
              backgroundColor: "#fff",
              boxShadow: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: colorPrimario,
                fontFamily: tipografia,
                mb: 1,
                fontSize: "1.1rem",
              }}
            >
              {labels[tipo as keyof typeof labels]}
            </Typography>

            {campos.map((campo) => {
              const valor = salida[`${tipo}_${campo}`];
              if (valor === undefined) return null;

              return (
                <Box key={campo} sx={{ mb: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: colorPrimario, fontFamily: tipografia }}
                  >
                    {campoLabels[campo] || campo.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: colorTexto,
                      fontFamily: tipografia,
                      lineHeight: 1.3,
                    }}
                  >
                    {formatearUSD(valor)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TarjetaSalida;
