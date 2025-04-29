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
  return paquetes.filter((paquete) => {
    const pasaRango = cumpleFiltrosDeRango(paquete, filtros);
    const pasaMultiple = cumpleFiltrosDeSeleccionMultiple(paquete, filtros);
    const pasaBooleano = cumpleFiltrosBooleanos(paquete, filtros);
    const pasaBusquedaNombre = filtros.busquedaNombre.trim() === "" ||
      paquete.titulo?.toLowerCase().includes(filtros.busquedaNombre.toLowerCase());

    return pasaRango && pasaMultiple && pasaBooleano && pasaBusquedaNombre;
  });
};

