import { DatosAgencia } from "../../interfaces/datosAgencia";

/** 📡 Servicio que obtiene la agencia automáticamente (el backend detecta quién sos) */
export const fetchDatosAgencia = async (): Promise<DatosAgencia> => {
  const response = await fetch("http://triptest.com.ar/agencia", {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la agencia");
  }

  const datos = await response.json();
  return datos as DatosAgencia;
};
