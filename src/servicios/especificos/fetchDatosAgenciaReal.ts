// src/servicios/fetchDatosAgenciaReal.ts
import { AgenciaBackData } from "./transformarAgenciaBackData";

export const fetchDatosAgenciaReal = async (): Promise<AgenciaBackData> => {
  const hostname = window.location.hostname;
  const esLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  const url = esLocalhost
    ? "https://vagu.travelconnect.com.ar/agencia"
    : `${window.location.origin}/agencia`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la agencia");
  }

  const data = await response.json();
  console.log(`✅ Dato recibido de la API ${url}:`, data);
  return data;
};
