import { AgenciaBackData } from "./transformarAgenciaBackData";

export const fetchDatosAgenciaReal = async (): Promise<AgenciaBackData> => {
  const url = `${process.env.REACT_APP_API_URL}/agencia`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la agencia");
  }

  return await response.json();
};
