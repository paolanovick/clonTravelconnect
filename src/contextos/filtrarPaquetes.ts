import { PaqueteData } from "../interfaces/tarjetasInterfaces";
import { Filtros } from "./FiltrosYOrdenamientoContext";
import { cumpleFiltrosDeRango } from "./cumpleFiltrosDeRangos";
import { cumpleFiltrosDeSeleccionMultiple } from "./cumpleFiltrosDeSeleccionMultiple";
import { cumpleFiltrosBooleanos } from "./cumpleFiltrosBooleanos";

/**
 * Aplica todos los filtros activos sobre una lista de paquetes.
 * Devuelve solo los que cumplan con los criterios actuales.
 */
export const filtrarPaquetes = (
  paquetes: PaqueteData[],
  filtros: Filtros
): PaqueteData[] => {
  return paquetes.filter((paquete) =>
    cumpleFiltrosDeRango(paquete, filtros) &&
    cumpleFiltrosDeSeleccionMultiple(paquete, filtros) &&
    cumpleFiltrosBooleanos(paquete, filtros)
  );
};
