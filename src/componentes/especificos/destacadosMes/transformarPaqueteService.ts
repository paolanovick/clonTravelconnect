import { PaqueteData } from "../../../interfaces/tarjetasInterfaces";

export function transformarPaqueteBackData(paqueteCrudo: any): PaqueteData {
  const precio = Number(paqueteCrudo.precio) || 0;
  const descuento = Number(paqueteCrudo.descuento) || 0;
  const tarifa = precio - descuento;
  const impuestos = 0; // Actualmente no viene campo de impuestos
  const total = tarifa + impuestos;

  // 🛌 Calcular duración
  let duracionTexto = "0 noches";
  const cantNoches = Number(paqueteCrudo.cant_noches) || 0;

  if (cantNoches > 0) {
    duracionTexto = `${cantNoches} noches`;
  } else if (paqueteCrudo.fecha_vigencia_desde && paqueteCrudo.fecha_vigencia_hasta) {
    const fechaDesde = new Date(paqueteCrudo.fecha_vigencia_desde);
    const fechaHasta = new Date(paqueteCrudo.fecha_vigencia_hasta);
    const diferenciaMs = fechaHasta.getTime() - fechaDesde.getTime();
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    if (diferenciaDias > 0) {
      duracionTexto = `${diferenciaDias} noches`;
    }
  }

  return {
    id: Number(paqueteCrudo.id),
    paquete_externo_id: paqueteCrudo.paquete_externo_id,
    fecha_modificacion: paqueteCrudo.fecha_modificacion,
    usuario: paqueteCrudo.usuario,
    usuario_id: Number(paqueteCrudo.usuario_id),
    ciudad: paqueteCrudo.ciudad,
    ciudad_iata: paqueteCrudo.ciudad_iata,
    pais: paqueteCrudo.pais,
    titulo: limpiarTitulo(paqueteCrudo.titulo),
    duracion: duracionTexto,
    descripcion: paqueteCrudo.descripcion || null,
    tarifa,
    impuestos,
    total,
    hoteles: paqueteCrudo.hoteles ? [paqueteCrudo.hoteles] : [],
    salidas: paqueteCrudo.salidas || [],
    transporte: paqueteCrudo.transporte,
    edad_menores: paqueteCrudo.edad_menores,
    activo: Boolean(paqueteCrudo.activo),
    imagen: paqueteCrudo.imagen_principal || "",
    galeria_imagenes: paqueteCrudo.galeria_imagenes,
    created_at: paqueteCrudo.created_at,
    updated_at: paqueteCrudo.updated_at,
    fecha_vigencia_desde: paqueteCrudo.fecha_vigencia_desde,
    fecha_vigencia_hasta: paqueteCrudo.fecha_vigencia_hasta,
    fechaSalida: paqueteCrudo.fecha_vigencia_desde || "",
    regimen: "", // No viene info aún
    destinos: paqueteCrudo.ciudad || "",
    venta_online: 1,
    info_tramos: 0,
    componentes: paqueteCrudo.componentes || "",
    tipo_moneda: paqueteCrudo.tipo_moneda || "USD",
    tipo_producto: paqueteCrudo.tipo_producto?.toString() || "0",
  };
}

// 🔵 Limpieza de título
function limpiarTitulo(tituloRaw: string | null | undefined): string {
  if (!tituloRaw) return "";
  return tituloRaw
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();
}
