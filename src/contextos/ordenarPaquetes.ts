import { PaqueteData } from "../interfaces/tarjetasInterfaces";
import { Ordenamientos } from "./FiltrosYOrdenamientoContext";

/**
 * Ordena un arreglo de paquetes según el conjunto de ordenamientos y su prioridad.
 */
export const ordenarPaquetes = (
  paquetes: PaqueteData[],
  ordenamientos: Ordenamientos,
  prioridades: (keyof Ordenamientos)[]
): PaqueteData[] => {
  // Clonamos para no mutar el array original
  const paquetesOrdenados = [...paquetes];

  // Aplicamos cada criterio de orden (último primero para mantener prioridad)
  for (let i = prioridades.length - 1; i >= 0; i--) {
    const campo = prioridades[i];
    const orden = ordenamientos[campo];

    if (!orden) continue;

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

// 👇 Función auxiliar para extraer el valor ordenable según el campo
const obtenerValor = (paquete: PaqueteData, campo: keyof Ordenamientos): string | number => {
  switch (campo) {
    case "precio":
      return paquete.total ?? 0;

    case "salida":
      return paquete.salidas?.[0]?.fecha_desde ?? "";

    case "nombre":
      return paquete.titulo?.toLowerCase().trim() ?? "";

    case "duracion": {
      const match = paquete.duracion?.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }

    default:
      return 0;
  }
};
