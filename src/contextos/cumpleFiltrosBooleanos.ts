import { PaqueteData } from "../interfaces/tarjetasInterfaces";
import { Filtros } from "./FiltrosYOrdenamientoContext";

export const cumpleFiltrosBooleanos = (
  paquete: PaqueteData,
  filtros: Filtros
): boolean => {
  // 1. Venta online
  if (filtros.ventaOnline && paquete.venta_online !== 1) {
    return false;
  }

  return true;
};
