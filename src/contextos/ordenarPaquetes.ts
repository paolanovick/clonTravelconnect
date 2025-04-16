import { PaqueteData } from "../interfaces/tarjetasInterfaces";
import { Ordenamientos } from "./FiltrosYOrdenamientoContext";

export const ordenarPaquetes = (
  paquetes: PaqueteData[],
  ordenamientos: Ordenamientos,
  prioridades: (keyof Ordenamientos)[]
): PaqueteData[] => {
  // Copiamos el array para no mutar el original
  const paquetesOrdenados = [...paquetes];

  // Aplicamos cada criterio de orden en orden inverso (último primero)
  for (let i = prioridades.length - 1; i >= 0; i--) {
    const campo = prioridades[i];
    const orden = ordenamientos[campo];

    if (orden === null) continue;

    paquetesOrdenados.sort((a, b) => {
      const aVal = obtenerValor(a, campo);
      const bVal = obtenerValor(b, campo);

      if (aVal < bVal) return orden === "asc" ? -1 : 1;
      if (aVal > bVal) return orden === "asc" ? 1 : -1;
      return 0;
    });
  }

  return paquetesOrdenados;
};

// 👇 Función auxiliar para obtener el valor del campo a ordenar
const obtenerValor = (paquete: PaqueteData, campo: keyof Ordenamientos): any => {
  switch (campo) {
    case "precio":
      return paquete.total ?? 0;
    case "salida":
      return paquete.salidas?.[0]?.fecha_desde ?? "";
    case "nombre":
      return paquete.titulo?.toLowerCase() ?? "";
      case "duracion": {
        const match = paquete.duracion?.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      }
      return 0;
  }
};
