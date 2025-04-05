import { AgenciaBackData } from "./transformarAgenciaBackData";

export const fetchDatosAgenciaReal = async (): Promise<AgenciaBackData> => {
  const response = await fetch("https://triptest.com.ar/agencia", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la agencia");
  }

  return await response.json();
};
