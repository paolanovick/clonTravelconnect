import { AgenciaBackData } from "./transformarAgenciaBackData";

export const fetchDatosAgenciaReal = async (): Promise<AgenciaBackData> => {
  const url = `https://vagu.travelconnect.com.ar/agencia`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la agencia");
  }

  const data = await response.json();
  console.log("✅ Dato recibido de la API /agencia:", data);
  return data;
};
