import { PaqueteData, SalidaData } from "../../../interfaces/tarjetasInterfaces";

export const transformarPaqueteDesdeBackend = (paquete: any): PaqueteData => {
  const salidas: SalidaData[] = paquete.salidas || [];
  const mejorSalida: SalidaData  = salidas[0];

  // ✅ Calculamos los valores necesarios para filtros y visualización
  const tarifa = Math.round(mejorSalida?.single_precio || 0);
const impuestos = Math.round(mejorSalida?.single_impuesto || 0);
const total = tarifa + impuestos;

  return {
    id: paquete.id, // ya es number
    titulo: `Viaje a ${paquete.ciudad}`,
    imagen: paquete.imagen_principal || "/imagenes/default-image.jpg",
    fechaSalida: mejorSalida?.fecha_desde || "Fecha no disponible",
    duracion: paquete.cant_noches ? `${paquete.cant_noches} noches` : "Duración no disponible",
    regimen: paquete.regimen || "Según Itinerario",
    destinos: paquete.ciudad,
    tarifa,
    impuestos,
    total,

    hoteles: Array.isArray(paquete.hoteles)
  ? paquete.hoteles.map((h: any) => ({
      hotel: {
        nombre: h.hotel.nombre,
        id_hotel: Number(h.hotel.id_hotel),
        categoria_hotel: h.hotel.categoria_hotel,
      },
    }))
  : paquete.hoteles
  ? [
      {
        hotel: {
          nombre: paquete.hoteles.hotel.nombre,
          id_hotel: Number(paquete.hoteles.hotel.id_hotel),
          categoria_hotel: paquete.hoteles.hotel.categoria_hotel,
        },
      },
    ]
  : undefined,

    descripcion: paquete.descripcion,
    salidas: paquete.salidas,
    transporte: paquete.transporte,
    usuario: paquete.usuario,

    paquete_externo_id: paquete.paquete_externo_id,
    ciudad: paquete.ciudad,
    ciudad_iata: paquete.ciudad_iata,
    pais: paquete.pais,
    edad_menores: paquete.edad_menores,
    venta_online: paquete.venta_online,
    info_tramos: paquete.info_tramos,
    activo: paquete.activo,
    created_at: paquete.created_at,
    updated_at: paquete.updated_at,
    fecha_modificacion: paquete.fecha_modificacion,
    fecha_vigencia_desde: paquete.fecha_vigencia_desde,
    fecha_vigencia_hasta: paquete.fecha_vigencia_hasta,
    galeria_imagenes: paquete.galeria_imagenes,
    usuario_id: paquete.usuario_id,
    tipo_moneda: paquete.tipo_moneda,
    tipo_producto: paquete.tipo_producto,
    categorias: paquete.categorias,
    componentes: paquete.componentes,

    ida_clase_vuelo: paquete.ida_clase_vuelo,
    ida_destino_ciudad: paquete.ida_destino_ciudad,
    ida_destino_fecha: paquete.ida_destino_fecha,
    ida_destino_hora: paquete.ida_destino_hora,
    ida_escalas: paquete.ida_escalas,
    ida_linea_aerea: paquete.ida_linea_aerea,
    ida_origen_ciudad: paquete.ida_origen_ciudad,
    ida_origen_fecha: paquete.ida_origen_fecha,
    ida_origen_hora: paquete.ida_origen_hora,
    ida_vuelo: paquete.ida_vuelo,

    vuelta_clase_vuelo: paquete.vuelta_clase_vuelo,
    vuelta_destino_ciudad: paquete.vuelta_destino_ciudad,
    vuelta_destino_fecha: paquete.vuelta_destino_fecha,
    vuelta_destino_hora: paquete.vuelta_destino_hora,
    vuelta_escalas: paquete.vuelta_escalas,
    vuelta_linea_aerea: paquete.vuelta_linea_aerea,
    vuelta_origen_ciudad: paquete.vuelta_origen_ciudad,
    vuelta_origen_fecha: paquete.vuelta_origen_fecha,
    vuelta_origen_hora: paquete.vuelta_origen_hora,
    vuelta_vuelo: paquete.vuelta_vuelo,
  };
};
