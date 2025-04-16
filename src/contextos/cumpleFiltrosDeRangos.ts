import { PaqueteData } from "../interfaces/tarjetasInterfaces";
import { Filtros } from "./FiltrosYOrdenamientoContext";

export const cumpleFiltrosDeRango = (paquete: PaqueteData, filtros: Filtros): boolean => {
  // 1. Precio total
  const precio = paquete.total ?? 0;
  console.log("precioenfiltro",precio);
  if (precio < filtros.precio[0] || precio > filtros.precio[1]) {
    return false;
  }

  // 2. Duración (extraer número de "7 noches")
  const noches = parseInt(paquete.duracion?.replace(/\D/g, "") || "0", 10);
  if (noches < filtros.duracion[0] || noches > filtros.duracion[1]) {
    return false;
  }

  // 3. Estrellas del hotel
  const estrellas = paquete.hoteles
    ?.map(h => parseInt(h.hotel.categoria_hotel))
    .filter(n => !isNaN(n)) || [];

  const hayEstrellasDentroDelRango = estrellas.some(
    e => e >= filtros.estrellas[0] && e <= filtros.estrellas[1]
  );

  if (!hayEstrellasDentroDelRango) {
    return false;
  }

  return true;
};
