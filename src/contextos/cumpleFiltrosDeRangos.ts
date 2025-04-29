import { PaqueteData } from "../interfaces/tarjetasInterfaces";
import { Filtros } from "./FiltrosYOrdenamientoContext";

export const cumpleFiltrosDeRango = (paquete: PaqueteData, filtros: Filtros): boolean => {
  // 1. Precio total
  const precio = paquete.total ?? 0;
  console.log("💲 Precio del paquete evaluado:", precio, "| Filtro:", filtros.precio);
  if (precio < filtros.precio[0] || precio > filtros.precio[1]) {
    console.log("❌ Paquete descartado por precio.");
    return false;
  }

  // 2. Duración (extraer número de "7 noches")
  const noches = parseInt(paquete.duracion?.replace(/\D/g, "") || "0", 10);
  console.log("🛌 Duración del paquete evaluada:", noches, "| Filtro:", filtros.duracion);
  if (noches < filtros.duracion[0] || noches > filtros.duracion[1]) {
    console.log("❌ Paquete descartado por duración.");
    return false;
  }

  // 3. Estrellas del hotel
  const estrellas = paquete.hoteles
    ?.map(h => parseInt(h.hotel.categoria_hotel))
    .filter(n => !isNaN(n)) || [];
  console.log("⭐ Estrellas detectadas:", estrellas, "| Filtro:", filtros.estrellas);

  const hayEstrellasDentroDelRango = estrellas.some(
    e => e >= filtros.estrellas[0] && e <= filtros.estrellas[1]
  );

  if (!hayEstrellasDentroDelRango) {
    console.log("❌ Paquete descartado por estrellas.");
    return false;
  }

  console.log("✅ Paquete pasó TODOS los filtros de rango.");
  return true;
};
