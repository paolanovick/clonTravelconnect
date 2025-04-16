import { PaqueteData } from "../interfaces/tarjetasInterfaces";
import { SalidaData } from "../interfaces/tarjetasInterfaces";
import { Filtros } from "./FiltrosYOrdenamientoContext";

/**
 * Evalúa todos los filtros que se basan en selección múltiple de valores.
 * Devuelve false si alguno de los filtros no se cumple.
 */
export const cumpleFiltrosDeSeleccionMultiple = (
  paquete: PaqueteData,
  filtros: Filtros
): boolean => {
  // 1. Ciudades
  if (
    filtros.ciudades.length > 0 &&
    !filtros.ciudades.includes(paquete.ciudad || "")
  ) return false;

  // 2. Hoteles
  if (
    filtros.hoteles.length > 0 &&
    !paquete.hoteles?.some(h => filtros.hoteles.includes(h.hotel.nombre))
  ) return false;

  // 3. Régimen
  if (
    filtros.regimenes.length > 0 &&
    !filtros.regimenes.includes(paquete.regimen || "")
  ) return false;

  // 4. Habitaciones (tipado seguro)
  const camposHabitacion: (keyof SalidaData)[] = [
    "single_precio",
    "doble_precio",
    "triple_precio",
    "cuadruple_precio",
    "familia_1_precio",
    "familia_2_precio"
  ];

  if (
    filtros.habitaciones.length > 0 &&
    (!paquete.salidas || !paquete.salidas.some(salida =>
      filtros.habitaciones.some(tipo => {
        const campo = `${tipo}_precio` as keyof SalidaData;
        if (!camposHabitacion.includes(campo)) return false;
        const valor = salida[campo];
        return typeof valor === "number" && valor > 0;
      })
    ))
  ) return false;

  // 5. Servicios incluidos (componentes)
  if (
    filtros.serviciosIncluidos.length > 0 &&
    (!paquete.componentes ||
      !filtros.serviciosIncluidos.every(id =>
        paquete.componentes?.split(",").includes(id)
      ))
  ) return false;

  // 6. Aerolínea
  if (
    filtros.aerolineas.length > 0 &&
    !filtros.aerolineas.includes(paquete.ida_linea_aerea || "")
  ) return false;

  // 7. Ciudad origen del vuelo
  if (
    filtros.ciudadesOrigenVuelo.length > 0 &&
    !filtros.ciudadesOrigenVuelo.includes(paquete.ida_origen_ciudad || "")
  ) return false;

  // 8. Ciudad destino del vuelo
  if (
    filtros.ciudadesDestinoVuelo.length > 0 &&
    !filtros.ciudadesDestinoVuelo.includes(paquete.ida_destino_ciudad || "")
  ) return false;

  // 9. Tipo de moneda
  if (
    filtros.tipoMoneda.length > 0 &&
    !filtros.tipoMoneda.includes(paquete.tipo_moneda || "")
  ) return false;

  return true;
};
